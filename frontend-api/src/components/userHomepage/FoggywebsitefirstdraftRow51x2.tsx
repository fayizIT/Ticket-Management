import { Text } from "./Text";


export default function FoggywebsitefirstdraftRow51x2() {
  return (
    <div className="flex justify-center self-stretch">
      <div className="container-xs flex justify-center px-6 md:px-5">
        <div className="flex flex-col items-end">
          {/* Social Icons */}
          <div className="rounded-[38px] w-[12%] flex justify-center gap-3 bg-indigo-900_06 p-2.5 md:w-full">
            <img
              src="images/img_twitter.svg"
              alt="Twitter"
              className="w-9 h-9"
            />
            <img
              src="images/img_info.svg"
              alt="Info"
              className="w-9 h-9"
            />
          </div>

          {/* Info Section */}
          <div className="gap-5 mt-[-32px] relative flex items-center justify-end flex-col">
            <div className="flex flex-col gap-8 md:self-stretch">
              <div className="h-1 bg-light_blue-a400_19" />
              <div className="gap-2 mx-1 flex items-start md:mx-8">
                <Text
                  size="textxl"
                  className="text-lg font-medium text-indigo-800"
                >
                  Know more about Foggy Mountain
                </Text>
                <img
                  src="images/img_vector_indigo_800.svg"
                  alt="Vector"
                  className="h-2 self-end"
                />
              </div>
              {/* Footer */}
              <div className="gap-5 flex flex-col">
                <div className="h-1 bg-light_blue-a400_19" />
                <div className="gap-5 flex items-center md:flex-col">
                  <Text
                    size="textxl"
                    className="text-md font-normal text-indigo-808"
                  >
                    2024 Designed and Developed by{" "}
                  </Text>
                  <img
                    src="images/img_mask_group.png"
                    alt="Image"
                    className="w-1/6 h-6 object-contain"
                  />
                </div>
              </div>
            </div>
            <img
              src="images/img_image_78_166x176.png"
              alt="Imageseventyelg"
              className="w-1/6 h-38 self-end object-contain md:w-full sm:self-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}