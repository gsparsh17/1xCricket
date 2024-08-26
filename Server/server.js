const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
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
mongoose.connect('mongodb://localhost:27017/newsdb', {
}).then(async () => {
    console.log('Connected to MongoDB...');

    // Fetch and store data automatically on server start
    try {
      await fetchAndStoreNews();
      console.log('Initial news data fetched and stored successfully');
    } catch (err) {
      console.error('Failed to fetch and store initial news data:', err.message);
    }

    // Start the server after data is fetched and stored
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => {
    console.error('Could not connect to MongoDB...', err);
  });

  const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  });

  const User = mongoose.model('User', UserSchema);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const NewsSchema = new mongoose.Schema({
  id: String,
  title: String,
  categories: [String],
  link: String,
  gemini_search_result: String,
  imageUrl: String,
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
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
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

app.get('/api/published-news', async (req, res) => {
  const { categories, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    // Check if category is passed and filter accordingly
    const filter = categories ? { categories: categories, published: true } : { published: true };
    // const filter = categories ? { categories: { $in: categories.split(',') }, published: true } : { published: true };
    // Fetch only the title and category of the published news
    const newsItems = await PublishedNews.find(filter) // Select only 'title' and 'categories' fields
      .sort({ date: -1, time: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();

    // Get the total count of news items for the category
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

app.post('/api/news', async (req, res) => {
  try {
    const newNewsItem = new News({
      title: req.body.title,
      link: req.body.link, // Optional: A link field if required
      gemini_search_result: req.body.gemini_search_result, // Assuming this is the content
      categories: req.body.categories,
      imageUrl: req.body.imageUrl, // Assuming this is for the image
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

app.post('/api/news/:id/upload-image', upload1.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    const newsItem = await News.findByIdAndUpdate(req.params.id, { imageUrl }, { new: true });
    if (!newsItem) {
      return res.status(404).send('News item not found');
    }
    res.json(newsItem);
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
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    const newsItem = await PublishedNews.findByIdAndUpdate(req.params.id, { imageUrl }, { new: true });
    if (!newsItem) {
      return res.status(404).send('News item not found');
    }
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


