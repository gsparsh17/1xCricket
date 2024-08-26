import React from 'react';

function About() {
  return (
    <section className="bg-white pt-20 overflow-hidden">
      <div className="bg-sky-100 text-neutral-400 px-16 py-2 text-sm font-medium flex items-center gap-4 max-md:px-5">
        <span>Home</span>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/09b9ccaa9e9e59b01f338af5479f41295e6a3ac9d83f55841f853e1edc51aa6e?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
          alt="Arrow"
          className="w-[30px] aspect-square"
        />
        <span>About us</span>
      </div>

      <h1 className="text-neutral-800 text-6xl mt-6 text-center max-md:text-4xl">
        About Us
      </h1>

      <div className="max-w-screen-xl mx-auto px-8 py-12 mt-14 text-neutral-800 text-center rounded-3xl max-md:px-5">
        <div className="text-2xl flex items-center justify-center gap-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/73ee69dca182058b4e4896a9b62336a5f89866b29a93fe1737760b484592729f?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            alt="Who are we?"
            className="w-6"
          />
          <span>Who are we?</span>
        </div>

        <p className="mt-10 text-lg leading-7 text-neutral-400">
          1xCricket.com is the best place to go if you want to keep up with the latest cricket news. Stay connected with real-time scores, player and team rankings, match schedules, and statistics from previous games. We bring you comprehensive coverage of cricketing stories, news, images, videos, fixtures, rankings, and scores to keep you immersed in the game.
        </p>
      </div>

      <div className="bg-zinc-100 py-16 mt-20">
        <div className="bg-white max-w-screen-xl mx-auto px-9 py-12 rounded-3xl text-center max-md:px-5">
          <div className="text-2xl flex items-center justify-center gap-4">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ddc9ecc910afe3ae9b8c4532076520bea1e73bb76b8ab97d170d904ad6329f65?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
              alt="When did we begin?"
              className="w-6"
            />
            <span>When did 1xCricket Begin?</span>
          </div>

          <p className="mt-10 text-lg leading-7 text-neutral-400">
            1xCricket debuted in 2021 during the pandemic. Despite the halt in cricket, the passion for the game drove us to launch. Today, it is one of the most popular sports platforms, offering cricket news, reports, analysis, data, and opinions.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 py-12 mt-20 text-center rounded-3xl max-md:px-5">
        <div className="text-2xl flex items-center justify-center gap-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/021d0d7686a96ed1ea4f5af8fc3c74cd8f703b3ff5b7aea61a802c04e18fa206?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            alt="Core beliefs"
            className="w-8"
          />
          <span>What are Our Core Beliefs?</span>
        </div>

        <p className="mt-10 text-lg leading-7 text-neutral-400">
          Our commitment is to clarity, objectivity, and showcasing budding sports journalists. We aim to bring the essence of cricket through a culture of fair play.
        </p>
      </div>
    </section>
  );
}

export default About;
