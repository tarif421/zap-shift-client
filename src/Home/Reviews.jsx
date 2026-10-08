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

  return (
    <section className="bg-base-200/50 py-16 px-4">
      {/* Top Header & Illustration */}
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center mb-12">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#003b36]/10 text-[#003b36] flex items-center justify-center text-3xl sm:text-4xl mb-6 shadow-sm">
          <FiBox />
        </div>

        <span className="bg-[#bbf7d0] text-[#003b36] font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-3">
          Testimonials
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003b36] mb-4">
          What our customers are saying
        </h2>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
          Discover why thousands of people trust Zap Shift for reliable, fast, and secure parcel delivery across Bangladesh.
        </p>
      </div>

      {/* Swiper Slider Component */}
      <div className="max-w-7xl mx-auto my-12 px-2">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1} // Default for mobile
          breakpoints={{
            640: {
              slidesPerView: 1.5, // Small tablets
            },
            768: {
              slidesPerView: 2, // Tablets
            },
            1024: {
              slidesPerView: 3, // Desktops
            },
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            scale: 0.85,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper py-10"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="flex justify-center">
              <ReviewCards review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;