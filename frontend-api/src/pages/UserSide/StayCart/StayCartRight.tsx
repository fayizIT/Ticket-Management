// src/components/StayCartRight.tsx

import React from "react";
import { FaShoppingCart } from "react-icons/fa";

interface StayCartRightProps {
  stayCategories: any[];
  tickets: { [key: string]: number };
  total: number;
  handleCountChange: (id: string, operation: "increment" | "decrement") => void;
  openModal: (category: any) => void;
  handleConfirm: () => void;
}

const StayCartRight: React.FC<StayCartRightProps> = ({
  stayCategories,
  tickets,
  total,
  handleCountChange,
  openModal,
  handleConfirm,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-1/2 flex flex-col h-auto lg:h-[31.7rem] overflow-y-auto">
      {stayCategories.map((category) => (
        <div
          key={category._id}
          className="border border-gray-300 rounded-md p-4 mb-4"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-16 h-16 object-cover mr-4 rounded-md border-2 border-gray-300 p-2 mb-4"
              />
              <div>
                <h4 className="font-bold text-sm sm:text-base">
                  {category.name}
                </h4>
                <p className="text-base sm:text-lg">
                  ₹{category.price.toFixed(2)}
                </p>
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded-md shadow hover:bg-blue-600 transition duration-200"
                  onClick={() => openModal(category)}
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out"
                onClick={() => handleCountChange(category._id, "decrement")}
              >
                -
              </button>
              <input
                type="number"
                className="w-8 sm:w-12 text-center border-t border-b border-gray-300 focus:outline-none"
                value={tickets[category._id] || 0}
                readOnly
              />
              <button
                className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out"
                onClick={() => handleCountChange(category._id, "increment")}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-4">
        <p className="text-base sm:text-lg font-bold">
          Total: ₹{total.toFixed(2)}
        </p>
        <button
          className="bg-blue-700 text-white py-2 px-4 rounded-full hover:bg-blue-800 transition-colors duration-200 text-sm sm:text-base"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default StayCartRight;
