import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Timeline from "../../../components/Timeline";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { GoChevronRight } from "react-icons/go";
import Image from "../../../../public/assets/clientlogo.png";
import backgroundImage from "../../../../public/assets/TicketFramee.png"; 

const ParkRulesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(3);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleConfirm = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/billing");
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="flex flex-col md:flex-row justify-center items-start p-8 space-y-6 md:space-y-0 md:space-x-6 mt-8 bg-gray-50 bg-opacity-75">
        {/* Left Panel */}
        <div className="flex-1 max-w-md w-full">
          <LeftPanel />

          {/* "Know More About Us" and "Contact Us" Section */}
          <div className="mt-4 text-start text-blue-900 space-y-2">
            <h2 className="text-sm md:text-base font-bold flex items-center">
              Know More About Us
              <GoChevronRight className="ml-1 text-blue-900" />
            </h2>
            <h2 className="text-sm md:text-base font-bold flex items-center">
              Contact Us
              <GoChevronRight className="ml-1 text-blue-500" />
            </h2>
            <hr className="border-t border-gray-300 w-full md:w-full my-2 mx-auto border-t-2" />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 max-w-md w-full">
          <RightPanel
            activeSection={activeSection}
            toggleSection={toggleSection}
            onConfirm={handleConfirm}
          />

          {/* Logo Section */}
          <div className="flex justify-center mt-4">
            <img src={Image} alt="Logo" className="h-16 md:h-20 lg:h-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkRulesPage;
