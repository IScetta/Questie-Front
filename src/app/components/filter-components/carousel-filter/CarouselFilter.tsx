"use client"
import { GoArrowUp } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Autoplay,
  Mousewheel,
  Navigation,
  Pagination,
  Zoom,
} from "swiper/modules";
import FeaturedCard from "@/app/components/featured/featured-card";
import { ICourse } from "@/app/types";

const CarouselFilter = ({courses}:{courses:ICourse[]})=>{
    return(
        <div>
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
              {courses.map((course:ICourse,index:number)=>(
              <SwiperSlide key={index}>
              <FeaturedCard course={course}/>{" "}
            </SwiperSlide>
            ))}
            </Swiper>
          </div>
        </div>
    
    )
}

export default CarouselFilter;