import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SlotBooking = () => {
  const [date, setDate] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const token = localStorage.getItem("token");
  const [startPeriod, setStartPeriod] = useState("AM"); // AM/PM for start time
  const [endPeriod, setEndPeriod] = useState("AM"); // AM/PM for end time

  const convertTo24HourFormat = (time) => {
    const [hour, minute] = time.split(":");
    const period = minute.split(" ")[1]; // AM/PM
    let hour24 = parseInt(hour);

    if (period === "PM" && hour24 !== 12) hour24 += 12;
    if (period === "AM" && hour24 === 12) hour24 = 0;

    return new Date(2000, 0, 1, hour24, parseInt(minute.split(" ")[0])); // Random date to calculate the time
  };

  // Helper function to format time to HH:mm AM/PM
  const formatTime = (hour, minute, period) => {
    let formattedHour = hour;
    if (hour === 0) formattedHour = 12; // For 12 AM
    if (hour > 12) formattedHour = hour - 12; // Convert PM to 12-hour format

    return `${formattedHour}:${minute} ${period}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !starttime || !endtime) {
      alert("Please fill all fields.");
      return;
    }

    // Convert start and end times to 24-hour format
    const startTimeIn24hr = convertTo24HourFormat(starttime);
    const endTimeIn24hr = convertTo24HourFormat(endtime);

    // Calculate the difference in hours
    const timeDifference = (endTimeIn24hr - startTimeIn24hr) / (1000 * 60 * 60); // In hours

    if (timeDifference !== 1) {
      alert("The gap between start and end time must be exactly 1 hour.");
      return;
    }

    const formattedStartTime = formatTime(
      starttime.split(":")[0],
      starttime.split(":")[1],
      startPeriod
    );
    const formattedEndTime = formatTime(
      endtime.split(":")[0],
      endtime.split(":")[1],
      endPeriod
    );

    // Prepare request body
    const requestBody = {
      date,
      starttime: formattedStartTime,
      endtime: formattedEndTime,
    };

    console.log("Submitting:", requestBody);

    try {
      const response = await axios.post(
        "http://localhost:3001/slottime",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
          withCredentials: true,
        }
      );

      console.log("Server Response:", response.data);
      toast.success("Slot updated", {
        autoClose: 2000,
        hideProgressBar: true,
      });

      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error submitting time slot:", error);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl text-center bg-secondary bg-opacity-15">
      <form
        onSubmit={handleSubmit}
        className="grid grid-flow-row grid-cols-2 grid-rows-4 gap-10"
      >
        <div className="col-span-2 flex justify-center items-center">
          <h1 className="text-2xl text-balance text-gray-900 sm:text-xl">
            Update Your Availability
          </h1>
        </div>
        <div className="col-span-2">
          <label className="block text-sm/6 font-semibold text-gray-900">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 bg-card placeholder:text-gray-400"
            required
          />
        </div>
        <div className="">
          <label className="font-medium">Start Time (HH:MM AM/PM)</label>
          <input
            type="time"
            value={starttime}
            onChange={(e) => setStartTime(e.target.value)}
            className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 bg-card placeholder:text-gray-400"
            required
          />
        </div>
        <div className="">
          <label className="font-medium">End Time (HH:MM AM/PM)</label>
          <input
            type="time"
            value={endtime}
            onChange={(e) => setEndTime(e.target.value)}
            className="block w-full rounded-md px-3.5 py-2 text-base text-gray-900 bg-card placeholder:text-gray-400"
            required
          />
        </div>
        <div className="col-span-2 flex justify-evenly items-center gap-5">
          <button
            type="submit"
            className="bg-primary px-4 py-2 rounded-xl text-lg uppercase text-background cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SlotBooking;
