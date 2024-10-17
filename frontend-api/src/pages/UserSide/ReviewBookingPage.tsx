import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaBed, FaUserFriends } from "react-icons/fa";
import Timeline from "../../components/Timeline";
import { useNavigate } from "react-router-dom";
import { decrementTicket, incrementTicket } from "../../redux/ticketSlice";

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

  const [currentStep, setCurrentStep] = useState(4);

  // Redirect to home if there's no ticket data
  useEffect(() => {
    if (!Object.keys(ticket).length || !stayTotal) {
      navigate("/"); // Navigate to home page if there's no ticket or stay data
    }
  }, [ticket, stayTotal, navigate]);

  const handleConfirm = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/billing");
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  // Update ticket count
  const handleIncrement = (categoryId: string) => {
    dispatch(incrementTicket(categoryId));
  };

  const handleDecrement = (categoryId: string) => {
    if (ticket[categoryId] > 0) {
      dispatch(decrementTicket(categoryId));
    }
  };

  const handleDecrementWithCheck = (categoryId: any) => {
    const currentCount = ticket[categoryId] || 0; // Get current count for the category
    if (currentCount > 0) {
      handleDecrement(categoryId);
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
            Object.keys(ticket).map((categoryId) => {
              const category = categories.find(
                (cat: { _id: string }) => cat._id === categoryId
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
                        onClick={() => handleDecrementWithCheck(category._id)}
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
                        onClick={() => handleIncrement(category._id)}
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
          {stayCategories
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
                    onClick={() => handleDecrement(category._id)}
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
                    onClick={() => handleIncrement(category._id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

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
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <textarea
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter your address"
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
