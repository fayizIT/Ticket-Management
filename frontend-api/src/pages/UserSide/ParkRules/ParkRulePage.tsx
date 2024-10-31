import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Timeline from "../../../components/Timeline";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import backgroundImage from "../../../../public/assets/images/TicketFrame.png";
import Footer from "../../../components/userFooter"; 
import Image from "../../../../public/assets/images/clientlogo.png";

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
        </div>

        <div className="flex-1 max-w-full lg:max-w-md w-full h-auto">
          <RightPanel
            activeSection={activeSection}
            toggleSection={toggleSection}
            onConfirm={handleConfirm}
          />
        </div>
      </div>

      {/* Footer - Responsive stacking on mobile, side-by-side on desktop */}
      <Footer imageSrc={Image} />
    </div>
  );
};

export default ParkRulesPage;
