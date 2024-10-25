import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="bg-white p-2 md:p-4 rounded-xl shadow-lg border border-gray-200 flex flex-col h-auto max-h-[500px] md:h-[400px] w-full max-w-md mx-auto md:mx-0 -mt-8">
      {" "}
      {/* Header */}
      <h2
        className="text-2xl font-bold mb-2 font-panton-narrow text-blue-800"
        style={{ fontFamily: "Panton Narrow" }}
      >
        Plan Your Visit
      </h2>
      {/* Description */}
      <p
        className="mb-2 leading-relaxed text-lg text-blue-800"
        style={{ fontFamily: "Panton Narrow" }}
      >
        Prepare for 7 hours of continuous enjoyment, with exhilarating ups and
        downs and fantastic thrills at every turn!
      </p>
      {/* Divider line */}
      <hr className="border-t border-gray-300 my-2" />
      {/* Our Timings Section title */}
      <h3 className="text-lg text-blue-800 font-semibold mb-2 font-panton-narrow">
        Our Timings
      </h3>
      {/* Timings Box styled like the image */}
      <div
        className="bg-sky-50 p-2 rounded-lg border border-gray-200"
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
                <td className="py-2 text-blue-900 font-medium border-b border-gray-300 border-r border-gray-300">
                  Weekdays
                </td>
                <td className="py-2 border-b border-gray-300 border-r border-gray-300 text-center text-blue-900">
                  11:00 AM - 06:00 PM
                </td>
                <td className="py-2 border-b border-gray-300 text-center text-blue-900">
                  12:30 PM - 05:00 PM
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 text-blue-900 font-medium border-b border-gray-300 border-r border-gray-300">
                  Weekends
                </td>
                <td className="py-2 text-blue-900 border-b border-gray-300 border-r border-gray-300 text-center">
                  11:00 AM - 07:00 PM
                </td>
                <td className="py-2 text-blue-900 border-b border-gray-300 text-center">
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
