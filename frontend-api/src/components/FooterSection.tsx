import React from "react";

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 relative">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Left Section: Copyright Text */}
        <div className="text-center sm:text-left flex items-center space-x-2">
          <p className="text-sm">&copy; 2024 Designed and Developed by</p>
          {/* Company Icon */}
          <img
            src="/assets/companylogo.png"
            alt="Company Logo"
            className="h-7 w-25"
          />
        </div>

        {/* Right Section: Company Icon */}
        <div className="mt-4 sm:mt-0">
          <img
            src="/assets/clientlogo.png"
            alt="Client Logo"
            className="h-20 w-20 sm:absolute sm:bottom-1 sm:right-3"
          />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
