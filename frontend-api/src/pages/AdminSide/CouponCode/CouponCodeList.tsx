import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialogBox from '../../../components/ConfirmDialogBox'; 
import CouponService from '../../../services/CouponService'; // Import the CouponService

interface Coupon {
  _id: string;
  code: string;
  discount: number;
  expiryDate: Date;
  isActive: boolean;
}

const CouponCodeList: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
  const [toggleCouponId, setToggleCouponId] = useState<string | null>(null);
  const [toggleCouponStatus, setToggleCouponStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await CouponService.fetchCoupons();
        setCoupons(data as Coupon[]);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch coupons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/editCoupon/${id}`);
  };

  const handleDelete = async () => {
    if (!selectedCouponId) return;
    try {
      await CouponService.deleteCoupon(selectedCouponId);
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon._id !== selectedCouponId)
      );
      toast.success("Coupon deleted successfully!");
      setSelectedCouponId(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete coupon. Please try again.");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const openDeleteDialog = (id: string) => {
    setSelectedCouponId(id);
    setIsDialogOpen(true);
  };

  const toggleCouponStatusHandler = (id: string, currentStatus: boolean) => {
    setToggleCouponId(id);
    setToggleCouponStatus(!currentStatus);
    setToggleDialogOpen(true);
  };

  const confirmToggleStatus = async () => {
    if (!toggleCouponId) return;
    try {
      await CouponService.updateCouponStatus(toggleCouponId, toggleCouponStatus);
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon._id === toggleCouponId ? { ...coupon, isActive: toggleCouponStatus } : coupon
        )
      );
      toast.success(`Coupon status updated to ${toggleCouponStatus ? 'Active' : 'Inactive'}!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update coupon status. Please try again.");
    } finally {
      setToggleDialogOpen(false);
      setToggleCouponId(null);
      setToggleCouponStatus(false); // Reset status
    }
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Coupons</h2>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate('/admin/addCoupon')}
        >
          Create Coupon
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Actions</th>
            <th className="border border-gray-300 p-4">Code</th>
            <th className="border border-gray-300 p-4">Discount</th>
            <th className="border border-gray-300 p-4">Active</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td className="border border-gray-300 p-4 text-center">
                <button
                  onClick={() => handleEdit(coupon._id)}
                  className="text-yellow-500 hover:text-yellow-700 mx-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => openDeleteDialog(coupon._id)}
                  className="text-red-500 hover:text-red-700 mx-2"
                >
                  <FaTrash />
                </button>
              </td>
              <td className="border border-gray-300 p-4">{coupon.code}</td>
              <td className="border border-gray-300 p-4">{coupon.discount}%</td>
              <td className="border border-gray-300 p-4">
                <button
                  onClick={() => toggleCouponStatusHandler(coupon._id, coupon.isActive)}
                  className={`px-2 py-1 rounded ${
                    coupon.isActive
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {coupon.isActive ? 'Active' : 'Inactive'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog for Delete */}
      <ConfirmDialogBox
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon? This action cannot be undone."
        confirmButtonText="Delete" // Default button text for delete
        cancelButtonText="Cancel"   // Default button text for cancel
      />

      {/* Confirmation Dialog for Toggle Status */}
      <ConfirmDialogBox
        isOpen={toggleDialogOpen}
        onClose={() => setToggleDialogOpen(false)}
        onConfirm={confirmToggleStatus}
        title="Toggle Coupon Status"
        message={`Are you sure you want to mark this coupon as ${toggleCouponStatus ? 'Active' : 'Inactive'}?`}
        confirmButtonText="Change Status" // Custom text for the confirm button
        cancelButtonText="Cancel"          // Custom text for the cancel button
      />
    </div>
  );
};

export default CouponCodeList;
