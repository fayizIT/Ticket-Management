import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaBed, FaUserFriends } from "react-icons/fa";
import Timeline from "../../components/Timeline";
import { useNavigate } from "react-router-dom";
import { decrementTicket, incrementTicket, selectTicketQuantity } from "../../redux/ticketSlice";
import { decrementStay, incrementStay } from "../../redux/stayCategorySlice";
import { setBookingData } from "../../redux/bookingSlice";
import { createBooking } from "../../services/BookingService";

const ReviewBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access ticket and stay cart data from Redux
  const {
    tickets: ticket,
    categories,
    discountedTotal: ticketDiscountedTotal,
  } = useSelector((state: any) => state.ticketCategory);

  const {
    stayCategories,
    tickets: stayTickets,
    total: stayTotal,
  } = useSelector((state: any) => state.stayCategory);

  const activeCouponId = useSelector((state: any) => state.ticketCategory.activeCoupon?.id);
  console.log(activeCouponId); // This will log the MongoDB Object ID
  
  

  
  const selectedDate = useSelector((state: any) => state.date.selectedDate);

  // Calculate original ticket total
  const originalTicketTotal = categories.reduce(
    (total: number, category: any) => {
      return total + category.price * (ticket[category._id] || 0);
    },
    0
  );

  // Discounted amount is calculated based on ticket total and the discount applied
  const discountAmount = originalTicketTotal - ticketDiscountedTotal;

  // Calculate ticket total after applying discount
  const ticketTotalAfterDiscount =
    ticketDiscountedTotal > 0 ? ticketDiscountedTotal : originalTicketTotal;

  // Calculate grand total (tickets after discount + stay total)
  const grandTotal = ticketTotalAfterDiscount + stayTotal;

  // Calculate GST (18% of grand total)
  const gst = (grandTotal * 0.18).toFixed(2);

  // Calculate total amount to be paid
  const amountToBePaid = (grandTotal + parseFloat(gst)).toFixed(2);

  // Calculate total ticket count
  const totalTicketCount = Object.values(ticket).reduce(
    (sum: number, count: any) => sum + count,
    0
  );

  // State for billing information
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    pinCode: "",
  });

  const [currentStep, setCurrentStep] = useState(4);

  // Redirect to home if there's no ticket data
  useEffect(() => {
    if (!Object.keys(ticket).length) {
      navigate("/"); // Navigate to home page if there's no ticket or stay data
    }
  }, [ticket, navigate]);

  // Moved handleChange outside of handleConfirm for better readability
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    // Basic validation
    if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.pinCode) {
      alert("Please fill in all fields.");
      return;
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
      couponId: activeCouponId || null, 
    };

    console.log( bookingData,"Booking dataaaaaaaaaa");

    console.log("Stay Categories:", stayCategories);

    

    try {
      const result = await createBooking(bookingData);
      dispatch(setBookingData(result)); // Optionally store booking data in Redux
      navigate("/billing");
    } catch (error) {
      alert("Error creating booking: " + error);
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  // Update ticket count
  const handleTicketIncrement = (categoryId: string) => {
    dispatch(incrementTicket(categoryId));
  };

  const handleTicketDecrement = (categoryId: string) => {
    if (ticket[categoryId] > 0) {
      dispatch(decrementTicket(categoryId));
    }
  };

  const handleStayIncrement = (categoryId: string) => {
    dispatch(incrementStay(categoryId));
  };

  const handleStayDecrement = (categoryId: string) => {
    dispatch(decrementStay(categoryId));
  };

  const handleDecrementWithCheck = (categoryId: any) => {
    const currentCount = ticket[categoryId] || 0; // Get current count for the category
    if (currentCount > 0) {
      handleTicketDecrement(categoryId);
    } else {
      alert("Quantity cannot be less than 0");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-6xl gap-4">
        {/* Left side: Booking Summary */}
        <div className="w-full lg:w-2/5 p-4 bg-white rounded-xl shadow-lg border border-gray-300 flex flex-col justify-between mb-8 lg:mb-0">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Booking Summary
          </h2>

          {/* Display total visitors and ticket total */}
          <div className="mb-4 text-center">
            <div className="flex justify-between items-start">
              {/* Date of Visit */}
              <div className="flex flex-col items-center">
                <p className="text-sm">Date of Visit:</p>
                <span className="font-bold">
                  {new Date(selectedDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Visitor Count */}
              <div className="flex flex-col items-center mt-2 md:mt-0">
                <div className="flex items-center">
                  <FaUserFriends className="text-xl mr-1 text-gray-600" />
                  <p className="text-sm font-bold">Visitors:</p>
                </div>
                <span className="font-bold ml-1">{totalTicketCount}</span>
              </div>

              {/* Total Amount */}
              <div className="flex flex-col items-center mt-2 md:mt-0">
                <p className="text-sm font-bold">Total:</p>
                <span className="font-bold">
                  ₹{originalTicketTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Display ticket categories with count > 0 */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Ticket Summary</h2>
          {Object.keys(ticket).length > 0 ? (
            Object.keys(ticket)
              .filter((categoryId) => ticket[categoryId] > 0) // Only show categories with count > 0
              .map((categoryId) => {
                const category = categories.find(
                  (cat: any) => cat._id === categoryId
                );
                if (category) {
                  const count = ticket[categoryId]; // Get the ticket count
                  return (
                    <div
                      key={category._id}
                      className="flex justify-between items-center py-2 border-b border-gray-300"
                    >
                      <div className="flex items-center">
                        <FaUser className="w-6 h-6 text-gray-500" />
                        <div className="ml-2">
                          <h4 className="font-bold">{category.name}</h4>
                          <p className="text-gray-600">
                            ₹{category.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded-l"
                          onClick={() => {
                            if (count > 0) {
                              handleDecrementWithCheck(category._id);
                            } else {
                              alert("Quantity cannot be less than 0");
                            }
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center border-t border-b"
                          value={count}
                          readOnly
                        />
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded-r"
                          onClick={() => handleTicketIncrement(category._id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                }
                return null; // If the category is not found, return null
              })
          ) : (
            <p className="text-gray-500">No tickets added.</p>
          )}

          {/* Display Stay categories with count > 0 */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Stays Summary</h2>
          {Object.keys(stayTickets).length > 0 &&
          Object.values(stayTickets).some((count: any) => count > 0) ? (
            stayCategories
              .filter((category: any) => stayTickets[category._id] > 0)
              .map((category: any) => (
                <div
                  key={category._id}
                  className="flex justify-between items-center py-2 border-b border-gray-300"
                >
                  <div className="flex items-center">
                    <FaBed className="w-6 h-6 text-gray-500" />
                    <div className="ml-2">
                      <h4 className="font-bold">{category.name}</h4>
                      <p className="text-gray-600">
                        ₹{category.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded-l"
                      onClick={() => handleStayDecrement(category._id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-12 text-center border-t border-b"
                      value={stayTickets[category._id] || 0}
                      readOnly
                    />
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded-r"
                      onClick={() => handleStayIncrement(category._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500">No tickets added in stay cart.</p>
          )}

          {/* Grand Total, GST, and Amount to be Paid */}
          <div className="mt-6 border-t border-gray-300 pt-4">
            <h4 className="text-md font-bold">Ticket GST (18%): ₹{gst}</h4>
            <h4 className="text-md font-bold text-red-600">
              Coupon Discount: ₹-{discountAmount.toFixed(2)}
            </h4>
            <h6>
              ----------------------------------------------------------------
            </h6>
            <h4 className="text-lg font-bold">
              Grand Total: ₹{amountToBePaid}
            </h4>
          </div>
        </div>

        {/* Right side: Billing Information */}
        <div className="w-full lg:w-2/5 p-4 bg-white rounded-xl shadow-lg border border-gray-300 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Add Your Billing Information
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName" // Added name attribute
                onChange={handleChange} // Added onChange to input
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber" // Added name attribute
                onChange={handleChange} // Added onChange to input
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email" // Added name attribute
                onChange={handleChange} // Added onChange to input
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label className="block text-gray-700">PIN code</label>
              <textarea
                name="pinCode" // Added name attribute
                onChange={handleChange} // Added onChange to textarea
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 resize-none" // Set height and prevent resizing
                placeholder="Enter your PIN"
              />
            </div>
          </form>

          <div className="flex justify-center mt-6">
            <button
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
              onClick={handleConfirm}
            >
              Confirm and Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBookingPage;
