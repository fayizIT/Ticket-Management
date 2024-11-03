import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="bg-white p-7 rounded-3xl  border border-gray-300 flex flex-col h-auto  w-full mx-auto md:mx-0">
      <h2 className="text-[33px] font-[1000]  mb-4  text-[#15196E] ">
        Plan Your Visit
      </h2>
      <p className="mb-4 w-full  md:w-4/5 font-medium leading-relaxed text-sm sm:text-[25.2px] text-[#15196E] font-panton-narrow">
        Prepare for 7 hours of continuous enjoyment, with exhilarating ups and
        downs and fantastic thrills at every turn! Brace yourself to be blown
        away by the incredible rides that lie ahead!
      </p>
      <hr className="border-t border-[#2D3192] border-2 opacity-10 my-4" />
      <h3 className="text-base sm:text-2xl text-[#15196E] font-semibold mb-4 font-panton-narrow ">
        Our Timings
      </h3>
      <div className="bg-[#D5EFFF] bg-opacity-55 p-4 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="font-medium text-blue-600 border-b border-gray-300"></th>
              <th className="font-medium text-lg text-[#15196E] opacity-50 border-b py-2 border-gray-300 text-center">
                Park Timing
              </th>
              <th className="font-medium text-lg py-2 text-[#15196E] opacity-50 border-b border-gray-300 text-center">
                Water Activities
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-3 text-[#15196E] font-bold text-left text-xl pl-2">
                Weekdays
              </td>
              <td className="py-3 text-blue-900 border-l text-base border-gray-300 text-center">
                11:00 AM - 06:00 PM
              </td>
              <td className="py-2 text-blue-900 border-l text-base border-gray-300 text-center">
                12:30 PM - 05:00 PM
              </td>
            </tr>
            <tr>
              <td className="py-3 text-[#15196E] text-xl font-bold text-left pl-2">
                Weekends
              </td>
              <td className="py-2 text-blue-900 border-l text-base border-gray-300 text-center">
                11:00 AM - 07:00 PM
              </td>
              <td className="py-2 text-blue-900 border-l text-base border-gray-300 text-center">
                12:00 PM - 06:00 PM
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeftPanel;
