import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdsContainer = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ads');
        setAds(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) return <p>Loading ads...</p>;
  if (error) return <p>Error loading ads: {error}</p>;

  return (
    <div className="ads-container">
      {ads.map(ad => (
        <div key={ad.id} className="ad-item">
          <img src={ad.imageUrl} alt={ad.content} className="ad-image" />
          <p className="ad-content">{ad.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AdsContainer;