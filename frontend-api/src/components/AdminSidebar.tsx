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
        <div className="pl-10 ">
          <ul className="space-y-10 pt-10">
          {[
  { name: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
  { name: "Ticket Categories", path: "/admin/ticket-Category", icon: "schedule" },
  { name: "Stay Categories", path: "/admin/stay-category", icon: "hotel" },
  { name: "Coupon Code", path: "/admin/coupon-code", icon: "local_offer" },
  { name: "Booked Users", path: "/admin/booking-ticket", icon: "event" },
  { name: "Logout", onclick: handleLogout, icon: "monetization_on" },
].map((item, index) => (
  <li key={index} className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
    <span className="material-icons">{item.icon}</span>
    {item.path ? (
      <Link to={item.path}>{item.name}</Link>
    ) : (
      <span className="cursor-pointer" onClick={item.onclick}>{item.name}</span>
    )}
  </li>
))}
          </ul>
        </div>
      </div>
      
    </nav>
  );
};

export default AdminSidebar;
