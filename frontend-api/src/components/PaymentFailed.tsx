import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../public/assets/images/TicketFrame.png";
import Timeline from "./Timeline";
import Image from "../../public/assets/images/clientlogo.png";
import Footer from "./userFooter";

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Redirect to payment page or retry functionality
    navigate("/billing");
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-center w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <Timeline currentStep={4} onStepClick={() => console.log("Step clicked!")} />

      <div className="flex flex-col items-center justify-center w-full flex-grow p-4 md:p-8">
        <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 w-[350px] max-w-md text-center">
          {/* Failed Icon */}
          <div className="w-full flex justify-center mb-4">
            <FaTimesCircle className="text-red-500 text-5xl md:text-6xl" />
          </div>

          {/* Failed Message */}
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-red-500">
            Payment Failed
          </h2>
          <p className="text-blue-900 font-semibold text-sm md:text-base mb-4">
            We were unable to complete the payment. Please try again.
          </p>

          {/* Retry Button */}
          <button
            onClick={handleRetry}
            className="bg-blue-900 text-white py-2 px-6 rounded-full hover:bg-blue-900 font-semibold"
          >
            Retry Payment
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between p-4 md:p-8">
      <Footer imageSrc={Image} />
      </div>
    </div>
  );
};

export default PaymentFailed;
