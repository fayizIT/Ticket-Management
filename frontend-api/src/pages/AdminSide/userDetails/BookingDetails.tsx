import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchBookings } from "../../../services/BookingService";
import { FaEye } from "react-icons/fa";
import ConfirmDialogBox from "../../../components/ConfirmDialogBox";

interface Booking {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfVisit: Date;
  totalVisitors: number;
  ticketCategories: {
    ticketCategoryId: string;
    quantity: number;
    price: number;
  }[];
  stayCategories: { stayCategoryId: string; quantity: number; price: number }[];
  couponDiscountId: string | null;
  paymentStatus: boolean;
}

const BookingDetails: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4"></div>
      </div>
    );
  }

  const renderBookingDetails = () => {
    if (!selectedBooking) return "No details available.";
    return (
      <div>
        <h3>Full Name: {selectedBooking.fullName}</h3>
        <p>Phone Number: {selectedBooking.phoneNumber}</p>
        <p>Email: {selectedBooking.email}</p>
        <p>
          Date of Visit:{" "}
          {new Date(selectedBooking.dateOfVisit).toLocaleDateString("en-GB")}
        </p>
        <p>Total Visitors: {selectedBooking.totalVisitors}</p>
        <h4>Ticket Categories:</h4>
        <ul>
          {selectedBooking.ticketCategories.map((ticket) => (
            <li key={ticket.ticketCategoryId}>
              ID: {ticket.ticketCategoryId}, Quantity: {ticket.quantity}, Price:
              ₹{ticket.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <h4>Stay Categories:</h4>
        <ul>
          {selectedBooking.stayCategories.map((stay) => (
            <li key={stay.stayCategoryId}>
              ID: {stay.stayCategoryId}, Quantity: {stay.quantity}, Price: ₹
              {stay.price.toFixed(2)}
            </li>
          ))}
        </ul>
        {selectedBooking.couponDiscountId && (
          <p>Coupon Discount ID: {selectedBooking.couponDiscountId}</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Actions</th>
            <th className="border border-gray-300 p-4">Full Name</th>
            <th className="border border-gray-300 p-4">Phone Number</th>
            <th className="border border-gray-300 p-4">Email</th>
            <th className="border border-gray-300 p-4">Date of Visit</th>
            <th className="border border-gray-300 p-4">Total Visitors</th>
            <th className="border border-gray-300 p-4">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="align-middle text-center">
              <td className="border border-gray-300 p-4 text-center">
                <button
                  onClick={() => handleViewDetails(booking)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEye />
                </button>
              </td>
              <td className="border border-gray-300 p-4">{booking.fullName}</td>
              <td className="border border-gray-300 p-4">
                {booking.phoneNumber}
              </td>
              <td className="border border-gray-300 p-4">{booking.email}</td>
              <td className="border border-gray-300 p-4">
                {new Date(booking.dateOfVisit).toLocaleDateString("en-GB")}
              </td>
              <td className="border border-gray-300 p-4">
                {booking.totalVisitors}
              </td>
              <td
                className={`border border-gray-300 p-4 ${
                  booking.paymentStatus ? "text-green-600" : "text-red-600"
                }`}
              >
                {booking.paymentStatus
                  ? "Payment completed"
                  : "Payment not completed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialogBox
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => setIsDialogOpen(false)}
        title="Booking Details"
        message={renderBookingDetails() as string}
        confirmButtonText="Close"
        cancelButtonText=""
      />
    </div>
  );
};

export default BookingDetails;
