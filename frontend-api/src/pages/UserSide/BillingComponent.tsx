import React, { useState } from 'react';

interface BillingComponentProps {
  initialTicketCount?: number;
  initialStayCount?: number;
  ticketPrice?: number;
  stayPrice?: number;
}

const BillingComponent: React.FC<BillingComponentProps> = ({
  initialTicketCount = 2,
  initialStayCount = 1,
  ticketPrice = 620,
  stayPrice = 500,
}) => {
  const [ticketCount, setTicketCount] = useState(initialTicketCount);
  const [stayCount, setStayCount] = useState(initialStayCount);

  // Calculate totals
  const totalTickets = ticketCount * ticketPrice;
  const totalStay = stayCount * stayPrice;
  const finalTotal = totalTickets + totalStay;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 mt-8">
      <h2 className="text-2xl font-bold mb-4">Billing Summary</h2>

      {/* Ticket Cart */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={() => setTicketCount(Math.max(0, ticketCount - 1))}
            className="text-blue-700"
            disabled={ticketCount <= 0}
          >
            -
          </button>
          <span className="mx-2">{ticketCount} Ticket(s)</span>
          <button
            onClick={() => setTicketCount(ticketCount + 1)}
            className="text-blue-700"
          >
            +
          </button>
        </div>
        <span>₹{totalTickets.toFixed(2)}</span>
      </div>

      {/* Stay Cart */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={() => setStayCount(Math.max(0, stayCount - 1))}
            className="text-blue-700"
            disabled={stayCount <= 0}
          >
            -
          </button>
          <span className="mx-2">{stayCount} Stay(s)</span>
          <button
            onClick={() => setStayCount(stayCount + 1)}
            className="text-blue-700"
          >
            +
          </button>
        </div>
        <span>₹{totalStay.toFixed(2)}</span>
      </div>

      {/* Final Total */}
      <div className="flex justify-between items-center font-bold mb-4">
        <span>Final Total</span>
        <span>₹{finalTotal.toFixed(2)}</span>
      </div>

      {/* Input Fields for User Details */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Full Name"
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Phone Number"
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Email ID"
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pin Code"
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {/* Proceed Button */}
      <button className="bg-blue-700 text-white py-3 px-6 rounded-full w-full hover:bg-blue-800">
        Proceed to Payment
      </button>
    </div>
  );
};

export default BillingComponent;
