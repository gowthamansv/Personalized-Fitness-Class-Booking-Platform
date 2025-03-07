import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Trainers = () => {
  const [isTrainer, setIsTrainer] = useState(false);
  const [trainerDetail, setTrainerDetail] = useState([]);
  const [trainer, setTrainer] = useState([]);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await axios.get(
          "https://personalized-fitness-class-booking.onrender.com/trainer"
        );
        setTrainer(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load slot", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    };
    fetchTrainer();
  }, []);

  const handleTrainer = async (id) => {
    try {
      const response = await axios.get(
        `https://personalized-fitness-class-booking.onrender.com/trainer/${id}`
      );
      console.log(response.data);
      setTrainerDetail(
        Array.isArray(response.data) ? reaponse.data : [response.data]
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <div className="grid grid-flow-col grid-cols-5 p-5 gap-5">
        {trainer.map((item, idx) => (
          <div className="flex bg-secondary bg-opacity-80 flex-col justify-center items-center gap-2 p-5 rounded-2xl shadow-2xl">
            <h1>{item.name}</h1>
            <ul>
              <li>Experience:{item.experience}</li>
              <li>Qualification:{item.qualification}</li>
              <li>Specialization:{item.specialization}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
