import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface CartState {
  date: string;
  visitors: number;
  adultCount: number;
  childCount: number;
  totalPrice: number;
  ticketGst: number;
}

const ReviewBooking: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartHistory, setCartHistory] = useState<CartState[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    pinCode: ''
  });

  const cart = useSelector((state: any) => state.ticketCategory); // Assuming ticketCategory has the cart details
  const { adultCount, childCount, totalPrice, ticketGst } = cart;

  useEffect(() => {
    const previousCart = localStorage.getItem('cartHistory');
    if (previousCart) {
      setCartHistory(JSON.parse(previousCart));
    }
  }, []);

  useEffect(() => {
    // Save last 2 cart states
    const newCartState = {
      date: new Date().toDateString(),
      visitors: adultCount + childCount,
      adultCount,
      childCount,
      totalPrice,
      ticketGst
    };

    const updatedCartHistory = [newCartState, ...cartHistory.slice(0, 1)]; // Limit to last 2 carts
    setCartHistory(updatedCartHistory);
    localStorage.setItem('cartHistory', JSON.stringify(updatedCartHistory));
  }, [cart]);

  const handleProceedToPay = () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.pinCode) {
      toast.error('Please fill in all mandatory fields');
      return;
    }

    navigate('/payment');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Cart Summary */}
        <div className="bg-white shadow-lg p-6 rounded-lg w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Review Booking</h2>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <span>Date of Visit:</span>
              <span>{new Date().toDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Visitors:</span>
              <span>{adultCount + childCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span>Adult:</span>
              <div className="flex items-center gap-2">
                <button>-</button>
                <span>{adultCount}</span>
                <button>+</button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Child:</span>
              <div className="flex items-center gap-2">
                <button>-</button>
                <span>{childCount}</span>
                <button>+</button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span>Ticket GST (18%):</span>
            <span>₹{ticketGst.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center font-bold mt-4">
            <span>Grand Total:</span>
            <span>₹{(totalPrice + ticketGst).toFixed(2)}</span>
          </div>
        </div>

        {/* Right Side - Billing Info */}
        <div className="bg-white shadow-lg p-6 rounded-lg w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Add Your Billing Information</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="w-full border p-2 rounded-md"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">PIN Code</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              value={formData.pinCode}
              onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
            onClick={handleProceedToPay}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBooking;
