import React from 'react';

const AdventureSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-12">
      <h2 className="text-3xl font-bold text-center mb-6">Move more. Play more.</h2>
      <div className="w-full h-[300px] bg-cover bg-center" style={{ backgroundImage: `url('/path-to-your-image')` }}>
        {/* Image background for the adventure */}
      </div>
      <button className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold shadow-lg hover:bg-blue-700 transition">
        Learn More
      </button>
    </div>
  );
};

export default AdventureSection;
