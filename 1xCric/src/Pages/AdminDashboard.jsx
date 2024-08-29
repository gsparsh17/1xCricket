import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

function AdminDashboard() {
    const [news, setNews] = useState([]);
    const [publishedNews, setPublishedNews] = useState([]);

    useEffect(() => {
        fetchAllNews();
        fetchPublishedNews();
    }, []);

    const fetchAllNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news');
            const allNews = response.data.news;
            // Sort news by date to ensure the latest ones are shown first
            const sortedNews = allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
            // Slice the first 10 news items
            const latestNews = sortedNews.slice(0, 5);
            setNews(latestNews);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };
    const fetchPublishedNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/published-news');
            const published = response.data.news;
            // Sort by date to ensure it's latest and slice the first 5 items
            const sortedPublished = published.sort((a, b) => new Date(b.date) - new Date(a.date));
            const lastFivePublished = sortedPublished.slice(0, 5);
            setPublishedNews(lastFivePublished);
        } catch (error) {
            console.error('Error fetching published news:', error);
        }
    };
    return (
        <div className="admin-dashboard flex bg-gray-100">
            {/* Sidebar */}
            
            <Sidebar/>
            
            {/* Main Content */}
            <div className="content p-10 w-full mt-20 ml-72 max-md:ml-24">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Fetch Latest News
                    </button>
                    <a href="/Admin/AddNews"><button
                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add News Page
                    </button></a>
                </div>

                {/* Widgets Section */}
                <div className="widgets grid grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">Total News</h3>
                        <p className="text-2xl font-semibold mt-2">120</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">Published</h3>
                        <p className="text-2xl font-semibold mt-2">80</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">Drafts</h3>
                        <p className="text-2xl font-semibold mt-2">40</p>
                    </div>
                </div>

                {/* News Management Section */}
                <h2 className="text-2xl font-semibold mb-4">Last 5 Latest News</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-center">
                            <th className="p-4 text-gray-600 font-semibold w-1/3">Title</th>
                            <th className="p-4 text-gray-600 font-semibold">Category</th>
                            <th className="p-4 text-gray-600 font-semibold">Author</th>
                            <th className="p-4 text-gray-600 font-semibold">Date</th>
                            <th className="p-4 text-gray-600 font-semibold">Time</th>
                            <th className="p-4 text-gray-600 font-semibold">Published</th>
                            <th className="p-4 text-gray-600 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((item) => {
                            const fullDateTime = new Date(`${item.date}T${item.time}`);
                            return(
                            <tr key={item._id} className="border-b text-center">
                                <td className="p-4">{item.title}</td>
                                <td className="p-4">{item.categories}</td>
                                <td className="p-4">{item.author}</td>
                                <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
                                <td className="p-4">{fullDateTime.toLocaleTimeString()}</td>
                                <td className="p-4">
                                    {item.published ? (
                                        <span className="text-green-500 font-semibold">Yes</span>
                                    ) : (
                                        <span className="text-red-500 font-semibold">No</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <Link to={`/Admin/edit/${item._id}`} className="text-blue-500 hover:underline">Edit</Link>
                                </td>
                            </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
                <h2 className="text-2xl font-semibold mb-5 mt-10">Last 5 Published News</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-center">
                            <th className="p-4 text-gray-600 font-semibold w-1/3">Title</th>
                            <th className="p-4 text-gray-600 font-semibold">Category</th>
                            <th className="p-4 text-gray-600 font-semibold">Author</th>
                            <th className="p-4 text-gray-600 font-semibold">Date</th>
                            <th className="p-4 text-gray-600 font-semibold">Time</th>
                            <th className="p-4 text-gray-600 font-semibold">Published</th>
                            <th className="p-4 text-gray-600 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publishedNews.map((item) => {
                            return(
                            <tr key={item._id} className="border-b text-center">
                                <td className="p-4">{item.title}</td>
                                <td className="p-4">{item.categories}</td>
                                <td className="p-4">{item.author}</td>
                                <td className="p-4">{item.date ? new Date(item.date).toLocaleDateString() : new Date(item.publishedAt).toLocaleDateString()}</td>
                                <td className="p-4">{item.time ? item.time : new Date(item.publishedAt).toLocaleTimeString()}</td>
                                <td className="p-4">
                                    {item.published ? (
                                        <span className="text-green-500 font-semibold">Yes</span>
                                    ) : (
                                        <span className="text-red-500 font-semibold">No</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <Link to={`/Admin/edit/${item._id}`} className="text-blue-500 hover:underline">Edit</Link>
                                </td>
                            </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
