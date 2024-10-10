import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-lg shadow-md">
        <h2 className="text-white text-xl font-bold">One of a kind Adventure Park</h2>
        <p className="text-white mt-2">Experience pure adventure at Foggy Mountain...</p>
      </div>
      <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-lg shadow-md">
        <img src="/path-to-your-image1" alt="Adventure" className="w-full h-48 object-cover rounded-lg" />
      </div>
      <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-lg shadow-md">
        <h2 className="text-white text-xl font-bold">Expansive Children’s Park</h2>
        <p className="text-white mt-2">Discover a world of joy for your little ones...</p>
      </div>
      {/* Add more features similarly */}
    </div>
  );
};

export default FeaturesSection;
