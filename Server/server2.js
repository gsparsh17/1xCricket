const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/newsdb', {
  
}).then(() => {
  console.log('Connected to MongoDB...');
}).catch(err => {
  console.error('Could not connect to MongoDB...', err);
});

// Define a schema and model for news
const newsSchema = new mongoose.Schema({
  id: String,
  title: String,
  link: String,
  gemini_search_result: String
});

const News = mongoose.model('News', newsSchema);

// Fetch data from Flask API and store it in MongoDB
const fetchAndStoreNews = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/news-search');
    const newsItems = response.data;

    // Save each news item to MongoDB
    newsItems.forEach(async item => {
      const news = new News({
        id: item.id,
        title: item.title,
        link: item.link,
        gemini_search_result: item.gemini_search_result
      });

      await news.save();
    });

    console.log('News data has been saved to MongoDB.');
  } catch (error) {
    console.error('Error fetching or saving news data:', error);
  }
};

// Endpoint to trigger data fetching
app.get('/fetch-news', async (req, res) => {
  await fetchAndStoreNews();
  res.send('News data fetched and stored in MongoDB.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
