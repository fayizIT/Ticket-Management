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





















// import React from "react";
// import { FaUser, FaUserFriends } from "react-icons/fa";

// interface TicketCategory {
//   _id: string;
//   name: string;
//   price: number;
// }

// interface BookingSummaryProps {
//   selectedDate: string;
//   totalTicketCount: number;
//   originalTicketTotal: number;
//   ticket: { [key: string]: number };
//   categories: TicketCategory[];
//   stayTickets: { [key: string]: number };
//   stayCategories: TicketCategory[];
//   gst: string;
//   discountAmount: number;
//   amountToBePaid: string;
//   updateTicketCount: (
//     categoryId: string,
//     action: "increment" | "decrement"
//   ) => void;
//   updateStayCount: (
//     categoryId: string,
//     action: "increment" | "decrement"
//   ) => void;
//   handleDecrementWithCheck: (categoryId: string) => void;
// }

// const BookingSummary: React.FC<BookingSummaryProps> = ({
//   selectedDate,
//   totalTicketCount,
//   originalTicketTotal,
//   ticket,
//   categories,
//   gst,
//   discountAmount,
//   amountToBePaid,
//   updateTicketCount,
//   handleDecrementWithCheck,
// }) => {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 flex flex-col h-auto max-h-[480px] md:h-[575px] w-[450px] mx-auto md:mx-0">
//       <h2 className="text-lg font-semibold mb-4 text-center">
//         Booking Summary
//       </h2>

//       <div className="mb-4 text-center">
//         <div className="flex justify-between items-start">
//           <div className="flex flex-col items-center">
//             <p className="text-xs">Date of Visit:</p>
//             <span className="font-bold text-sm">
//               {new Date(selectedDate).toLocaleDateString("en-GB", {
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//               })}
//             </span>
//           </div>

//           <div className="flex flex-col items-center mt-2 md:mt-0">
//             <div className="flex items-center">
//               <FaUserFriends className="text-xl mr-1 text-gray-600" />
//               <p className="text-xs font-bold">Visitors:</p>
//             </div>
//             <span className="font-bold text-sm ml-1">{totalTicketCount}</span>
//           </div>

//           <div className="flex flex-col items-center mt-2 md:mt-0">
//             <p className="text-xs font-bold">Total:</p>
//             <span className="font-bold text-sm">
//               ₹{originalTicketTotal.toFixed(2)}
//             </span>
//           </div>
//         </div>
//       </div>

//       <h2 className="text-md font-semibold mt-4 mb-2">Ticket Summary</h2>
//       {Object.keys(ticket).length > 0 ? (
//         Object.keys(ticket)
//           .filter((categoryId) => ticket[categoryId] > 0)
//           .map((categoryId) => {
//             const category = categories.find(
//               (cat: any) => cat._id === categoryId
//             );
//             if (category) {
//               const count = ticket[categoryId];
//               return (
//                 <div
//                   key={category._id}
//                   className="flex justify-between items-center py-2 border-b border-gray-300"
//                 >
//                   <div className="flex items-center">
//                     <FaUser className="w-6 h-6 text-gray-500" />
//                     <div className="ml-2">
//                       <h4 className="font-bold text-sm">{category.name}</h4>
//                       <p className="text-gray-600 text-xs">
//                         ₹{category.price.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     <button
//                       className="w-8 h-8 bg-blue-900 text-white rounded-full hover:bg-blue-900 flex items-center justify-center"
//                       onClick={() => handleDecrementWithCheck(category._id)}
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       className="w-10 h-8 text-center border-t border-b border-gray-300 focus:outline-none text-xs rounded-md py-0.5 mt-0.5 mx-2 flex items-center justify-center"
//                       value={count}
//                       readOnly
//                     />
//                     <button
//                       className="w-8 h-8 bg-blue-900 text-white rounded-full hover:bg-blue-900 flex items-center justify-center"
//                       onClick={() =>
//                         updateTicketCount(category._id, "increment")
//                       }
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               );
//             }
//             return null;
//           })
//       ) : (
//         <p className="text-gray-500 text-xs">No tickets added.</p>
//       )}

//       <div className="mt-3  pt-1" />
//       <h4 className="text-xs font-bold">Ticket GST (18%): ₹{gst}</h4>
//       <h4 className="text-xs font-bold text-red-600">
//         Coupon Discount: ₹-{discountAmount.toFixed(2)}
//       </h4>
//       <div className="border-t border-gray-300 my-4" />
//       <h4 className="text-md font-bold  mb-6 md:fixed bottom-14">
//         Final Summery: ₹{amountToBePaid}
//       </h4>
//     </div>
//   );
// };

// export default BookingSummary;




// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTicketCategories,
//   incrementTicket,
//   decrementTicket,
//   applyDiscount,
//   removeDiscount,
// } from "../../redux/ticketSlice";
// import { FaUser } from "react-icons/fa";
// import Timeline from "../../components/Timeline";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import CouponService from "../../services/CouponService";

// const TicketCartPage: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { categories, loading, error, tickets, activeCoupon, discountedTotal } =
//     useSelector((state: any) => state.ticketCategory);
//   const selectedDate = useSelector((state: any) => state.date.selectedDate);

//   const [currentStep, setCurrentStep] = useState(1);
//   const [coupons, setCoupons] = useState([]);

//   useEffect(() => {
//     if (!selectedDate) {
//       navigate("/");
//     }
//   }, [navigate, selectedDate]);

//   useEffect(() => {
//     const fetchCoupons = async () => {
//       try {
//         const fetchedCoupons = await CouponService.fetchCoupons();
//         setCoupons(fetchedCoupons as React.SetStateAction<never[]>);
//       } catch (error) {
//         toast.error("Failed to fetch coupons");
//       }
//     };
//     fetchCoupons();
//     dispatch(fetchTicketCategories() as any);
//   }, [dispatch]);

//   const handleCountChange = (
//     id: string,
//     operation: "increment" | "decrement"
//   ) => {
//     if (operation === "increment") {
//       dispatch(incrementTicket(id));
//     } else {
//       dispatch(decrementTicket(id));
//     }
//   };

//   const handleConfirm = () => {
//     const totalTickets = Object.values(tickets).reduce(
//       (sum: number, count) => sum + (count as number),
//       0
//     );
//     if (totalTickets === 0) {
//       toast.error("Please add at least one ticket.");
//       return;
//     }
//     if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//     }
//     navigate("/stay-categories");
//   };

//   const handleStepClick = (step: number) => {
//     setCurrentStep(step);
//   };

//   const handleCouponClick = (
//     id: string,
//     code: string,
//     discountAmount: number
//   ) => {
//     const totalTickets = Object.values(tickets).reduce(
//       (sum: number, count) => sum + (count as number),
//       0
//     );
//     if (totalTickets > 0) {
//       if (activeCoupon && activeCoupon.code === code) {
//         dispatch(removeDiscount());
//         toast.success("Coupon removed");
//       } else {
//         const calculatedTotal = categories.reduce(
//           (sum: number, category: any) => {
//             return sum + category.price * (tickets[category._id] || 0);
//           },
//           0
//         );
//         const discountedTotal = Math.max(
//           0,
//           calculatedTotal - calculatedTotal * (discountAmount / 100)
//         );
//         dispatch(applyDiscount({ id, code, discount: discountAmount }));
//         toast.success(`Coupon applied: ${code}`);
//       }
//     } else {
//       toast.error("Please add at least one ticket before applying a coupon.");
//     }
//   };

//   const totalTickets = Object.values(tickets).reduce(
//     (sum: number, count) => sum + (count as number),
//     0
//   );
//   const calculatedTotal = categories.reduce((sum: number, category: any) => {
//     return sum + category.price * (tickets[category._id] || 0);
//   }, 0);

//   useEffect(() => {
//     // Log all relevant data when the component renders
//     // Removed console.log statements
//   }, [tickets, calculatedTotal, discountedTotal, coupons, activeCoupon]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading categories: {error}</p>;

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Timeline currentStep={currentStep} onStepClick={handleStepClick} />
//       <div className="bg-gray-50 min-h-screen p-4 sm:p-8 mt-12">
//         <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-y-0 lg:space-x-8">
//           {/* Left Side - Tickets Info */}
//           <div className="bg-white p-6 rounded-xl shadow-lg w-full flex flex-col lg:h-[35rem]">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//               Grab Your Tickets
//             </h2>
//             <p className="text-gray-600 mb-6 leading-relaxed text-sm">
//               Wonderla provides regular tickets, fast track tickets for queue
//               skipping, and Special Offer tickets.
//             </p>
//             <div className="flex flex-col space-y-4">
//               <h3 className="text-lg font-semibold text-gray-700">
//                 Trending Coupons
//               </h3>
//               <div className="flex flex-wrap justify-between space-x-4">
//                 {coupons
//                   .filter((coupon: any) => coupon.isActive === true)
//                   .map((coupon: any) => (
//                     <div
//                       key={coupon.code}
//                       className={`flex-1 cursor-pointer border p-4 rounded-md text-sm m-2 ${
//                         activeCoupon?.code === coupon.code
//                           ? "bg-orange-100 border-orange-300"
//                           : "bg-orange-50"
//                       }`}
//                       onClick={() =>
//                         handleCouponClick(
//                           coupon._id,
//                           coupon.code,
//                           coupon.discount
//                         )
//                       }
//                     >
//                       <h4 className="font-bold text-gray-800">{coupon.code}</h4>
//                       <p className="text-gray-600">
//                         {coupon.discount}% off on Regular Tickets
//                       </p>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Ticket Cart */}
//           <div className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-1/2 flex flex-col justify-between h-full lg:h-[35rem] overflow-y-auto">
//             <div className="mb-4">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Regular Ticket
//               </h3>
//             </div>
//             <div className="border rounded-md p-4 mb-4 bg-gray-50">
//               <p className="mb-2 text-gray-700 text-sm">
//                 Allows Entry To Any Ride
//               </p>
//               {categories.map((category: any) => (
//                 <div
//                   key={category._id}
//                   className="flex justify-between items-center border-b py-2"
//                 >
//                   <div className="flex items-center">
//                     <FaUser className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-4 text-gray-500" />
//                     <div>
//                       <h4 className="font-semibold text-sm sm:text-base text-gray-800">
//                         {category.name}
//                       </h4>
//                       <p className="text-base sm:text-lg text-gray-700">
//                         ₹{category.price.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     <button
//                       className="px-2 sm:px-3 py-1 sm:py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600"
//                       onClick={() =>
//                         handleCountChange(category._id, "decrement")
//                       }
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       className="w-8 sm:w-10 text-center border-t border-b border-gray-300 focus:outline-none"
//                       value={tickets[category._id] || 0}
//                       readOnly
//                     />
//                     <button
//                       className="px-2 sm:px-3 py-1 sm:py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
//                       onClick={() =>
//                         handleCountChange(category._id, "increment")
//                       }
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <div className="flex items-center mt-4">
//                 <input
//                   type="text"
//                   className="border rounded-l-md p-2 flex-grow text-sm"
//                   placeholder="Enter Coupon Code"
//                   value={activeCoupon?.code || ""}
//                   onChange={(e) =>
//                     dispatch(
//                       applyDiscount({
//                         id: null,
//                         code: e.target.value,
//                         discount: 0,
//                       })
//                     )
//                   }
//                 />
//                 <button
//                   className={`bg-blue-500 text-white rounded-r-md px-3 py-2 text-sm hover:bg-blue-600 ${
//                     activeCoupon ? "bg-red-500" : "bg-blue-500"
//                   }`}
//                   onClick={() => {
//                     if (activeCoupon) {
//                       dispatch(removeDiscount());
//                       toast.success("Coupon removed");
//                     } else {
//                       toast.error("Invalid coupon code");
//                     }
//                   }}
//                 >
//                   {activeCoupon ? "Remove Coupon" : "Apply Coupon"}
//                 </button>
//               </div>
//             </div>

//             <div className="flex justify-between items-center mt-4">
//               <div>
//                 <h4 className="text-lg font-bold text-gray-800">
//                   Total Price:
//                 </h4>
//                 {activeCoupon ? (
//                   <div>
//                     <div className="flex items-center">
//                       <p className="text-lg sm:text-xl text-gray-800">
//                         ₹{calculatedTotal.toFixed(2)}
//                       </p>
//                       <p className="text-lg sm:text-xl text-red-500 ml-2">
//                         (-₹{(calculatedTotal - discountedTotal).toFixed(2)})
//                       </p>
//                     </div>
//                     <p className="text-lg sm:text-xl text-gray-800">
//                       ₹{discountedTotal.toFixed(2)}
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-lg sm:text-xl text-gray-800">
//                     ₹{calculatedTotal.toFixed(2)}
//                   </p>
//                 )}
//               </div>
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm"
//                 onClick={handleConfirm}
//               >
//                 Confirm Tickets
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };








// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { FaUser, FaBed, FaUserFriends } from "react-icons/fa";
// import Timeline from "../../components/Timeline";
// import { useNavigate } from "react-router-dom";
// import { decrementTicket, incrementTicket } from "../../redux/ticketSlice";
// import { decrementStay, incrementStay } from "../../redux/stayCategorySlice";
// import { setBookingData } from "../../redux/bookingSlice";
// import { createBooking } from "../../services/BookingService";

// const ReviewBookingPage: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Access ticket and stay cart data from Redux
//   const {
//     tickets: ticket,
//     categories,
//     discountedTotal: ticketDiscountedTotal,
//     activeCoupon,
//   } = useSelector((state: any) => state.ticketCategory);

//   const {
//     stayCategories,
//     tickets: stayTickets,
//     total: stayTotal,
//   } = useSelector((state: any) => state.stayCategory);

//   const activeCouponId = activeCoupon?.id;
//   const selectedDate = useSelector((state: any) => state.date.selectedDate);

//   // Calculate totals and GST
//   const originalTicketTotal = categories.reduce(
//     (total: number, category: any) =>
//       total + category.price * (ticket[category._id] || 0),
//     0
//   );

//   const discountAmount = originalTicketTotal - ticketDiscountedTotal;
//   const ticketTotalAfterDiscount =
//     ticketDiscountedTotal > 0 ? ticketDiscountedTotal : originalTicketTotal;
//   const grandTotal = ticketTotalAfterDiscount + stayTotal;
//   const gst = (grandTotal * 0.18).toFixed(2);
//   const amountToBePaid = (grandTotal + parseFloat(gst)).toFixed(2);
//   const totalTicketCount = Object.values(ticket).reduce(
//     (sum: number, count: any) => sum + count,
//     0
//   );

//   // State for billing information
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phoneNumber: "",
//     email: "",
//     pinCode: "",
//   });

//   const [currentStep, setCurrentStep] = useState(4);

//   // Redirect to home if there's no ticket data
//   useEffect(() => {
//     if (!Object.keys(ticket).length) {
//       navigate("/");
//     }
//   }, [ticket, navigate]);

//   // Handle input changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleConfirm = async () => {
//     if (
//       !formData.fullName ||
//       !formData.phoneNumber ||
//       !formData.email ||
//       !formData.pinCode
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const bookingData = {
//       ...formData,
//       dateOfVisit: selectedDate,
//       totalVisitors: totalTicketCount,
//       ticketCategories: Object.keys(ticket).map((categoryId) => ({
//         ticketCategoryId: categoryId,
//         quantity: ticket[categoryId],
//         price: categories.find((cat: any) => cat._id === categoryId)?.price,
//       })),
//       stayCategories: Object.keys(stayTickets).map((categoryId) => ({
//         stayCategoryId: categoryId,
//         quantity: stayTickets[categoryId],
//         price: stayCategories.find((cat: any) => cat._id === categoryId)?.price,
//       })),
//       couponDiscountId: activeCouponId || null,
//     };

//     try {
//       const result = await createBooking(bookingData);

//       // Combine form data with booking details
//       const combinedData = {
//         bookingId: result.bookingId,
//         grandTotal: result.grandTotal,
//         orderId: result.orderId,
//         dateOfVisit: selectedDate,
//         totalVisitors: totalTicketCount,
//         ...formData, // Spread the form data here
//       };
//       console.log(combinedData, "get dataaaaaaaaa");

//       if (!result.bookingId) {
//         alert("Failed to retrieve booking ID.");
//         return;
//       }

//       const options = {
//         key: "rzp_test_vGGGd2XhY2l19v",
//         amount: (result.grandTotal * 100).toString(),
//         currency: "INR",
//         name: "Foggy Mountain",
//         description: `Booking for ${result.totalVisitors} visitors`,
//         order_id: result.orderId,
//         handler: async function (response: any) {
//           alert("Payment successful!");
//           dispatch(setBookingData(result));

//           try {
//             const paymentResponse = await fetch(
//               `http://localhost:3000/bookings/${result.bookingId}/confirm-payment`,
//               {
//                 method: "PATCH",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ paymentStatus: true }),
//               }
//             );

//             if (!paymentResponse.ok) {
//               throw new Error("Failed to update payment status");
//             }
//           } catch (error) {
//             alert("Payment confirmed, but failed to update the status.");
//           }

//           navigate("/thank-you", {
//             state: { bookingData: combinedData, result },
//           });
//         },
//         prefill: {
//           name: formData.fullName,
//           email: formData.email,
//           contact: formData.phoneNumber,
//         },
//         theme: {
//           color: "#F37254",
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();

//       razorpay.on("payment.failed", function (response: any) {
//         navigate("/payment-failed");
//       });
//     } catch (error) {
//       alert("Error creating booking: " + error);
//     }
//   };

//   const handleStepClick = (step: number) => {
//     setCurrentStep(step);
//   };

//   const updateTicketCount = (
//     categoryId: string,
//     action: "increment" | "decrement"
//   ) => {
//     action === "increment"
//       ? dispatch(incrementTicket(categoryId))
//       : dispatch(decrementTicket(categoryId));
//   };

//   const updateStayCount = (
//     categoryId: string,
//     action: "increment" | "decrement"
//   ) => {
//     action === "increment"
//       ? dispatch(incrementStay(categoryId))
//       : dispatch(decrementStay(categoryId));
//   };

//   const handleDecrementWithCheck = (categoryId: any) => {
//     if (ticket[categoryId] > 0) {
//       updateTicketCount(categoryId, "decrement");
//     } else {
//       alert("Quantity cannot be less than 0");
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
//       <Timeline currentStep={currentStep} onStepClick={handleStepClick} />

//       <div className="flex flex-col lg:flex-row justify-center items-stretch w-full max-w-6xl gap-4">
//         {/* Left side: Booking Summary */}
//         <div className="flex-1 p-4 bg-white rounded-xl shadow-lg border border-gray-300 flex flex-col justify-between">
//           <h2 className="text-xl font-semibold mb-4 text-center">
//             Booking Summary
//           </h2>

//           <div className="mb-4 text-center">
//             <div className="flex justify-between items-start">
//               <div className="flex flex-col items-center">
//                 <p className="text-sm">Date of Visit:</p>
//                 <span className="font-bold">
//                   {new Date(selectedDate).toLocaleDateString("en-GB", {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </span>
//               </div>

//               <div className="flex flex-col items-center mt-2 md:mt-0">
//                 <div className="flex items-center">
//                   <FaUserFriends className="text-xl mr-1 text-gray-600" />
//                   <p className="text-sm font-bold">Visitors:</p>
//                 </div>
//                 <span className="font-bold ml-1">{totalTicketCount}</span>
//               </div>

//               <div className="flex flex-col items-center mt-2 md:mt-0">
//                 <p className="text-sm font-bold">Total:</p>
//                 <span className="font-bold">
//                   ₹{originalTicketTotal.toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <h2 className="text-lg font-semibold mt-4 mb-2">Ticket Summary</h2>
//           {Object.keys(ticket).length > 0 ? (
//             Object.keys(ticket)
//               .filter((categoryId) => ticket[categoryId] > 0)
//               .map((categoryId) => {
//                 const category = categories.find(
//                   (cat: any) => cat._id === categoryId
//                 );
//                 if (category) {
//                   const count = ticket[categoryId];
//                   return (
//                     <div
//                       key={category._id}
//                       className="flex justify-between items-center py-2 border-b border-gray-300"
//                     >
//                       <div className="flex items-center">
//                         <FaUser className="w-6 h-6 text-gray-500" />
//                         <div className="ml-2">
//                           <h4 className="font-bold">{category.name}</h4>
//                           <p className="text-gray-600">
//                             ₹{category.price.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center">
//                         <button
//                           className="px-2 py-1 bg-blue-500 text-white rounded-l"
//                           onClick={() => handleDecrementWithCheck(category._id)}
//                         >
//                           -
//                         </button>
//                         <input
//                           type="number"
//                           className="w-12 text-center border-t border-b"
//                           value={count}
//                           readOnly
//                         />
//                         <button
//                           className="px-2 py-1 bg-blue-500 text-white rounded-r"
//                           onClick={() =>
//                             updateTicketCount(category._id, "increment")
//                           }
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 }
//                 return null;
//               })
//           ) : (
//             <p className="text-gray-500">No tickets added.</p>
//           )}

//           <h2 className="text-lg font-semibold mt-4 mb-2">Stays Summary</h2>
//           {Object.keys(stayTickets).length > 0 &&
//           Object.values(stayTickets).some((count: any) => count > 0) ? (
//             stayCategories
//               .filter((category: any) => stayTickets[category._id] > 0)
//               .map((category: any) => (
//                 <div
//                   key={category._id}
//                   className="flex justify-between items-center py-2 border-b border-gray-300"
//                 >
//                   <div className="flex items-center">
//                     <FaBed className="w-6 h-6 text-gray-500" />
//                     <div className="ml-2">
//                       <h4 className="font-bold">{category.name}</h4>
//                       <p className="text-gray-600">
//                         ₹{category.price.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     <button
//                       className="px-2 py-1 bg-blue-500 text-white rounded-l"
//                       onClick={() => updateStayCount(category._id, "decrement")}
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       className="w-12 text-center border-t border-b"
//                       value={stayTickets[category._id] || 0}
//                       readOnly
//                     />
//                     <button
//                       className="px-2 py-1 bg-blue-500 text-white rounded-r"
//                       onClick={() => updateStayCount(category._id, "increment")}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               ))
//           ) : (
//             <p className="text-gray-500">No tickets added in stay cart.</p>
//           )}

//           <div className="mt-6 border-t border-gray-300 pt-4" />
//           <h4 className="text-md font-bold">Ticket GST (18%): ₹{gst}</h4>
//           <h4 className="text-md font-bold text-red-600">
//             Coupon Discount: ₹-{discountAmount.toFixed(2)}
//           </h4>
//           <div className="border-t border-gray-300 my-4" />
//           <h4 className="text-lg font-bold">Grand Total: ₹{amountToBePaid}</h4>
//         </div>

//         {/* Right side: Billing Information */}
//         <div className="flex-1 p-4 bg-white rounded-xl shadow-lg border border-gray-300 flex flex-col justify-between">
//           <h2 className="text-xl font-semibold mb-4 text-center">
//             Add Your Billing Information
//           </h2>
//           <form className="space-y-4">
//             <div>
//               <label className="block text-gray-700">Full Name</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your full name"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Phone Number</label>
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your phone number"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your email address"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">PIN code</label>
//               <textarea
//                 name="pinCode"
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 resize-none"
//                 placeholder="Enter your PIN"
//               />
//             </div>
//           </form>

//           <div className="flex justify-center mt-6">
//             <button
//               className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
//               onClick={handleConfirm}
//             >
//               Confirm and Proceed to Payment
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





