import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTicketCategories,
  incrementTicket,
  decrementTicket,
  applyDiscount,
  removeDiscount,
} from "../../redux/ticketSlice";
import { FaUser } from "react-icons/fa";
import Timeline from "../../components/Timeline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CouponService from "../../services/CouponService";

const TicketCartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, loading, error, tickets, activeCoupon, discountedTotal } =
    useSelector((state: any) => state.ticketCategory);
  const selectedDate = useSelector((state: any) => state.date.selectedDate);

  const [currentStep, setCurrentStep] = useState(1);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    if (!selectedDate) {
      navigate("/"); // Navigate to home page if date is not set
    }
  }, [navigate, selectedDate]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const fetchedCoupons = await CouponService.fetchCoupons();
        setCoupons(fetchedCoupons);
      } catch (error) {
        toast.error("Failed to fetch coupons");
      }
    };

    fetchCoupons();
    dispatch(fetchTicketCategories() as any);
  }, [dispatch]);

  const handleCountChange = (
    id: string,
    operation: "increment" | "decrement"
  ) => {
    if (operation === "increment") {
      dispatch(incrementTicket(id));
    } else {
      dispatch(decrementTicket(id));
    }
    console.log("Current tickets:", tickets); // Log tickets after count change
  };

  const handleConfirm = () => {
    const totalTickets = Object.values(tickets).reduce(
      (sum: number, count) => sum + (count as number),
      0
    );
    if (totalTickets === 0) {
      toast.error("Please add at least one ticket.");
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/stay-categories");
    console.log("Confirmed tickets:", tickets); // Log tickets when confirming
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleCouponClick = (code: string, discountAmount: number) => {
    const totalTickets = Object.values(tickets).reduce(
      (sum: number, count) => sum + (count as number),
      0
    );
    if (totalTickets > 0) {
      if (activeCoupon && activeCoupon.code === code) {
        // Remove coupon
        setCoupons((prev) =>
          prev.filter((coupon: { code: string }) => coupon.code !== code)
        );
        dispatch(removeDiscount()); // Clear discount in Redux
        toast.success("Coupon removed");
      } else {
        // Apply coupon
        const calculatedTotal = categories.reduce(
          (sum: number, category: any) => {
            return sum + category.price * (tickets[category._id] || 0);
          },
          0
        );
        const discountedTotal = Math.max(
          0,
          calculatedTotal - calculatedTotal * (discountAmount / 100)
        );
        dispatch(applyDiscount({ code, discount: discountAmount })); // Set discount in Redux
        toast.success(`Coupon applied: ${code}`);
      }
    } else {
      toast.error("Please add at least one ticket before applying a coupon.");
    }
  };

  // Calculate total price based on tickets selected
  const totalTickets = Object.values(tickets).reduce(
    (sum: number, count) => sum + (count as number),
    0
  );
  const calculatedTotal = categories.reduce((sum: number, category: any) => {
    return sum + category.price * (tickets[category._id] || 0);
  }, 0);

  // Log all relevant data when the component renders
  useEffect(() => {
    console.log("Tickets:", tickets);
    console.log("Calculated total:", calculatedTotal);
    console.log("Discounted total:", discountedTotal);
    console.log("Coupons:", coupons);
  }, [tickets, calculatedTotal, discountedTotal, coupons]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories: {error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />
      <div className="bg-gray-100 min-h-screen p-4 sm:p-8 mt-12">
        <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-1/2 flex flex-col justify-between h-auto lg:h-[31.7rem]">
            <h2 className="text-2xl font-bold mb-4">Grab Your Tickets</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Wonderla provides regular tickets, fast track tickets for queue
              skipping, and Special Offer tickets.
            </p>
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-bold">Trending Coupons</h3>
              <div className="flex space-x-4">
                {coupons.map((coupon: any) => (
                  <div
                    key={coupon.code}
                    className={`cursor-pointer border p-4 rounded-md ${
                      activeCoupon?.code === coupon.code ? "bg-gray-200" : ""
                    }`}
                    onClick={() =>
                      handleCouponClick(coupon.code, coupon.discount)
                    }
                  >
                    <h4 className="font-bold">{coupon.code}</h4>
                    <p>{coupon.discount}% off on Regular Tickets</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-1/2 flex flex-col h-auto lg:h-[31.7rem] overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-2xl font-bold">Regular Ticket</h3>
            </div>
            <div className="border rounded-md p-4 mb-4">
              <p className="mb-2 text-gray-700">Allows Entry To Any Ride</p>
              {categories.map((category: any) => (
                <div
                  key={category._id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex items-center">
                    <FaUser className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-4 text-gray-500" />
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">
                        {category.name}
                      </h4>
                      <p className="text-base sm:text-lg">
                        ₹{category.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600"
                      onClick={() =>
                        handleCountChange(category._id, "decrement")
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-8 sm:w-12 text-center border-t border-b border-gray-300 focus:outline-none"
                      value={tickets[category._id] || 0}
                      readOnly
                    />
                    <button
                      className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                      onClick={() =>
                        handleCountChange(category._id, "increment")
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex items-center mt-4">
                <input
                  type="text"
                  className="border rounded-l-md p-2 flex-grow"
                  placeholder="Enter Coupon Code"
                  value={activeCoupon?.code || ""}
                  readOnly // Disable manual entry since coupon codes are managed via buttons
                />
                <button
                  className="bg-blue-500 text-white rounded-r-md px-2 sm:px-4 py-2 hover:bg-blue-600"
                  onClick={() => alert("Coupon applied!")} // This can be adjusted based on your logic
                  disabled={totalTickets === 0} // Disable if no tickets added
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
  <div>
    <h4 className="text-lg font-bold">Total Price:</h4>
    {activeCoupon ? (
      <div>
        <div className="flex items-center">
          <p className="text-lg sm:text-xl">
            ₹{calculatedTotal.toFixed(2)} {/* Original total */}
          </p>
          <p className="text-lg sm:text-xl text-red-500 ml-2">
            (-₹{(calculatedTotal - discountedTotal).toFixed(2)}) {/* Discounted amount */}
          </p>
        </div>
        <p className="text-lg sm:text-xl">
          ₹{discountedTotal.toFixed(2)} {/* Final discounted total */}
        </p>
      </div>
    ) : (
      <p className="text-lg sm:text-xl">
        ₹{calculatedTotal.toFixed(2)} {/* Show total if no coupon applied */}
      </p>
    )}
  </div>
  <button
    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    onClick={handleConfirm}
  >
    Confirm Tickets
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCartPage;
