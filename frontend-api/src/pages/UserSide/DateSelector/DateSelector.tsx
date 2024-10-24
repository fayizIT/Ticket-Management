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
import backgroundImage from '../../../../public/assets/TicketFramee.png'; 
import Image from '../../../../public/assets/clientlogo.png'; // Path to your logo image

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
    <div className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-center w-full" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

      {/* Wrap the panels in a flex container */}
      <div className="flex flex-col md:flex-row justify-center items-stretch p-4 mt-4">
        <div className="flex-1 max-w-md w-full mr-5">
          <LeftPanel />
          <div className="mt-4 text-center text-blue-700">
            <h2 className="text-xl font-bold">Know More About Us</h2>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">Contact Us</h2>
          </div>
        </div>
        <div className="flex-1 max-w-md w-full">
          <RightPanel 
            selectedDate={selectedDate} 
            onDateChange={handleDateChange} 
            onConfirm={handleConfirm} 
          />
        </div>
      </div>

      {/* Logos under the RightPanel */}
      <div className="flex justify-center mt-8">
        <div className="flex-1 max-w-md w-full flex justify-center">
          <img src={Image} alt="Logo" className="h-20" /> {/* Adjust height as needed */}
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
