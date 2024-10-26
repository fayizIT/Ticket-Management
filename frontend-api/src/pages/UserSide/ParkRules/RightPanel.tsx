import React from "react";

interface RightPanelProps {
  activeSection: string | null;
  toggleSection: (section: string) => void;
  onConfirm: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ activeSection, toggleSection, onConfirm }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex flex-col h-auto max-h-[500px] w-full mx-auto md:mx-0">
      <h3 className="text-xl md:text-2xl font-bold mb-2 text-blue-900 text-center">More Information</h3>
      
      {/* Scrollable section */}
      <div className="flex-grow overflow-y-auto mb-4 pr-2">
        {renderSection("Dress Code Of Fun", "dressCode", activeSection, toggleSection, 
          "Guests are expected to wear comfortable, family-friendly attire. No offensive slogans or images are allowed on clothing.", "text-xs")}
        {renderSection("Special Services", "specialServices", activeSection, toggleSection, 
          "Wheelchairs & Prams are available for Sr. Citizens and Toddlers.", "text-xs")}
        {renderSection("Terms & Conditions", "terms", activeSection, toggleSection, 
          <ul className="list-disc list-inside text-xs md:text-sm">
            <li>To ensure the safety of the guests, height and weight restrictions are applicable for certain rides.</li>
            <li>Entry is restricted to one person per ticket, valid only for a date and specified time.</li>
            <li>Tickets are non-transferable.</li>
            <li>Foods from outside and alcoholic drinks are not allowed inside the park.</li>
          </ul>, "text-xs")}
        {renderSection("Locker Information", "lockerInfo", activeSection, toggleSection, 
          "Lockers are available for rent near the park entrance. Please secure your belongings for the duration of your visit.", "text-xs")}
      </div>

      {/* Button Section - Stays outside the scrollable content */}
      <div className="flex justify-end mt-2">
        <button
          className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 text-sm w-full md:w-auto"
          onClick={onConfirm}
        >
          Agree & Proceed
        </button>
      </div>
    </div>
  );
};

const renderSection = (
  title: string,
  sectionKey: string,
  activeSection: string | null,
  toggleSection: (section: string) => void,
  content: React.ReactNode,
  contentClass: string
) => (
  <div className="mb-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
    <button
      className={`w-full text-left font-semibold text-blue-700 flex justify-between items-center text-sm ${contentClass}`}
      onClick={() => toggleSection(sectionKey)}
    >
      {title}
      <span>{activeSection === sectionKey ? "-" : "+"}</span>
    </button>
    {activeSection === sectionKey && (
      <div className={`mt-2 text-gray-600 ${contentClass}`}>{content}</div>
    )}
  </div>
);

export default RightPanel;
