import React, { useEffect, useState } from "react";
import Profile from "../Features/Profile";
import axios from "axios";
import { toast } from "react-toastify";
import SlotBooking from "./SlotBooking";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import ClassDetails from "./ClassDetails";
import TrainerReview from "./TrainerReview";

const DashboardTrainer = () => {
  const [isShow, setIsShow] = useState(false);
  const [trainer, setTrainer] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://personalized-fitness-class-booking.onrender.com/api/trainer/trainerdetails",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
            withCredentials: true,
          }
        );
        setTrainer(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error(error.message);
        setTimeout(() => navigate("/login/trainer"), 2000);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex w-screen h-screen flex-col overflow-auto">
      <nav className="flex z-40 sticky top-0 text-white w-full justify-between px-5 p-4 bg-cover bg-center bg-no-repeat backdrop-blur-sm bg-s4 font-mono">
        <h1 className="text-2xl" onClick={() => setIsShow(!isShow)}>
          Dashboard
        </h1>
        <CgProfile
          className="text-2xl cursor-pointer"
          onClick={() => setIsShow(!isShow)}
        />
      </nav>
      <div className="w-full grid grid-cols-1 gap-4">
        <div className="w-full flex justify-center items-center h-fit p-4">
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
        <div className="grid grid-flow-row grid-cols-2 grid-rows-2 gap-10">
          <Profile user={[trainer]} isTrainer={true} />
          <SlotBooking />
          <ClassDetails />
          <TrainerReview />
        </div>
      </div>
      {isShow && (
        <div className="absolute flex items-center justify-center top-12 z-50 right-5 mt-2 w-52 bg-s2 shadow-lg rounded-lg py-2 transition-all duration-300 transform">
          <Link to="/logout/user" className="text-white">
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardTrainer;
