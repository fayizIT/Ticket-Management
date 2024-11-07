import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { PdfGenerator } from "./PdfGenerator";
import Timeline from "./Timeline";
import Footer from "./userFooter";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const backgroundImage = '/assets/images/TicketBg.png';
  const Image = '/assets/images/clientlogo.png';

  const formattedDate = bookingData?.dateOfVisit
    ? new Date(bookingData.dateOfVisit).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : "";

 
  const formattedTotal = bookingData?.grandTotal
    ? parseFloat(bookingData.grandTotal.toFixed(2))
    : "";

  return (
    <div
      className="flex flex-col min-h-screen w-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-full sm:w-[68%] mx-auto mt-4 mb-3">
        <Timeline currentStep={4} onStepClick={() => console.log("Step clicked!")} />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 overflow-hidden">
        <div className="bg-white rounded-3xl p-4 md:p-10 w-full max-w-xl text-center">
         
          <div className="flex justify-center mb-4 md:mb-8">
            <FaCheckCircle  className="text-[#89C541] w-[90px] h-[90px]  md:w-[117px] md:h-[117px]" />
          </div>

         
          <div className="w-full flex flex-col items-center">
            <h2 className="text-xl md:text-[32px] font-bold mb-4 md:mb-8 text-[#619D19] font-barlow-condensed">
              Payment Successful!
            </h2>
            <p className="text-[#15196E] leading-tight text-base md:text-[22px] mb-10 font-bold w-full -mt-3">
              You will receive a confirmation mail with your tickets as soon as the payment is complete.
            </p>
          </div>

          <hr className="mb-6 font-bold h-[2px] bg-[#2D3192] bg-opacity-10" />

         
          {bookingData && (
  <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start text-gray-700 mb-4 space-y-2 md:space-y-0">
    <div className="flex-1 text-center mb-1 md:mb-5">
      <p className="font-semibold text-[#15196E] text-xl md:text-[23px] opacity-40 mb-3">Date of Visit</p>
      <p className="font-bold text-lg md:text-[20px] text-[#15196E]">{formattedDate}</p>
    </div>
    <div className="flex-1 text-center mb-1 md:mb-5">
      <p className="font-semibold text-[#15196E] text-xl md:text-[23px] mb-3 opacity-40">Visitors</p>
      <p className="font-bold text-lg md:text-[20px] text-[#15196E]">{bookingData.totalVisitors>1?`${bookingData.totalVisitors} Visitors`:`${bookingData.totalVisitors} Visitor`}</p>
    </div>
    <div className="flex-1 text-center mb-1 md:mb-5">
      <p className="font-semibold text-[#15196E] text-xl md:text-[23px] mb-3 opacity-40">Total</p>
      <p className="font-bold text-lg md:text-[20px] text-[#15196E]">₹{formattedTotal}</p>
    </div>
  </div>
)}


          <div className="space-y-3">
            <PdfGenerator bookingData={bookingData} />
          </div>
        </div>
      </div>

      <div className="w-full sm:w-[68%] mx-auto mt-8 mb-44">
        <Footer imageSrc={Image} />
      </div>
    </div>
  );
};

export default PaymentSuccess;
