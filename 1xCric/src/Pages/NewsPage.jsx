import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SideNewsBar from '../Components/SideNewsBar';

function MainNewsPage() {
    const { id } = useParams(); // Get the news ID from the URL
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://onexcricket.onrender.com/api/published-news/${id}`);
                setNewsItem(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [id]);

    if (!newsItem) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-5 flex flex-col md:flex-row">
    <div className="shadow-md mt-28 px-5 rounded-xl pb-5 w-full md:w-2/3">
        <h1 className="text-3xl md:text-5xl font-semibold text-sky-400 mb-6 md:mb-10 mt-5 text-">
            {newsItem.title}
        </h1>
        <div className="w-full mb-6 md:mb-10">
            <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="border-2 border-gray-200 rounded-xl m-auto h-auto w-full"
            />
        </div>
        <div className="mt-4 text-lg md:text-xl mb-4" dangerouslySetInnerHTML={{ __html: newsItem.gemini_search_result }} />
        <p className="text-sm text-gray-500">
            Published on {new Date(newsItem.publishedAt).toLocaleDateString()} at {newsItem.time}
        </p>
    </div>
    <SideNewsBar category={""}/>
</div>
    );
}

export default MainNewsPage;
