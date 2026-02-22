import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../assets/banner/banner1.png";
import bannerImg2 from "../assets/banner/banner2.png";
import bannerImg3 from "../assets/banner/banner3.png";
// infiniteLoop={true} autoPlay={true}
const Banner = () => {
  return (
    <Carousel >
      <div  className="relative" >
        <img src={bannerImg1} />

        {/* overlay */}
        <div className="absolute top-100 text-start ml-5 inset-0  ">
          
            <div className="">
              <p className="text-xs">Enjoy fast, reliable parcel delivery  with real-time <br /> tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className="">
              <button className="btn">ttt</button>
            </div>
          
        </div>
      
      </div>
      <div>
        <img src={bannerImg2} />
      </div>
      <div>
        <img src={bannerImg3} />
      </div>
    </Carousel>
  );
};

export default Banner;
