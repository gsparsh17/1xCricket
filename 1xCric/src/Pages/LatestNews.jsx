import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNewsBar from '../Components/SideNewsBar';
const latestNews = [
    {
      number: 1,
      text: 'Updated standings after MI Cape Town vs Joburg Super Kings, Match',
    },
    {
      number: 2,
      text: 'Top run-getters and wicket-takers after MI Cape Town vs Joburg Super',
    },
    {
      number: 3,
      text: 'Lyon played only a handful of first-class cricket and averaged 40-odd',
    },
    {
      number: 4,
      text: `"It'll be amazing to have a South Africa vs India final" - Keshav`,
    },
    {
      number: 5,
      text: `"Why not play an extra pure batter?" Parthiv Patel on Mohammed Siraj's`,
    },
  ];
  
  const popularNews = [
    // Replace this with actual popular news items
    {
      number: 1,
      text: 'Top trending news item 1',
    },
    {
      number: 2,
      text: 'Top trending news item 2',
    },
    {
      number: 3,
      text: 'Top trending news item 3',
    },
    {
      number: 4,
      text: 'Top trending news item 4',
    },
    {
      number: 5,
      text: 'Top trending news item 5',
    },
  ];

function MainNewsPage() {
    const [news, setNews] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [view, setView] = useState('latest'); // State to track the current view

  // Function to render news items based on the current view
  const renderNewsItems = (newsItems) => (
    newsItems.map((item, index) => (
      <React.Fragment key={index}>
        <div className="flex gap-5 justify-center items-center mt-6">
          <div className="self-stretch my-auto text-5xl text-sky-500 max-md:text-4xl">
            {item.number}
          </div>
          <div className="self-stretch my-auto text-lg leading-6 text-neutral-800 max-w-full">
            {item.text}
          </div>
        </div>
        {index < newsItems.length - 1 && (
          <div className="shrink-0 self-end mt-6 max-w-full h-px bg-stone-300" />
        )}
      </React.Fragment>
    ))
  );

    useEffect(() => {
        fetchNews(currentPage);
        fetchAds();
    }, [currentPage]);

    const [ads, setAds] = useState([]);

    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ads');
        const pageAds = response.data;
        setAds(pageAds);
      } catch (err) {
        console.error('Error fetching ads:', err);
      }
    };

    const fetchNews = async (page) => {
        try {
            const response = await axios.get('http://localhost:5000/api/published-news', {
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
    function limitWords(content, wordLimit) {
        const words = content.split(' '); // Split the text into an array of words
        if (words.length > wordLimit) {
          return words.slice(0, wordLimit).join(' ') + '...'; // Return limited words with ellipsis
        }
        return content; // Return the original content if it's within the word limit
      }

      function decodeHtmlEntities(str) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    }

    return (
      <div>
      {ads.map(ad => (
  ad.category === "Global" && (
    <div key={ad._id} className="relative ad-item rounded-md hover:shadow-xl transition-shadow flex justify-center pt-20 m-auto -mb-20">
      <img src={ad.image} alt={ad.title} className="ad-image w-[780px] h-[90px] object-cover rounded-md" />
      <div className="absolute inset-0 items-end w-[800px] max-md:w-[300px] flex justify-center m-auto">
        <div className="overlay bg-black bg-opacity-25 text-white p-2 rounded-md w-full mx-2 text-center">
          <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ad-title text-lg font-semibold underline"
          >
            {ad.title}
          </a>
        </div>
      </div>
    </div>
     )
     ))}
        <div className="w-full p-5 px-4 sm:px-8 md:px-16 flex flex-col md:flex-row bg-gradient-to-b to-sky-100 from-white bg-fixed">
    <div className='w-full md:w-3/4'>
        <h1 className="text-2xl font-bold mb-5 mt-32 text-center">Today's News</h1>
        <ul>
            {news.map((item) => (
                <li key={item._id} className="p-4 sm:p-6 md:p-8 mb-4 mt-8 shadow-lg rounded-xl bg-white">
                    <div className='flex flex-col md:flex-row'>
                        <div className='w-full md:w-1/3'>
                            {(
                                <img src={item.imageUrl} alt={item.title} className="border-2 border-gray-200 rounded-xl m-2 h-auto w-full" />
                            ) || (
                                <img src={`http://localhost:5000${item.imageUrl}`} alt={item.title} className="border-2 border-gray-200 rounded-xl m-2 h-auto w-full" />
                            )}
                        </div>
                        <div className='w-full md:w-2/3 md:ml-8'>
                            <h3 className="font-semibold leading-tight text-xl sm:text-2xl md:text-3xl text-sky-500 hover:underline"><a href={`/News/${item._id}`}>{decodeHtmlEntities(item.title)}</a></h3>
                            <div className="mt-2 text-sm mb-4" dangerouslySetInnerHTML={{ __html: limitWords(item.gemini_search_result, 50)}} />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        <div className="flex flex-col md:flex-row justify-between mt-10 pb-10">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white py-1 px-3 rounded mb-2 md:mb-0"
            >
                Previous
            </button>
            <span className="text-lg mb-2 md:mb-0 text-center">
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
    <SideNewsBar  category={""}/>
</div>
</div>

    );
}

export default MainNewsPage;
