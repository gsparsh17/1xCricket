import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, isAdmin }),
      });

      if (response.ok) {
        setSuccess('User added successfully');
        navigate('/Admin/Users'); // Redirect to a user list or dashboard after successful addition
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.error}`);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-6 sm:p-8 sm:pt-32 max-w-xl mx-auto bg-white shadow-lg rounded-lg transform transition-all hover:scale-105 duration-300">
  <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Add New User</h1>
  {error && <p className="text-red-500 text-center mb-4">{error}</p>}
  {success && <p className="text-green-500 text-center mb-4">{success}</p>}
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
        checked={isAdmin}
        onChange={(e) => setIsAdmin(e.target.checked)}
      />
      <label className="text-gray-700">Admin</label>
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition duration-200"
    >
      Add User
    </button>
  </form>
</div>

  );
};

export default AddUser;
