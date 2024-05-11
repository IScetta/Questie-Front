"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Zoom } from "swiper/modules";
import FeaturedCard from "../featured-card";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FeaturedCarousel = () => {
  return (
    <div className="flex flex-col justify-center w-full h-auto border-2 shadow-[0_5px_15px_0px_#00000042] my-4">
      <h1 className="p-[20px] text-[20px] font-bold bg-purpleMainLighter">
        Cursos mas visitados
      </h1>

      <div className="container flex flex-col gap-[25px] h-auto max-h-screen overflow-hidden">
        <div className="swiperContainer overflow-x-hidden mt-[25px] py-[2rem]">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={true}
            // centeredSlides={true}
            pagination={{
              el: ".pagination",
              clickable: true,
            }}
            slidesPerView={4}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 25,
              },
              "@0.50": {
                slidesPerView: 1.25,
                spaceBetween: 25,
              },
              "@1.00": {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              "@1.25": {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              "@1.50": {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              "@1.75": {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            <SwiperSlide>
              {" "}
              <FeaturedCard />{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <FeaturedCard />{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <FeaturedCard />{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <FeaturedCard />{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <FeaturedCard />{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <FeaturedCard />{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <FeaturedCard />{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <FeaturedCard />{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <FeaturedCard />{" "}
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="pagination flex justify-center items-center m-2" />
      </div>
    </div>
  );
};

export default FeaturedCarousel;
