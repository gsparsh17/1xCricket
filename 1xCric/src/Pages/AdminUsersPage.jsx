import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users when the component is mounted
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setError('Failed to fetch users');
        }
      } catch (err) {
        setError('Error occurred while fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove user from the list after successful deletion
        setUsers(users.filter(user => user._id !== userId));
      } else {
        setError('Failed to delete user');
      }
    } catch (err) {
      setError('Error occurred while deleting user');
    }
  };

  return (
    <div className="p-6 sm:p-8 sm:pt-32 max-w-4xl mx-auto bg-white shadow-xl rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
  <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Manage Users</h1>
  {error && <p className="text-red-500 text-center mb-4">{error}</p>}
  <div className="overflow-x-auto">
    <table className="w-full border-collapse bg-white">
      <thead className="bg-blue-100 text-gray-700">
        <tr>
          <th className="border px-4 py-3 text-center">Username</th>
          <th className="border px-4 py-3 text-center">Admin</th>
          <th className="border px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {users.map((user) => (
          <tr key={user._id} className="hover:bg-blue-50 transition-all">
            <td className="border px-4 py-3">{user.username}</td>
            <td className="border px-4 py-3">{user.isAdmin ? 'Yes' : 'No'}</td>
            <td className="border px-4 py-3 flex justify-center">
              <button 
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-lg mr-2 transition duration-200"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg transition duration-200"
                onClick={() => navigate(`/Admin/Users/edit/${user._id}`)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className='px-4 py-3 flex justify-center'>
    <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg transition duration-200 m-5"
                onClick={() => navigate(`/Admin/AddUser`)}
              >
                Add User
              </button>
              <button 
                className="bg-red-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg transition duration-200 m-5"
                onClick={() => navigate(`/Admin/Dashboard`)}
              >
                Back
              </button>
              </div>
  </div>
</div>

  );
};

export default AdminUsersPage;
