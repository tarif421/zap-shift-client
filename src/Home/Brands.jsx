import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../assets/brands/amazon.png";
import vector from "../assets/brands/amazon_vector.png";
import casio from "../assets/brands/casio.png";
import monstar from "../assets/brands/moonstar.png";
import randstad from "../assets/brands/randstad.png";
import star from "../assets/brands/star.png";
import start_people from "../assets/brands/start_people.png";
import { Autoplay, Pagination } from "swiper/modules";

const brandLogos = [
  amazon,
  vector,
  casio,
  monstar,
  randstad,
  statusbar,
  start_people,
];

const Brands = () => {
  return (
    <Swiper
    
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={20}
      grabCursor={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {brandLogos.map((logo, index) => (
        <SwiperSlide key={index}>
          {" "}
          <img src={logo} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
