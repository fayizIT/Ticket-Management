import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketCategories, applyDiscount, removeDiscount } from "../../../redux/ticketSlice";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useNavigate } from "react-router-dom";
import Timeline from "../../../components/Timeline";
import { toast } from "react-toastify";
import { GoChevronRight } from "react-icons/go";
import Image from "../../../../public/assets/clientlogo.png";
import backgroundImage from "../../../../public/assets/TicketFramee.png";


const TicketCartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: any) => state.date.selectedDate);
  const { tickets, activeCoupon, discountedTotal, categories } = useSelector((state: any) => state.ticketCategory);
  const [couponCode, setCouponCode] = useState("");

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
      toast.error("Please add at least one ticket.");
      return;
    }

    navigate("/stay-categories");
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-center w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Timeline currentStep={1} onStepClick={() => {}} />
      <div className="flex flex-col md:flex-row justify-center items-stretch p-8 space-y-6 md:space-y-0 md:space-x-6 mt-3">
        <div className="flex-1 max-w-md w-full h-auto md:h-[500px]">
          <LeftPanel setCouponCode={setCouponCode} />
          <div className="mt-4 text-start text-blue-900 space-y-2">
            <h2 className="text-sm md:text-sm font-bold flex items-center">
              Know More About Us
              <GoChevronRight className="ml-1 text-blue-900" />
            </h2>
            <h2 className="text-sm md:text-sm font-bold flex items-center">
              Contact Us
              <GoChevronRight className="ml-1 text-blue-500" />
            </h2>
            <hr className="border-t border-gray-300 w-[90%] md:w-[180%] my-2 mx-auto border-t-2" />
            </div>
        </div>
        <div className="flex-1 max-w-md w-full h-auto md:h-[500px]">
          <RightPanel handleConfirm={handleConfirm} couponCode={couponCode} setCouponCode={setCouponCode} />
          <div className="flex justify-center mt-4">
            <div className="flex-1 flex justify-end items-center">
              <img src={Image} alt="Logo" className="h-16 md:h-20 lg:h-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCartPage;
