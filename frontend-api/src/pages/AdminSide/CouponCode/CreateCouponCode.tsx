// src/components/CreateCouponCode.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CouponService from '../../../services/CouponService'; // Import the service

const CreateCouponCode: React.FC = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState<number | undefined>(undefined);
  const [expiryDate, setExpiryDate] = useState('');
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (discount === undefined) {
        throw new Error('Discount is required');
      }
      const newCoupon = { code, discount, expiryDate: new Date(expiryDate), isActive };
      await CouponService.create(newCoupon);
      toast.success('Coupon code created successfully!');

      // Delay navigation to allow the toast to show
      setTimeout(() => {
        navigate('/admin/coupon-codes');
      }, 2000); // Delay for 2 seconds

    } catch (error) {
      console.error(error);
      toast.error('Failed to create coupon code. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Create Coupon Code</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Coupon Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="border border-gray-300 rounded w-full px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Discount (%)</label>
          <input
            type="number"
            value={discount === undefined ? '' : discount}
            onChange={(e) => setDiscount(e.target.value ? Number(e.target.value) : undefined)}
            required
            className="border border-gray-300 rounded w-full px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="border border-gray-300 rounded w-full px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Is Active?</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="ml-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Coupon Code
        </button>
      </form>
    </div>
  );
};

export default CreateCouponCode;
