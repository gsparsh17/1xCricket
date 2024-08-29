import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNewsBar from '../Components/SideNewsBar';

function Schedule() {
  const [selectedCategory, setSelectedCategory] = useState('Test');
  const [matchSchedules, setMatchSchedules] = useState({
    Test: [],
    T20: [],
    IPL: [],
    ODI: []
  });

  const parseDate = (match_time) => {
    const [datePart, , timePart] = match_time.split(', ');
    const [day, month, year] = datePart.split(' ');
    const cleanedTimePart = timePart.replace(' IST', '');
    return new Date(`${day} ${month} ${year} ${cleanedTimePart}`);
  };

  useEffect(() => {
    // Fetch data from API
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://cricapi2.onrender.com/api/upcoming-matches');
        const matches = response.data;

        // Parse and organize matches into categories
        const updatedSchedules = {
          Test: [],
          T20: [],
          IPL: [],
          ODI: []
        };
        
        

        matches.forEach(match => {
          const { match_type, teams, match_time, location } = match;
          console.log(parseDate(match_time))
          const formattedMatch = {
            id: match._id,
            date: parseDate(match_time).toLocaleDateString(),
            time: parseDate(match_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: undefined }),
            teams: [teams[0].name, teams[1].name],
            location: location,
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/38881e9362485285e9f269e7809a10fbcde32d2ccb9ab5a9fd0534f09be76d70?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc'
          };

          // Organize match types into respective categories
          if (match_type.includes('test')) {
            updatedSchedules.Test.push(formattedMatch);
          } else if (match_type.includes('t20')) {
            updatedSchedules.T20.push(formattedMatch);
          } else if (match_type.includes('ipl')) {
            updatedSchedules.IPL.push(formattedMatch);
          } else if (match_type.includes('odi')) {
            updatedSchedules.ODI.push(formattedMatch);
          }
        });

        setMatchSchedules(updatedSchedules);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatches();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex overflow-hidden flex-col bg-gradient-to-b to-sky-100 from-white bg-fixed pt-20">
  {/* Top Bar */}
  <div className="flex flex-col justify-center items-start px-5 sm:px-8 md:px-16 py-1.5 w-full text-sm font-medium bg-sky-100 text-neutral-400">
    <div className="flex gap-3.5 items-center flex-wrap">
      <div className="self-stretch my-auto">Home</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/09b9ccaa9e9e59b01f338af5479f41295e6a3ac9d83f55841f853e1edc51aa6e?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
        className="object-contain shrink-0 aspect-square w-[20px] sm:w-[24px]"
      />
      <div className="self-stretch my-auto">Match schedule</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/09b9ccaa9e9e59b01f338af5479f41295e6a3ac9d83f55841f853e1edc51aa6e?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
        className="object-contain shrink-0 aspect-square w-[20px] sm:w-[24px]"
      />
      <div className="self-stretch my-auto">{selectedCategory}</div>
    </div>
  </div>

  {/* Main Content */}
  <div className="flex flex-col md:flex-row px-5 sm:px-8 md:px-20 mt-16 mb-8 w-full gap-5">
        <div className="w-full md:w-3/4">
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 justify-start items-start text-sm font-medium text-neutral-800 mb-6">
        {Object.keys(matchSchedules).map((category, index) => (
          <div key={index} className="flex flex-col rounded-3xl w-full md:w-auto">
            <button
              onClick={() => handleCategoryClick(category)}
              className={`px-5 py-2 md:py-3 rounded-3xl text-xs md:text-sm ${selectedCategory === category ? 'bg-sky-500 text-white' : 'bg-gray-200'}`}
            >
              {category}
            </button>
          </div>
        ))}
      </div>

      {/* Match Cards */}
      <div className="flex flex-col gap-6">
        {selectedCategory && matchSchedules[selectedCategory] && matchSchedules[selectedCategory].map((match) => (
          <div key={match.id} className="flex flex-col bg-white rounded-3xl shadow-lg p-8 mt-4">
            <div className="md:text-lg text-sm text-neutral-800 mb-4">
              {`${match.teams[0]} vs ${match.teams[1]} ${selectedCategory} match`}
            </div>
            <div className="flex flex-wrap justify-between gap-5 items-center mb-4">
              <div className="flex gap-5 text-xl sm:text-4xl md:text-5xl text-neutral-800">
                <div>{match.teams[0]}</div>
                <div className="text-lg text-neutral-400">Vs</div>
                <div>{match.teams[1]}</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-sm md:text-lg text-neutral-400">{match.date}</div>
                <div className="text-xl sm:text-2xl font-medium text-neutral-800 mt-1">{match.time}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center text-sm sm:text-lg text-neutral-400">
              <img
                loading="lazy"
                src={match.image}
                className="w-6 md:w-8 object-contain"
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
    {/* Sidebar */}
      <SideNewsBar category={""} />
  </div>
</div>

  );
}

export default Schedule;
