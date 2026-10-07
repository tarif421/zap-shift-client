import React from "react";
import Banner from "./Banner";
import Brands from "./Brands";
import Reviews from "./Reviews";
import WorkFlow from "./WorkFlow";
import OurService from "./OurService";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <Brands />
      <WorkFlow />
      <OurService />
      <Reviews reviewsPromise={reviewsPromise} />
    </div>
  );
};

export default Home;
