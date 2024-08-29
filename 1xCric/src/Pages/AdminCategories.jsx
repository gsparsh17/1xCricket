import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';

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

function CategoriesPage() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (selectedCategory || selectedDate) {
            fetchNewsByCategoryAndDate(currentPage);
        }
    }, [selectedCategory, selectedDate, currentPage]);

    const fetchNewsByCategoryAndDate = async (page) => {
        try {
            const response = await axios.get('http://localhost:5000/api/published-news', {
                params: {
                    categories: selectedCategory,
                    date: selectedDate,
                    page,
                    limit: 10
                }
            });
            console.log(selectedDate)
            setNews(response.data.news);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching news by category and date:', error);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="admin-dashboard flex h-full bg-gray-100">
            {/* Sidebar */}
            <Sidebar />
            <div className="container mx-auto p-10 mt-20 ml-72 max-md:ml-24">
                <h1 className="text-3xl font-bold mb-5">News by Category</h1>
                
                {/* Category Filter Dropdown */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full mb-6 p-2 border rounded"
                >
                    <option value="">Select Category</option>
                    {Object.keys(categoryMap).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Date Filter Input */}
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full mb-6 p-2 border rounded"
                />

                {/* Display News */}
                {news.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {news.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold mb-2 text-sky-500">
                                    <a href={`/Admin/edit/${item._id}`}>{item.title}</a>
                                </h2>
                                <p>{item.content}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {new Date(item.date).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No news found for the selected category and date.</p>
                )}
                <div className="flex justify-between mt-10 pb-10">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-blue-500 text-white py-1 px-3 rounded"
                    >
                        Previous
                    </button>
                    <span className="text-lg">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-blue-500 text-white py-1 px-3 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoriesPage;
