import React from "react";
import { GoChevronRight } from "react-icons/go";

interface FooterProps {
  imageSrc: string;
}

const Footer: React.FC<FooterProps> = ({ imageSrc }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full mt-4 p-4  border-gray-300 space-y-4 md">
      {/* Left Section */}
      <div className="text-center md:text-start text-blue-900 space-y-2">
        <h2 className="text-xs md:text-sm font-bold flex items-center justify-center md:justify-start">
          Know More About Us
          <GoChevronRight className="ml-1 text-blue-700" />
        </h2>
        <h2 className="text-xs md:text-sm font-bold flex items-center justify-center md:justify-start">
          Contact Us
          <GoChevronRight className="ml-1 text-blue-700" />
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex justify-center md:justify-end">
        <img src={imageSrc} alt="Logo" className="h-8 sm:h-12 md:h-16" />
      </div>
    </div>
  );
};

export default Footer;
