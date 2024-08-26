const axios = require('axios');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/newsdb', { });

// Define your schema
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

const Posts = mongoose.model('Posts', PostsSchema);

const categoryMap = {
    110: "Archives",
    102: "Betting",
    109: "Cricket",
    58: "Cycling Tour",
    69: "Editor Picks",
    105: "Equipment Reviews",
    12: "Fantasy Cricket",
    7: "Featured",
    59: "Football",
    60: "Golf",
    103: "History",
    61: "Horse Racing",
    140: "IPL",
    9: "Latest News",
    25: "Learn",
    11: "Match Prediction",
    73: "News",
    5009: "ODI",
    57: "Sport Today",
    8: "T20 Cricket",
    62: "Tennis",
    41: "Test Cricket",
    1: "Uncategorized",
    65: "Video",
    10: "Women's Cricket"
  };

// Fetch data from WordPress
async function fetchAndSaveData() {
    for (let i = 1; i <= 1521; i++) {
        const response = await axios.get(`https://1xcricket.com/wp-json/wp/v2/posts?per_page=100&page=${i}`);
        const post1 = response.data;
  
        if (post1.length === 0) {
          console.log(`No more posts to fetch after page ${i}.`);
          break; // Exit the loop if no more posts are returned
        }
    // console.log(post1)

    // const mediaData = await axios.get('https://1xcricket.com/wp-json/wp/v2/posts?per_page=100');
    // const mediaUrl = mediaData.source_url;
    // console.log(mediaUrl);
    var mediaUrl="";
    for(const post of post1) {
        try{
        const mediaData = await axios.get('https://1xcricket.com/wp-json/wp/v2/media/'+post.featured_media);
        // console.log(mediaData)
        mediaUrl = mediaData.data.source_url;
    } catch (error) {
        console.error('Error fetching media URL:', error.response ? error.response.data : error.message);
        mediaUrl= "";
    }
    console.log(post.id)
    console.log(mediaUrl)
        // const mediaUrl = "";
        const categoryNames = post.categories.map(catId => categoryMap[catId] || 'Unknown');
        const dateObj = new Date(post.date);
        const date = dateObj.toISOString().split('T')[0]; // Extract date (YYYY-MM-DD)
        const time = dateObj.toISOString().split('T')[1].substring(0,8); // Extract time (HH:MM:SS)

        const newNewsItem = new Posts({
            id: post.id,
            title: post.title.rendered,
            link: post.link,
            gemini_search_result: post.content.rendered, // Assuming it's empty or you need to extract it
            imageUrl: mediaUrl, // You would need to fetch this if `featured_media` is not 0
            published: post.status === 'publish',
            date: date,
            time: time,
            categories: categoryNames
        });

        await newNewsItem.save();
    }
}
    console.log('Data migration completed!');
    mongoose.connection.close();

}

fetchAndSaveData().catch(err => {
    console.error(err);
    mongoose.connection.close();
});
