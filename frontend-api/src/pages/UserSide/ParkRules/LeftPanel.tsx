import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div
      className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex flex-col h-auto max-h-[500px] md:h-[400px] w-full mx-auto md:mx-0"
      style={{
        backgroundImage: `url('https://via.placeholder.com/500')`, // Ensure high-res image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-900 text-center">Park Rules & Guides</h2>
      <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base text-center">
        To ensure your safety within our park, we kindly ask all guests to
        adhere to the dress code and familiarize themselves with the park's
        do's and don'ts.
      </p>
      <div className="flex justify-center items-center">
        <img
          src="https://via.placeholder.com/300"
          alt="Park illustration"
          className="rounded-lg w-full max-w-[250px] md:max-w-[300px]"
        />
      </div>
    </div>
  );
};

export default LeftPanel;
