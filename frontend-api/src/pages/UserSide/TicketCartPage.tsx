import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgeCategories } from "../../redux/ageCategorySlice";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Timeline from "../../components/Timeline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const TicketCartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state: any) => state.ageCategory
  );

  const [ticketCounts, setTicketCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const [showRegularTicket, setShowRegularTicket] = useState(true); // State to toggle regular ticket visibility
  const [couponCode, setCouponCode] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    dispatch(fetchAgeCategories() as any);
  }, [dispatch]);

  const handleCountChange = (
    id: string,
    operation: "increment" | "decrement"
  ) => {
    setTicketCounts((prevCounts) => {
      const currentCount = prevCounts[id] || 0;
      const newCount =
        operation === "increment"
          ? currentCount + 1
          : Math.max(0, currentCount - 1);
      return { ...prevCounts, [id]: newCount };
    });
  };

  const calculateTotal = () => {
    return Object.keys(ticketCounts).reduce((total, id) => {
      const category = categories.find((cat: any) => cat._id === id);
      return total + (category?.price || 0) * (ticketCounts[id] || 0);
    }, 0);
  };

  const handleConfirm = () => {
    // Calculate total number of tickets selected
    const totalTickets = Object.values(ticketCounts).reduce(
      (sum, count) => sum + count,
      0
    );

    // Check if at least one ticket is selected
    if (totalTickets === 0) {
      toast.error("Please add at least one ticket.");
      return;
    }

    // Increment the current step to mark it as completed and set it to green
    if (currentStep < 5) {
      setCurrentStep(currentStep + 2);
      console.log("Confirmed Tickets:", ticketCounts);
    }

    // Navigate to the next page
    navigate("/park-rules");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories: {error}</p>;

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />
      {/* <Header /> */}
      <div className="bg-gray-100 min-h-screen p-4 sm:p-8 mt-12">
        <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left Side - Ticket Information */}
          <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-1/2 flex flex-col justify-between h-auto lg:h-[31.7rem]">
            <div>
              <button className="text-blue-600 font-semibold mb-4 flex items-center">
                <FaShoppingCart className="mr-2" />
                Grab Your Tickets
              </button>
              <h2 className="text-2xl font-bold mb-4">Grab Your Tickets</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Wonderla provides regular tickets, fast track tickets for queue
                skipping, and Special Offer tickets.
              </p>
            </div>
          </div>

          {/* Right Side - Ticket Types */}
          <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-1/2 flex flex-col h-auto lg:h-[31.7rem] overflow-y-auto">
            <div className="mb-4">
              <h3
                className="text-2xl font-bold cursor-pointer"
                onClick={() => setShowRegularTicket((prev) => !prev)}
              >
                Regular Ticket
                <span className="ml-2 text-blue-500 text-sm">
                  {showRegularTicket ? "" : ""}
                </span>
              </h3>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showRegularTicket
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
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
                      <div className="flex items-center">
                        <button
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out"
                          onClick={() =>
                            handleCountChange(category._id, "decrement")
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-8 sm:w-12 text-center border-t border-b border-gray-300 focus:outline-none"
                          value={ticketCounts[category._id] || 0}
                          readOnly
                        />
                        <button
                          className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out"
                          onClick={() =>
                            handleCountChange(category._id, "increment")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Coupon Code Input */}
                <div className="flex items-center mt-4">
                  <input
                    type="text"
                    className="border rounded-l-md p-2 flex-grow"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white rounded-r-md px-2 sm:px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => alert("Coupon applied!")}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-base sm:text-lg font-bold">
                  Total: ₹{calculateTotal().toFixed(2)}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Excl. all taxes
                </p>
              </div>
              <button
                className="bg-blue-700 text-white py-2 px-4 rounded-full hover:bg-blue-800 transition-colors duration-200 text-sm sm:text-base"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCartPage;
