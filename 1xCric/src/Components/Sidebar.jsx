import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/authService';


function Sidebar() {
    const handleLogout = () => {
        logout();
        window.location.href = '/Login';
      };
  return (
    <div className="sidebar bg-gray-800 text-white p-8 w-1/5 h-screen text-center mt-20 flex flex-col fixed">
                <h2 className="text-3xl font-bold mb-8">Admin Panel</h2>
                <ul>
                    <li className="mb-4">
                        <Link to="/Admin/Dashboard" className="text-xl hover:text-gray-300">Dashboard</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/Admin" className="text-xl hover:text-gray-300">Manage Latest News</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/Admin/Published" className="text-xl hover:text-gray-300">Published News</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/Admin/Settings" className="text-xl hover:text-gray-300">Settings</Link>
                    </li>
                    <li className="mb-6">
                        <Link to="/Admin/Categories" className="text-xl hover:text-gray-300">Categories</Link>
                    </li>
                    <li className="mb-6">
                        <Link to="/Admin/AddUser" className="text-xl hover:text-gray-300 text-green-500">Add User</Link>
                    </li>
                    <li className="mb-6">
                        <Link to="/Admin/Users" className="text-xl hover:text-gray-300 text-blue-300">Users List</Link>
                    </li>
                    <li className="mb-6">
                        <Link to="/Admin/Categories" className="text-xl hover:text-gray-300 text-red-500"><a onClick={handleLogout}>Logout</a></Link>
                    </li>
                    
                </ul>
            </div>
  )
}

export default Sidebar

