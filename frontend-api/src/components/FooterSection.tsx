// import React from 'react';

// const FooterSection: React.FC = () => {
//   return (
//     <footer className="bg-blue-800 text-white p-6 text-center">
//       <p>Prepare for the ultimate adventure at Kerala's best nature park</p>
//       <div className="mt-4">
//         <button className="px-6 py-3 bg-red-500 rounded-md">Book Now</button>
//       </div>
//     </footer>
//   );
// };

// export default FooterSection;


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
            src="/path/to/your/icon.png"
            alt="Company Icon"
            className="h-6 w-6"
          />
        </div>

        {/* Right Section: Company Icon */}
        <div className="mt-4 sm:mt-0">
          <img
            src="/path/to/your/icon.png"
            alt="Company Icon"
            className="h-10 w-10 sm:absolute sm:bottom-6 sm:right-6"
          />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

