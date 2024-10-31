import React from "react";
import { useNavigate } from "react-router-dom";
import parkRuleImage from "../../../../public/assets/images/parkRules.png";
import icon from "../../../../public/assets/images/backwardicon.png";

const LeftPanel: React.FC = () => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/ticket-cart");
  };

  return (
    <div
      className="p-4 rounded-3xl shadow-lg border border-gray-300 flex flex-col h-auto max-h-[500px] md:h-[400px] w-full mx-auto"
      style={{
        backgroundImage: `url(${parkRuleImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white bg-opacity-30 rounded-xl flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-900  flex items-center ">
          <img
            src={icon}
            alt="Park Icon"
            className="mr-2 w-8 h-8 cursor-pointer"
            onClick={handleIconClick}
          />
          Park Rules & Guides
        </h2>
        <p className="text-blue-800 mb-4 leading-relaxed text-sm md:text-base text">
          To ensure your safety within our park, we kindly ask all guests to
          adhere to the dress code and familiarize themselves with the park's
          do's and don'ts.
        </p>
      </div>
    </div>
  );
};

export default LeftPanel;
