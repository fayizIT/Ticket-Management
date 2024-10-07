import React, { useState } from 'react';

interface StepProps {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const Stepper: React.FC<StepProps> = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <div className="w-full flex justify-between items-center">
      {steps.map((step, index) => (
        <div className="flex-1" key={index}>
          <div className="flex items-center justify-center relative">
            <div
              className={`w-10 h-10 rounded-full flex justify-center items-center border-2 ${
                index <= currentStep ? 'border-primary' : 'border-gray-300'
              }`}
            >
              <span
                className={`${
                  index <= currentStep ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {index + 1}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`absolute left-1/2 top-5 w-full border-t-2 ${
                  index < currentStep ? 'border-primary' : 'border-gray-300'
                }`}
              />
            )}
          </div>
          <div className="text-center mt-2 text-sm font-semibold">
            <span
              className={`${
                index <= currentStep ? 'text-primary' : 'text-gray-500'
              }`}
            >
              {step}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
