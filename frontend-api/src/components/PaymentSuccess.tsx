import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { PdfGenerator } from "./PdfGenerator";
import backgroundImage from "../../public/assets/TicketFrame.png";
import RightFooter from "./RightFooter";
import LeftFooter from "./LeftFooter";
import Timeline from "./Timeline";
import Image from "../../public/assets/clientlogo.png";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const handleRedirect = () => {
    navigate("/");
  };

  // Format date to "15 October 2024"
  const formattedDate = bookingData?.dateOfVisit
    ? new Date(bookingData.dateOfVisit).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : "";

  // Format total to avoid unnecessary decimal points
  const formattedTotal = bookingData?.grandTotal
    ? parseFloat(bookingData.grandTotal.toFixed(2))
    : "";

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-center w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <Timeline
        currentStep={4}
        onStepClick={() => console.log("Step clicked!")}
      />

      <div className="flex flex-col items-center justify-center w-full flex-grow p-4 md:p-8">
        <div className="bg-white  rounded-3xl shadow-lg p-4 md:p-6 w-[350px] max-w-md text-center">
          {/* Success Icon */}
          <div className="w-full flex justify-center mb-4">
            <FaCheckCircle className="text-green-500 text-5xl md:text-6xl" />
          </div>

          {/* Success Message */}
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-green-500">
            Payment Successful!
          </h2>
          <p className="text-blue-800 text-sm md:text-base mb-4">
            Thank you for your payment. Your booking has been confirmed! You
            will receive a confirmation mail with your tickets as soon as the
            payment is completed.
          </p>

          <hr className="mb-3 font-bold"></hr>

          {/* Additional Details - Horizontal Layout */}
          {bookingData && (
            <div className="flex justify-around items-start text-gray-700 mb-4">
              <div className="text-start">
                <p className="font-semibold text-[#15196E] text-start opacity-40">Date of Visit</p>
                <p className="font-bold text-blue-900">{formattedDate}</p>
              </div>
              <div className="text-center ">
                <p className="font-semibold text-[#15196E] opacity-40">Visitors</p>
                <p className="font-bold text-blue-900">{bookingData.totalVisitors}</p>
              </div>
              <div className="text-end">
                <p className="font-semibold text-[#15196E] opacity-40 text-end">Total</p>
                <p className="font-bold text-blue-900 text-end">₹{formattedTotal}</p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3">
            <PdfGenerator bookingData={bookingData} />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between p-4 md:p-8">
        <LeftFooter />
        <RightFooter imageSrc={Image} />
      </div>
    </div>
  );
};

export default PaymentSuccess;
