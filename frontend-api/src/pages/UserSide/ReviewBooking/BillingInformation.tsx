import React from "react";
import { FaFlag } from "react-icons/fa"; // Example for Indian flag icon

interface BillingInformationProps {
  formData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    pinCode: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleConfirm: () => void;
}

const BillingInformation: React.FC<BillingInformationProps> = ({ formData, handleChange, handleConfirm }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex flex-col h-auto max-h-[480px] md:h-[575px] w-[450px]">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-900">Enter Your Details</h2>
      <form className="space-y-3">
        <div>
          <label className="block text-blue-900 text-sm">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-blue-50"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-blue-900 text-sm">Phone Number</label>
          <div className="flex items-center bg-blue-50 p-1.5 rounded-lg">
            <span className="flex items-center px-2">
              <FaFlag className="text-lg text-green-500 mr-1" /> +91
            </span>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-900 rounded-lg"
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div>
          <label className="block text-blue-900 text-sm">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-blue-50"
            placeholder="Enter your email address"
          />
        </div>
        <div>
          <label className="block text-blue-900 text-sm">PIN Code</label>
          <textarea
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 h-12 resize-none bg-blue-50"
            placeholder="Enter your PIN"
          />
        </div>
      </form>

      <p className="text-xs text-gray-600 text-center mt-3">
        You will receive a confirmation mail with your tickets as soon as the payment is complete
      </p>

      <div className="flex justify-center mt-4">
        <button
          className="w-full sm:w-auto bg-blue-900 text-white py-2 px-4 rounded-full text-xs sm:text-sm hover:bg-blue-900 transition duration-200"
          onClick={handleConfirm}
        >
          Proceed to payment
        </button>
      </div>
    </div>
  );
};

export default BillingInformation;
