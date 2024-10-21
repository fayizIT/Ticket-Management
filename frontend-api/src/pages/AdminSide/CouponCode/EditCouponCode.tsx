import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import CouponService from "../../../services/CouponService";

const EditCouponCode: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    discount: 0,
    isActive: false,
  });

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const coupon = await CouponService.getById(id as string);
        setFormData(coupon);
      } catch (error) {
        console.error("Failed to fetch coupon code:", error);
      }
    };

    fetchCoupon();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      await CouponService.update(id as string, formData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Coupon code updated successfully!",
        confirmButtonText: "OK",
      });
      navigate("/admin/coupon-code");
    } catch (error) {
      console.error("Failed to update coupon code:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update coupon code. Please try again.",
      });
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Coupon Code</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Coupon Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Is Active?</label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="ml-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Coupon Code
        </button>
      </form>
    </div>
  );
};

export default EditCouponCode;
