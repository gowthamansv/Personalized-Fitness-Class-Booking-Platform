import React from "react";
import { CgGym } from "react-icons/cg";
import Service from "../Components/Service";
import Chooseus from "../Components/Chooseus";
import Membership from "../Components/Membership";
import Trainers from "../Components/Trainers";
import About from "../Components/About";
import Feedback from "../Components/Feedback";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <div
        className="home w-full h-[92vh] font-mono flex flex-col gap-5 justify-center items-center"
        id="home"
      >
        <CgGym className="text-9xl" />
        <h2 className="text-4xl text-center leading-10 text-gray-300">
          Achive Your Fitness Goals With{" "}
          <h1 className="text-7xl font-smoochsans tracking-widest font-medium text-gold">
            FitCenter
          </h1>
        </h2>
        <p className="text-wrap text-center w-3/6">
          "Our expert coaches and personalized programs are designed to help you
          achieve your goals and exceed your expectations. Ready to make a
          change?"
        </p>
        <div className="border rounded-full py-1 px-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent focus:outline-none"
          />
          <button className="rounded-3xl py-2 px-5 text-black bg-gray hover:bg-gold">
            Submit
          </button>
        </div>
        <img src="" alt="" />
      </div>
      <Service />
      {/* <Swiperjs /> */}
      <Chooseus />
      <Trainers />
      <About />
      <Membership />
      <Feedback />
      <Footer />
    </div>
  );
};

export default Home;
