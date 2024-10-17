import React from "react";
import { useNavigate } from "react-router-dom";

const Timeline: React.FC<{
  currentStep: number;
  onStepClick: (step: number) => void;
}> = ({ currentStep, onStepClick }) => {
  const steps = ["Location", "Date", "Tickets", "Add-Tent", "Rules", "Billing"];
  const navigate = useNavigate();

  const handleStepClick = (index: number) => {
    if (index <= currentStep) {
      if (index === 0) {
        navigate("/");
      } else if (index === 1) {
        navigate("/date-selector");
      } else if (index === 2) {
        navigate("/ticket-cart");
      } else if (index === 3) {
        navigate("/stay-categories");
      } else if (index === 3) {
        navigate("/park-rules");
      } else {
        onStepClick(index);
      }
    }
  };

  return (
    <div className="flex justify-between items-center w-full max-w-5xl mx-auto p-4">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div className="relative flex items-center">
            <div
              className={`rounded-full h-12 w-12 flex items-center justify-center border-2 border-black transition duration-300 
                ${
                  index < currentStep
                    ? "bg-green-500 text-white cursor-pointer"
                    : index === currentStep
                    ? "bg-green-600 text-white cursor-pointer"
                    : "bg-white text-gray-500 hover:bg-gray-200"
                } 
                ${index > currentStep ? "cursor-not-allowed" : ""}`}
              onClick={() => handleStepClick(index)}
            >
              {index < currentStep || index === currentStep ? (
                <span style={{ color: "black", fontSize: "24px" }}>✓</span>
              ) : (
                <span style={{ color: "black" }}>{index + 1}</span>
              )}
            </div>

            {index < steps.length - 1 && (
              <div
                className={`absolute top-1/2 w-28 h-2 transform -translate-y-1/2 left-16 transition-colors duration-300
                ${
                  index < currentStep
                    ? "bg-green-500"
                    : index === currentStep
                    ? "bg-black"
                    : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>

          <span
            className={`mt-2 text-sm ${
              index <= currentStep ? "font-bold text-black" : "text-gray-500"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
