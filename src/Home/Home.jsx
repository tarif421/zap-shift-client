import React from "react";
import Banner from "./Banner";
import Brands from "./Brands";
import Reviews from "./Reviews";
import WorkFlow from "./WorkFlow";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <Brands />
      <WorkFlow/>
      <Reviews reviewsPromise={reviewsPromise} />
    </div>
  );
};

export default Home;
