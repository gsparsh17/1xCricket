import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';

const MediaLibrary = () => {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get('https://onexcricket.onrender.com/api/media');
        setMediaItems(res.data);
      } catch (err) {
        console.error('Failed to fetch media items', err);
      }
    };
    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/media/${id}`);
      setMediaItems(mediaItems.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to delete media item', err);
    }
  };

  return (
    <div className="admin-dashboard flex h-full bg-gray-100">
      <Sidebar/>
      <div className="container mx-auto p-10 mt-20 ml-72 max-md:ml-24">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Media Library
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaItems.map((item) => (
          <div key={item._id} className="relative bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <img 
              src={item.imageUrl} 
              alt="Uploaded" 
              className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">{item.category}</p>
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MediaLibrary;
