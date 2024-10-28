import React from "react";

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
    <div className="bg-white p-4 rounded-xl shadow-lg w-full md:h-auto border border-gray-300 mt-4"> {/* Removed fixed height */}
      <h2 className="text-xl font-semibold mb-4 text-center">Add Your Billing Information</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
          />
        </div>
        <div>
          <label className="block text-gray-700">PIN Code</label>
          <textarea
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 resize-none"
            placeholder="Enter your PIN"
          />
        </div>
      </form>

      <div className="flex justify-center mt-6">
        <button
          className="w-full sm:w-auto bg-blue-900 text-white py-2 px-4 rounded-full text-xs sm:text-sm hover:bg-blue-700 transition duration-200"
          onClick={handleConfirm}
        >
          Confirm and Proceed to Payment
        </button>
      </div>
    </div>
  );
};


export default BillingInformation;
