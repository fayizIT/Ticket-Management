import React from "react";
import { GoChevronRight } from "react-icons/go";

interface FooterProps {
  imageSrc: string;
}

const Footer: React.FC<FooterProps> = ({ imageSrc }) => {
  return (
    <div className="flex flex-col items-center w-full border-gray-300">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full p-4 md:p-6">
        
        {/* Left Section */}
        <div className="text-center md:text-start text-blue-900 space-y-2 md:ml-16">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h2 className="text-xs md:text-sm font-bold flex items-center justify-center md:justify-start">
              Know more about Us
              <GoChevronRight className="ml-1 text-blue-700" />
            </h2>
            <h2 className="text-xs md:text-sm font-bold flex items-center justify-center md:justify-start">
              Contact Us
              <GoChevronRight className="ml-1 text-blue-700" />
            </h2>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
          <img src={imageSrc} alt="Logo" className="h-12 sm:h-16 md:h-20" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
