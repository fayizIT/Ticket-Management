import React from 'react';
import { useNavigate } from 'react-router-dom';

const Timeline: React.FC<{ currentStep: number; onStepClick: (step: number) => void }> = ({ currentStep, onStepClick }) => {
  const steps = ['Location', 'Date', 'Tickets', 'Add-Tent', 'Rules', 'Billing'];
  const navigate = useNavigate();

  const handleStepClick = (index: number) => {
    if (index <= currentStep) {

      if (index === 0) {
        navigate('/'); // Navigate to "Date"
      }  else if (index === 1) {
        navigate('/date-selector'); // Navigate to "Tickets"
      }else if (index === 2) {
        navigate('/ticket-cart'); // Navigate to "Tickets"
      } else {
        onStepClick(index); // Default behavior for other steps
      }
    }
  };

  return (
    <div className="flex justify-between items-center w-full max-w-5xl mx-auto p-4">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          {/* Circle with checkmark or step number */}
          <div className="relative flex items-center">
            <div
              className={`rounded-full h-12 w-12 flex items-center justify-center border-2 border-black transition duration-300 
                ${index < currentStep ? 'bg-green-500 text-white cursor-pointer' : index === currentStep ? 'bg-green-600 text-white cursor-pointer' : 'bg-white text-gray-500 hover:bg-gray-200'} 
                ${index > currentStep ? 'cursor-not-allowed' : ''}`} // Disable future steps
              onClick={() => handleStepClick(index)} // Handle click logic with navigation
            >
              {index < currentStep || index === currentStep ? (
                <span style={{ color: 'black', fontSize: '24px' }}>✓</span> // Larger black tick mark
              ) : (
                <span style={{ color: 'black' }}>{index + 1}</span> // Step number for future steps
              )}
            </div>

            {/* The line between circles */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-1/2 w-28 h-2 transform -translate-y-1/2 left-16 transition-colors duration-300
                ${index < currentStep ? 'bg-green-500' : index === currentStep ? 'bg-black' : 'bg-gray-300'}`} // Green for completed steps, Black for current step, Gray for future steps
              ></div>
            )}
          </div>

          {/* Step label under the circle */}
          <span
            className={`mt-2 text-sm ${
              index <= currentStep
                ? 'font-bold text-black' // Always black for current and previous steps
                : 'text-gray-500' // Gray for future steps
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
