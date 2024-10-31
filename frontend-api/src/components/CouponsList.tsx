import React from "react";

interface Coupon {
  code: string;
  discount: number;
}

interface CouponsListProps {
  coupons: Coupon[];
  activeCoupon: Coupon | null;
  onCouponClick: (code: string, discountAmount: number) => void;
}

const CouponsList: React.FC<CouponsListProps> = ({ coupons, activeCoupon, onCouponClick }) => {
  return (
    <div className="flex space-x-4">
      {coupons.map((coupon) => (
        <div
          key={coupon.code}
          className={`cursor-pointer border p-4 rounded-md ${
            activeCoupon?.code === coupon.code ? "bg-gray-200" : ""
          }`}
          onClick={() => onCouponClick(coupon.code, coupon.discount)}
        >
          <h4 className="font-bold">{coupon.code}</h4>
          <p>{coupon.discount}% off on Regular Tickets</p>
        </div>
      ))}
    </div>
  );
};

export default CouponsList;
