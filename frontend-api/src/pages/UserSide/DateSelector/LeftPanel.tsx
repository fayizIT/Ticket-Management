import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/2 border border-gray-300 flex-grow min-h-[500px]">
      <button className="text-blue-600 font-semibold mb-4">
        {"<"} Plan Your Visit
      </button>
      <h2 className="text-2xl font-bold mb-4">Plan Your Visit</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Prepare for 7 hours of continuous enjoyment, with exhilarating ups and downs and fantastic thrills at every turn! Brace yourself to be blown away by the incredible rides that lie ahead!
      </p>

      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="font-semibold mb-3 flex items-center text-lg">
          <span role="img" aria-label="clock" className="mr-2">⏰</span> Hours of Fun
        </h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-2">Park Timings</th>
              <th className="py-2">Water Park</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-800">
              <td className="py-2">11:00 AM - 06:00 PM (Weekdays)</td>
              <td className="py-2">12:30 PM - 05:00 PM</td>
            </tr>
            <tr className="text-gray-800">
              <td className="py-2">11:00 AM - 07:00 PM (Weekends & Holidays)</td>
              <td className="py-2">12:00 PM - 06:00 PM</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-blue-600 font-medium text-sm">
        📅 Book 3 days in advance and grab <span className="font-bold">10% off</span> on Regular adult tickets.
      </p>
    </div>
  );
};

export default LeftPanel;
