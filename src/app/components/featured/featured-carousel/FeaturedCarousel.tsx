// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import FeaturedCard from '../featured-card';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

 const FeaturedCarousel = () => {
  return (
    <div className='border-2 shadow-[0_5px_15px_0px_#00000042] mx-[11.5rem] my-4'>
        <h2 className='  p-4 my-2 text-xl'>Estos son los cursos mas vistos por los usuarios</h2>
    <Swiper
        cssMode={true}
        slidesPerView={4}
        // centeredSlides={true}
        spaceBetween={5}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[ Navigation,]}
        className="mySwiper  w-auto h-[300px]"
      >
        {
            
        }
      <SwiperSlide> <FeaturedCard/> </SwiperSlide>
      <SwiperSlide> <FeaturedCard/> </SwiperSlide>
      <SwiperSlide> <FeaturedCard/> </SwiperSlide>
      <SwiperSlide> <FeaturedCard/> </SwiperSlide>
      <SwiperSlide> <FeaturedCard/> </SwiperSlide>
      <SwiperSlide> <FeaturedCard/> </SwiperSlide>
      <SwiperSlide> <FeaturedCard/> </SwiperSlide>
      <SwiperSlide> <FeaturedCard/> </SwiperSlide>
      <SwiperSlide> <FeaturedCard/> </SwiperSlide>

    </Swiper>
    </div>
  );
};


export default FeaturedCarousel;