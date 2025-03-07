import React, { useEffect, useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Appbar from "../Layouts/Appbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Trainers from "../Features/Trainers";

const ClassBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [slot, setSlot] = useState([]);
  const [trainer, setTrainer] = useState([]);
  const [slott, setSlott] = useState([]);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await axios.get(
          "https://personalized-fitness-class-booking.onrender.com/api/trainer"
        );
        setTrainer(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load slot");
        toast.error("Failed to load slot", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    };
    const fetchSlot = async () => {
      try {
        const response = await axios.get(
          "https://personalized-fitness-class-booking.onrender.com/api/slottime"
        );
        setSlot(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load slot");
        setLoading(false);
        toast.error("Failed to load slot", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    };
    fetchTrainer();
    fetchSlot();
  }, []);

  const dayOrder = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  const sortSlotsByDay = (slots) => {
    return slots.sort((a, b) => {
      const dayA = getDayOfWeek(a.date);
      const dayB = getDayOfWeek(b.date);
      return dayOrder[dayA] - dayOrder[dayB];
    });
  };

  const slotByTrainer = async (e, trainerId) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://personalized-fitness-class-booking.onrender.com/api/slottime/trainer",
        {
          id: trainerId,
        }
      );
      const sortedSlots = sortSlotsByDay(
        Array.isArray(response.data) ? response.data : [response.data]
      );
      setSlott(sortedSlots);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBooking = async (e, id) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://personalized-fitness-class-booking.onrender.com/api/booking",
        { slotId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    } catch (error) {
      // Pass the error message to toast.error
      toast.error(error.response?.data?.message || error.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  const close = () => {
    setIsShow(false);
  };
  return (
    <div className="flex w-screen h-screen flex-col relative">
      <Appbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full flex">
        <Sidebar isOpen={isOpen} />
        <div className="w-full">
          {loading ? (
            <div className="">
              <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                {/* ... */}
              </svg>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="">
              <p>{error}</p>
            </div>
          ) : (
            <div className="w-full flex flex-col" onClick={close}>
              <div className="w-full flex justify-evenly items-center p-5">
                <h1>"Review. Choose. Train with the best!"</h1>
                <h1 className="font-extralight text-2xl">Trainers</h1>
              </div>
              <Trainers />
              <div
                className="w-full relative flex justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="bg-primary px-4 py-2 rounded text-background cursor-cell"
                  onClick={() => setIsShow(!isShow)}
                >
                  Trainers
                </button>
                <div
                  className={`absolute flex items-center justify-center top-10 mt-2 w-52 bg-s2 shadow-lg rounded-lg py-2 transition-all duration-300 transform ${
                    isShow
                      ? "opacity-100 translate-y-0 z-50"
                      : "opacity-0 -translate-y-50"
                  }`}
                >
                  <ul className="flex flex-col gap-5 p-5 text-lg">
                    {trainer.map((item, index) => (
                      <li
                        className="cursor-pointer"
                        key={index}
                        onClick={(e) => {
                          slotByTrainer(e, item._id);
                          setIsShow(!isShow);
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <table className="">
                  <thead>
                    <tr>
                      <th className="p-2">Date</th>
                      <th className="p-2">Class</th>
                      <th className="p-2">Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slott.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-2">
                          {item.date} - {getDayOfWeek(item.date)}
                        </td>
                        <td className="p-2 flex flex-col items-center">
                          {item.trainer.specialization}
                          <br />
                          <span className="text-sm">
                            From:{item.starttime}-To:{item.endtime}
                          </span>
                        </td>
                        <td className="p-2">
                          <button
                            className="px-5 py-2 rounded-3xl shadow-2xl bg-primary text-background cursor-cell"
                            onClick={(e) => handleBooking(e, item._id)}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassBooking;
