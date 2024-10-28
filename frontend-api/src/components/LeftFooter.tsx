import React from "react";
import { GoChevronRight } from "react-icons/go";

const LeftFooter: React.FC = () => {
  return (
    <div className="mt-2 text-start text-blue-900 space-y-2">
      <h2 className="text-xs md:text-sm font-bold flex items-center">
        Know More About Us
        <GoChevronRight className="ml-1 text-blue-700" />
      </h2>
      <h2 className="text-xs md:text-sm font-bold flex items-center">
        Contact Us
        <GoChevronRight className="ml-1 text-blue-700" />
      </h2>
      <hr className="border-t border-gray-300 w-[90%] md:w-[185%] my-2 mx-auto border-t-2" />
    </div>
  );
};

export default LeftFooter;
