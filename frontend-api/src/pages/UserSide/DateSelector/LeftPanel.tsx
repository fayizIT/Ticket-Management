import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-300 flex flex-col h-auto max-h-[500px] md:h-[425px] w-full mx-auto md:mx-0">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 font-panton-narrow text-blue-900 text-center">
        Plan Your Visit
      </h2>
      <p className="mb-4 leading-relaxed text-sm sm:text-lg text-blue-900 font-panton-narrow">
        Prepare for 7 hours of continuous enjoyment, with exhilarating ups and
        downs and fantastic thrills at every turn! Brace yourself to be blown
        away by the incredible rides that lie ahead!
      </p>
      <hr className="border-t border-gray-300 my-4" />
      <h3 className="text-base sm:text-lg text-blue-900 font-semibold mb-4 font-panton-narrow text-center">
        Our Timings
      </h3>
      <div className="bg-sky-50 p-4 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="font-medium text-blue-600 border-b border-gray-300"></th>
              <th className="font-medium text-blue-300 border-b border-gray-300 text-center">
                Park Timing
              </th>
              <th className="font-medium text-blue-300 border-b border-gray-300 text-center">
                Water Activities
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-2 text-blue-900 font-medium text-left pl-2">
                Weekdays
              </td>
              <td className="py-2 text-blue-900 border-l border-gray-300 text-center">
                11:00 AM - 06:00 PM
              </td>
              <td className="py-2 text-blue-900 border-l border-gray-300 text-center">
                12:30 PM - 05:00 PM
              </td>
            </tr>
            <tr>
              <td className="py-2 text-blue-900 font-medium text-left pl-2">
                Weekends
              </td>
              <td className="py-2 text-blue-900 border-l border-gray-300 text-center">
                11:00 AM - 07:00 PM
              </td>
              <td className="py-2 text-blue-900 border-l border-gray-300 text-center">
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
