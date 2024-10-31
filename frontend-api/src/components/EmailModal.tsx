// EmailModal.tsx
import React from 'react';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'; // Importing icons from react-icons

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP sending logic here
    console.log("Sending OTP...");
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
        <h2 className="text-xl font-extrabold mb-4 text-center">Please Authenticate Using OTP Sign In</h2>
        <p className="mb-4 text-center">
          We have added OTP Sign in to Protect Online Transactions
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <label className="block mb-2 text-center">
            Email Address or Phone Number*
          </label>
          <input
            type="text"
            placeholder="Enter your email or phone number"
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
        <h3 className="font-extrabold text-center mb-2">My Booking OTP Authentication</h3>
        
        <div className="flex items-center mb-4 text-center w-full">
          <AiOutlinePhone className="mr-2 text-gray-600 w-6 h-6" />
          <p className="flex-1">Provide the Registered Mobile No or Email used at the time of booking.</p>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 text-center w-full">
          <AiOutlineMail className="mr-2 text-gray-600 w-6 h-6" />
          <p className="flex-1">Do check your email Junk/Spam mailbox.</p>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
