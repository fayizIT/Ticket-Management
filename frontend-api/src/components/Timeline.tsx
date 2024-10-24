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
          navigate("/add-tickets");
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
    <div className="flex justify-center items-center w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center w-full justify-between relative">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Connecting line for circles, excluding the first circle */}
            {index > 0 && (
              <div
                className={`absolute h-1 transition-colors duration-300 
                  ${index <= currentStep ? "bg-blue-500" : "bg-gray-300"}`}
                style={{
                  width: "calc(100% - 40px)", // Adjust line width to leave space for circles
                  top: "35%", // Center the line vertically relative to the circles
                  zIndex: "0", // Place line behind the circles
                  transform: "translateY(-50%)", // Center the line vertically
                  left: `${index * 25 - 0}px`, // Center line based on circle width
                }}
              />
            )}

            <div className="flex flex-col items-center relative z-10">
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center border-2 transition duration-300 
                  ${index === currentStep ? "border-blue-500 bg-white" : "border-gray-300 bg-gray-100"}
                  ${index <= currentStep ? "cursor-pointer" : "cursor-not-allowed"}`}
                onClick={() => handleStepClick(index)}
              >
                {index < currentStep ? (
                  <span className="text-blue-500">✓</span>
                ) : index === currentStep ? (
                  <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                ) : (
                  <span className="text-gray-400">{index + 1}</span>
                )}
              </div>

              <span
                className={`mt-2 text-sm text-center ${
                  index <= currentStep ? "font-bold text-blue-500" : "text-gray-400"
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
