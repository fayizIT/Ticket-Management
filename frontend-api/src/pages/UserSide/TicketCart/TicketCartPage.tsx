import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTicketCategories,
} from "../../../redux/ticketSlice";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useNavigate } from "react-router-dom";
import Timeline from "../../../components/Timeline";
import { toast } from "react-toastify";
import Footer from "../../../components/userFooter";
import ToastModal from "../../../components/ToastModal";

const TicketCartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: any) => state.date.selectedDate);
  const { tickets } = useSelector((state: any) => state.ticketCategory);
  const [couponCode, setCouponCode] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false); 


  useEffect(() => {
    if (!selectedDate) {
      navigate("/");
    }
  }, [navigate, selectedDate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(fetchTicketCategories() as any);
      } catch (error) {
        toast.error("Failed to load ticket categories.");
      }
    };
    fetchCategories();
  }, [dispatch]);

  const handleConfirm = () => {
    const totalTickets = Object.values(tickets).reduce(
      (sum: number, count) => sum + (count as number),
      0
    );

    if (totalTickets === 0) {      
      setShowModal(true); // Show the ToastModal when no tickets are selected
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }

    navigate("/park-rules");
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const backgroundImage ='/assets/images/TicketFrame.png';
  const Image = '/assets/images/clientlogo.png';


  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-center w-full h-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: 'cover',
      }}
    >
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />
      <div className="flex flex-col md:flex-row justify-center items-stretch space-y-6 md:space-y-0 md:space-x-6 mt-5 px-4 md:px-0">
        <div className="flex-1 max-w-md w-full h-auto md:h-[355px]">
          <LeftPanel setCouponCode={setCouponCode} />
        </div>
        <div className="flex-1 max-w-md w-full h-auto md:h-[355px]">
          <RightPanel
            handleConfirm={handleConfirm}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between p-4 md:p-8">
        <Footer imageSrc={Image} />
      </div>
      {showModal && (
        <ToastModal
          message="Please add at least one ticket."
          onClose={() => setShowModal(false)} // Close the modal when clicking OK
        />
      )}
    </div>
  );
};

export default TicketCartPage;
