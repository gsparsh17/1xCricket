const categories = ['Test', 'T20', 'IPL', 'ODI'];

const matchSchedules = {
    Test: [
        {
            id: 1,
            date: '27-Dec-2023',
            time: '9:30am',
            teams: ['IND', 'ENG'],
            location: 'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium • Visakhapatnam',
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/38881e9362485285e9f269e7809a10fbcde32d2ccb9ab5a9fd0534f09be76d70?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc'
        }
        // Add more test matches here
    ],
    T20: [
        // Add T20 matches here
    ],
    IPL: [
        // Add IPL matches here
    ],
    ODI: [
        // Add ODI matches here
    ]
};
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNewsBar from '../Components/SideNewsBar';


function Schedule() {
  const [selectedCategory, setSelectedCategory] = useState('Test');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

 // State to track the current view

  // Function to render news items based on the current view

  return (
    <div className="flex overflow-hidden flex-col bg-gradient-to-b to-sky-100 from-white bg-fixed pt-20">
  <div className="flex flex-col justify-center items-start px-5 sm:px-8 md:px-16 py-1.5 w-full text-sm font-medium bg-sky-100 text-neutral-400">
    <div className="flex gap-3.5 items-center">
      <div className="self-stretch my-auto">Home</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/09b9ccaa9e9e59b01f338af5479f41295e6a3ac9d83f55841f853e1edc51aa6e?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[24px] sm:w-[30px]"
      />
      <div className="self-stretch my-auto">Match schedule</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/09b9ccaa9e9e59b01f338af5479f41295e6a3ac9d83f55841f853e1edc51aa6e?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[24px] sm:w-[30px]"
      />
      <div className="self-stretch my-auto">Test</div>
    </div>
  </div>

  <div className="flex flex-col md:flex-row px-5 sm:px-8 md:px-20 mt-16 w-full gap-5">
    <div className="w-full md:w-3/4">
      <div className="flex flex-wrap gap-5 items-start text-sm font-medium text-neutral-800 mb-6">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col rounded-3xl w-full md:w-[183px]">
            <button
              onClick={() => handleCategoryClick(category)}
              className={`px-5 py-3 rounded-3xl ${selectedCategory === category ? 'bg-sky-500 text-white' : 'bg-gray-200'}`}
            >
              {category}
            </button>
          </div>
        ))}
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col gap-6">
        {selectedCategory && matchSchedules[selectedCategory] && matchSchedules[selectedCategory].map((match) => (
          <div key={match.id} className="flex flex-col bg-white rounded-3xl shadow-lg p-5 mt-4">
            <div className="text-lg text-neutral-800 mb-4">
              India vs England test match 2024
            </div>
            <div className="flex flex-wrap gap-5 items-center mb-4">
              <div className="flex gap-5 text-4xl sm:text-5xl text-neutral-800">
                <div>{match.teams[0]}</div>
                <div className="text-lg text-neutral-400">Vs</div>
                <div>{match.teams[1]}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-sm text-neutral-400">{match.date}</div>
                <div className="text-xl sm:text-2xl font-medium text-neutral-800 mt-1">{match.time}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center text-sm sm:text-lg text-neutral-400">
              <img
                loading="lazy"
                src={match.image}
                className="w-4 aspect-[0.8] object-contain fill-neutral-800"
                alt="Stadium"
              />
              <div className="max-w-full">
                {match.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <SideNewsBar category={""}/>
  </div>
</div>

  );
}

export default Schedule