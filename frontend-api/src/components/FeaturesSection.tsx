import React from 'react';
import { FaTree } from 'react-icons/fa';

const FeaturesSection: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Descriptive Text */}
      <div className="text-center mb-8">
        <h2 className="text-2xl text-blue-900 font-bold mt-4 flex items-center justify-center">
        <img
            src="/assets/Vector.png" 
            alt="Nature Icon"
            className="mr-8 w-100 h-10 object-cover mt-[-90px] " 
          />
          <FaTree className="mr-8 text-green-500 mt-[-40px]" />
          "Adventure or a peaceful day in nature our park in ,<br/>
           Kakkadampoyil, Kozhikode, Kerala, has it all"
        </h2>
      </div>
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-lg shadow-md">
        <img
            src="/assets/Nature.png" 
            alt="Nature Icon"
            className="mr-26  w-100 h-10 object-cover mt-[-55px] " 
          />
          <h2 className="text-white text-xl font-bold">One of a Kind Adventure Park</h2>
          <p className="text-white mt-2">Experience pure adventure at Foggy Mountain...</p>
        </div>
        <div>
        
          <img src='/assets/kindAdventure.png'alt="Adventure Park" className="w-full h-64 object-cover rounded-lg" />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src="/assets/childrenBanner.png" alt="Children's Park" className="w-full h-64 object-cover rounded-lg" />
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-lg shadow-md">
          <h2 className="text-white text-xl font-bold">Expansive Children’s Park</h2>
          <p className="text-white mt-2">Discover a world of joy for your little ones...</p>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-lg shadow-md">
          <h2 className="text-white text-xl font-bold">Thrilling Rides</h2>
          <p className="text-white mt-2">Experience our exhilarating rides for all ages...</p>
        </div>
        <div>
          <img src="/assets//childrens.png" alt="Thrilling Rides" className="w-full h-64 object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
