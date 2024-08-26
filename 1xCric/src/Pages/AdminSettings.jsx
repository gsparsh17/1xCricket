import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';

function SEOSettings() {
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');

    const handleSave = () => {
        // API call to save SEO settings
        const seoData = {
            metaTitle,
            metaDescription,
            metaKeywords
        };
        console.log('SEO Settings Saved:', seoData);
        // Call your backend API here to save the data
    };

    return (
        <div className="admin-dashboard flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar/>
        <div className="container mx-auto p-10 mt-20 ml-72 max-md:ml-24">
            <h1 className="text-3xl font-bold mb-5">SEO On-Page Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <label className="block text-lg font-semibold mb-2">Meta Title:</label>
                <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    placeholder="Enter Meta Title"
                />
                
                <label className="block text-lg font-semibold mb-2">Meta Description:</label>
                <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full h-24 mb-4 p-2 border rounded"
                    placeholder="Enter Meta Description"
                />
                
                <label className="block text-lg font-semibold mb-2">Meta Keywords:</label>
                <input
                    type="text"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    placeholder="Enter Meta Keywords (comma-separated)"
                />

                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Save Settings
                </button>
            </div>
        </div>
        </div>
    );
}

export default SEOSettings;
