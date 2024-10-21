import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import { setDate } from "../../../redux/dateSlice"; 
import { useNavigate } from "react-router-dom";
import Timeline from "../../../components/Timeline"; 
import { toast } from "react-toastify";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const DateSelector: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDateState] = useState<Date | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleDateChange = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setSelectedDateState(value);
      dispatch(setDate(value.toISOString()));
    }
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    dispatch(setDate(selectedDate.toISOString()));
    navigate("/ticket-cart");
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="flex flex-col md:flex-row justify-center items-start p-8 space-y-6 md:space-y-0 md:space-x-6 mt-12 bg-gray-50">
        <LeftPanel />
        <RightPanel 
          selectedDate={selectedDate} 
          onDateChange={handleDateChange} 
          onConfirm={handleConfirm} 
        />
      </div>
    </div>
  );
};
export default DateSelector;
