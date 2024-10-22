// src/components/StayCartLeft.tsx

import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const StayCartLeft: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-1/2 flex flex-col justify-between h-auto lg:h-[31.7rem]">
      <div>
        <button className="text-blue-600 font-semibold mb-4 flex items-center">
          <FaShoppingCart className="mr-2" />
          Choose Your Stay
        </button>
        <h2 className="text-2xl font-bold mb-4">Choose Your Stay</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Select your accommodation for the perfect experience.
        </p>
      </div>
    </div>
  );
};

export default StayCartLeft;
