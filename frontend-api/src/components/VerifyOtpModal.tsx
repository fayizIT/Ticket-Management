import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface VerifyOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => Promise<void>;
}

const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({
  isOpen,
  onClose,
  onVerify,
}) => {
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onVerify(otp);
      toast.error("Invalid OTP. Please try again.");
    } catch (error: any) {
      if (error.message.includes("Invalid OTP")) {
        toast.error("Invalid OTP. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const parkRuleImage = "/assets/images/parkRules.png";
  const emailImage = "/assets/images/Email.png";
  const Logo = "/assets/images/Logo.png";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <ToastContainer />
      <div
        className="bg-[#191919D1] bg-opacity-80 absolute inset-0"
        onClick={onClose}
      />
      <div className="bg-white w-full max-w-lg h-auto p-6 rounded-[29.38px] shadow-lg z-10 relative mr-4 mt-4 mb-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✖
        </button>
        <div className="flex items-start justify-center">
          <img
            src={Logo}
            alt="Foggy Mountain Logo"
            className="h-[201.18px] w-[210.84px] object-contain -mt-4"
          />
        </div>
        <div className="border border-[#000000] border-opacity-15 rounded-[29.28px] p-4">
          <h2 className="text-[30px] font-bold mb-4 text-left text-[#15196E] flex justify-between font-barlow-condensed">
            Login to Foggy Mountain
            <img
              src={emailImage}
              alt="Foggy Mountain Logo"
              className="object-contain "
            />
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              required
              className="border border-[#000000] border-opacity-15 p-3 mb-4 w-full rounded-[10.46px] bg-[#D5EFFF] bg-opacity-40 outline-none text-[#2D3192] font-semibold text-lg placeholder:text-[#2D3192] placeholder:opacity-50"
            />
            <p className="text-center text-[#15196E] text-xl font-bold">
              You will receive an OTP in your email, please enter the OTP above
              to login.
            </p>
            <button
              type="submit"
              className="bg-[#2D3192] text-white font-bold text-lg py-3 px-4 rounded-[41.29px] w-full mt-4"
            >
              Verify OTP
            </button>
          </form>
        </div>
        <div className="flex items-center justify-center overflow-hidden w-full sm:w-[512px] h-48 sm:h-96 -ml-6 absolute bottom-0">
          <img
            src={parkRuleImage}
            alt="Foggy Mountain Logo"
            className="w-full h-full object-cover rounded-[29.38px] opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpModal;
