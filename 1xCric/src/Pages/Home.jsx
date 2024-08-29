import pic1 from "../images/pic (1).png"
import pic2 from "../images/pic (2).png"
import * as React from "react";
import './Home.css'
import { motion } from 'framer-motion'
import CategorySection from "../Components/CategorySection";
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const FeatureCard = ({ imgSrc, text }) => (
    <div className="flex gap-2 items-center px-5 py-2 bg-gray-100 rounded-lg">
      <img
        loading="lazy"
        src={imgSrc}
        className="w-6 h-6 object-contain"
        alt={text}
      />
      <span>{text}</span>
    </div>
  );
  window.addEventListener('scroll', function() {
    var myDiv = document.getElementById('myDiv');
    var icon = document.getElementById('icon');
    if (window.scrollY > 20) {
        if(screen.width > 500){
        myDiv.style.backgroundColor = 'rgba(24,24,27,0.6)';
        icon.style.display = 'none';
        }
    } 
    if (window.scrollY < 20) {
      myDiv.style.backgroundColor = 'transparent';
      if(screen.width < 500){
        myDiv.style.backgroundColor = 'rgba(24,24,27,1)';
        }
  }
  if (window.scrollY > 500) {
    myDiv.style.backgroundColor = 'rgba(24,24,27,1)';
    icon.style.display = 'block';
}
});

const [news, setNews] = useState([]);

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
useEffect(() => {
  // Define an async function inside the effect
  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/published-news', {
        params: {
          page: 1,
          limit: 10
        }
      });
      setNews(response.data.news);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };
  fetchNews();
  fetchAds();
}, []);

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
    <div className="z-40 flex overflow-hidden flex-col bg-gradient-to-b to-sky-100 from-white bg-fixed">
      

  <div className="up h-screen max-md:h-0">
  {ads.map(ad => (
  ad.category === "Global" && (
    <div key={ad._id} className="relative ad-item shadow-lg rounded-md hover:shadow-xl transition-shadow md:mt-24 mt-16 flex justify-center m-auto">
      <img src={ad.image} alt={ad.title} className="ad-image w-[780px] h-[90px] object-cover rounded-md" />
      <div className="absolute inset-0 items-end w-[800px] flex justify-center m-auto">
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

      <div className="flex justify-between gap-2 p-8 px-[4vw] w-full md:pt-[2vw] pt-[] max-md:hidden">
        <motion.div initial={{x:"-50%", opacity:0, width:"10%"}} animate={{x: "0%", opacity:20, width:"20%"}} transition={ {ease: "linear", duration: 0.7}}><img className="w-60" src={pic2} alt="" /></motion.div>
        <motion.div className='w-[740px] px-12 mt-16'  initial={{opacity:0}} animate={{opacity:10}} transition={ {ease: "linear", duration: 0.7, delay:1.4}}>
            <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/270b06e9db1b9f6549ec07851c30654e6ab9dee8a05c10f4703ea3bf18467772?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            className="drop-shadow-[2px_5px_5px_rgba(0,0,0,1)] object-contain shrink-0 self-start max-w-full aspect-[10] w-[500px] mx-auto"
          />
          <h1 className='drop-shadow-[2px_2px_2px_rgba(0,0,0,1)] text-white mt-12 text-[1.7vw] max-md:-mt-20 leading-[1.8vw] font-extralight text-center'>Your All-in-One Sports Command Center Stay Informed with Live Scores, Upcoming Matches, Breaking News, Fantasy Tips, In-depth Analysis, and Expert Opinions Your Gateway to Total Sports Coverage!</h1>
          
        </motion.div>
        <motion.div initial={{x:"50%", opacity:0}} animate={{x:"0%", opacity:10}} transition={ {ease: "linear", duration: 0.7, delay:0.7}}><img className="w-60" src={pic1} alt="" /></motion.div>
        </div>
        <div className="flex flex-col md:-mt-5 -mt-10 justify-center md:py-4 w-full md:text-base text-sm md:font-medium text-sky-400 max-md:max-w-full max-md:bg-zinc-900 max-md:pt-12">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          ease: "linear",
          repeat: Infinity,
          duration: 50,
        }}
        className="flex gap-5 items-center max-md:max-w-full max-md:mb-4 max-md:mt-8"
      >
        {news.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 items-center px-3 py-3 bg-white bg-opacity-10 rounded-[46px] max-md:px-3"
          >{item.imageUrl ? (
            <img
    src={item.imageUrl}
    alt={item.title}
    className="md:w-16 w-12 rounded-full aspect-square"/>
) : (
  <img
    src={`http://localhost:5000${item.imageUrl}`}
    alt={item.title}
    className="shrink-0 self-stretch md:w-14 w-8 rounded-full aspect-square"/>)}
            <div className="w-[275px] hover:underline"><a href={`/News/${item._id}`}>{limitWords(decodeHtmlEntities(item.title), 7)}</a></div>
          </div>
        ))}
      </motion.div>
    </div>
      </div>
      <div className="mt-0 max-md:mt-44">
      <CategorySection category="Cricket" />
      </div>
      <div className="px-20 py-20 w-full up max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-8 py-8 w-full bg-white rounded-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6a98ea9947af457fad4a11e9657fa40f24b5c858990d2aa50bc3187ecab8b1a8?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a98ea9947af457fad4a11e9657fa40f24b5c858990d2aa50bc3187ecab8b1a8?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a98ea9947af457fad4a11e9657fa40f24b5c858990d2aa50bc3187ecab8b1a8?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a98ea9947af457fad4a11e9657fa40f24b5c858990d2aa50bc3187ecab8b1a8?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a98ea9947af457fad4a11e9657fa40f24b5c858990d2aa50bc3187ecab8b1a8?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a98ea9947af457fad4a11e9657fa40f24b5c858990d2aa50bc3187ecab8b1a8?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a98ea9947af457fad4a11e9657fa40f24b5c858990d2aa50bc3187ecab8b1a8?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6a98ea9947af457fad4a11e9657fa40f24b5c858990d2aa50bc3187ecab8b1a8?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
                className="object-contain w-full rounded-2xl aspect-[2.39] max-md:max-w-full"
              />
              <div className="mt-6 text-lg leading-6 text-neutral-400 max-md:max-w-full">
                In the heart of every cricket enthusiast lies a deep-seated
                passion for the game that transcends generations. It's a sport
                that has evolved over centuries, blending tradition with
                innovation to create an unparalleled spectacle. Our latest
                cricket ad, &quot;Cricket Fusion,&quot; celebrates this unique
                blend, bringing together the timeless charm of cricket's
                heritage.
              </div>
              <div className="self-start px-9 py-3 mt-7 text-sm font-bold text-white bg-sky-400 rounded-3xl max-md:px-5">
                View Now
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow p-8 w-full text-lg font-bold text-white whitespace-nowrap rounded-2xl max-md:px-5 max-md:mt-10">
              <div className="flex relative flex-col px-4 pt-72 pb-4 rounded-xl aspect-[0.945] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e80e28f9d29a91fcd4094c8e10f67c95cee33ad5247312562a77e1f47e19fd46?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e80e28f9d29a91fcd4094c8e10f67c95cee33ad5247312562a77e1f47e19fd46?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e80e28f9d29a91fcd4094c8e10f67c95cee33ad5247312562a77e1f47e19fd46?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e80e28f9d29a91fcd4094c8e10f67c95cee33ad5247312562a77e1f47e19fd46?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e80e28f9d29a91fcd4094c8e10f67c95cee33ad5247312562a77e1f47e19fd46?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e80e28f9d29a91fcd4094c8e10f67c95cee33ad5247312562a77e1f47e19fd46?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e80e28f9d29a91fcd4094c8e10f67c95cee33ad5247312562a77e1f47e19fd46?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e80e28f9d29a91fcd4094c8e10f67c95cee33ad5247312562a77e1f47e19fd46?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="relative px-16 py-4 rounded-xl bg-black bg-opacity-50 max-md:px-5">
                  Ad
                </div>
              </div>
              <div className="flex relative flex-col px-4 pt-12 pb-4 mt-7 rounded-xl aspect-[2.858]">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9bc812203e5dbded880b5c4d30c8e4d4d655374d499407eae9d37a3d9c336063?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9bc812203e5dbded880b5c4d30c8e4d4d655374d499407eae9d37a3d9c336063?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9bc812203e5dbded880b5c4d30c8e4d4d655374d499407eae9d37a3d9c336063?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9bc812203e5dbded880b5c4d30c8e4d4d655374d499407eae9d37a3d9c336063?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9bc812203e5dbded880b5c4d30c8e4d4d655374d499407eae9d37a3d9c336063?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9bc812203e5dbded880b5c4d30c8e4d4d655374d499407eae9d37a3d9c336063?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9bc812203e5dbded880b5c4d30c8e4d4d655374d499407eae9d37a3d9c336063?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9bc812203e5dbded880b5c4d30c8e4d4d655374d499407eae9d37a3d9c336063?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="relative px-16 py-4 rounded-xl bg-black bg-opacity-50 max-md:px-5">
                  Ad
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CategorySection category={"Fantasy Cricket"}/>
      <div className="flex flex-col justify-center py-9 w-full text-xl font-medium bg-zinc-900 text-white max-md:max-w-full">
      <motion.div 
  initial={{ x: 0 }} 
  animate={{ x: "-100%" }} 
  transition={{ ease: "linear", repeat: Infinity, duration: 30 }} 
  className="flex items-center whitespace-nowrap gap-5 max-md:max-w-full"
>
  {["Fantasy Cricket", "News", "Betting", "Test Cricket", "T20 Cricket", "Learn", "IPL", "Archives", "Cricket", "Featured", "Latest News", "Match Prediction", "Women's Cricket"].map((category) => (
    <div key={category} className="px-6 py-3  bg-opacity-20 text-center rounded-full m-2 w-auto max-md:px-5">
      <a href={`/Category/${category}`} className="hover:text-sky-400">{category}</a>
    </div>
  ))}
</motion.div>
      </div>
      <div className="bg-zinc-900 p-4 sm:p-8 lg:p-16">
      <section className="flex flex-col items-center px-4 py-8 bg-white text-center text-neutral-800 rounded-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl lowercase leading-tight mb-12 sm:mb-16">
          <span className="uppercase">O</span>ur Exclusive Features That Make Us Your Go-To Sports News Platform!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 sm:mb-24">
          <FeatureCard
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/67c62ff89c65ad2539eff9156470996b2400673c613dc813b48a8387b247989b?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            text="Expert Analysis"
          />
          <FeatureCard
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/10ee74e8c3656d9c128ab8b4ee6e5b94498334545a94de6ceef9ab47a4700264?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            text="Deep Insights"
          />
          <FeatureCard
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/b35797fdcdc5dfdc807ac97fb3e66b22b4abd8424e22e5c4fd7e5ae16f459a0e?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            text="20+ Categories"
          />
          <FeatureCard
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/a01b1910c6b98641eecbd542029282146b4790e46d9069abdac44c6f366690ba?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            text="Anytime, Anywhere"
          />
          <FeatureCard
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/2485841e955d88121727971f3aeeaa3a792b18c6afb0896b5f1995e854b1fb34?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            text="Instant Updates"
          />
          <FeatureCard
            imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c9d705d797218f0b8ef3a28b0653e0b6899e94a1f94f6ecda35f3e31e386d72d?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            text="Real-time Feed"
          />
        </div>

        <div className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">
          Subscribe now for the latest sports news
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 py-3 rounded-3xl text-zinc-500 border border-neutral-300"
          />
          <button className="px-6 py-3 font-bold text-white bg-sky-400 rounded-3xl">
            Subscribe
          </button>
        </div>
      </section>
    </div>
      <CategorySection category={"Women's Cricket"}/>
      <div className="flex flex-col justify-center px-20 py-10 w-full bg-white text-white font-semibold drop-shadow-md max-md:px-5 max-md:mt-10">
  <div className="flex flex-col items-center px-20 py-8 rounded-2xl max-md:px-5">
    <h1 className="text-6xl font-semibold text-center text-black drop-shadow-lg max-md:text-4xl mb-8">
      Popular Categories
    </h1>
    
    <div className="flex flex-wrap justify-center mt-14 text-xl max-md:mt-10">
      {["Fantasy Cricket", "News", "Betting", "Test Cricket", "T20 Cricket", "Learn", "IPL"].map((category) => (
        <div key={category} className="px-6 py-3 bg-black hover:bg-sky-400 text-white rounded-full m-2 min-h-[40px]">
          <a href={`/Category/${category}`}>{category}</a>
        </div>
      ))}
    </div>
    
    <div className="flex flex-wrap justify-center mt-6 text-xl">
      {["Archives", "Cricket", "Featured", "Latest News", "Match Prediction", "Women's Cricket"].map((category) => (
        <div key={category} className="px-6 py-3 bg-black hover:bg-sky-400 text-white rounded-full m-2 min-h-[40px]">
          <a href={`/Category/${category}`}>{category}</a>
        </div>
      ))}
    </div>
  </div>
      </div>
    </div>
  );
}

export default Home
