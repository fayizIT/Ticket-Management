import React from "react";
import { FaConciergeBell, FaTshirt, FaFileContract, FaLock } from "react-icons/fa"; // Import all icons

interface RightPanelProps {
  activeSection: string | null;
  toggleSection: (section: string) => void;
  onConfirm: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  activeSection,
  toggleSection,
  onConfirm,
}) => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-300 flex flex-col h-auto max-h-[400px] w-full mx-auto">
    
      <div className="flex-grow overflow-y-auto mb-4 pr-2">
        {renderSection(
          "Dress Code Of Fun",
          "dressCode",
          activeSection,
          toggleSection,
          "Guests are expected to wear comfortable, family-friendly attire. No offensive slogans or images are allowed on clothing.",
          "text-sm",
          <FaTshirt className="mr-3 text-blue-900" /> // Icon for Dress Code
        )}
        {renderSection(
          "Special Services",
          "specialServices",
          activeSection,
          toggleSection,
          "Wheelchairs & Prams are available for Sr. Citizens and Toddlers.",
          "text-sm",
          <FaConciergeBell className="mr-3 text-blue-900" /> // Icon for Special Services
        )}
        {renderSection(
          "Terms & Conditions",
          "terms",
          activeSection,
          toggleSection,
          <ul className="list-disc list-inside text-xs lg:text-sm">
            <li>To ensure the safety of the guests, height and weight restrictions are applicable for certain rides.</li>
            <li>Entry is restricted to one person per ticket, valid only for a date and specified time.</li>
            <li>Tickets are non-transferable.</li>
            <li>Foods from outside and alcoholic drinks are not allowed inside the park.</li>
          </ul>,
          "text-sm",
          <FaFileContract className="mr-3 text-blue-900" /> // Icon for Terms & Conditions
        )}
        {renderSection(
          "Locker Information",
          "lockerInfo",
          activeSection,
          toggleSection,
          "Lockers are available for rent near the park entrance. Please secure your belongings for the duration of your visit.",
          "text-sm",
          <FaLock className="mr-3 text-blue-900" /> // Icon for Locker Information
        )}
      </div>

      <div className="flex justify-end mt-2">
        <button
          className="bg-blue-900 text-white py-2 px-4 rounded-3xl font-bold hover:bg-blue-900 text-sm w-full md:w-auto"
          onClick={onConfirm}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Modify renderSection to accept the `icon` prop
const renderSection = (
  title: string,
  sectionKey: string,
  activeSection: string | null,
  toggleSection: (section: string) => void,
  content: React.ReactNode,
  contentClass: string,
  icon?: React.ReactNode // Adding icon here
) => (
  <div className="mb-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
    <button
      className={`w-full text-left font-semibold text-blue-900 flex justify-between items-center ${contentClass}`}
      onClick={() => toggleSection(sectionKey)}
    >
      <span className="flex items-center">
        {icon} {/* Display the icon here */}
        {title}
      </span>
      <span>{activeSection === sectionKey ? "-" : "+"}</span>
    </button>
    {activeSection === sectionKey && (
      <div className={`mt-2 text-gray-600 ${contentClass}`}>{content}</div>
    )}
  </div>
);

export default RightPanel;
