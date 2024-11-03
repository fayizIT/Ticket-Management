import React from "react";

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
  const indiaFlag = "/assets/images/flag.png";
  return (
    <div className="bg-white p-7 rounded-3xl  border border-gray-300 flex flex-col h-auto max-h-[640px] md:h-[1000px]">
      <h2 className="text-[33px] font-[1000] mb-4  text-[#15196E]">
        Enter Your Details
      </h2>
      <form className="space-y-5 mb-6">
        <div className="">
          {/* <label className="block text-[#15196E] font-bold text-xl ">Full Name</label> */}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="placeholder:text-blue-900 rounded-xl placeholder:opacity-50 placeholder:text-xl w-full py-5 px-5 border border-[#000000] border-opacity-10 border-t-[1px]  focus:outline-none focus:ring-2 focus:ring-blue-900 bg-[#D5EFFF] bg-opacity-40 placeholder-custom-blue placeholder-opacity-40 font-semibold text-xl mt-1 "
            placeholder="Enter full name"
          />
        </div>
        <div>
          {/* <label className="block text-[#15196E] font-bold text-xl  mb-1">Phone Number</label> */}
          <div className="flex items-center rounded-xl overflow-hidden border border-[#000000] border-opacity-10 border-t-[1px]  bg-[#D5EFFF] bg-opacity-40  ">
            {/* Country Code Section */}
            <div className="flex items-center px-3 border-r border-gray-300">
              <img
                src={indiaFlag} // Replace with actual path to the flag icon
                alt="India Flag"
                className="w-5 h-5 mr-1"
              />
              <span className="text-blue-900 placeholder:opacity-50 opacity-50 font-semibold text-xl ">
                +91
              </span>
            </div>

            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="placeholder:text-blue-900 placeholder:opacity-50 placeholder:text-xl w-full py-5 px-5 bg-transparent focus:outline-none rounded-xl  placeholder-custom-blue placeholder-opacity-40  font-semibold  text-xl"
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div>
          {/* <label className="block text-[#15196E] font-bold text-xl ">Email Address</label> */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="placeholder:text-blue-900 placeholder:opacity-50 placeholder:text-xl mt-1 w-full py-5 px-5 border border-[#000000] border-opacity-10 border-t-[1px]  rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 bg-[#D5EFFF] bg-opacity-40  placeholder-custom-blue placeholder-opacity-40  font-semibold text-xl "
            placeholder="Enter email address"
          />
        </div>
        <div>
          {/* <label className="block text-[#15196E] font-bold text-xl ">PIN Code</label> */}
          <input
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="placeholder:text-blue-900 placeholder:opacity-50 placeholder:text-xl mt-1 w-full py-5 px-5 border border-[#000000] border-opacity-10 border-t-[1px]  rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 bg-[#D5EFFF] bg-opacity-40  placeholder-custom-blue placeholder-opacity-40  font-semibold text-xl "
            placeholder="Enter PIN Code "
          />
        </div>
      </form>

      <p className="text-base text-[#15196E] opacity-35 text-center mt-4 mb-1 font-semibold ">
        You will receive a confirmation mail with your tickets<br></br> as soon
        as the payment is complete
      </p>

      <div className="flex justify-center mt-1">
        <button
          className="w-full sm:w-3/4 md:w-[90%] bg-[#2D3192] text-white font-[1000] py-4 px-4 mt-3 rounded-full text-lg sm:text-xl hover:bg-blue-800 transition duration-200"
          onClick={handleConfirm}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BillingInformation;
