
import React from "react";
import { Img } from "./Img";
import { Heading } from "./Heading";

export default function FoggywebsitefirstdraftRowOne() {
  return (
    <div className="flex justify-center self-stretch">
      <div className="container-xs flex justify-center gap-6 flex-col md:px-5">
        {/* First Column */}
        <div className="flex w-full flex-col items-start justify-center rounded-lg bg-gradient-to-r from-blue-500 to-green-500 px-6 py-[34px]">
          <div className="h-2 w-2 rotate-12 rounded-md bg-white" />
          <div className="relative flex h-[70px] w-full flex-col items-start justify-end">
            <Img
              src="images/img_mobile.png"
              alt="Mobile"
              className="mt-4 h-[140px] object-cover"
            />
          </div>
          <Heading
            as="h2"
            className="mt-5 text-2xl font-black text-white"
          >
            Amazing <br /> Lake events
          </Heading>
          <Heading
            as="h3"
            className="mt-5 w-full text-lg font-medium text-white"
          >
            Discover a world of joy for your little ones. Our kids' activities blend fun and learning in a safe and vibrant environment.
          </Heading>
        </div>
        {/* Second Column with an Image */}
        <Img
          src="images/img_slot_bento_media_query_1.png"
          alt="Slotbento"
          className="h-[570px] w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
