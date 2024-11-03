import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Timeline from "../../../components/Timeline";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import Footer from "../../../components/userFooter";

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

  const backgroundImage = "/assets/images/TicketBg.png";
  const Image = "/assets/images/clientlogo.png";

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-center w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-full sm:w-[68%] mx-auto mt-6 mb-3">
        <Timeline currentStep={currentStep} onStepClick={handleStepClick} />
      </div>

      <div className="w-full sm:w-[68%] mx-auto mt-4 flex flex-col md:flex-row gap-7 justify-center items-start space-y-4 md:space-y-0 md:space-x-4 px-2 sm:px-0">
        <div className="flex-1 h-auto">
          {/* <LeftPanel /> */}
        </div>

        <div className="flex-1 h-auto w-full">  

          <RightPanel
            activeSection={activeSection}
            toggleSection={toggleSection}
            onConfirm={handleConfirm}
          />
        </div>
      </div>

      <div className="w-full sm:w-[68%] mx-auto mt-8 mb-44">
        <Footer imageSrc={Image} />
      </div>
    </div>
  );
};

export default ParkRulesPage;
