import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';import Sidebar from '../Components/Sidebar';

function AdminPublished() {
    const [publishedNews, setPublishedNews] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    const fetchNews = async (page) => {
        try {
            const response = await axios.get('http://localhost:5000/api/published-news', {
                params: {
                    page,
                    limit: 10
                }
            });
            setPublishedNews(response.data.news);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
  return (
    <div className="admin-dashboard flex bg-gray-100 h-screen">
    {/* Sidebar */}
    
    <Sidebar/>
    
    {/* Main Content */}
    <div className="content p-10 w-full mt-20 ml-72 max-md:ml-24">
    <h2 className="text-2xl font-semibold mb-5 mt-10">Published News</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-center">
                            <th className="p-4 text-gray-600 font-semibold w-1/3">Title</th>
                            <th className="p-4 text-gray-600 font-semibold">Category</th>
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
  )
}

export default AdminPublished
