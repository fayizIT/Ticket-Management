import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import default styles

const AdventureSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-12">
      <h2 className="text-3xl font-bold text-center mb-">Move more. Play more.</h2>

      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        showStatus={false}
        className="w-full h-[800px]"
      >
        {/* First Video */}
        <div className="relative w-full h-[600px]">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/assets/Videos/" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Second Video */}
        <div className="relative w-full h-[600px]">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/assets/Videos/" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Third Video */}
        <div className="relative w-[800] h-[600px]">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/assets/Videos/" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Carousel>

      {/* Horizontal Icon and Text Section */}
      <div className="flex justify-center space-x-8 mt-0 bg-cream-light text-orange-600 p-2 rounded-lg">
        {/* Fresh Water Activities */}
        <div className="flex flex-col items-center bg-orange-100 p-4 rounded-md shadow-lg">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex justify-center items-center mb-2">
            <span className="text-2xl">🌊</span> {/* Add icon here */}
          </div>
          <span className="text-lg font-bold text-center">Fresh Water Activities</span>
        </div>

        {/* Adventure Park */}
        <div className="flex flex-col items-center bg-orange-100 p-4 rounded-md shadow-lg">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex justify-center items-center mb-2">
            <span className="text-2xl">🎢</span> {/* Add icon here */}
          </div>
          <span className="text-lg font-bold text-center">One of a kind Adventure Park</span>
        </div>

        {/* Children’s Park */}
        <div className="flex flex-col items-center bg-orange-100 p-4 rounded-md shadow-lg">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex justify-center items-center mb-2">
            <span className="text-2xl">🧒</span> {/* Add icon here */}
          </div>
          <span className="text-lg font-bold text-center">Expansive Children’s Park</span>
        </div>

        {/* Lake Events */}
        <div className="flex flex-col items-center bg-orange-100 p-4 rounded-md shadow-lg">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex justify-center items-center mb-2">
            <span className="text-2xl">🌅</span> {/* Add icon here */}
          </div>
          <span className="text-lg font-bold text-center">Amazing Lake Events</span>
        </div>

        {/* Dome and Tent Stays */}
        <div className="flex flex-col items-center bg-orange-100 p-4 rounded-md shadow-lg">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex justify-center items-center mb-2">
            <span className="text-2xl">⛺</span> {/* Add icon here */}
          </div>
          <span className="text-lg font-bold text-center">Dome and Tent Stays</span>
        </div>
      </div>
    </div>
  );
};

export default AdventureSection;
