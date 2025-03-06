import React, { useState } from "react";
import { toast } from "react-toastify";

const FitnessTracker = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState(null);
  const [calories, setCalories] = useState(null);

  const calculate = () => {
    let weightKg = unit === "imperial" ? weight * 0.453592 : weight;
    let heightM = unit === "imperial" ? (height * 2.54) / 100 : height / 100;

    let bmiValue = weightKg / (heightM * heightM);
    setBmi(bmiValue.toFixed(2));

    let calorieIntake = 10 * weightKg + 6.25 * (heightM * 100) - 5 * age + 5;
    setCalories(calorieIntake.toFixed(2));
    toast.info(
      `Your BMI: ${bmi} | Estimated Calorie Intake: ${calories} kcal`,
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl text-center grid grid-cols-1 grid-rows-4 gap-5 bg-secondary bg-opacity-15">
      <h2 className="text-2xl font-semibold mb-4 col-span-2">
        Fitness Tracker
      </h2>

      <div className="mb-4 col-span-2">
        <label className="mr-2">Select Unit:</label>
        <select
          className="border p-1"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="metric">Metric (kg, cm)</option>
          <option value="imperial">Imperial (lbs, inches)</option>
        </select>
      </div>
      <div className="">
        <label className="block text-sm/6 font-semibold text-gray-900">
          Weight
        </label>
        <input
          type="number"
          placeholder={`Weight (${unit === "metric" ? "kg" : "lbs"})`}
          className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 bg-card placeholder:text-gray-400"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
        />
      </div>
      <div className="">
        <label className="block text-sm/6 font-semibold text-gray-900">
          Height
        </label>
        <input
          type="number"
          placeholder={`Height (${unit === "metric" ? "cm" : "in"})`}
          className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 bg-card placeholder:text-gray-400"
          value={height}
          onChange={(e) => setHeight(parseFloat(e.target.value))}
        />
      </div>
      <div className="">
        <label className="block text-sm/6 font-semibold text-gray-900">
          Age
        </label>
        <input
          type="number"
          placeholder="Age (years)"
          className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 bg-card placeholder:text-gray-400"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </div>
      <div className="flex justify-center items-center col-span-2">
        <button
          className="bg-primary px-4 py-2 rounded-xl text-lg uppercase text-background"
          onClick={calculate}
        >
          Check
        </button>
      </div>
    </div>
  );
};

export default FitnessTracker;
