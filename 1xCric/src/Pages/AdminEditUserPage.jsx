import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEditUserPage = () => {
  const { id } = useParams(); // get user id from the URL
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user data
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.username);
          setIsAdmin(userData.isAdmin);
        } else {
          setError('Failed to fetch user');
        }
      } catch (err) {
        setError('Error occurred while fetching user data');
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, isAdmin }),
      });

      if (response.ok) {
        setSuccess('User updated successfully');
        navigate('/Admin/Users'); // Redirect back to users list
      } else {
        const errorMessage = await response.text();
        setError(`Error: ${errorMessage}`);
      }
    } catch (err) {
      setError('An error occurred while updating the user');
    }
  };

  return (
    <div className="p-6 sm:p-8 sm:pt-40 max-w-lg mx-auto bg-white shadow-xl rounded-lg transition duration-500 ease-in-out transform hover:scale-105">
  <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Edit User</h1>
  {error && <p className="text-red-500 text-center mb-4">{error}</p>}
  {success && <p className="text-green-500 text-center mb-4">{success}</p>}
  <form onSubmit={handleSubmit}>
    <div className="mb-6">
      <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 mb-2" htmlFor="password">Password (optional)</label>
      <input
        type="password"
        id="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Leave blank to keep current password"
      />
    </div>
    <div className="mb-6">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        <span className="text-gray-700">Admin</span>
      </label>
    </div>
    <button
      type="submit"
      className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
    >
      Update User
    </button>
  </form>
</div>

  );
};

export default AdminEditUserPage;
