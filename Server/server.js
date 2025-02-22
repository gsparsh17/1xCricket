const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cron = require('node-cron');
const upload1 = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  dest: 'uploads/'
});

const axios = require('axios');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  }
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(async () => {
    console.log('Connected to MongoDB...');

    // Fetch and store data automatically on server start
    try {
      await fetchAndStoreNews();
      console.log('Initial news data fetched and stored successfully');
    } catch (err) {
      console.error('Failed to fetch and store initial news data:', err.message);
    }
const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => {
    console.error('Could not connect to MongoDB...', err);
  });

// mongoose.connect('mongodb+srv://gsparsh17:Gsparsh17@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected successfully!'))
// .catch(err => console.log('MongoDB connection error: ', err));


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://gsparsh17:Gsparsh17@1xcric.kbbu0.mongodb.net/?retryWrites=true&w=majority&appName=1xCric";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);



    // Start the server after data is fetched and stored

  const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  });

  const User = mongoose.model('User', UserSchema);

  const mediaSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    category: { type: String, default: 'Uncategorized' }
  });
  
  const Media = mongoose.model('Media', mediaSchema);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const adSchema = new mongoose.Schema({
  image: { type: String, required: true },
  link: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

const Ad = mongoose.model('Ad', adSchema);

const NewsSchema = new mongoose.Schema({
  id: String,
  title: String,
  categories: [String],
  link: String,
  gemini_search_result: String,
  imageUrl: String,
  author: String,
  publishDateTime: { type: String, default: null },
  published: { type: Boolean, default: false },
  date: String, // YYYY-MM-DD
  time: String
});

const News = mongoose.model('News', NewsSchema);

// New Schema for Published News
const PublishedNewsSchema = new mongoose.Schema({
  id: String,
  title: String,
  categories: [String],
  seoTitle: String,
  metaDiscription: String,
  metaKeywords: [String],
  link: String,
  gemini_search_result: String,
  imageUrl: String,
  author: String,
  published: { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }, // Correct format for date (YYYY-MM-DD)
  time: { type: String, default: () => new Date().toLocaleTimeString() } // Store the publish date
});

const PublishedNews = mongoose.model('PublishedNews', PublishedNewsSchema);

const PostsSchema = new mongoose.Schema({
  id: String,
  title: String,
  link: String,
  gemini_search_result: String,
  imageUrl: String,
  published: { type: Boolean, default: false },
  date: String, // YYYY-MM-DD
  time: String,
  author: String,
  categories: [String]
});

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// Admin Only Middleware
const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

app.post('/api/users', async (req, res) => {
  const { username, password, isAdmin } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      password: hashedPassword,
      isAdmin: Boolean(isAdmin), // Ensure isAdmin is a boolean
    });

    // Save the user to the database
    await user.save();

    res.status(201).send('User created successfully');
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { username, password, isAdmin } = req.body;

  // Validate input
  if (!username) {
    return res.status(400).send('Username is required');
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update user fields
    user.username = username;
    user.isAdmin = isAdmin;

    // If password is provided, hash the new password
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).send('User updated successfully');
  } catch (err) {
    res.status(500).send('Error updating user');
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error fetching user');
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted');
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
});


// Register Admin User
app.post('/api/auth/register-admin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, isAdmin: true });
    await user.save();
    res.status(201).json({ message: 'Admin user created' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin user' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });
    const token = jwt.sign({ _id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Admin-protected routes
app.get('/api/admin/dashboard', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

const Posts = mongoose.model('Posts', PostsSchema);

// Function to fetch and store data
async function fetchAndStoreNews() {
  const response = await axios.get('http://127.0.0.1:5000/api/news-search');
  const newsItems = response.data;

  for (const item of newsItems) {
    // Check if the news item already exists in the database
    const existingNews = await News.findOne({ link: item.link });

    if (!existingNews) {
  // Clear existing news items
  // newsItems.forEach(async item => {
    const news = new News({
      id: item.id,
      title: item.title,
      categories: ["Uncategorized"],
      link: item.link,
      gemini_search_result: item.gemini_search_result,
      author: "",
      date: item.date,
      time: item.time
    });

    await news.save();
  
  }
  }
}

// API to manually fetch data
app.post('/api/fetch-and-store-news', async (req, res) => {
  try {
    await fetchAndStoreNews();
    res.status(200).send('News data fetched and stored successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.get('/api/posts', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  try {
      const newsItems = await Posts.find().sort({ date: -1}).sort({ time: -1}).skip(parseInt(skip)).limit(parseInt(limit)).exec();
      const totalCount = await Posts.countDocuments();

      res.json({
          news: newsItems,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: parseInt(page),
      });
  } catch (err) {
      res.status(500).send(err.message);
  }
});

app.get('/api/news', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  try {
      await fetchAndStoreNews();
      const newsItems = await News.find().sort({ date: -1}).sort({ time: -1}).skip(parseInt(skip)).limit(parseInt(limit)).exec();
      const totalCount = await News.countDocuments();

      res.json({
          news: newsItems,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: parseInt(page),
      });
  } catch (err) {
      res.status(500).send(err.message);
  }
});

const convertPublishDateTime = (dateTimeString) => {
  // Check if the string already has seconds
  if (!dateTimeString.includes(':00')) {
    // Append seconds and timezone if not present
    return `${dateTimeString}:00Z`;
  }

  // If seconds are already present, just append timezone
  return `${dateTimeString}Z`;
};

cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const articlesToPublish = await News.find({
      publishDateTime: { $lte: now },
      published: false
    });

    if (articlesToPublish.length > 0) {
      for (const article of articlesToPublish) {
        article.published = true;
        await article.save();
        console.log(`Published ${articlesToPublish.length} scheduled articles. on ${article.publishDateTime}`);
        await axios.post(`https://onexcricket.onrender.com/api/news/${article._id}/publish`);
      }
    }
  } catch (err) {
    console.error('Error scheduling articles for publishing:', err);
  }
});

app.get('/api/published-news', async (req, res) => {
  const { categories, date, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    // Build the filter object
    const filter = { published: true };

    // Filter by categories if provided
    if (categories) {
      filter.categories = categories;
      // If multiple categories are passed as comma-separated, uncomment the below line:
      // filter.categories = { $in: categories.split(',') };
    }

    // Filter by date if provided
    if (date) {
      filter.date = date;// Match the exact date
    }

    // Fetch only the title and category of the published news
    const newsItems = await PublishedNews.find(filter)
      .sort({ date: -1, time: -1 }) // Sort by date and time in descending order
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();

    // Get the total count of news items for the filter
    const totalCount = await PublishedNews.countDocuments(filter);

    res.json({
      news: newsItems,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.put('/api/news/:id', async (req, res) => {
    try {
      // console.log(`ID received: ${req.params.id}`); 
    const updatedNewsItem = await News.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          link: req.body.link,
          gemini_search_result: req.body.gemini_search_result,
          categories: req.body.categories,
          imageUrl: req.body.imageUrl,
          author: req.body.author,
          published: req.body.published,
          publishDateTime: convertPublishDateTime(req.body.publishDateTime),
          date: req.body.date,
          time: req.body.time,
        }
      },
      { new: true } // This option returns the updated document
    );

    if (updatedNewsItem) {
      res.json(updatedNewsItem);
    } else {
      res.status(404).send('News item not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.post('/api/news', async (req, res) => {
  try {
    const newNewsItem = new News({
      title: req.body.title,
      link: req.body.link, // Optional: A link field if required
      gemini_search_result: req.body.gemini_search_result, // Assuming this is the content
      categories: req.body.categories,
      author: req.body.author,
      imageUrl: req.body.imageUrl,
      publishDateTime: convertPublishDateTime(req.body.publishDateTime), // Assuming this is for the image
      published: req.body.published || false,
      date: new Date(), // Auto-generate date and time
      time: new Date().toLocaleTimeString(),
    });

    const savedNewsItem = await newNewsItem.save();
    res.status(201).json(savedNewsItem); // 201 status for successful creation
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Fetch a single news item by ID
app.get('/api/news/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (newsItem) {
      res.json(newsItem);
    } else {
      res.status(404).send('News item not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
      const result = await News.findByIdAndDelete(req.params.id);
      if (result) {
          res.status(200).send('News item deleted');
      } else {
          res.status(404).send('News item not found');
      }
  } catch (err) {
      res.status(500).send(err.message);
  }
});

app.delete('/api/published-news/:id', async (req, res) => {
  try {
      const result1 = await PublishedNews.findById(req.params.id);
      const result3 = result1.link;
      const result2 = await News.findOne({link: result1.link})
      result2.published= false;
      await result2.save();
      const result = await PublishedNews.findByIdAndDelete(req.params.id);
      if (result) {
          res.status(200).send('News item deleted');
      } else {
          res.status(404).send('News item not found');
      }
  } catch (err) {
      res.status(500).send(err.message);
  }
});

app.get('/api/published-news/:id', async (req, res) => {
  try {
    const newsItem = await PublishedNews.findById(req.params.id);
    if (newsItem) {
      res.json(newsItem);
    } else {
      res.status(404).send('News item not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Save changes to a news item
app.put('/api/published-news/:id', async (req, res) => {
  try {
    const updatedNewsItem = await PublishedNews.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          link: req.body.link,
          gemini_search_result: req.body.gemini_search_result,
          categories: req.body.categories,
          imageUrl: req.body.imageUrl,
          seoTitle: req.body.seoTitle,
          author: req.body.author,
          metaDiscription: req.body.metaDescription,
          metaKeywords: req.body.metaKeywords,
          published: req.body.published,
          date: req.body.date,
          time: req.body.time,
        }
      },
      { new: true } // This option returns the updated document
    );

    if (updatedNewsItem) {
      res.json(updatedNewsItem);
    } else {
      res.status(404).send('News item not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/ads', async (req, res) => {
  try {
    const newAd = new Ad({ 
      image: req.body.image || '',
      link: req.body.link,
      title: req.body.title,
      category: req.body.category
    });
    console.log(newAd)
    await newAd.save();
    res.status(201).json(newAd);
  } catch (error) {
    res.status(500).send('Error saving ad: ' + error.message);
  }
});

// Get all ads
app.get('/api/ads', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).send('Error fetching ads');
  }
});

app.get('/api/media', async (req, res) => {
  try {
    const mediaItems = await Media.find().sort({ uploadDate: -1 });
    res.json(mediaItems);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch media items', error: err.message });
  }
});

app.delete('/api/media/:id', async (req, res) => {
  try {
    const mediaItem = await Media.findById(req.params.id);
    if (!mediaItem) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Delete the image file
    fs.unlink(path.join(__dirname, mediaItem.imageUrl), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to delete image file', error: err.message });
      }
    });

    await mediaItem.remove();
    res.json({ message: 'Media deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete media item', error: err.message });
  }
});

// Get ad by ID
app.get('/api/ads/:id', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      res.json(ad);
    } else {
      res.status(404).send('Ad not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching ad: ' + error.message);
  }
});

// Update ad by ID
app.put('/api/ads/:id', async (req, res) => {
  const { link, title, category } = req.body;

  try {
    const updatedAd = await Ad.findByIdAndUpdate(req.params.id, { link, title, category }, { new: true });
    if (updatedAd) {
      res.json(updatedAd);
    } else {
      res.status(404).send('Ad not found');
    }
  } catch (error) {
    res.status(500).send('Error updating ad: ' + error.message);
  }
});

// Delete ad by ID
app.delete('/api/ads/:id', async (req, res) => {
  try {
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    if (deletedAd) {
      res.status(204).send();
    } else {
      res.status(404).send('Ad not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting ad: ' + error.message);
  }
});

app.post('/api/ads/:id/upload-image', upload1.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const image = `https://onexcricket.onrender.com/uploads/${req.file.filename}`;
    const ad = await Ad.findByIdAndUpdate(req.params.id, { image: image }, { new: true });
    if (!ad) {
      return res.status(404).send('Ad not found');
    }
    const newMedia = new Media({
      imageUrl: req.body.image,
      category: req.body.category || 'Uncategorized'
    });
      await newMedia.save();
    res.json(ad);
  } catch (err) {
    console.error('Error during file upload:', err);
    res.status(500).send(err.message);
  }
})

app.post('/api/ads/upload-image', upload1.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const image = `https://onexcricket.onrender.com/uploads/${req.file.filename}`;
    const newMedia = new Media({
      imageUrl: req.body.image,
      category: req.body.category || 'Uncategorized'
    });
      newMedia.save();
    res.status(200).json({ image });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

app.post('/api/news/:id/upload-image', upload1.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const imageUrl = `https://onexcricket.onrender.com/uploads/${req.file.filename}`;
    const newsItem = await News.findByIdAndUpdate(req.params.id, { imageUrl }, { new: true });
    if (!newsItem) {
      return res.status(404).send('News item not found');
    }
    res.json(newsItem);
    const newMedia = new Media({
      imageUrl,
      category: req.body.category || 'Uncategorized'
    });
      await newMedia.save();
  } catch (err) {
    console.error('Error during file upload:', err);
    res.status(500).send(err.message);
  }
});

app.post('/api/published-news/:id/upload-image', upload1.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const imageUrl = `https://onexcricket.onrender.com/uploads/${req.file.filename}`;
    const newsItem = await PublishedNews.findByIdAndUpdate(req.params.id, { imageUrl }, { new: true });
    if (!newsItem) {
      return res.status(404).send('News item not found');
    }
    const newMedia = new Media({
      imageUrl,
      category: req.body.category || 'Uncategorized'
    });
      await newMedia.save();
    res.json(newsItem);
  } catch (err) {
    console.error('Error during file upload:', err);
    res.status(500).send(err.message);
  }
});

// Publish a news item and store it in the PublishedNews collection
app.post('/api/news/:id/publish', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (newsItem) {
      // Update the news item as published
      await News.findByIdAndUpdate(req.params.id, { published: true });

      // Add the news item to PublishedNews collection
      const publishedNews = new PublishedNews({
        imageUrl: newsItem.imageUrl,
        title: newsItem.title,
        categories: newsItem.categories,
        seoTitle: newsItem.title,
        metaDiscription: newsItem.title,
        metaKeywords: newsItem.categories,
        author: newsItem.author,
        link: newsItem.link,
        gemini_search_result: newsItem.gemini_search_result,
        date: new Date(Date.now()).toISOString().split('T')[0]
      });
      await publishedNews.save();

      res.json(publishedNews);
    } else {
      res.status(404).send('News item not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const ACCESS_TOKEN = "EAARUc5Gxg7wBO9Mm90MZCZCd5JJWapnG1FA1vnI3fs2dXThjC2b32XFea0xDKs5qbyU2fyWZA3ZB4Ciz2HRlGjZCuFI7hgiXsVgeVASV7LHa4ZAw969rANIr8OFGmw8E4HVbIA6opT2YyV1sm51DHLMXqQHzo3eB6dn7k5tAuRX2mDqcTTrlVbREALGyAhyCCpZC6p1btQuMILAf5kAoVPsJrE8REcIkyst";

// Route to post to Facebook
app.post('/api/post_facebook', async (req, res) => {
  const { title, content } = req.body;

  const message = `Check out our latest news: ${title}\n\n${content}`;
  
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v16.0/me/feed`,
      {
        message: message,
        access_token: ACCESS_TOKEN
      }
    );
    res.status(200).json({ message: 'Successfully posted to Facebook', response: response.data });
  } catch (error) {
    console.error('Error posting to Facebook:', error);
    res.status(500).json({ error: error.response ? error.response.data : 'Unknown error' });
  }
});

