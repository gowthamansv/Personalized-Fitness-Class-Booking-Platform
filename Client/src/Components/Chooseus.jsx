import React from "react";
import cu1 from "../assets/c-1.jpg";
import cu2 from "../assets/c-2.jpg";
import cu3 from "../assets/c-3.jpg";
import cu4 from "../assets/c-4.jpg";

const Chooseus = () => {
  const images = [cu1, cu2, cu3, cu4];
  return (
    <div className="flex flex-col p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-accent">
        Why Choose Us?
      </h1>
      <div className="flex flex-col mobile:flex-row p-5 items-center gap-8">
        {/* Text Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-xl font-semibold">1500 sq.m.</h1>
            <p className="text-gray-600">
              A spacious gym for sports - a safe distance between exercise
              machines
            </p>
          </div>
          <div>
            <h1 className="text-xl font-semibold">More than 200 equipment</h1>
            <p className="text-gray-600">
              No queues at the simulators. Premium equipment from LifeStyle,
              Hammer Strength, TechnoGym.
            </p>
          </div>
          <div>
            <h1 className="text-xl font-semibold">4 fitness zones</h1>
            <p className="text-gray-600">
              From cardio to functional and cycle. Separate area for boxing and
              mixed martial arts
            </p>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Round-the-clock operation</h1>
            <p className="text-gray-600">
              The gym is open 24 hours a day, also works on all holidays and
              weekends
            </p>
          </div>
        </div>
        <div className="w-full hidden mobile:grid mobile:w-1/2  grid-flow-col grid-rows-2 p-5 gap-8">
          <img src={cu1} alt="" className="row-span-3 rounded-2xl" />
          <img
            src={cu4}
            alt=""
            className="col-span-1 w-[85%] opacity-80 rounded-2xl"
          />
          <img
            src={cu3}
            alt=""
            className="col-span-1 w-[85%] opacity-80 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Chooseus;
