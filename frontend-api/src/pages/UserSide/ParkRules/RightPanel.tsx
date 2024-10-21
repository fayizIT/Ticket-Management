import React from "react";

interface RightPanelProps {
  activeSection: string | null;
  toggleSection: (section: string) => void;
  onConfirm: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ activeSection, toggleSection, onConfirm }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/2 border border-gray-300 flex-grow min-h-[500px]">
      <h3 className="text-2xl font-bold mb-4">More Information</h3>
      {renderSection("Dress Code Of Fun", "dressCode", activeSection, toggleSection, 
        "Guests are expected to wear comfortable, family-friendly attire. No offensive slogans or images are allowed on clothing.")}
      {renderSection("Special Services", "specialServices", activeSection, toggleSection, 
        "Wheelchairs & Prams are available for Sr. Citizens and Toddlers.")}
      {renderSection("Terms & Conditions", "terms", activeSection, toggleSection, 
        <ul className="list-disc list-inside">
          <li>To ensure the safety of the guests, height and weight restrictions are applicable for certain rides.</li>
          <li>Entry is restricted to one person per ticket, valid only for a date and specified time.</li>
          <li>Tickets are non-transferable.</li>
          <li>Foods from outside and alcoholic drinks are not allowed inside the park.</li>
        </ul>)}
      {renderSection("Locker Information", "lockerInfo", activeSection, toggleSection, 
        "Lockers are available for rent near the park entrance. Please secure your belongings for the duration of your visit.")}

      <button
        className="mt-6 bg-blue-700 text-white py-3 px-6 rounded-full w-full hover:bg-blue-800"
        onClick={onConfirm}
      >
        Agree & Proceed
      </button>
    </div>
  );
};

const renderSection = (title: string, sectionKey: string, activeSection: string | null, toggleSection: (section: string) => void, content: React.ReactNode) => (
  <div className="mb-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
    <button
      className="w-full text-left text-lg font-semibold text-blue-700 flex justify-between items-center"
      onClick={() => toggleSection(sectionKey)}
    >
      {title}
      <span>{activeSection === sectionKey ? "-" : "+"}</span>
    </button>
    {activeSection === sectionKey && (
      <div className="mt-2 text-gray-600 text-sm">{content}</div>
    )}
  </div>
);

export default RightPanel;
