import { Helmet } from "react-helmet-async";
import { Heading, } from "../../../components/userHomepage/Heading";
import ActivityCard from "../../../components/userHomepage/ActivityCard"; 
import FoggywebsitefirstdraftRowFour2 from "../../../components/userHomepage/FoggywebsitefirstdraftRowFour2"; 
import FoggywebsitefirstdraftRowOne from "../../../components/userHomepage/FoggywebsitefirstdraftRowOne"; 
import React from "react";
import { Button } from "../../../components/userHomepage/Button";
import { Img } from "../../../components/userHomepage/Img";

const data11 = [
  {
    activityImage: "images/img_bento_icon_degu_image_deep_orange_600_01.svg",
    activityTitle: (
      <>
        Fresh Water
        <br />
        Activities
      </>
    ),
  },
  {
    activityImage: "images/img_vector.svg",
    activityTitle: (
      <>
        One of a kind <br />
        Adventure Park
      </>
    ),
  },
  {
    activityImage: "images/img_bento_icon_degu_image.svg",
    activityTitle: (
      <>
        Expansive <br />
        Children's Park
      </>
    ),
  },
  {
    activityImage: "images/img_bento_icon_degu_image_deep_orange_600_01_52x52.svg",
    activityTitle: (
      <>
        Amazing <br />
        Lake Events
      </>
    ),
  },
  {
    activityImage: "images/img_bento_icon_degu_image_deep_orange_600_01_50x50.svg",
    activityTitle: (
      <>
        Dome and <br />
        Tent Stays
      </>
    ),
  },
];

const FoggywebsitefirstdraftPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Foggy Mountain Adventure Park</title>
        <meta name="description" content="Foggy Mountain Adventure Park offers thrilling adventures and scenic beauty in Kerala." />
      </Helmet>
      <div className="py-8 w-full bg-gray-50 sm:py-5">
        <div className="mt-4">
          <div className="mx-16 flex flex-col items-center md:mx-0">
            <div className="rounded-lg bg-[url(/public/images/img_group_96.png)] p-4 h-[612px] w-full bg-cover">
              <header className="flex items-start justify-between gap-5 md:flex-col">
                <ul className="flex gap-8">
                  <li>
                    <a href="#">
                      <Heading as="h5" className="text-2xl font-extrabold text-white">
                        About Us
                      </Heading>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Heading as="h5" className="text-2xl font-extrabold text-white">
                        Gallery
                      </Heading>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Heading as="h5" className="text-2xl font-extrabold text-white">
                        Contact Us
                      </Heading>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Heading as="h5" className="text-2xl font-extrabold text-white">
                        Rules and Regulation
                      </Heading>
                    </a>
                  </li>
                </ul>
                <Button className="rounded-lg bg-gray-50 px-6 py-3 font-extrabold">
                  Book Now
                </Button>
              </header>
              <div className="relative flex items-center justify-center h-full">
                <Img src="images/img_group_light_green_500.svg" alt="Adventure" className="w-[22%] h-[114px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-16 my-8 flex flex-col items-center md:mx-0">
          <Heading as="h1" className="text-5xl font-black leading-tight text-center">
            Prepare for the Ultimate Adventure at Kerala's Best Nature Park
          </Heading>
        </div>

        <div className="mt-14 flex flex-col items-center gap-10">
          <FoggywebsitefirstdraftRowOne />
          <div className="flex gap-8 mx-auto">
            {data11.map((activity, index) => (
              <ActivityCard key={index} {...activity} />
            ))}
          </div>
          <FoggywebsitefirstdraftRowFour2 />
        </div>
      </div>
    </>
  );
};

export default FoggywebsitefirstdraftPage;
