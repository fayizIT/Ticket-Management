import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin-auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("accessToken");
      navigate("/admin/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="border border-gray-300 rounded-md w-72 h-screen flex-col justify-between flex">
      <div className="bg-sky-100 h-full">
        <div className="flex justify-center py-10 shadow-sm pr-4">
          <img
            src="https://foggymountain.in/sitepad-data/uploads/2024/01/20240110_101452_0000.jpg"
            alt="Logo"
            className="h-14 w-14"
          />
          <div className="pl-2">
            <p className="text-2xl font-bold text-indigo-600">Foggy</p>
            <span className="text-xs block text-gray-800">Mountain</span>
          </div>
        </div>
        <div className="pl-10">
          <ul className="space-y-8 pt-10">
            {[
              { name: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
              { name: "Ticket Categories", path: "/admin/ticket-Category", icon: "schedule" },
              { name: "Stay Categories", path: "/admin/stay-category", icon: "hotel" },
              { name: "Coupon Code", path: "/admin/coupon-code", icon: "local_offer" },
              { name: "Booked Users", path: "/admin/booking-ticket", icon: "event" },
              { name: "Payouts", path: "/admin/payouts", icon: "monetization_on" },
              { name: "Settings", path: "/admin/settings", icon: "settings" },
            ].map((item, index) => (
              <li key={index} className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
                <span className="material-icons">{item.icon}</span>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-sky-100 flex items-center space-x-4 pl-10 pb-10 hover:text-indigo-600 cursor-pointer" onClick={handleLogout}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span className="cursor-pointer" onClick={handleLogout}>Logout</span>
      </div>
    </nav>
  );
};

export default AdminSidebar;
