import React from "react";

const Membership = () => {
  return (
    <div className="p-5 mobile:p-10" id="membership">
      <div className="flex flex-col mobile:flex-row justify-around items-center">
        <div className="flex flex-col gap-5 items-center mobile:items-start">
          <h1 className="font-semibold text-3xl text-accent">Our Plan</h1>
          <p className="">
            Select the plan that suits your fitness goals and let our expert
            coaches guide you every step of the way.
          </p>
        </div>
        <div className="">
          <ul className="flex p-2 rounded-xl shadow-xl gap-5 bg-primary bg-opacity-10">
            <li>
              <button className="bg-transparent focus:bg-primary rounded-xl p-2 focus:text-black">
                Monthly
              </button>
            </li>
            <li>
              <button className="bg-transparent focus:bg-primary rounded-xl p-2 focus:text-black">
                Yearly
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col mobile:flex-row gap-14 p-2 mobile:p-10">
        {/* pro plan */}
        <div className="flex bg-secondary bg-opacity-15 flex-col justify-center items-center gap-2 p-5 rounded-2xl shadow-2xl">
          <h1 className="font-semibold text-2xl text-accent">Pro Plan</h1>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-secondary">Description</h1>
            <p>
              Our Pro Plan offers advanced workouts and personalized nutrition
              coaching to help you reach your goals faster. Sign Up Right Now!
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="text-secondary">Features</h1>
            <ul className="text-left w-full list-disc list-inside">
              <li>Access to All Of Our Exercise Videos </li>
              <li>Progress Tracking</li>
              <li>Supportive Online Community</li>
              <li>Advanced, Personalized Workout Plans</li>
              <li>Comprehensive Nutrition Coaching</li>
              <li>Access to Advanced Workout Programs</li>
              <li>Body Composition Analysis</li>
            </ul>
          </div>
          <p>
            <span className="text-3xl font-semibold text-white">
              &#8377;5000
            </span>
            /Month
          </p>
          <button className="w-full py-2 rounded-3xl shadow-2xl bg-primary text-background">
            Choose Plan
          </button>
        </div>
        {/* Custom Plan */}
        <div className="flex bg-secondary bg-opacity-15 flex-col justify-center items-center gap-2 p-5 rounded-2xl shadow-2xl">
          <h1 className="font-semibold text-2xl text-accent">Custom Plan</h1>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-secondary">Description</h1>
            <p>
              Experience a fully tailored fitness experience with our Custom
              Plan. Work one-on-one with a dedicated trainer to achieve your
              goals.
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="text-secondary">Features</h1>
            <ul className="text-left w-full list-disc list-inside">
              <li>Access to All Of Our Exercise Videos </li>
              <li>Progress Tracking</li>
              <li>Supportive Online Community</li>
              <li>Fully Customized Workout and Nutrition Plan</li>
              <li>Weekly Check-ins with Your Trainer</li>
              <li>Access to All Platform Features</li>
              <li>Exclusive Gear Discounts</li>
            </ul>
          </div>
          <p>
            <span className="text-3xl font-semibold text-white">
              &#8377;3000
            </span>
            /Month
          </p>
          <button className="w-full py-2 rounded-3xl shadow-2xl bg-primary text-background">
            Choose Plan
          </button>
        </div>
        {/* Beginner Plan */}
        <div className="flex bg-secondary bg-opacity-15 flex-col justify-center items-center gap-2 p-5 rounded-2xl shadow-2xl">
          <h1 className="font-semibold text-2xl text-accent">Beginner Plan</h1>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-secondary">Description</h1>
            <p>
              Start your fitness journey with our Beginner Plan. Build a strong
              foundation with basic workouts and essential nutrition guidance.
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="text-secondary">Features</h1>
            <ul className="text-left w-full list-disc list-inside">
              <li>Access to All Of Our Exercise Videos </li>
              <li>Progress Tracking</li>
              <li>Supportive Online Community</li>
              <li>Personalized Workout Plans</li>
              <li>Basic Nutrition Guidance</li>
              <li>Access to Group Fitness Classes</li>
            </ul>
          </div>
          <p>
            <span className="text-3xl font-semibold text-white">
              &#8377;1500
            </span>
            /Month
          </p>
          <button className="w-full py-2 rounded-3xl shadow-2xl text-background bg-primary">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
