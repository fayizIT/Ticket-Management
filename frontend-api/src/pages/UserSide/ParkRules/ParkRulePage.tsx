import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Timeline from "../../../components/Timeline";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { GoChevronRight } from "react-icons/go";
import Image from "../../../../public/assets/clientlogo.png";
import backgroundImage from "../../../../public/assets/TicketFrame.png";

const ParkRulesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(2);

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
      className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-center w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="w-full sm:w-4/5 mx-auto flex flex-col lg:flex-row justify-center items-start space-y-4 lg:space-y-0 lg:space-x-4 px-2">
        <div className="flex-1 max-w-full lg:max-w-md w-full h-auto">
          <LeftPanel />
          <div className="mt-2 text-start text-blue-900 space-y-2">
            <h2 className="text-xs md:text-sm font-bold flex items-center">
              Know More About Us
              <GoChevronRight className="ml-1 text-blue-700" />
            </h2>
            <h2 className="text-xs md:text-sm font-bold flex items-center">
              Contact Us
              <GoChevronRight className="ml-1 text-blue-700" />
            </h2>
            <hr className="border-t border-gray-300 w-[90%] md:w-[185%] my-2 mx-auto border-t-2" />
          </div>
        </div>

        <div className="flex-1 max-w-full lg:max-w-md w-full h-auto">
          <RightPanel
            activeSection={activeSection}
            toggleSection={toggleSection}
            onConfirm={handleConfirm}
          />
          <div className="flex justify-center lg:justify-end mt-2">
            <img
              src={Image}
              alt="Logo"
              className="h-8 sm:h-12 md:h-16 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkRulesPage;
