import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import RoutineGuide from "./RoutineGuide";
import BeautyFeatures from "./BeautyFeatures";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import TrustStrip from "../Common/TrustStrip";

const Home = () => {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Categories />
      <RoutineGuide />
      <BeautyFeatures />
      <NewArrival />
      <PromoBanner />
      <BestSeller />
      <CounDown />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
