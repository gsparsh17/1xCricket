import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';

const AdminAdsManager = () => {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({ image:'', link: '', title: '', category: 'Global' });
  const [editAd, setEditAd] = useState(null);
  const categories = ['Global', 'Cricket', 'Football', 'Tennis', 'Basketball', 'HomeAdSection1', 'HomeAdSection2', 'Announcement']; // Add all categories here

  // Fetch all ads
  const fetchAds = async () => {
    try {
      const response = await axios.get('https://onexcricket.onrender.com/api/ads');
      setAds(response.data);
    } catch (err) {
      console.error('Error fetching ads:', err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewAd({ ...newAd, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const apiUrl = editAd ? `https://onexcricket.onrender.com/api/ads/${editAd._id}/upload-image` : `https://onexcricket.onrender.com/api/ads/upload-image`;

      const response = await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewAd((prevAd) => ({ ...prevAd, image: response.data.image }));
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  // Handle form submit for creating or editing an ad
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editAd) {
        await axios.put(`https://onexcricket.onrender.com/api/ads/${editAd.id}`, newAd);
      } else {
        await axios.post('https://onexcricket.onrender.com/api/ads', newAd);
      }
      setNewAd({ image:'', link: '', title: '', category: 'Global' });
      setEditAd(null);
      fetchAds();
    } catch (err) {
      console.error('Error saving ad:', err);
    }
  };

  // Handle edit action
  const handleEdit = (ad) => {
    setNewAd(ad);
    setEditAd(ad);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://onexcricket.onrender.com/api/ads/${id}`);
      fetchAds();
    } catch (err) {
      console.error('Error deleting ad:', err);
    }
  };

  return (
    <div className="admin-dashboard flex h-full bg-gray-100">
      <Sidebar />
      <div className="container mx-auto p-10 mt-20 ml-72 max-md:ml-24">
        <h1 className="text-3xl font-bold mb-6 text-center">Ads Management</h1>

        {/* New Ad Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-2xl font-semibold mb-4">{editAd ? 'Edit Ad' : 'Create New Ad'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="link"
              value={newAd.link}
              onChange={handleChange}
              placeholder="Ad Link"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="title"
              value={newAd.title}
              onChange={handleChange}
              placeholder="Ad Title"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <select
              name="category"
              value={newAd.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              {editAd ? 'Update Ad' : 'Add Ad'}
            </button>
          </form>
        </div>

        {/* Existing Ads */}
        <h2 className="text-2xl font-semibold mb-4">Existing Ads</h2>
        <ul className="space-y-6">
          {ads.map((ad) => (
            <li key={ad._id} className="bg-white p-6 rounded-lg shadow-md">
              <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover rounded-md mb-4" />
              <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {ad.title}
              </a>
              <p className="text-gray-500">{ad.category}</p>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleEdit(ad)}
                  className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ad._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAdsManager;
