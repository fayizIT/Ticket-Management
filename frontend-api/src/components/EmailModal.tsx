import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendOtp: (email: string) => Promise<void>;
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onSendOtp,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await onSendOtp(email);
      toast.error("Email Not found");
      setEmail("");
    } catch (err) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const parkRuleImage = "/assets/images/parkRules.png";
  const emailImage = "/assets/images/Email.png";
  const Logo = "/assets/images/Logo.png";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="fixed inset-0 z-50 flex justify-end">
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
                className="object-contain"
              />
            </h2>

            <form onSubmit={handleSubmit} className="w-full">
              {/* <label className="block mb-2 text-center">Email Address*</label> */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ID"
                required
                className="border border-[#000000] border-opacity-15 p-3 mb-4 w-full rounded-[10.46px] bg-[#D5EFFF] bg-opacity-40 outline-none text-[#2D3192] font-semibold text-lg placeholder:text-[#2D3192] placeholder:opacity-50"
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-[#2D3192] text-white font-bold text-lg py-3 px-4 rounded-[41.29px] w-full ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Sending..." : "Login to Foggy"}
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
    </>
  );
};

export default EmailModal;
