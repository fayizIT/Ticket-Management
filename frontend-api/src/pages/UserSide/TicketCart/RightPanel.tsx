import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementTicket,
  incrementTicket,
  applyDiscount,
  removeDiscount,
} from "../../../redux/ticketSlice";
import { FaPlus, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { TiMinus } from "react-icons/ti";

const RightPanel: React.FC<{
  handleConfirm: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
}> = ({ handleConfirm, couponCode, setCouponCode }) => {
  const dispatch = useDispatch();
  const { categories, tickets, activeCoupon, discountedTotal } = useSelector(
    (state: any) => state.ticketCategory
  );

  const handleCountChange = (
    id: string,
    operation: "increment" | "decrement"
  ) => {
    if (operation === "increment") {
      dispatch(incrementTicket(id));
    } else {
      dispatch(decrementTicket(id));
    }
  };

  const totalTickets = Object.values(tickets).reduce(
    (sum: number, count) => sum + (count as number),
    0
  );
  const calculatedTotal = categories.reduce(
    (sum: number, category: any) =>
      sum + category.price * (tickets[category._id] || 0),
    0
  );

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      if (activeCoupon && activeCoupon.code === couponCode) {
        dispatch(removeDiscount());
        toast.success("Coupon removed");
        setCouponCode("");
      } else {
        const coupon = categories.find((c: any) => c.code === couponCode);
        if (coupon) {
          dispatch(
            applyDiscount({
              id: coupon._id,
              code: coupon.code,
              discount: coupon.discount,
            })
          );
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
    <div className="bg-white p-2 md:p-3 rounded-3xl shadow-md w-full h-auto md:h-[380px] border border-gray-300 flex-grow -mt-6">
      <h3 className="text-lg font-extrabold mb-2 text-blue-900">
        Choose your tickets
      </h3>
      <div className="border rounded-md p-3 mb-3 bg-gray-50">
        {categories.map((category: any, index: number) => (
          <React.Fragment key={category._id}>
            <div className="flex justify-between items-center py-1">
              <div className="flex items-center">
                <FaUser className="w-5 h-5 mr-2 text-blue-900" />
                <div>
                  <h4 className="font-semibold text-sm text-blue-900">
                    {category.name}
                  </h4>
                  <p className="text-xs text-blue-900 font-semibold">
                    ₹{category.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center w-1/3">
              <div className="flex items-center bg-blue-900 rounded-full px-1 py-1">
                <button
                   className="w-6 h-6 bg-white text-blue-900 rounded-full flex items-center justify-center hover:bg-blue-200"
                  onClick={() => handleCountChange(category._id, "decrement")}
                >
                  <TiMinus size={12} />
                </button>
                <input
                  type="number"
                  className="w-7 h-4 text-center bg-transparent text-white focus:outline-none text-xs mx-2"
                  value={tickets[category._id] || 0}
                  readOnly
                />

                <button
                 className="w-6 h-6 bg-white text-blue-900 rounded-full flex items-center justify-center hover:bg-blue-200"
                  onClick={() => handleCountChange(category._id, "increment")}
                >
                  <FaPlus size={12} />
                </button>
              </div>
              </div>
            </div>
            {index < categories.length - 1 && (
              <hr className="border-t border-gray-300 my-3" />
            )}{" "}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center bg-blue-50 p-2 rounded-md mb-3">
        <input
          type="text"
          className="bg-transparent border-none flex-grow text-xs focus:outline-none placeholder-blue-900 font-semibold"
          placeholder="Enter a Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          className="bg-blue-900 text-white rounded-md px-2 py-1 text-xs hover:bg-blue-900 font-semibold"
          onClick={handleApplyCoupon}
        >
          {activeCoupon ? "Remove" : "Apply"}
        </button>
      </div>

      <div className="w-full flex justify-between items-center mt-2">
        <p className="text-sm text-blue-900 font-bold">
          {totalTickets} Tickets: ₹
          {activeCoupon
            ? discountedTotal.toFixed(2)
            : calculatedTotal.toFixed(2)}
        </p>
        <button
          className="flex justify-center font-bold bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-800 text-xs transition duration-300"
          onClick={handleConfirm}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
