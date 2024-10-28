import React from "react";

interface RightFooterProps {
  imageSrc: string; 
}

const RightFooter: React.FC<RightFooterProps> = ({ imageSrc }) => {
  return (
    <div className="flex justify-center md:justify-end mt-1">
      <img src={imageSrc} alt="Logo" className="h-8 sm:h-12 md:h-16" />
    </div>
  );
};

export default RightFooter;
