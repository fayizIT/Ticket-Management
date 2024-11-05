import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Timeline from "./Timeline";
import Footer from "./userFooter";

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Redirect to payment page or retry functionality
    navigate("/billing");
  };

  const backgroundImage = '/assets/images/TicketBg.png';
  const Image = '/assets/images/clientlogo.png';

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-center w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-full sm:w-[68%] mx-auto mt-6 mb-3">
        <Timeline currentStep={4} onStepClick={() => console.log("Step clicked!")} />
      </div>

      <div className="flex flex-col items-center justify-center w-full flex-grow p-4 md:p-8">
        <div className="bg-white border border-[#FFFFFFCC/80] rounded-[29px] p-4 md:p-10 w-full max-w-lg text-center">
          {/* Failed Icon */}
          <div className="w-full flex justify-center mb-4 md:mb-8">
            <FaTimesCircle  className="text-[#C54141]  w-[90px] h-[90px]  md:w-[117px] md:h-[117px]" />
          </div>
          <div className="flex w-full flex-col justify-center items-center">
            <h2 className="text-xl md:text-[33px] font-[1000] mb-4 text-[#C54141]">
              Payment Failed
            </h2>
            <p className="text-blue-900 font-semibold text-base md:text-[22px] w-3/4 mb-6 py-2 leading-snug">
              We were unable to complete the payment. Please try again.
            </p>
          </div>

          {/* Retry Button */}
          <button
            onClick={handleRetry}
            className="w-4/5 text-base md:text-xl font-extrabold py-2 md:py-4 bg-[#2D3192] text-white px-6 rounded-full hover:bg-blue-900"
          >
            Retry Payment
          </button>
        </div>
      </div>

      <div className="w-full sm:w-[68%] mx-auto mt-8 mb-44">
        <Footer imageSrc={Image} />
      </div>
    </div>
  );
};

export default PaymentFailed;
