// import React, { useState } from "react";
// import "react-calendar/dist/Calendar.css";
// import { useDispatch } from "react-redux";
// import { setDate } from "../../../redux/dateSlice";
// import { useNavigate } from "react-router-dom";
// import Timeline from "../../../components/Timeline";
// import { toast } from "react-toastify";
// import LeftPanel from "./LeftPanel";
// import RightPanel from "./RightPanel";

// const DateSelector: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [selectedDate, setSelectedDateState] = useState<Date | null>(null);
//   const [currentStep, setCurrentStep] = useState(0);

//   const handleDateChange = (value: Date | Date[] | null) => {
//     if (value instanceof Date) {
//       setSelectedDateState(value);
//       dispatch(setDate(value.toISOString()));
//     }
//   };

//   const handleConfirm = () => {
//     if (!selectedDate) {
//       toast.error("Please select a date");
//       return;
//     }
//     if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//     }
//     dispatch(setDate(selectedDate.toISOString()));
//     navigate("/ticket-cart");
//   };

//   const handleStepClick = (step: number) => {
//     setCurrentStep(step);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

//       <div className="flex flex-col md:flex-row justify-center items-start p-8 space-y-6 md:space-y-0 md:space-x-6 mt-12 bg-gray-50">
//         <LeftPanel />
//         <RightPanel
//           selectedDate={selectedDate}
//           onDateChange={handleDateChange}
//           onConfirm={handleConfirm}
//         />
//       </div>
//     </div>
//   );
// };
// export default DateSelector;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDate } from "../../../redux/dateSlice";
import { useNavigate } from "react-router-dom";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { toast } from "react-toastify";
import Timeline from "../../../components/Timeline";
import backgroundImage from "../../../../public/assets/TicketFramee.png";
import Image from "../../../../public/assets/clientlogo.png";
import { GoChevronRight } from "react-icons/go";

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
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="w-full sm:w-4/5 mx-auto mt-4 flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4 px-2 sm:px-0">
        <div className="flex-1 max-w-full md:max-w-md w-full h-auto">
          <LeftPanel />
          <div className="mt-1 text-start text-blue-900 space-y-2">
            <h2 className="text-xs md:text-sm font-bold flex items-center">
              Know More About Us
              <GoChevronRight className="ml-1 text-blue-700" />
            </h2>
            <h2 className="text-xs md:text-sm font-bold flex items-center">
              Contact Us
              <GoChevronRight className="ml-1 text-blue-700" />
            </h2>
          </div>
        </div>

        <div className="flex-1 max-w-full md:max-w-md w-full h-auto">
          <RightPanel
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onConfirm={handleConfirm}
          />
          <div className="flex justify-center md:justify-end mt-1">
            <img src={Image} alt="Logo" className="h-8 sm:h-12 md:h-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
