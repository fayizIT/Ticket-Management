import React from "react";
import parkRuleImage from "../../../../public/assets/parkRules.png";

const LeftPanel: React.FC = () => {
  return (
    <div className=" p-4 rounded-xl shadow-lg border border-gray-200 flex flex-col h-auto max-h-[500px] md:h-[400px] w-full mx-auto"
    style={{
      backgroundImage: `url(${parkRuleImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className=" bg-white bg-opacity-30 rounded-xl flex flex-col items-center p-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-900 text-center">
          Park Rules & Guides
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base text-center">
          To ensure your safety within our park, we kindly ask all guests to
          adhere to the dress code and familiarize themselves with the park's
          do's and don'ts.
        </p>
      </div>
    </div>
  );
};

export default LeftPanel;
