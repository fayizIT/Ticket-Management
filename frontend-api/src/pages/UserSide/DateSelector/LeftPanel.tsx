import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col h-full">
      {/* Header */}
      <h2
        className="text-2xl font-bold mb-4 font-panton-narrow"
        style={{ fontFamily: "Panton Narrow", color: "#003366" }}
      >
        Plan Your Visit
      </h2>

      {/* Description */}
      <p
        className="text-gray-700 mb-4 leading-relaxed"
        style={{ fontFamily: "Panton Narrow", color: "#003366" }}
      >
        Prepare for 7 hours of continuous enjoyment, with exhilarating ups and
        downs and fantastic thrills at every turn! Brace yourself to be blown
        away by the incredible rides that lie ahead!
      </p>

      {/* Divider line */}
      <hr className="border-t border-gray-300 my-4" />

      {/* Our Timings Section title */}
      <h3 className="text-lg font-semibold mb-3 font-panton-narrow">
        Our Timings
      </h3>

      {/* Timings Box styled like the image */}
      <div
        className="bg-sky-50 p-4 rounded-lg border border-gray-200"
        style={{ fontFamily: "Panton Narrow", color: "#003366" }}
      >
        <div className="text-sm text-gray-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="font-medium text-gray-600 border-b border-gray-300"></th>
                <th className="font-medium text-gray-600 border-b border-gray-300 text-center">
                  Park Timing
                </th>
                <th className="font-medium text-gray-600 border-b border-gray-300 text-center">
                  Water Activities
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td
                  className="py-2 font-medium border-b border-gray-300 border-r border-gray-300"
                  style={{ color: "#003366" }}
                >
                  Weekdays
                </td>
                <td className="py-2 border-b border-gray-300 border-r border-gray-300 text-center">
                  11:00 AM - 06:00 PM
                </td>
                <td className="py-2 border-b border-gray-300 text-center">
                  12:30 PM - 05:00 PM
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td
                  className="py-2 font-medium border-b border-gray-300 border-r border-gray-300"
                  style={{ color: "#003366" }}
                >
                  Weekends
                </td>
                <td className="py-2 border-b border-gray-300 border-r border-gray-300 text-center">
                  11:00 AM - 07:00 PM
                </td>
                <td className="py-2 border-b border-gray-300 text-center">
                  12:00 PM - 06:00 PM
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
