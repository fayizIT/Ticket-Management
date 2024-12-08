import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CouponService from "../../../services/CouponService";
import { applyDiscount, removeDiscount } from "../../../redux/ticketSlice";
import couponBg from "../../../../public/assets/images/CouponBackgroundimage.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

interface LeftPanelProps {
  setCouponCode: (code: string) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ setCouponCode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeCoupon, tickets } = useSelector(
    (state: any) => state.ticketCategory
  );
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

  const handleCouponClick = (
    id: string,
    code: string,
    discountAmount: number
  ) => {
    const totalTickets = Object.values(tickets).reduce(
      (sum: number, count) => sum + (count as number),
      0
    );
    if (totalTickets > 0) {
      if (activeCoupon && activeCoupon.code === code) {
        dispatch(removeDiscount());
        toast.success("Coupon removed");
        setCouponCode("");
      } else {
        dispatch(applyDiscount({ id, code, discount: discountAmount }));
        toast.success(`Coupon applied: ${code}`);
        setCouponCode(code);
      }
    } else {
      toast.error("Please add at least one ticket before applying a coupon.");
    }
  };

  const handleIconClick = () => {
    navigate("/date-selector");
  };

  const icon  = 'assets/images/backwardicon.png';
  const couponBg ='assets/images/CouponBackgroundimage.png';
  return (
    <div
      className="bg-white p-2 md:p-3 rounded-3xl shadow-md w-full h-auto md:h-[380px] border border-gray-300 flex-grow -mt-6 relative"
      style={{
        backgroundImage: `url(${couponBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center mb-2">
        <img
          src={icon}
          alt="Park Icon"
          className="mr-2 w-8 h-8 cursor-pointer"
          onClick={handleIconClick}
        />
        <h2 className="text-xl font-extrabold text-blue-900">Grab Your Tickets</h2>
      </div>

      <p className="text-blue-800 mb-4 leading-relaxed text-sm">
        Grab your tickets for a weekend of excitement, and fun. Our tickets run
        out fast so book now.
      </p>
      <h3 className="text-lg text-center font-extrabold text-blue-900 mb-3">
        Trending Coupons
      </h3>

      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={2}
        slidesToScroll={1}
        arrows={true}
        appendDots={(dots: any) => (
          <div style={{ color: "blue" }}>
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
              onClick={() =>
                handleCouponClick(coupon._id, coupon.code, coupon.discount)
              }
            >
              <h4 className="font-bold text-gray-800">{coupon.code}</h4>
              <p className="text-gray-600">
                {coupon.discount}% off on Regular Tickets
              </p>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default LeftPanel;
