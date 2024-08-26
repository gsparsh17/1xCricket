// NewsEditPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

function NewsEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newsItem, setNewsItem] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [published, setPublished] = useState(false);
    const [categories, setCategories] = useState(["Uncategorized"]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [seoTitle, setSeoTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState([]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleCategoryChange = (category) => {
    console.log("Current Categories:", categories);
    console.log("Category to Toggle:", category);
  
    if (categories.includes(category)) {
      console.log("Removing category:", category);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat !== category)
      );
    } else {
      console.log("Adding category:", category);
      setCategories((prevCategories) => [...prevCategories, category]);
    }
  }

    useEffect(() => {
        fetchNews();
        fetchPublishedNews();
    }, []);

    const categoryMap = {
        Archives: "Archives",
        Betting: "Betting",
        Cricket: "Cricket",
        "Cycling Tour": "Cycling Tour",
        "Editor Picks": "Editor Picks",
        "Equipment Reviews": "Equipment Reviews",
        "Fantasy Cricket": "Fantasy Cricket",
        Featured: "Featured",
        Football: "Football",
        Golf: "Golf",
        History: "History",
        "Horse Racing": "Horse Racing",
        IPL: "IPL",
        "Latest News": "Latest News",
        Learn: "Learn",
        "Match Prediction": "Match Prediction",
        News: "News",
        ODI: "ODI",
        "Sport Today": "Sport Today",
        "T20 Cricket": "T20 Cricket",
        Tennis: "Tennis",
        "Test Cricket": "Test Cricket",
        Uncategorized: "Uncategorized",
        Video: "Video",
        "Women's Cricket": "Women's Cricket"
    };

    const fetchPublishedNews = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/published-news/${id}`);
            const data = response.data;
            setNewsItem(data);
            setTitle(data.title);
            setContent(data.gemini_search_result);
            setPublished(data.published);
            setCategories(data.categories || ["Uncategoried"]);
            setSeoTitle(data.title);
            setMetaDescription(data.title);
            setMetaKeywords(data.categories || [])
        } catch (error) {
            console.error('Error fetching published news:', error);
        }
    };

    const fetchNews = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/news/${id}`);
            const data = response.data;
            const h2Text = extractH2FromHTML(data.gemini_search_result);
            setNewsItem(data);
            if(h2Text)
            setTitle(h2Text);
            else
            setTitle(data.title);
            setContent(data.gemini_search_result);
            setPublished(data.published);
            setCategories(data.categories || ["Uncategoried"]);
            setSeoTitle(data.title);
            setMetaDescription(data.title);
            setMetaKeywords(data.categories || [])
        } catch (error) {
            console.error('Error fetching news item:', error);
        }
    };

    const extractH2FromHTML = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const h2Element = doc.querySelector('h2');
        return h2Element ? h2Element.textContent : 'No <h2> found';
      };

    const handleImageUpload = async (event, isPublished) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        try {
            const apiUrl = isPublished
      ? `http://localhost:5000/api/published-news/${id}/upload-image`
      : `http://localhost:5000/api/news/${id}/upload-image`;

    await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
            fetchNews(); // Refresh news item to show updated image
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleDelete = async (publish) => {
        try {
            if (publish) {
            await axios.delete(`http://localhost:5000/api/published-news/${id}`);
            navigate('/Admin/Published');
            }
            else{
            await axios.delete(`http://localhost:5000/api/news/${id}`);
            navigate('/Admin');
            } // Redirect back to admin panel
        } catch (error) {
            await axios.delete(`http://localhost:5000/api/news/${id}`);
            navigate('/Admin');
            console.error('Error deleting news item:', error);
        }
    };

    const handleSave = async (publish) => {
        try {
            if (publish) {
                try{
                await axios.put(`http://localhost:5000/api/published-news/${id}`, { 
                    title, 
                    content,  // Assuming `content` corresponds to `gemini_search_result`
                    image, 
                    categories,   // Assuming this corresponds to `imageUrl`
                    published
                });
                navigate('/Admin');
            }
            catch{
                await axios.put(`http://localhost:5000/api/news/${id}`, { 
                    title, 
                    content,  // Assuming `content` corresponds to `gemini_search_result`
                    image,
                    categories,    // Assuming this corresponds to `imageUrl`
                    published
                });
                navigate('/Admin');
            }
            }
            else{
            await axios.put(`http://localhost:5000/api/news/${id}`, { 
                title, 
                content,  // Assuming `content` corresponds to `gemini_search_result`
                image,
                categories,    // Assuming this corresponds to `imageUrl`
                published
            });
            navigate('/Admin');
        }
             // Redirect back to admin panel
        } 
        
        catch (error) {
            console.error('Error updating news item:', error);
        }
    };

    const handlePublish = async () => {
        try {
            await axios.put(`http://localhost:5000/api/news/${id}`, { 
                title, 
                content,  // Assuming `content` corresponds to `gemini_search_result`
                image,
                categories,    // Assuming this corresponds to `imageUrl`
                published
            });
            await axios.post(`http://localhost:5000/api/news/${id}/publish`);
            setPublished(true);
            navigate('/Admin');
        } catch (error) {
            console.error('Error publishing news:', error);
        }
    };

    if (!newsItem) return <div>Loading...</div>;

    return (
        <div className="admin-dashboard flex">
            {/* Sidebar */}
            <Sidebar/>
        <div className="container p-5 ml-80 pt-32 w-3/4">
            <h1 className="text-2xl font-bold mb-5">Edit News Item</h1>
            <div className="mb-4">
                <label className="block text-lg font-semibold">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded m-4"
                />
            </div>
            
                <label className="block text-lg font-semibold">Content:</label>
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    className="w-full h-80 border rounded pb-10 m-4"
                />
            <div className="mb-4">
                    <label className="block text-lg font-semibold">Categories:</label>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="w-full p-2 border rounded m-4 text-left bg-white"
                        >
                            {categories.length > 0 ? categories.join(", ") : "Select Categories"}
                        </button>
                        {dropdownOpen && (
                            <div className="absolute bg-white border rounded shadow-lg mt-1 w-full z-10 max-h-60 overflow-y-auto">
                                {Object.values(categoryMap).map((category) => (
                                    <div key={category} className="p-2 border-b">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={categories.includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                                className="mr-2"
                                            />
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            <div className="mb-4">
                <label className="block text-lg font-semibold">Image:</label>
                <input
                    type="file"
                    onChange={(event) => handleImageUpload(event, published)}
                    className="m-4"
                />
                {newsItem.imageUrl && (
                    <img 
                        src={newsItem.imageUrl} 
                        alt={title} 
                        className="w-48 h-48 object-cover mb-4"
                    />
                )}
            </div>
            <div className="mb-4">
        <h2 className="text-xl font-bold mb-3 text-center">SEO Settings</h2>
        
        {/* SEO Title */}
        <label className="block text-lg font-semibold">SEO Title:</label>
        <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full p-2 border rounded m-4"
        />
        
        {/* Meta Description */}
        <label className="block text-lg font-semibold">Meta Description:</label>
        <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full p-2 border rounded m-4 h-20"
        ></textarea>
        
        {/* Meta Keywords */}
        <label className="block text-lg font-semibold">Meta Keywords:</label>
        <input
            type="text"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            className="w-full p-2 border rounded m-4"
        />
    </div>
            <div className="mb-4">
                <button
                    onClick={() => handleSave(published)}
                    className="bg-green-500 text-white py-2 px-4 rounded m-4"
                >
                    Save
                </button>
                    <button
                    onClick={() => handleDelete(published)}
                    className="bg-red-500 text-white py-2 px-4 rounded m-4"
                >
                    Delete
                </button>
                
                
                {!published ? (
                    <button
                        onClick={handlePublish}
                        className="ml-4 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Publish
                    </button>
                ) : (
                    <span className="ml-4 text-sky-500 font-bold">Published</span>
                )}
            </div>
        </div>
        </div>
    );
}

export default NewsEditPage;
