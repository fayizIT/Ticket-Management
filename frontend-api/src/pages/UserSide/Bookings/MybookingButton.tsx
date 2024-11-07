import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailModal from "../../../components/EmailModal";
import VerifyOtpModal from "../../../components/VerifyOtpModal";
import { otpservice } from "../../../services/Otpservice";

const MyBookingButton: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [email, setEmail] = useState("");

  const handleMyBooking = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSendOtp = async (email: string) => {
    try {
      const response = await otpservice.sendOtp(email);
      console.log("OTP sent successfully:", response.message);
      setIsModalOpen(false);
      setIsVerifyModalOpen(true);
      setEmail(email);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      const response = await otpservice.verifyOtp(email, otp);
      console.log("OTP verified successfully", response);

      if (!response || response.length === 0) {
        // alert("No bookings found for the provided email.");
        return;
      }

      setBookingData(response);
      setIsVerifyModalOpen(false);
      console.log(bookingData);
      
      navigate("/booking-details", { state: { bookings: response } });
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <button
        onClick={handleMyBooking}
        className="bg-[#2D3192] bg-opacity-10 text-[#2D3192] text-xl font-bold py-2 px-6 rounded-[31.5px] shadow transition duration-200"
      >
        My Bookings
      </button>
      <EmailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSendOtp={handleSendOtp}
      />
      <VerifyOtpModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        onVerify={handleVerifyOtp}
      />
    </>
  );
};

export default MyBookingButton;
