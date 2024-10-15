
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketCategories, incrementTicket, decrementTicket } from "../../redux/ticketSlice";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Timeline from "../../components/Timeline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TicketCartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, loading, error, tickets, total } = useSelector((state: any) => state.ticketCategory);

  const [currentStep, setCurrentStep] = useState(1);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    dispatch(fetchTicketCategories()as any);
  }, [dispatch]);

  const handleCountChange = (id: string, operation: "increment" | "decrement") => {
    if (operation === "increment") {
      dispatch(incrementTicket(id));
    } else {
      dispatch(decrementTicket(id));
    }
  };

  const handleConfirm = () => {
    const totalTickets = Object.values(tickets).reduce((sum: number, count) => sum + (count as number), 0);
    if (totalTickets === 0) {
      toast.error("Please add at least one ticket.");
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/stay-categories");
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

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
              Wonderla provides regular tickets, fast track tickets for queue skipping, and Special Offer tickets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-1/2 flex flex-col h-auto lg:h-[31.7rem] overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-2xl font-bold">Regular Ticket</h3>
            </div>
            <div className="border rounded-md p-4 mb-4">
              <p className="mb-2 text-gray-700">Allows Entry To Any Ride</p>
              {categories.map((category: any) => (
                <div key={category._id} className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center">
                    <FaUser className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-4 text-gray-500" />
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">{category.name}</h4>
                      <p className="text-base sm:text-lg">₹{category.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600"
                      onClick={() => handleCountChange(category._id, "decrement")}>
                      -
                    </button>
                    <input type="number" className="w-8 sm:w-12 text-center border-t border-b border-gray-300 focus:outline-none"
                      value={tickets[category._id] || 0} readOnly />
                    <button className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                      onClick={() => handleCountChange(category._id, "increment")}>
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex items-center mt-4">
                <input type="text" className="border rounded-l-md p-2 flex-grow"
                  placeholder="Enter Coupon Code" value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)} />
                <button className="bg-blue-500 text-white rounded-r-md px-2 sm:px-4 py-2 hover:bg-blue-600"
                  onClick={() => alert("Coupon applied!")}>
                  Apply
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h4 className="text-lg font-bold">Total Price:</h4>
                <p className="text-lg sm:text-xl">₹{total.toFixed(2)}</p>
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={handleConfirm}>
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

