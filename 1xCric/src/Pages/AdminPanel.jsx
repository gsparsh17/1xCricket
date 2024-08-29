// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// function AdminNewsPanel() {
//     const [news, setNews] = useState([]);

//     useEffect(() => {
//         fetchAllNews();
//     }, []);

//     const fetchAllNews = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/news');
//             setNews(response.data);
//         } catch (error) {
//             console.error('Error fetching news:', error);
//         }
//     };

//     const handleImageUpload = async (id, event) => {
//         const formData = new FormData();
//         formData.append('image', event.target.files[0]);

//         try {
//             await axios.post(`http://localhost:5000/api/news/${id}/upload-image`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             // Update the UI or fetch news again to reflect changes
//             fetchAllNews();
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//     };

//     const handleEdit = async (id, updatedNewsItem) => {
//         try {
//             await axios.put(`http://localhost:5000/api/news/${id}`, updatedNewsItem);
//             // Update the UI or fetch news again to reflect changes
//             fetchAllNews();
//         } catch (error) {
//             console.error('Error updating news item:', error);
//         }
//     };

//     const handlePublish = async (id) => {
//         try {
//             await axios.post(`http://localhost:5000/api/news/${id}/publish`);
//             // Update the state to reflect the published news
//             fetchAllNews();
//         } catch (error) {
//             console.error('Error publishing news:', error);
//         }
//     };

//     return (
//         <div className="container mx-auto p-5 pt-32">
//             <h1 className="text-2xl font-bold mb-5">Admin News Panel</h1>
//             <div className="grid grid-cols-1 gap-6">
//                 {news.map((item) => (
//                     <div key={item._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
//                         {item.imageUrl && (
//                             <img 
//                                 src={`http://localhost:5000${item.imageUrl}`} 
//                                 alt={item.title} 
//                                 className="w-full h-48 object-cover mb-4 rounded"
//                             />
//                         )}
                        
//                         <span><h1 className='m-4 text-xl font-semibold text-sky-500'>Title:</h1></span><input
//                                 type="text"
//                                 value={item.title}
//                                 onChange={(e) => handleEdit(item._id, { ...item, title: e.target.value })}
//                                 className="w-full text-xl font-bold mb-2 p-2 border rounded"
//                             />
//                             {/* <textarea
//                                 value={item.gemini_search_result}
//                                 onChange={(e) => handleEdit(item._id, { ...item, content: e.target.value })}
//                                 className="w-full h-32 p-2 border rounded"
//                                 rows="4"
//                             /> */}
//                             <span><h1 className='m-4 text-xl font-semibold text-sky-500'>Content:</h1></span><ReactQuill
//                                 value={item.gemini_search_result}
//                                 onChange={(content) => handleEdit(item._id, { ...item, content })}
//                                 className="w-full h-80 pb-12 mb-4 border rounded"
//                                 />
//                         <span><h1 className='m-4 text-xl font-semibold text-sky-500'>Thumbnail:</h1></span>
//                         <div className="flex items-center m-8 justify-between">
//                         <input
//                                 type="file"
//                                 onChange={(e) => handleImageUpload(item._id, e)}
//                                 className="mr-4"
//                             />
//                             {!item.published ? (
//                                 <button 
//                                     onClick={() => handlePublish(item._id)}
//                                     className="bg-blue-500 text-white py-1 px-3 rounded"
//                                 >
//                                     Publish
//                                 </button>
//                             ) : (
//                                 <span className="text-green-500 font-bold">Published</span>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default AdminNewsPanel;

// AdminNewsPanel.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function AdminNewsPanel() {
//     const [news, setNews] = useState([]);

//     useEffect(() => {
//         fetchAllNews();
//     }, []);

//     const fetchAllNews = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/news');
//             setNews(response.data);
//         } catch (error) {
//             console.error('Error fetching news:', error);
//         }
//     };

//     return (
//         <div className="container mx-auto p-5 pt-32">
//             <h1 className="text-2xl font-bold mb-5">Latest News Titles</h1>
//             <ul className="list-disc">
//                 {news.map((item) => (
//                     <li key={item._id} className="mb-4">
//                         <span className="text-xl font-semibold">{item.title}</span>
//                         <Link to={`/edit/${item._id}`} className="ml-4 text-blue-500">Edit</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default AdminNewsPanel;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

function AdminNewsPanel() {
    const [news, setNews] = useState([]);

    // useEffect(() => {
    //     fetchAllNews();
    // }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    const fetchNews = async (page) => {
        try {
            axios.post('http://localhost:5000/api/fetch-and-store-news')
            const response = await axios.get('http://localhost:5000/api/news', {
                params: {
                    page,
                    limit: 10
                }
            });
            setNews(response.data.news);
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
    // const fetchAllNews = async () => {
    //     try {
    //         axios.post('http://localhost:5000/api/fetch-and-store-news')
    //         const response = await axios.get('http://localhost:5000/api/news');
    //         setNews(response.data);
    //     } catch (error) {
    //         console.error('Error fetching news:', error);
    //     }
    // };

    return (
        <div className="admin-dashboard flex bg-gray-100">
            {/* Sidebar */}
            <Sidebar/>
            {/* Main Content */}
            <div className="content bg-gray-100 p-10 mt-20 ml-72 max-md:ml-24 w-full">
            <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Manage News</h1>
                    <button onClick={fetchNews}
                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Fetch Latest News
                    </button>
                    <a href="/Admin/AddNews"><button
                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add News Page
                    </button></a>
                </div>
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
                <div className="flex justify-between mt-5">
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

export default AdminNewsPanel;


