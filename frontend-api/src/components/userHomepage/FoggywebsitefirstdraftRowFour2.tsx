import { Button } from "./Button";
import { Heading } from "./Heading";


export default function FoggywebsitefirstdraftRowFour2() {
  return (
    <div className="flex justify-center self-stretch">
      <div className="container-xs flex justify-center md:px-5">
        <div className="rounded-lg bg-[url('/public/images/img_slot_394x1162.png')] p-12 flex flex-col items-center justify-center">
          <Heading
            as="h6"
            className="text-center font-extrabold text-4xl"
          >
            Prepare for the ultimate <br />
            adventure at Kerala's <br />
            best nature park
          </Heading>
          <Button
            color="gray_50"
            size="3xl"
            className="rounded-[28px] mt-8 font-extrabold"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
