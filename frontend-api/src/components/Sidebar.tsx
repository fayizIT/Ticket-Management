// Sidebar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin-auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem('accessToken');
      navigate('/admin/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex flex-col mt-4">
        <Link to="/admin/dashboard" className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
          <span className="material-icons">dashboard</span>
          <span className="ml-2">Dashboard</span>
        </Link>
        <Link to="/users" className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
          <span className="material-icons">people</span>
          <span className="ml-2">Booked users List</span>
        </Link>

        <Link to="/admin/ticket-Category" className="flex items-center p-4 hover:bg-gray-700 transition duration-200"> {/* Updated this line */}
          <span className="material-icons">people</span>
          <span className="ml-2">Age Categories</span>
        </Link>
        
        <Link to="/settings" className="flex items-center p-4 hover:bg-gray-700 transition duration-200">
          <span className="material-icons">settings</span>
          <span className="ml-2">Settings</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center p-4 mt-auto hover:bg-gray-700 transition duration-200 w-full text-left"
        >
          <span className="material-icons">logout</span>
          <span className="ml-2">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
