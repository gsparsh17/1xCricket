import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNewsBar from "./SideNewsBar";

const CategoryNewsSection = ({ category }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNewsByCategory();
    }, [category]);

    const fetchNewsByCategory = async () => {
        try {
            const response = await axios.get(`https://onexcricket.onrender.com/api/published-news?categories=${category}`, {
                params: { category, limit: 4 },
            });
            setNews(response.data.news);
        } catch (error) {
            console.error(`Error fetching ${category} news:`, error);
        }
    };
    function decodeHtmlEntities(str) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    }

    return (
        <div className="w-full p-5 md:py-20 -px-4 sm:px-8 md:px-12 flex flex-col md:flex-row">
            
  <div className='w-full md:w-3/4 md:pl-8'>
  <div className="flex justify-between w-full max-w-screen-xl px-4 md:mb-20 mb-12">
    <h2 className="text-5xl font-bold italic text-black tracking-wide max-md:text-3xl">
      {category}
    </h2>
    <a href={`/Category/${category}`} className="flex items-center text-sky-400 font-semibold hover:text-sky-600 transition-colors">
      View all
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7244d132091bd40c5262b34529cd84b16956acb939c99e7513840b2ded59649?apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
        alt="View all"
        className="ml-2 w-6 h-6"
      />
    </a>
  </div>
    <ul>
      {news.map((item, index) => (
        <li key={item._id} className="mb-8">
          {/* For the first news item (index 0), render a larger card */}
          {index === 0 ? (
            <div className="relative flex md:flex-row flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl duration-300 overflow-hidden transform hover:-translate-y-2 hover:scale-105 transition-transform mb-8">
              {/* News Image */}
              <div className="relative h-72 overflow-hidden rounded-t-xl">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* News Content */}
              <div className="p-8 bg-white">
                <h3 className="text-3xl font-bold text-sky-500 hover:underline mb-4 transition-colors duration-200">
                  <a href={`/News/${item._id}`}>{decodeHtmlEntities(item.title)}</a>
                </h3>
                <a href={`/News/${item._id}`} className="text-sm text-sky-400 font-semibold hover:underline">
                  Read more
                </a>
              </div>
            </div>
          ) : (
            // For the next three news items, render them in a row
            index <= 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {news.slice(1, 4).map((item) => (
                  <div key={item._id} className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl duration-300 overflow-hidden transform hover:-translate-y-2 hover:scale-105 transition-transform">
                    {/* News Image */}
                    <div className="relative h-56 overflow-hidden rounded-t-xl">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    {/* News Content */}
                    <div className="p-6 bg-white h-full">
                      <h3 className="text-xl font-bold text-sky-500 hover:underline mb-2 transition-colors duration-200">
                        <a href={`/News/${item._id}`}>{decodeHtmlEntities(item.title)}</a>
                      </h3>
                      <a href={`/News/${item._id}`} className="text-sm text-sky-400 font-semibold hover:underline">
                        Read more
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </li>
      ))}
    </ul>
  </div>
  <SideNewsBar category={category}/>
</div>


//         <section className="flex flex-col items-center justify-center py-20 max-md:py-10 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
//   {/* Heading and View All Button */}
//   <div className="flex justify-between w-full max-w-screen-xl px-4 mb-12 items-center">
//     <h2 className="text-5xl font-bold tracking-wider text-yellow-400 max-md:text-3xl uppercase">
//       {category}
//     </h2>
//     <a
//       href={`/Category/${category}`}
//       className="flex items-center text-yellow-400 font-semibold hover:text-yellow-300 transition-colors duration-300"
//     >
//       View all
//       <img
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7244d132091bd40c5262b34529cd84b16956acb939c99e7513840b2ded59649?apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
//         alt="View all"
//         className="ml-2 w-6 h-6 transition-transform hover:rotate-90"
//       />
//     </a>
//   </div>

//   {/* News Cards Section */}
//   <div className="w-full p-5 px-4 sm:px-8 md:px-16 flex flex-col md:flex-row">
//     <div className="w-full md:w-3/4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl w-full px-4">
//         {news.map((item) => (
//           <div
//             key={item._id}
//             className="relative bg-gray-800 rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
//           >
//             {/* News Image */}
//             <div className="relative h-80 overflow-hidden rounded-t-3xl">
//               <img
//                 src={item.imageUrl}
//                 alt={item.title}
//                 className="object-cover w-full h-full opacity-90 transition-opacity duration-300 hover:opacity-100"
//               />
//             </div>

//             {/* Overlay Effect */}
//             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-40 hover:opacity-60 transition-opacity duration-300"></div>

//             {/* News Title */}
//             <div className="absolute bottom-0 left-0 p-6 w-full bg-black bg-opacity-70 text-yellow-400">
//               <h3 className="text-xl font-bold truncate">
//                 <a href={`/News/${item._id}`} className="hover:text-yellow-300">
//                   {decodeHtmlEntities(item.title)}
//                 </a>
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     <SideNewsBar category={category} />
//   </div>
// </section>

    );
};

export default CategoryNewsSection;
