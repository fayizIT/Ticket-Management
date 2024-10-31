import React from "react";

const Features: React.FC = () => {
  const bgImageUrl = '/assets/images/navbarBanner.png'; // Use the URL

  return (
    <div className="min-h-screen bg-white-50 p-6">
     
      <section
        className="relative h-[400px] w-full bg-cover bg-center "
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      >
        <div className="absolute inset-0 bg-white-900 bg-opacity-60 flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl font-bold mb-4 text-center">
            Prepare for the ultimate <br /> adventure at Kerala’s best nature
            park
          </h1>
          <button className="bg-white text-blue-500 font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition">
            Book Now
          </button>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-16 mb-20">
        <div className="flex items-center justify-center text-center">
          <span className="flex-grow h-[4px] bg-gray-400 max-w-[300px]"></span>

          <p className="mx-4 text-1xl font-bold text-blue-800">
            Why Foggy Mountain?
          </p>
          <span className="flex-grow h-[4px] bg-gray-400 max-w-[300px]"></span>
        </div>
      </section>

      
      <section className="py-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-red-500 text-white p-6 rounded-xl transform transition-transform  hover:cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-red-400 duration-300">
            <div className="flex flex-col items-center">
              <span className="mb-4 text-4xl">🩹</span>
              <h3 className="font-bold text-lg">First Aid Rooms</h3>
              <p className="mt-2 text-center">Safety is our top priority.</p>
            </div>
          </div>

          <div className="bg-indigo-600 text-white p-6 rounded-xl transform transition-transform hover:scale-105 hover:shadow-xl hover:cursor-pointer hover:bg-indigo-500 duration-300">
            <div className="flex flex-col items-center">
              <span className="mb-4 text-4xl">🅿️</span>
              <h3 className="font-bold text-lg">Wide Parking Area</h3>
              <p className="mt-2 text-center">Enjoy stress-free access.</p>
            </div>
          </div>

          <div className="bg-purple-700 text-white p-6 rounded-xl transform transition-transform hover:cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-purple-600 duration-300">
            <div className="flex flex-col items-center">
              <span className="mb-4 text-4xl">🔒</span>
              <h3 className="font-bold text-lg">Locker Room</h3>
              <p className="mt-2 text-center">Store your valuables.</p>
            </div>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-xl transform transition-transform hover:cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-blue-500 duration-300">
            <div className="flex flex-col items-center">
              <span className="mb-4 text-4xl">📶</span>
              <h3 className="font-bold text-lg">Free Wi-Fi</h3>
              <p className="mt-2 text-center">Stay connected.</p>
            </div>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl transform transition-transform hover:scale-105 hover:cursor-pointer hover:shadow-xl hover:bg-green-500 duration-300">
            <div className="flex flex-col items-center">
              <span className="mb-4 text-4xl">🍽️</span>
              <h3 className="font-bold text-lg">Multi-Cuisine Restaurant</h3>
              <p className="mt-2 text-center">World of flavors awaits.</p>
            </div>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-xl transform transition-transform hover:cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-yellow-400 duration-300">
            <div className="flex flex-col items-center">
              <span className="mb-4 text-4xl">🏨</span>
              <h3 className="font-bold text-lg">Accommodation</h3>
              <p className="mt-2 text-center">Comfortable accommodations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
