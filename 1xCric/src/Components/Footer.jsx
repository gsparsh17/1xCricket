import React from 'react';

function Footer() {
  return (
    <footer className="z-4 bg-zinc-900 p-10 text-white text-center">
      <div className="flex flex-col items-center max-w-screen-xl w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/270b06e9db1b9f6549ec07851c30654e6ab9dee8a05c10f4703ea3bf18467772?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            className="object-contain max-w-[210px] mb-4 md:mb-0"
          />
          <div className="md:ml-10 text-lg">
            Subscribe now for the latest sports news!
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between w-full mt-8 gap-5">
          <div className="md:w-1/2 text-base">
            Your All-in-One Sports Command Center! Stay Informed with Live
            Scores, Upcoming Matches, Breaking News, Fantasy Tips, In-depth
            Analysis, and Expert Opinions. Your Gateway to Total Sports
            Coverage!
          </div>

          <div className="flex flex-col md:w-1/2 items-center md:items-start">
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full p-3 rounded-full text-neutral-700 outline-none"
              />
              <button className="ml-4 px-6 py-3 font-bold text-white bg-sky-400 rounded-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full mt-8">
          <div className="text-xl font-medium">About Us</div>
          <div className="text-xl font-medium">Follow Us</div>
        </div>

        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/50201b517ac0e3bd38992f0031774cb2147fb2b87bde160eeb430f0458fcbed3?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
          className="object-contain mt-4 w-full max-w-xs"
        />

        <div className="w-full bg-white bg-opacity-40 h-[1px] my-10" />

        <div className="text-xs">
          &copy; 2022 1xCricket. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
