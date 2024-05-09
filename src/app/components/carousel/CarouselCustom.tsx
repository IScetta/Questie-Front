"use client";

import Image from "next/image";
import { Carousel } from "@material-tailwind/react";

const CarouselCustom: React.FC = (): JSX.Element => {
  return (
    <Carousel
      loop={true}
      autoplay={true}
      autoplayDelay={5000}
      className="w-full h-full"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
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
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        width={1000}
        height={1000}
        className="h-full w-full object-cover"
      />
      <Image
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        width={1000}
        height={1000}
        className="h-full w-full object-cover"
      />
      <Image
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        width={1000}
        height={1000}
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
};

export default CarouselCustom;
