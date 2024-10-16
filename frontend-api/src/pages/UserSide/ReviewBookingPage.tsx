import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaBed, FaUserFriends } from 'react-icons/fa';
import Timeline from '../../components/Timeline';
import { useNavigate } from 'react-router-dom';
import { decrementTicket, incrementTicket } from '../../redux/ticketSlice';

const ReviewBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access ticket and stay cart data from Redux
  const { tickets: ticket, categories, discountedTotal: ticketDiscountedTotal } = useSelector((state: any) => state.ticketCategory);
  const { stayCategories, tickets: stayTickets, total: stayTotal } = useSelector((state: any) => state.stayCategory);
  const selectedDate = useSelector((state: any) => state.date.selectedDate);

  // Calculate original ticket total
  const originalTicketTotal = categories.reduce((total: number, category: any) => {
    return total + (category.price * (ticket[category._id] || 0));
  }, 0);

  // Check if a coupon is applied; set ticketDiscountedTotal to 0 if not
  const effectiveDiscountedTotal = ticketDiscountedTotal > 0 ? ticketDiscountedTotal : 0;

  // Calculate grand total
  const grandTotal = originalTicketTotal - effectiveDiscountedTotal + stayTotal;

  // Calculate GST (18% of grand total)
  const gst = (grandTotal * 0.18).toFixed(2);

  // Calculate total amount to be paid
  const amountToBePaid = (grandTotal + parseFloat(gst)).toFixed(2);

  // Calculate total ticket count
  const totalTicketCount = Object.values(ticket).reduce((sum: number, count: any) => sum + count, 0);

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

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
      <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-6xl">
        {/* Left side: Booking Summary */}
        <div className="w-full lg:w-2/5 p-6 bg-white rounded-xl shadow-lg border border-gray-300 flex flex-col justify-between mb-8 lg:mb-0">
          <h2 className="text-2xl font-semibold mb-4 text-center">Booking Summary</h2>
          
          {/* Display total visitors and ticket total */}
          <div className="mb-4 text-center">
            <p className="text-md">
              Date of Visit:{" "}
              <span className="font-bold">
                {new Date(selectedDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </p>

            <div className="flex justify-center items-center mt-2">
              <FaUserFriends className="text-xl mr-2 text-gray-600" />
              <p className="text-md font-bold">
                Visitors: <span className="ml-1">{totalTicketCount}</span>
              </p>
            </div>

            <p className="text-md font-bold mt-4">
              Original Ticket Total: ₹{originalTicketTotal.toFixed(2)}
            </p>
            <p className="text-md font-bold">
              Discounted Total: ₹{effectiveDiscountedTotal.toFixed(2)}
            </p>
          </div>

          {/* Display ticket categories with count > 0 */}
          {categories
            .filter((category: any) => ticket[category._id] > 0)
            .map((category: any) => (
              <div key={category._id} className="flex justify-between items-center py-2 border-b border-gray-300">
                <div className="flex items-center">
                  <FaUser className="w-6 h-6 text-gray-500" />
                  <div className="ml-2">
                    <h4 className="font-bold">{category.name}</h4>
                    <p className="text-gray-600">₹{category.price.toFixed(2)}</p>
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
                    value={ticket[category._id] || 0}
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

          {/* Display Stay categories with count > 0 */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Stays Summary</h2>
          {stayCategories
            .filter((category: any) => stayTickets[category._id] > 0)
            .map((category: any) => (
              <div key={category._id} className="flex justify-between items-center py-2 border-b border-gray-300">
                <div className="flex items-center">
                  <FaBed className="w-6 h-6 text-gray-500" />
                  <div className="ml-2">
                    <h4 className="font-bold">{category.name}</h4>
                    <p className="text-gray-600">₹{category.price.toFixed(2)}</p>
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
            <h4 className="text-md font-bold">Grand Total: ₹{grandTotal.toFixed(2)}</h4>
            <h4 className="text-md font-bold">GST (18%): ₹{gst}</h4>
            <h4 className="text-lg font-bold">Amount to be Paid: ₹{amountToBePaid}</h4>
          </div>
        </div>

        {/* Right side: Billing Information */}
        <div className="w-full lg:w-2/5 p-6 bg-white rounded-xl shadow-lg border border-gray-300 flex flex-col justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-center">Add Your Billing Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name" />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <div className="flex items-center">
                <span className="p-2 bg-gray-200 border rounded-l">+91</span>
                <input type="text" className="w-full p-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter phone number" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input type="email" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email address" />
            </div>
            <div>
              <label className="block text-gray-700">PIN Code</label>
              <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your PIN code" />
            </div>
            <button
              type="button"
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              onClick={handleConfirm}
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewBookingPage;



// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FaUser } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { decrementTicket, incrementTicket } from '../../redux/ticketSlice';

// const ReviewBookingPage: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Access ticket and stay cart data from Redux
//   const { tickets: ticket, categories, discountedTotal: ticketDiscountedTotal } = useSelector((state: any) => state.ticketCategory);
//   const { stayCategories, tickets: stayTickets, total: stayTotal } = useSelector((state: any) => state.stayCategory);
//   const selectedDate = useSelector((state: any) => state.date.selectedDate); // Fetching date from Redux

//   // Calculate original ticket total by summing the price of tickets based on selected counts
//   const originalTicketTotal = categories.reduce((total: number, category: any) => {
//     return total + (category.price * (ticket[category._id] || 0));
//   }, 0);

//   // Calculate the discounted total
//   const discountedTotal = originalTicketTotal - ticketDiscountedTotal;

//   // Calculate grand total by summing ticket discounted total and stay total
//   const grandTotal = originalTicketTotal - discountedTotal + stayTotal;

//   // Calculate GST (18% of grand total)
//   const gst = (grandTotal * 0.18).toFixed(2);
  
//   // Calculate total amount to be paid
//   const amountToBePaid = (grandTotal + parseFloat(gst)).toFixed(2);

//   // Calculate the total ticket count (visitors) only from ticket cart, excluding stay cart
//   const totalTicketCount = Object.values(ticket).reduce((sum: number, count: any) => sum + count, 0);

//   const [currentStep, setCurrentStep] = useState(4);

//   // Redirect to home if there's no ticket data
//   useEffect(() => {
//     if (!Object.keys(ticket).length || !stayTotal) {
//       navigate("/"); // Navigate to home page if there's no ticket or stay data
//     }
//   }, [ticket, stayTotal, navigate]);

//   const handleConfirm = () => {
//     navigate("/billing");
//   };

//   // Update ticket count
//   const handleIncrement = (categoryId: string) => {
//     dispatch(incrementTicket(categoryId)); // Dispatch Redux action to increment count
//   };

//   const handleDecrement = (categoryId: string) => {
//     if (ticket[categoryId] > 0) {
//       dispatch(decrementTicket(categoryId)); // Dispatch Redux action to decrement count
//     }
//   };

//   return (
//     <div className="bg-blue-50 min-h-screen">
//       <div className="container mx-auto py-8">
//         <h1 className="text-3xl font-bold text-center mb-6">Review Booking</h1>
//         <div className="flex justify-center">
//           <div className="w-full max-w-2xl flex space-x-8">
//             {/* Left side: Booking Summary */}
//             <div className="flex-1 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
//               <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
//               <p className="text-lg mb-2">
//                 Date of Visit:{" "}
//                 <span className="font-bold">
//                   {new Date(selectedDate).toLocaleDateString('en-GB', {
//                     day: 'numeric',
//                     month: 'long',
//                     year: 'numeric',
//                   })}
//                 </span>
//               </p>
//               <p className="text-lg mb-4">
//                 Visitors: <span className="font-bold">{totalTicketCount}</span>
//               </p>
//               <div className="border-t border-gray-300 pt-4">
//                 {categories
//                   .filter((category: any) => ticket[category._id] > 0)
//                   .map((category: any) => (
//                     <div key={category._id} className="flex justify-between items-center py-2 border-b border-gray-200">
//                       <div className="flex items-center">
//                         <FaUser className="w-6 h-6 text-gray-600" />
//                         <div className="ml-2">
//                           <h4 className="font-bold">{category.name}</h4>
//                           <p className="text-gray-500">₹{category.price.toFixed(2)}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center">
//                         <button
//                           className="px-2 py-1 bg-blue-500 text-white rounded-l"
//                           onClick={() => handleDecrement(category._id)}
//                         >
//                           -
//                         </button>
//                         <input
//                           type="number"
//                           className="w-12 text-center border-t border-b"
//                           value={ticket[category._id] || 0}
//                           readOnly
//                         />
//                         <button
//                           className="px-2 py-1 bg-blue-500 text-white rounded-r"
//                           onClick={() => handleIncrement(category._id)}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//               </div>

//               <div className="mt-6 border-t border-gray-300 pt-4">
//                 <h4 className="text-lg font-bold">Total: ₹{originalTicketTotal.toFixed(2)}</h4>
//                 <h4 className="text-lg font-bold">Discounted Total: ₹{ticketDiscountedTotal.toFixed(2)}</h4>
//                 <h4 className="text-lg font-bold">Grand Total: ₹{grandTotal.toFixed(2)}</h4>
//                 <h4 className="text-lg font-bold">GST (18%): ₹{gst}</h4>
//                 <h4 className="text-lg font-bold">Amount to be Paid: ₹{amountToBePaid}</h4>
//               </div>
//             </div>

//             {/* Right side: Billing Information */}
//             <div className="flex-1 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
//               <h2 className="text-2xl font-semibold mb-4">Add Your Billing Information</h2>
//               <form className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700">Full Name</label>
//                   <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name" />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Phone Number</label>
//                   <div className="flex items-center">
//                     <span className="p-2 bg-gray-200 border rounded-l">+91</span>
//                     <input type="text" className="w-full p-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter phone number" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">Email Address</label>
//                   <input type="email" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email address" />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700">PIN Code</label>
//                   <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your PIN code" />
//                 </div>
//                 <button
//                   type="button"
//                   className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
//                   onClick={handleConfirm}
//                 >
//                   Proceed to Pay
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewBookingPage;

