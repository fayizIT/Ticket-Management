import React from "react";
import { useNavigate } from "react-router-dom";

const Timeline: React.FC<{
  currentStep: number;
  onStepClick: (step: number) => void;
}> = ({ currentStep, onStepClick }) => {
  const steps = ["Choose dates", "Add tickets", "Park Rules", "Billing"];
  const navigate = useNavigate();

  const handleStepClick = (index: number) => {
    if (index <= currentStep) {
      switch (index) {
        case 0:
          navigate("/");
          break;
        case 1:
          navigate("/ticket-cart");
          break;
        case 2:
          navigate("/park-rules");
          break;
        case 3:
          navigate("/billing");
          break;
        default:
          onStepClick(index);
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full max-w-2xl mx-auto p-4 mb-4">
      <div className="flex items-center w-full justify-between relative text-blue-900">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {index > 0 && (
              <div
                className={`absolute h-1 transition-colors duration-300 
                  ${index <= currentStep ? "bg-gray-300" : "bg-gray-300"}`}
                style={{
                  width: "calc(101% - 120px)",
                  top: "35%",
                  zIndex: "0",
                  transform: "translateY(-50%)",
                  left: `${index * 25 - 0}px`,
                }}
              />
            )}

            <div className="flex flex-col items-center relative z-10">
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center border-2 transition duration-00
    ${
      index === currentStep
        ? "border-blue-900 bg-white"
        : "border-gray-300 bg-gray-100"
    }
    ${index <= currentStep ? "cursor-pointer" : "cursor-not-allowed"}
  `}
                onClick={() => handleStepClick(index)}
              >
                {index < currentStep ? (
                  <div className="relative flex items-center justify-center">
                  {/* Outer Circle with Light Green Border */}
                  <div className="absolute rounded-full h-12 w-12 border-4 border-[#318435] flex items-center justify-center"> 
                    <div className="rounded-full h-10 w-10 bg-[#89C541] flex items-center justify-center"> 
                      <span className="text-white text-lg">✓</span> 
                    </div>
                  </div>
                </div>
                
                ) : index === currentStep ? (
                  <div className="h-3 w-3 bg-blue-900 rounded-full"></div>
                ) : (
                  <span className="text-gray-400">{index + 1}</span>
                )}
              </div>

              <span
                className={`mt-1 text-xs md:text-sm text-center ${
                  index <= currentStep
                    ? "font-bold text-blue-900"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

