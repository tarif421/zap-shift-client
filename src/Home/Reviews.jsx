import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCards from "./ReviewCards";
import { FiBox } from "react-icons/fi";


import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);

  return (
    <section className="bg-gray-100 py-16 px-4">
      {/* Top Header & Illustration */}
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center mb-12">
        <div className="w-20 h-20 rounded-full bg-[#003b36]/10 text-[#003b36] flex items-center justify-center text-4xl mb-6 shadow-sm">
          <FiBox />
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#003b36] mb-4">
          What our customers are sayings
        </h2>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* Swiper Slider Component */}
      <div className="max-w-7xl mx-auto my-12">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"3"}
          coverflowEffect={{
            rotate: 30,
            stretch: "20%",
            depth: 100,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500, 
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper py-10"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCards review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;