"use client";
import { GoArrowUp } from "react-icons/go";
import ColumnFilter from "../components/column-filter";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Mousewheel,
  Navigation,
  Pagination,
  Zoom,
} from "swiper/modules";
import FeaturedCard from "@/app/components/featured/featured-card";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Categories() {
  return (
    <div className="flex mx-[11.5rem] justify-center ">
      <div className="flex flex-grow-0">
        <ColumnFilter />
      </div>
      <div className="ml-10 w-full flex flex-col justify-center items-center">
        <div className="bg-purpleMain mt-8  ">
          <h1 className="text-5xl mt-18 text-center text-white mt-10">
            Titulo del moduloa
          </h1>
          <div className=" text-sm mt-8 text-center">
            {" "}
            <p className="text-white text-center pb-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Asperiores, nesciunt fuga inventore deleniti nulla, amet
              distinctio, saepe quisquam quod voluptate nemo. Modi voluptates
              unde, delectus excepturi corporis soluta voluptatem dignissimos.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
              sunt inventore autem aut porro in harum corporis asperiores eaque
              fuga qui doloremque cum sed, ab alias facere officiis quibusdam
              corrupti?
            </p>
          </div>
        </div>

        <div className="container flex flex-col gap-[25px] h-auto max-h-screen overflow-hidden">
          <div className="swiperContainer overflow-x-hidden mt-[25px] py-[2rem]  shadow-2xl lg:w-62">
            <div className="bg-purpleMainLight ">Cursos destacados:</div>
            <Swiper
              className=""
              modules={[Autoplay, Navigation, Mousewheel]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={true}
              // centeredSlides={true}

              slidesPerView={1}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 25,
                },
                "@0.50": {
                  slidesPerView: 1,
                  spaceBetween: 25,
                },
                "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 25,
                },
                "@1.25": {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                "@1.50": {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                "@1.75": {
                  slidesPerView: 3,
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
            </Swiper>
          </div>
          <div className="pagination flex justify-center items-center m-2" />
        </div>

        <div className=" text-sm mt-8"> </div>
        <div className="   mb-8 ">
          <div className=" bg-purpleMainLight ">a</div>
          <div className="flex flex-wrap gap-10  place-content-around my-5">
            <div className="bg-image w-60 h-60">1</div>
            <div className="bg-image w-60 h-60">2</div>
            <div className="bg-image w-60 h-60">3</div>
            <div className="bg-image w-60 h-60">3</div>
            <div className="bg-image w-60 h-60">3</div>
            <div className="bg-image w-60 h-60">3</div>
          </div>
          <div className="bg-purpleMainLight">a</div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Categories;
