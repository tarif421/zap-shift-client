import React from "react";
import Banner from "./Banner";
import Brands from "./Brands";
import Reviews from "./Reviews";
import WorkFlow from "./WorkFlow";
import OurService from "./OurService";
import Process from "./Process";
import CustomerSatisfaction from "./CustomerSatisfaction";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="bg-[#f3f4f6]">
      <Banner />

      <WorkFlow />
      <OurService />
      <Brands />
      <Process />
      <CustomerSatisfaction />
      <Reviews reviewsPromise={reviewsPromise} />
    </div>
  );
};

export default Home;
