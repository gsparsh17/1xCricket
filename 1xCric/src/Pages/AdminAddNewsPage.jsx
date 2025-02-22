// AddNewsPage.js
import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

function AddNewsPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [published, setPublished] = useState(false);
    const [categories, setCategories] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [seoTitle, setSeoTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');

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

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleCategoryChange = (category) => {
        if (categories.includes(category)) {
            setCategories(prevCategories => prevCategories.filter(cat => cat !== category));
        } else {
            setCategories(prevCategories => [...prevCategories, category]);
        }
    };

    const handleImageUpload = async (event) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        setImage(formData);
    };

    const handlePublish = async () => {
        try {
            // await axios.put(`https://onexcricket.onrender.com/api/news/${id}`, { 
            //     title, 
            //     content,  // Assuming `content` corresponds to `gemini_search_result`
            //     image,
            //     categories,    // Assuming this corresponds to `imageUrl`
            //     published
            // });
            await axios.post(`https://onexcricket.onrender.com/api/news/${id}/publish`);
            navigate('/Admin');
        } catch (error) {
            console.error('Error publishing news:', error);
        }
    };

    const handleSave = async (publish) => {
        try {
            const response = await axios.post('https://onexcricket.onrender.com/api/news', {
                title,
                content,
                categories,
                seoTitle,
                metaDescription,
                metaKeywords: metaKeywords.split(',').map((keyword) => keyword.trim()),
                published: publish,
            });

            if (image) {
                await axios.post(`https://onexcricket.onrender.com/api/news/${response.data._id}/upload-image`, image, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            navigate('/Admin'); // Redirect to admin panel after saving
        } catch (error) {
            console.error('Error adding news item:', error);
        }
    };

    return (
        <div className="admin-dashboard flex h-full bg-gray-100">
            <Sidebar/>
            <div className="container p-5 ml-80 pt-32 w-3/4">
                <h1 className="text-2xl font-bold mb-5">Add News Item</h1>
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
                        onChange={handleImageUpload}
                        className="m-4"
                    />
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-3 text-center">SEO Settings</h2>
                    
                    <label className="block text-lg font-semibold">SEO Title:</label>
                    <input
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        className="w-full p-2 border rounded m-4"
                    />

                    <label className="block text-lg font-semibold">Meta Description:</label>
                    <textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        className="w-full p-2 border rounded m-4 h-20"
                    ></textarea>

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
                        onClick={() => handleSave(false)}
                        className="bg-green-500 text-white py-2 px-4 rounded m-4"
                    >
                        Save as Draft
                    </button>

                    <button
                        onClick={() => handleSave(true)}
                        className="bg-blue-500 text-white py-2 px-4 rounded m-4"
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddNewsPage;
