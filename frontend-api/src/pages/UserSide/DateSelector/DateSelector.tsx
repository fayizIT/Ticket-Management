import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDate } from "../../../redux/dateSlice";
import { useNavigate } from "react-router-dom";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { toast } from "react-toastify";
import Timeline from "../../../components/Timeline";
import backgroundImage from "../../../../public/assets/TicketFrame.png";
import Image from "../../../../public/assets/clientlogo.png";
import { GoChevronRight } from "react-icons/go";
import LeftContent from "../../../components/LeftFooter";
import RightFooter from "../../../components/RightFooter";

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
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-center w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="w-full sm:w-4/5 mx-auto mt-4 flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4 px-2 sm:px-0">
        <div className="flex-1 max-w-full lg:max-w-md w-full h-auto">
          <LeftPanel />
          <LeftContent />
        </div>

        <div className="flex-1 max-w-full md:max-w-md w-full h-auto">
          <RightPanel
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onConfirm={handleConfirm}
          />
          <RightFooter imageSrc={Image} />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
