import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { PdfGenerator } from "./PdfGenerator";
import backgroundImage from "../../public/assets/TicketFrame.png";
import Timeline from "./Timeline";
import Image from "../../public/assets/clientlogo.png";
import Footer from "./userFooter";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

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
      className="flex flex-col min-h-screen w-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <Timeline currentStep={4} onStepClick={() => console.log("Step clicked!")} />

      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 overflow-hidden">
        <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 w-full max-w-md text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
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

          <hr className="mb-3 font-bold" />

          {/* Additional Details - Responsive Layout */}
          {bookingData && (
            <div className="flex flex-col md:flex-row justify-between items-start text-gray-700 mb-4 space-y-2 md:space-y-0">
              <div className="flex-1 text-start">
                <p className="font-semibold text-[#15196E] opacity-40">Date of Visit</p>
                <p className="font-bold text-blue-900">{formattedDate}</p>
              </div>
              <div className="flex-1 text-center">
                <p className="font-semibold text-[#15196E] opacity-40">Visitors</p>
                <p className="font-bold text-blue-900">{bookingData.totalVisitors}</p>
              </div>
              <div className="flex-1 text-end">
                <p className="font-semibold text-[#15196E] opacity-40">Total</p>
                <p className="font-bold text-blue-900">₹{formattedTotal}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <PdfGenerator bookingData={bookingData} />
          </div>
        </div>
      </div>

      <Footer imageSrc={Image} />
    </div>
  );
};

export default PaymentSuccess;
