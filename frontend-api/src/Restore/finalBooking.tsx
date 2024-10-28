import React from "react";
import { FaUser, FaBed, FaUserFriends } from "react-icons/fa";

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
    stayTickets: { [key: string]: number };
    stayCategories: TicketCategory[];
    gst: string;
    discountAmount: number;
    amountToBePaid: string;
    updateTicketCount: (categoryId: string, action: 'increment' | 'decrement') => void;
    updateStayCount: (categoryId: string, action: 'increment' | 'decrement') => void;
    handleDecrementWithCheck: (categoryId: string) => void;
  }

const BookingSummary: React.FC <BookingSummaryProps> = ({
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
  handleDecrementWithCheck
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex flex-col h-auto max-h-[500px] md:h-[585px] w-[450px] mx-auto md:mx-0">
    <h2 className="text-lg font-semibold mb-4 text-center">Booking Summary</h2>
  
    <div className="mb-4 text-center">
      <div className="flex justify-between items-start">
        <div className="flex flex-col items-center">
          <p className="text-xs">Date of Visit:</p>
          <span className="font-bold text-sm">
            {new Date(selectedDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
  
        <div className="flex flex-col items-center mt-2 md:mt-0">
          <div className="flex items-center">
            <FaUserFriends className="text-xl mr-1 text-gray-600" />
            <p className="text-xs font-bold">Visitors:</p>
          </div>
          <span className="font-bold text-sm ml-1">{totalTicketCount}</span>
        </div>
  
        <div className="flex flex-col items-center mt-2 md:mt-0">
          <p className="text-xs font-bold">Total:</p>
          <span className="font-bold text-sm">₹{originalTicketTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  
    <h2 className="text-md font-semibold mt-4 mb-2">Ticket Summary</h2>
    {Object.keys(ticket).length > 0 ? (
      Object.keys(ticket)
        .filter((categoryId) => ticket[categoryId] > 0)
        .map((categoryId) => {
          const category = categories.find((cat: any) => cat._id === categoryId);
          if (category) {
            const count = ticket[categoryId];
            return (
              <div key={category._id} className="flex justify-between items-center py-2 border-b border-gray-300">
                <div className="flex items-center">
                  <FaUser className="w-6 h-6 text-gray-500" />
                  <div className="ml-2">
                    <h4 className="font-bold text-sm">{category.name}</h4>
                    <p className="text-gray-600 text-xs">₹{category.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="w-8 h-8 bg-blue-900 text-white rounded-full hover:bg-blue-900 flex items-center justify-center"
                    onClick={() => handleDecrementWithCheck(category._id)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-10 h-8 text-center border-t border-b border-gray-300 focus:outline-none text-xs rounded-md py-0.5 mt-0.5 mx-2 flex items-center justify-center"
                    value={count}
                    readOnly
                  />
                  <button
                    className="w-8 h-8 bg-blue-900 text-white rounded-full hover:bg-blue-900 flex items-center justify-center"
                    onClick={() => updateTicketCount(category._id, 'increment')}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })
    ) : (
      <p className="text-gray-500 text-xs">No tickets added.</p>
    )}
  
    <h2 className="text-md font-semibold mt-4 mb-2">Stays Summary</h2>
    {Object.keys(stayTickets).length > 0 && Object.values(stayTickets).some((count: any) => count > 0) ? (
      stayCategories
        .filter((category: any) => stayTickets[category._id] > 0)
        .map((category: any) => (
          <div key={category._id} className="flex justify-between items-center py-2 border-b border-gray-300">
            <div className="flex items-center">
              <FaBed className="w-6 h-6 text-gray-500" />
              <div className="ml-2">
                <h4 className="font-bold text-sm">{category.name}</h4>
                <p className="text-gray-600 text-xs">₹{category.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded-l"
                onClick={() => updateStayCount(category._id, 'decrement')}
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
                onClick={() => updateStayCount(category._id, 'increment')}
              >
                +
              </button>
            </div>
          </div>
        ))
    ) : (
      <p className="text-gray-500 text-xs">No tickets added in stay cart.</p>
    )}
  
    <div className="mt-3  pt-1" />
    <h4 className="text-xs font-bold">Ticket GST (18%): ₹{gst}</h4>
    <h4 className="text-xs font-bold text-red-600">Coupon Discount: ₹-{discountAmount.toFixed(2)}</h4>
    <div className="border-t border-gray-300 my-4" />
    <h4 className="text-md font-bold">Grand Total: ₹{amountToBePaid}</h4>
  </div>
  
  );
};

