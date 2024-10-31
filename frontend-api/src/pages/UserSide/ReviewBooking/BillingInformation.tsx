import React from "react";
import indiaFlag from '../../../../public/assets//images/flag.png'

interface BillingInformationProps {
  formData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    pinCode: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleConfirm: () => void;
}

const BillingInformation: React.FC<BillingInformationProps> = ({
  formData,
  handleChange,
  handleConfirm,
}) => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-300 flex flex-col h-auto max-h-[450px] md:h-[575px] w-[450px]">
      <h2 className="text-xl font-bold mb-4  text-blue-900">
        Enter Your Details
      </h2>
      <form className="space-y-3">
        <div>
          <label className="block text-blue-900 font-bold text-sm ">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-blue-50 placeholder-custom-blue placeholder-opacity-40 font-semibold text-sm "
            placeholder="Enter full name"
          />
        </div>
        <div>
  <label className="block text-blue-900 font-bold text-sm  mb-1">Phone Number</label>
  <div className="flex items-center rounded-lg overflow-hidden border border-gray-300 bg-blue-50">
    {/* Country Code Section */}
    <div className="flex items-center px-3 border-r border-gray-300 bg-blue-100">
      <img
      src={indiaFlag}  // Replace with actual path to the flag icon
        alt="India Flag"
        className="w-2 h-5 mr-1"
      />
      <span className="text-blue-900 font-bold text-sm font-medium ">+91</span>
    </div>


    <input
      type="tel"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      className="w-full p-2 bg-blue-50 focus:outline-none   placeholder-custom-blue placeholder-opacity-40  font-semibold  text-sm"
      placeholder="Phone Number"
    />
  </div>
</div>

        <div>
          <label className="block text-blue-900 font-bold text-sm ">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-blue-50 placeholder-custom-blue placeholder-opacity-40  font-semibold text-sm "
            placeholder="Enter email address"
          />
        </div>
        <div>
          <label className="block text-blue-900 font-bold text-sm ">PIN Code</label>
          <textarea
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="w-full p-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 h-10 resize-none bg-blue-50 placeholder-custom-blue placeholder-opacity-40  font-semibold text-sm  "
            placeholder="Enter PIN Code "
          />
        </div>
      </form>

      <p className="text-sm text-[#15196E] opacity-40 text-center mt-3  font-semibold ">
        You will receive a confirmation mail with your tickets as soon as the
        payment is complete
      </p>

      <div className="flex justify-center mt-1">
  <button
    className="w-full sm:w-3/4 md:w-1/2 bg-blue-900 text-white font-bold py-2 px-4 rounded-full text-xs sm:text-sm hover:bg-blue-800 transition duration-200"
    onClick={handleConfirm}
  >
    Proceed to Payment
  </button>
</div>

    </div>
  );
};

export default BillingInformation;
