import React from 'react';

const Timeline: React.FC<{ currentStep: number; onStepClick: (step: number) => void }> = ({ currentStep, onStepClick }) => {
  const steps = ['Location', 'Date', 'Tickets', 'Add-ons', 'Rules', 'Billing'];

  return (
    <div className="flex justify-between items-center w-full max-w-5xl mx-auto p-4">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          {/* Circle with checkmark or step number */}
          <div className="relative flex items-center">
            <div
              className={`rounded-full h-12 w-12 flex items-center justify-center border-2 border-black cursor-pointer transition duration-300 ${index < currentStep ? 'bg-green-500 text-white' : index === currentStep ? 'bg-green-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-200'}`}
              onClick={() => index <= currentStep && onStepClick(index)} // Clickable only for current and previous steps
            >
              {index < currentStep ? (
                <span className="text-white">✔️</span>
              ) : index === currentStep ? (
                <span className="text-white">✔️</span>
              ) : (
                <span className="text-black">{index + 1}</span>
              )}
            </div>

            {/* The line between circles */}
            {index < steps.length - 1 && (
              <div className="absolute top-1/2 w-28 h-2 bg-black transform -translate-y-1/2 left-16"></div>
            )}
          </div>

          {/* Step label under the circle */}
          <span className={`mt-2 text-sm ${index < currentStep ? 'font-bold text-black' : index === currentStep ? 'font-bold text-blue-600' : 'text-gray-500'}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
