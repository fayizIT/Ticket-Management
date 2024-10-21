import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/2 border border-gray-300 flex-grow min-h-[500px]">
      <h2 className="text-3xl font-bold mb-4">Park Rules & Guides</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        To ensure your safety within our park, we kindly ask all guests to
        adhere to the dress code and familiarize themselves with the park's
        do's and don'ts.
      </p>
      <div className="flex justify-center items-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Park illustration"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default LeftPanel;
