import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CouponService from "../../../services/CouponService";
import { applyDiscount, removeDiscount } from "../../../redux/ticketSlice";
import couponBg from '../../../../public/assets/CouponBackgroundimage.png';
import Slider from "react-slick"; // Import the carousel component

// Import slick carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface LeftPanelProps {
  setCouponCode: (code: string) => void; // Accept setCouponCode as a prop
}

const LeftPanel: React.FC<LeftPanelProps> = ({ setCouponCode }) => {
  const dispatch = useDispatch();
  const { activeCoupon, tickets } = useSelector((state: any) => state.ticketCategory);
  const [coupons, setCoupons] = React.useState([]);

  React.useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const fetchedCoupons = await CouponService.fetchCoupons();
        setCoupons(fetchedCoupons as React.SetStateAction<never[]>);
      } catch (error) {
        toast.error("Failed to fetch coupons");
      }
    };
    fetchCoupons();
  }, []);

  const handleCouponClick = (id: string, code: string, discountAmount: number) => {
    const totalTickets = Object.values(tickets).reduce((sum: number, count) => sum + (count as number), 0);
    if (totalTickets > 0) {
      if (activeCoupon && activeCoupon.code === code) {
        dispatch(removeDiscount());
        toast.success("Coupon removed");
        setCouponCode(""); // Clear coupon code when removed
      } else {
        dispatch(applyDiscount({ id, code, discount: discountAmount }));
        toast.success(`Coupon applied: ${code}`);
        setCouponCode(code); // Set coupon code when applied
      }
    } else {
      toast.error("Please add at least one ticket before applying a coupon.");
    }
  };

  return (
    <div
      className="bg-white p-2 md:p-3 rounded-lg shadow-md w-full h-auto md:h-[380px] border border-gray-200 flex-grow -mt-6 relative"
      style={{
        backgroundImage: `url(${couponBg})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="text-xl font-bold mb-3 text-blue-900">Grab Your Tickets</h2>
      <p className="text-blue-800 mb-4 leading-relaxed text-sm">
      Grab your tickets for a weekend of excitement, and fun. Our tickets run out fast so book now.
      </p>
      <h3 className="text-lg text-center font-bold text-black-900 mb-3">Trending Coupons</h3>

      {/* Carousel for coupons */}
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={2} // Display two coupons at once
        slidesToScroll={1}
        arrows={true}
        appendDots={(dots: any) => (
          <div style={{ color: 'black' }}>
            <ul style={{ margin: "0px" }}>{dots}</ul>
          </div>
        )}
      >
        {coupons
          .filter((coupon: any) => coupon.isActive)
          .map((coupon: any) => (
            <div
              key={coupon.code}
              className={`flex-shrink-0 cursor-pointer border p-2 rounded-md text-xs m-2 transition-all duration-300 ease-in-out transform ${
                activeCoupon?.code === coupon.code
                  ? "bg-orange-100 border-orange-500"
                  : "bg-orange-50 hover:bg-orange-100"
              }`}
              onClick={() => handleCouponClick(coupon._id, coupon.code, coupon.discount)}
            >
              <h4 className="font-bold text-gray-800">{coupon.code}</h4>
              <p className="text-gray-600">{coupon.discount}% off on Regular Tickets</p>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default LeftPanel;
