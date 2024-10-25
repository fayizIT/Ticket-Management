import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementTicket, incrementTicket, applyDiscount, removeDiscount } from "../../../redux/ticketSlice"; 
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const RightPanel: React.FC<{ handleConfirm: () => void; couponCode: string; setCouponCode: (code: string) => void }> = ({ handleConfirm, couponCode, setCouponCode }) => {
    const dispatch = useDispatch();
    const { categories, tickets, activeCoupon, discountedTotal } = useSelector((state: any) => state.ticketCategory);
    
    const handleCountChange = (id: string, operation: "increment" | "decrement") => {
      if (operation === "increment") {
        dispatch(incrementTicket(id));
      } else {
        dispatch(decrementTicket(id));
      }
    };
  
    const totalTickets = Object.values(tickets).reduce((sum: number, count) => sum + (count as number), 0);
    const calculatedTotal = categories.reduce((sum: number, category: any) => sum + category.price * (tickets[category._id] || 0), 0);
  
    const handleApplyCoupon = () => {
      if (couponCode.trim()) {
        if (activeCoupon && activeCoupon.code === couponCode) {
          dispatch(removeDiscount());
          toast.success("Coupon removed");
          setCouponCode(""); // Clear the input after removing the coupon
        } else {
          const coupon = categories.find((c: any) => c.code === couponCode);
          if (coupon) {
            dispatch(applyDiscount({ id: coupon._id, code: coupon.code, discount: coupon.discount }));
            toast.success(`Coupon applied: ${coupon.code}`);
          } else {
            toast.error("Invalid coupon code");
          }
        }
      } else {
        toast.error("Please enter a coupon code");
      }
    };
  
    return (
      <div className="bg-white p-2 md:p-3 rounded-lg shadow-md w-full h-auto md:h-[380px] border border-gray-200 flex-grow -mt-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-900">Choose your tickets</h3>
        <div className="border rounded-md p-3 mb-3 bg-gray-50">
          {categories.map((category: any, index: number) => (
            <React.Fragment key={category._id}>
              <div className="flex justify-between items-center py-1">
                <div className="flex items-center">
                  <FaUser className="w-5 h-5 mr-2 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-sm text-gray-800">{category.name}</h4>
                    <p className="text-xs text-gray-700">₹{category.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-l-md hover:bg-blue-600"
                    onClick={() => handleCountChange(category._id, "decrement")}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-10 text-center border-t border-b border-gray-300 focus:outline-none text-xs"
                    value={tickets[category._id] || 0}
                    readOnly
                  />
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                    onClick={() => handleCountChange(category._id, "increment")}
                  >
                    +
                  </button>
                </div>
              </div>
              {index < categories.length - 1 && <hr className="border-t border-gray-300 my-2" />}
            </React.Fragment>
          ))}
        </div>
  
        {/* Input for Coupon Code */}
        <div className="flex items-center bg-blue-50 p-2 rounded-md mb-3">
          <input
            type="text"
            className="bg-transparent border-none flex-grow text-xs focus:outline-none placeholder-gray-500"
            placeholder="Enter a Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)} 
          />
          <button
            className="bg-blue-500 text-white rounded-md px-2 py-1 text-xs hover:bg-blue-600"
            onClick={handleApplyCoupon}
          >
            {activeCoupon ? "Remove" : "Apply"}
          </button>
        </div>
  
        <div className="w-full flex justify-between items-center mt-2">
  <p className="text-sm text-blue-900 font-bold">
    {totalTickets} Tickets: ₹{activeCoupon ? discountedTotal.toFixed(2) : calculatedTotal.toFixed(2)}
  </p>
  <button
    className="flex justify-center bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-800 text-xs transition duration-300"
    onClick={handleConfirm}
  >
    Continue
  </button>
</div>

      </div>
    );
  };

export default RightPanel;
