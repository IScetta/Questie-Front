"use client";

import Image from "next/image";
import { Carousel } from "@material-tailwind/react";

const CarouselCustom: React.FC = (): JSX.Element => {
  return (
    <Carousel
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      loop={true}
      autoplay={true}
      autoplayDelay={5000}
      className="w-full h-full"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 rounded-lg">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-yellowMain" : "w-4 bg-yellowMain/70"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <Image
        src="https://res.cloudinary.com/dj279fdwd/image/upload/v1717045299/image1_meprg0.jpg"
        alt="Questie"
        width={1080}
        height={1080}
        className="h-full w-full object-cover rounded-lg"
      />
      <Image
        src="https://res.cloudinary.com/dj279fdwd/image/upload/v1717045306/image2_vde8t4.jpg"
        alt="Questie"
        width={1080}
        height={1080}
        className="h-full w-full object-cover rounded-lg"
      />
      <Image
        src="https://res.cloudinary.com/dj279fdwd/image/upload/v1717045327/image3_ra6ykc.jpg"
        alt="Questie"
        width={1080}
        height={1080}
        className="h-full w-full object-cover rounded-lg"
      />
    </Carousel>
  );
};

export default CarouselCustom;
