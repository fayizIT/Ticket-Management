import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../../services/BookingService"; 
import BookingSummary from "./BookingSummary"; 
import BillingInformation from "./BillingInformation";
import { decrementStay, incrementStay } from "../../../redux/stayCategorySlice";
import { decrementTicket, incrementTicket } from "../../../redux/ticketSlice";
import { setBookingData } from "../../../redux/bookingSlice";
import Image from "../../../../public/assets/clientlogo.png";

import backgroundImage from "../../../../public/assets/TicketFramee.png";
import { toast } from "react-toastify";
import Timeline from "../../../components/Timeline";
import { GoChevronRight } from "react-icons/go";

const ReviewBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tickets: ticket, categories, discountedTotal: ticketDiscountedTotal, activeCoupon } = useSelector((state: any) => state.ticketCategory);
  const { stayCategories, tickets: stayTickets, total: stayTotal } = useSelector((state: any) => state.stayCategory);
  const selectedDate = useSelector((state: any) => state.date.selectedDate);

  const originalTicketTotal = categories.reduce(
    (total: number, category: any) => total + category.price * (ticket[category._id] || 0),
    0
  );

  const discountAmount = originalTicketTotal - ticketDiscountedTotal;
  const ticketTotalAfterDiscount = ticketDiscountedTotal > 0 ? ticketDiscountedTotal : originalTicketTotal;
  const grandTotal = ticketTotalAfterDiscount + stayTotal;
  const gst = (grandTotal * 0.18).toFixed(2);
  const amountToBePaid = (grandTotal + parseFloat(gst)).toFixed(2);
  const totalTicketCount = Object.values(ticket).reduce((sum: number, count: any) => sum + count, 0);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    pinCode: "",
  });

  const [currentStep, setCurrentStep] = useState(4);

  useEffect(() => {
    if (!Object.keys(ticket).length) {
      navigate("/");
    }
  }, [ticket, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.pinCode) {
      toast.error("Please fill in all fields");
      return;
    }
    if (formData.pinCode.length > 6 || formData.pinCode.length < 6 ) {
      toast.error("Invalid Pincode");
      return;
    }
    if (formData.phoneNumber.length > 10||formData.phoneNumber.length <10) {
      toast.error("Invalid Mobile Number");
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }

    const bookingData = {
      ...formData,
      dateOfVisit: selectedDate,
      totalVisitors: totalTicketCount,
      ticketCategories: Object.keys(ticket).map((categoryId) => ({
        ticketCategoryId: categoryId,
        quantity: ticket[categoryId],
        price: categories.find((cat: any) => cat._id === categoryId)?.price,
      })),
      stayCategories: Object.keys(stayTickets).map((categoryId) => ({
        stayCategoryId: categoryId,
        quantity: stayTickets[categoryId],
        price: stayCategories.find((cat: any) => cat._id === categoryId)?.price,
      })),
      couponDiscountId: activeCoupon?.id || null,
    };

    try {
      const result = await createBooking(bookingData);

      const combinedData = {
        bookingId: result.bookingId,
        grandTotal: result.grandTotal,
        orderId: result.orderId,
        dateOfVisit: selectedDate,
        totalVisitors: totalTicketCount,
        ...formData,
      };

      if (!result.bookingId) {
        alert("Failed to retrieve booking ID.");
        return;
      }

      const options = {
        key: "rzp_test_vGGGd2XhY2l19v",
        amount: (result.grandTotal * 100).toString(),
        currency: "INR",
        name: "Foggy Mountain",
        description: `Booking for ${result.totalVisitors} visitors`,
        order_id: result.orderId,
        handler: async function (response: any) {
          alert("Payment successful!");
          dispatch(setBookingData(result));

          try {
            const paymentResponse = await fetch(
              `http://localhost:3000/bookings/${result.bookingId}/confirm-payment`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ paymentStatus: true }),
              }
            );

            if (!paymentResponse.ok) {
              throw new Error("Failed to update payment status");
            }
          } catch (error) {
            alert("Payment confirmed, but failed to update the status.");
          }

          navigate("/thank-you", { state: { bookingData: combinedData, result } });
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response: any) {
        navigate("/payment-failed");
      });

    } catch (error) {
      toast.error("Error creating booking: " + error);
    }
  };

  const updateTicketCount = (categoryId: string, action: 'increment' | 'decrement') => {
    action === 'increment' ? dispatch(incrementTicket(categoryId)) : dispatch(decrementTicket(categoryId));
  };

  const updateStayCount = (categoryId: string, action: 'increment' | 'decrement') => {
    action === 'increment' ? dispatch(incrementStay(categoryId)) : dispatch(decrementStay(categoryId));
  };

  const handleDecrementWithCheck = (categoryId: any) => {
    if (ticket[categoryId] > 0) {
      updateTicketCount(categoryId, 'decrement');
    } else {
      alert("Quantity cannot be less than 0");
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div
      className="min-h-screen flex flex-col w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />
      

<div className="w-full sm:w-4/5 mx-auto mt-6 flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-0 px-2 sm:px-0">

  <div className="flex-1 max-w-full md:max-w-lg w-full min-h-full flex flex-col">
    <BookingSummary 
      selectedDate={selectedDate}
      totalTicketCount={totalTicketCount}
      originalTicketTotal={originalTicketTotal}
      ticket={ticket}
      categories={categories}
      stayTickets={stayTickets}
      stayCategories={stayCategories}
      gst={gst}
      discountAmount={discountAmount}
      amountToBePaid={amountToBePaid}
      updateTicketCount={updateTicketCount}
      updateStayCount={updateStayCount}
      handleDecrementWithCheck={handleDecrementWithCheck}
    />
    <div className="mt-1 text-start text-blue-900 space-y-2">
            <h2 className="text-xs md:text-sm font-bold flex items-center">
              Know More About Us
              <GoChevronRight className="ml-1 text-blue-900" />
            </h2>
            <h2 className="text-xs md:text-sm font-bold flex items-center">
              Contact Us
              <GoChevronRight className="ml-1 text-blue-900" />
            </h2>
          </div>
  </div>
  <div className="flex-1 max-w-full md:max-w-lg w-full min-h-full flex flex-col ">
    <BillingInformation 
      formData={formData}
      handleChange={handleChange}
      handleConfirm={handleConfirm}
    />
    {/* <div className="flex justify-end mt-1"> */}
    <div className="flex justify-end md:justify-end mt-1 mr-12">
      <img src={Image} alt="Logo" className="h-8 sm:h-12 md:h-16" />
    </div>
  </div>
</div>

    </div>
  );  
};

export default ReviewBookingPage;
