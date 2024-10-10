import React from "react";
import { Heading } from "./Heading";
import { Img } from "./Img";


type ActivityCardProps = {
  activityImage: string;
  activityTitle: JSX.Element;
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activityImage, activityTitle }) => {
  return (
    <div className="flex flex-col items-center rounded-lg shadow-lg bg-white p-4">
      <Img src={activityImage} alt="Activity" className="w-full h-[52px] object-contain" />
      <Heading as="h3" className="mt-2 text-center">
        {activityTitle}
      </Heading>
    </div>
  );
};

export default ActivityCard;
