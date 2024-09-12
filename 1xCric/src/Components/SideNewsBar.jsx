import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SideNewsBar({category}) {
  const [view, setView] = useState('latest'); // State to track the current view
  const [latestNews, setLatestNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);

  const fetchLatestNews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/published-news?categories=${category}`, {
        params: {
          category,
            page: 1,
            limit: 5
        }
    });
      setLatestNews(response.data.news.map((item, index) => ({
        number: index + 1,
        text: item.title,
        _id: item._id
      })));
    } catch (error) {
      console.error('Error fetching latest news:', error);
    }
  };

  // Fetch popular news from the API
  const fetchPopularNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/published-news',{
        params: {
            page: 1,
            limit: 5
        }
    });
      setPopularNews(response.data.news.map((item, index) => ({
        number: index + 1,
        text: item.title,
        _id: item._id
      })));
    } catch (error) {
      console.error('Error fetching popular news:', error);
    }
  };

  useEffect(() => {
    fetchLatestNews();
    fetchPopularNews();
    fetchAds();
  }, [category]);
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
  // Function to render news items based on the current view
  const renderNewsItems = (newsItems) =>
    newsItems.map((item, index) => (
      <React.Fragment key={index}>
        <div className="flex gap-5 justify-center items-center mt-6">
          <div className="self-stretch my-auto text-5xl text-sky-500 max-md:text-4xl">
            {item.number}
          </div>
          <div className="self-stretch my-auto text-lg leading-6 text-neutral-800 max-w-full hover:underline">
          <a href={`/News/${item._id}`}>{decodeHtmlEntities(item.text)}</a>
          </div>
        </div>
        {index < newsItems.length - 1 && (
          <div className="shrink-0 self-end mt-6 max-w-full h-px bg-stone-300" />
        )}
      </React.Fragment>
    ));
  // const renderNewsItems = (newsItems) =>
  //   newsItems.map((item, index) => (
  //     <React.Fragment key={index}>
  //       <div className="flex gap-5 justify-center items-center mt-6 px-4 py-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
  //         <div className="self-stretch my-auto text-5xl text-sky-500 max-md:text-4xl">
  //           {item.number}
  //         </div>
  //         <div className="self-stretch my-auto text-lg leading-6 max-w-full hover:underline font-medium">
  //           <a href={`/News/${item._id}`}>{decodeHtmlEntities(item.text)}</a>
  //         </div>
  //       </div>
  //       {index < newsItems.length - 1 && (
  //         <div className="shrink-0 self-end mt-6 max-w-full h-px bg-stone-300" />
  //       )}
  //     </React.Fragment>
  //   ));


    function decodeHtmlEntities(str) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    }

  return (
    <div className='w-full md:w-1/3 mt-2 max-md:mt-0 md:ml-10 mb-5'>
      <div className="flex flex-col max-md:w-full">
        <div className="flex flex-col mt-10 md:mt-24 px-2 sm:px-4 md:px-6">
          <div className="flex flex-col p-8 rounded-3xl bg-white shadow-lg">
            <div className="flex gap-3 sm:gap-5 text-sm rounded-3xl justify-center">
              <div
                className={`px-4 py-2 sm:px-6 sm:py-3 font-bold text-white whitespace-nowrap bg-sky-500 rounded-3xl cursor-pointer ${view === 'latest' ? 'bg-sky-700' : ''}`}
                onClick={() => setView('latest')}
              >
                Latest
              </div>
              <div
                className={`px-4 py-2 sm:px-6 sm:py-3 font-bold text-white whitespace-nowrap bg-sky-500 rounded-3xl cursor-pointer ${view === 'popular' ? 'bg-sky-700' : ''}`}
                onClick={() => setView('popular')}
              >
                Most Popular
              </div>
            </div>

            {view === 'latest' && renderNewsItems(latestNews)}
            {view === 'popular' && renderNewsItems(popularNews)}
          </div>
        </div>
      </div>
      <div className="flex mt-4 m-8">
      {ads.map(ad => (
  ad.category === "Global" && (
    <div key={ad._id} className="ad-item bg-white p-4 shadow-lg rounded-md hover:shadow-xl transition-shadow">
      <img src={ad.image} alt={ad.title} className="ad-image w-full h-40 object-cover rounded-md mb-4" />
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className="ad-title text-blue-600 font-semibold text-lg underline"
      >
        {ad.title}
      </a>
    </div>
     )
     ))}

      </div>
    </div>
//     <div className='w-full md:w-1/3 mt-2 max-md:mt-0 md:ml-10 mb-5'>
//   <div className="flex flex-col max-md:w-full">
//     <div className="flex flex-col mt-10 md:mt-24 px-2 sm:px-4 md:px-6">
//       <div className="flex flex-col p-8 rounded-3xl bg-gray-800 shadow-xl">
//         {/* Tab Buttons */}
//         <div className="flex gap-3 sm:gap-5 text-sm rounded-3xl justify-center">
//           <div
//             className={`px-4 py-2 sm:px-6 sm:py-3 font-bold text-yellow-400 whitespace-nowrap bg-gray-700 rounded-3xl cursor-pointer transition-colors duration-300 ${view === 'latest' ? 'bg-yellow-500 text-gray-900' : 'hover:bg-gray-600 hover:text-yellow-300'}`}
//             onClick={() => setView('latest')}
//           >
//             Latest
//           </div>
//           <div
//             className={`px-4 py-2 sm:px-6 sm:py-3 font-bold text-yellow-400 whitespace-nowrap bg-gray-700 rounded-3xl cursor-pointer transition-colors duration-300 ${view === 'popular' ? 'bg-yellow-500 text-gray-900' : 'hover:bg-gray-600 hover:text-yellow-300'}`}
//             onClick={() => setView('popular')}
//           >
//             Most Popular
//           </div>
//         </div>

//         {/* News Content */}
//         <div className="mt-6">
//           {view === 'latest' && renderNewsItems(latestNews)}
//           {view === 'popular' && renderNewsItems(popularNews)}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

  );
}

export default SideNewsBar;
