import React from 'react';
import image from '../../public/assets/navbarBanner.png';

// Function to scroll to sections
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};


const BannerSection: React.FC = () => {
  return (
<div className="relative w-full h-[100vh] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
{/* <div className="absolute inset-0 bg-opacity-50 bg-gray-500"></div> */}

      {/* Navbar */}
      <nav className="absolute top-0 w-full flex justify-end p-6 text-white space-x-8">
        <button onClick={() => scrollToSection('about')} className="hover:text-blue-300 transition">About Us</button>
        <button onClick={() => scrollToSection('gallery')} className="hover:text-blue-300 transition">Gallery</button>
        <button onClick={() => scrollToSection('contact')} className="hover:text-blue-300 transition">Contact Us</button>
      </nav>

      {/* Banner Content */}
      <div className="relative z-10 text-center flex flex-col justify-center items-center h-full">
        <img src="../assets/clientlogo.png" alt="Foggy Mountain" className="mb-4 w-[150px] h-auto" />
        <h1 className="text-blue-700 text-4xl md:text-5xl lg:text-6xl font-bold px-4">
          Prepare for the ultimate adventure at Kerala's best nature park
        </h1>
        <button className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold shadow-lg hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BannerSection;