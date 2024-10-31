import React from "react";
import { FaBed, FaPlus, FaUser, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TiMinus } from "react-icons/ti";

interface TicketCategory {
  _id: string;
  name: string;
  price: number;
}

interface BookingSummaryProps {
  selectedDate: string;
  totalTicketCount: number;
  originalTicketTotal: number;
  ticket: { [key: string]: number };
  categories: TicketCategory[];
  stayCategories: TicketCategory[];
  stayTickets: { [key: string]: number };
  gst: string;
  discountAmount: number;
  amountToBePaid: string;
  updateTicketCount: (
    categoryId: string,
    action: "increment" | "decrement"
  ) => void;
  updateStayCount: (
    categoryId: string,
    action: "increment" | "decrement"
  ) => void;
  handleDecrementWithCheck: (categoryId: string) => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedDate,
  totalTicketCount,
  originalTicketTotal,
  ticket,
  categories,
  stayTickets,
  stayCategories,
  gst,
  discountAmount,
  amountToBePaid,
  updateTicketCount,
  updateStayCount,
  handleDecrementWithCheck,
}) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/park-rules");
  };

  const  icon ='/assets/images/backwardicon.png';

  return (
    <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-300 flex flex-col h-auto max-h-full w-full md:w-[450px] mx-auto">
      <div className="flex items-center mb-4">
        <img
          src={icon}
          alt="Park Icon"
          className="mr-2 w-8 h-8 cursor-pointer"
          onClick={handleIconClick}
        />
        <h2 className="text-lg font-bold text-blue-900">Booking Summary</h2>
      </div>

      <div className="mb-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-900">
          <div className="flex flex-col items-center">
            <p className="text-[#15196E] opacity-40 text-md font-bold">
              Date of Visit
            </p>
            <span className="font-bold text-sm">
              {new Date(selectedDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <FaUserFriends className="text-xl mr-1 text-blue-900" />
              <p className="text-[#15196E] opacity-40 text-md font-bold">
                Visitors
              </p>
            </div>
            <span className="font-bold text-sm ml-1">{totalTicketCount}</span>
          </div>

          <div className="flex flex-col items-center ">
            <p className="text-[#15196E] opacity-40 text-md font-bold ">Total</p>
            <span className="font-bold text-sm mr-2">
              ₹{originalTicketTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {Object.keys(ticket).length > 0 ? (
        Object.keys(ticket)
          .filter((categoryId) => ticket[categoryId] > 0)
          .map((categoryId) => {
            const category = categories.find((cat) => cat._id === categoryId);
            if (category) {
              const count = ticket[categoryId];
              return (
                <div
                  key={category._id}
                  className="flex justify-between items-center py-2 border-b border-gray-300 text-blue-900"
                >
                  <div className="flex items-center w-1/2">
                    <FaUser className="w-6 h-6 text-blue-900" />
                    <div className="ml-2">
                      <h4 className="font-bold text-sm">{category.name}</h4>
                      <p className="text-xs font-semibold text-blue-900">
                        ₹{category.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-1/3">
                    <div className="flex items-center bg-blue-900 rounded-full px-1 py-1">
                      <button
                        className="w-6 h-6 bg-white text-blue-900 rounded-full flex items-center justify-center hover:bg-blue-200"
                        onClick={() => {
                          if (totalTicketCount <= 1) {
                            navigate("/");
                          } else {
                            handleDecrementWithCheck(category._id);
                          }
                        }}
                      >
                        <TiMinus size={12} />
                      </button>
                      <input
                        type="number"
                        className="w-7 h-4 text-center bg-transparent text-white focus:outline-none text-xs mx-2"
                        value={count || 0}
                        readOnly
                      />
                      <button
                        className="w-6 h-6 bg-white text-blue-900 rounded-full flex items-center justify-center hover:bg-blue-200"
                        onClick={() =>
                          updateTicketCount(category._id, "increment")
                        }
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-blue-900 w-1/5 text-right">
                    ₹{(count * category.price).toFixed(2)}
                  </p>
                </div>
              );
            }
            return null;
          })
      ) : (
        <p className="text-gray-500 text-xs text-center">No tickets added.</p>
      )}

      <div className="mt-3 pt-1 flex items-center justify-between">
        <div className="flex items-center w-full">
          <h4 className="text-md font-bold text-[#15196E] opacity-40 mr-2 whitespace-nowrap">
            Ticket GST (18%):
          </h4>
          <div className="border-t-2 border-gray-300 flex-grow"></div>
        </div>
        <span className="text-md font-bold text-blue-900 ml-4">₹{gst}</span>
      </div>

      {discountAmount > 0 ? (
        <div className="mt-2 flex justify-between items-center">
          <h4 className="text-md font-bold text-red-600 mr-2 whitespace-nowrap">Coupon Discount:</h4>
          <div className="border-t-2 border-gray-300 flex-grow"></div>
          <span className="text-md font-bold text-red-600">
            ₹-{discountAmount.toFixed(2)}
          </span>
        </div>
      ) : (
        <div className="mt-2 flex justify-between items-center">
          
          <h4 className="text-md font-bold text-red-600 ">Coupon Discount:</h4>
          

          <span className="text-[#15196E] opacity-40 text-md">
            No coupon applied
          </span>
        </div>
      )}

      <div className="border-t border-gray-300 my-4" />

      <div className="flex items-center text-blue-900 rounded-lg bg-blue-50 p-2 shadow-sm border border-gray-300">
        <div className="flex items-center w-full">
          <h4 className="text-lg font-bold mr-2 whitespace-nowrap">
            Final Summary
          </h4>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <div className="text-blue-900 ml-4">
          <span className="text-lg font-bold">₹{amountToBePaid}</span>
        </div>
      </div>
    </div>
  );
};

