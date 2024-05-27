import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './landing.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './landing.css'

// import required modules
import { Navigation,Autoplay } from 'swiper/modules';
const Heroslider = () => {
  return (
    <>

<div className='swiper-container'>
<Swiper navigation={true} modules={[Navigation,Autoplay]}  autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}className="mySwiper">
        <SwiperSlide><img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/aa97d7809ad44d08.jpg?q=20'/></SwiperSlide>
        <SwiperSlide><img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/aa97d7809ad44d08.jpg?q=20'/></SwiperSlide>
        <SwiperSlide><img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/aa97d7809ad44d08.jpg?q=20'/></SwiperSlide>
        <SwiperSlide><img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/aa97d7809ad44d08.jpg?q=20'/></SwiperSlide>
        <SwiperSlide><img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/aa97d7809ad44d08.jpg?q=20'/></SwiperSlide>
        <SwiperSlide><img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/aa97d7809ad44d08.jpg?q=20'/></SwiperSlide>
    
      </Swiper>
   


</div>

    </>
  )
}

export default Heroslider