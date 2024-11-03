import React from "react";
import {
  FaConciergeBell,
  FaTshirt,
  FaFileContract,
  FaLock,
} from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";

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
    <div className="bg-white p-4 sm:p-7 rounded-3xl border border-gray-300 flex flex-col h-auto min-h-[500px] lg:min-h-[600px] w-full mx-auto">
      <div className="flex-grow overflow-y-auto mb-4 pr-2 py-4">
        {renderSection(
          "Dress Code",
          "dressCode",
          activeSection,
          toggleSection,
          <p className="text-[#2D3192] font-normal text-base sm:text-xl">
            Guests are expected to wear comfortable, family-friendly attire. No
            offensive slogans or images are allowed on clothing.
          </p>,
          "text-xl font-bold text-[#2D3192] p-2",
          <FaTshirt className="mr-3 text-[#2D3192]" />
        )}
        {renderSection(
          "Special Services",
          "specialServices",
          activeSection,
          toggleSection,
          <p className="text-[#2D3192] font-normal text-base sm:text-xl">
            Wheelchairs & Prams are available for Sr. Citizens and Toddlers.
          </p>,
          "text-xl font-bold text-[#2D3192] p-2",
          <FaConciergeBell className="mr-3 text-[#2D3192]" />
        )}
        {renderSection(
          "Terms & Conditions",
          "terms",
          activeSection,
          toggleSection,
          <ul className="list-disc list-inside text-xs sm:text-xl text-[#2D3192] font-normal">
            <li>
              To ensure the safety of the guests, height and weight restrictions
              are applicable for certain rides.
            </li>
            <li>
              Entry is restricted to one person per ticket, valid only for a
              date and specified time.
            </li>
            <li>Tickets are non-transferable.</li>
            <li>
              Foods from outside and alcoholic drinks are not allowed inside the
              park.
            </li>
          </ul>,
          "text-xl font-bold text-[#2D3192] p-2",
          <FaFileContract className="mr-3 text-[#2D3192]" />
        )}
        {renderSection(
          "Locker Information",
          "lockerInfo",
          activeSection,
          toggleSection,
          <p className="text-[#2D3192] font-normal text-base sm:text-xl">
            Lockers are available for rent near the park entrance. Please secure
            your belongings for the duration of your visit.
          </p>,
          "text-xl font-bold text-[#2D3192] p-2",
          <FaLock className="mr-3 text-[#2D3192]" />
        )}
      </div>

      <div className="border-t-2 border-[#00023B] border-opacity-10 flex-grow mr-2" />

      <div className="flex justify-end">
        <button
          className="bg-[#2D3192] text-white py-4 px-6 md:px-12 rounded-full font-bold hover:bg-blue-900 text-lg w-full md:w-auto mr-2"
          onClick={onConfirm}
        >
          Continue
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
  contentClass: string,
  icon?: React.ReactNode
) => (
  <div className="mb-4 border border-gray-300 rounded-lg p-4 bg-[#D5EFFF] bg-opacity-55">
    <button
      className={`w-full text-left font-semibold text-blue-900 flex justify-between items-center ${contentClass}`}
      onClick={() => toggleSection(sectionKey)}
    >
      <span className="flex items-center">
        {icon}
        {title}
      </span>
      <span>
        <TiArrowSortedDown size={30} />
      </span>
    </button>
    {activeSection === sectionKey && (
      <div className={`mt-2 text-gray-600 ${contentClass}`}>{content}</div>
    )}
  </div>
);

export default RightPanel;
