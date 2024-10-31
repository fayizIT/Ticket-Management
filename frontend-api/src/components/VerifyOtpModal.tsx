// VerifyOtpModal.tsx
import React, { useState } from 'react';

interface VerifyOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send OTP here
    console.log("Sending OTP to", phoneNumber);
    setIsOtpSent(true);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to verify OTP here
    console.log("Verifying OTP...");
  };

  const handleResend = () => {
    // Logic to resend OTP here
    console.log("Resending OTP...");
  };

  return (
    <div className="fixed inset-0 flex">
      <div className="bg-black bg-opacity-50 w-full h-full" onClick={onClose} />
      <div className="bg-gray-100 w-full md:w-1/3 h-full p-6 relative flex flex-col justify-center items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 transition duration-200 hover:bg-red-200"
        >
          &times;
        </button>
        <h2 className="text-xl font-extrabold mb-4 text-center">{isOtpSent ? 'Verify Your OTP' : 'Enter Your Phone Number'}</h2>
        <p className="mb-4 text-center">
          {isOtpSent ? 'Please enter the OTP sent to your registered mobile number.' : 'We will send you an OTP for verification.'}
        </p>
        
        {isOtpSent ? (
          <>
            <form onSubmit={handleVerify} className="w-full">
              <label className="block mb-2 text-center">OTP*</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter your OTP"
                required
                className="border border-gray-300 p-2 mb-4 w-full rounded-2xl"
              />
              <button
                type="submit"
                className="bg-blue-900 text-white font-bold py-2 px-4 rounded-3xl w-full transition duration-200 hover:bg-blue-600 mb-4"
              >
                Verify OTP
              </button>
            </form>
            <p className="text-center mb-4">
              OTP sent to {phoneNumber}****.
            </p>
            <button
              onClick={handleResend}
              className="text-blue-600 underline hover:text-blue-800 transition duration-200"
            >
              Facing Problem in receiving OTP? Click Here to Resend
            </button>
          </>
        ) : (
          <form onSubmit={handleSendOtp} className="w-full">
            <label className="block mb-2 text-center">Phone Number*</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded-2xl"
            />
            <button
              type="submit"
              className="bg-blue-900 text-white font-bold py-2 px-4 rounded-3xl w-full transition duration-200 hover:bg-blue-600 mb-4"
            >
              Send OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VerifyOtpModal;
