import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import Appbar from "../Layouts/Appbar";
import Profile from "./Profile";
import FitnessTracker from "./FitnessTracker";
import Recommendation from "./Recommendation";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // const dropdownRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  function handleLogout() {
    navigate("/logout");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://personalized-fitness-class-booking.onrender.com/user/userdetails",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
            withCredentials: true,
          }
        );
        setUser(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data");
        setLoading(false);
        toast.error("Failed to load user data", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
        navigate("/login/user");
      }
    };
    fetchData(); // Call the function to fetch data on component mount
  }, []); // Empty array ensures the effect runs only once when component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex w-screen h-screen flex-col">
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
            <div className="w-full grid grid-cols-1 gap-4">
              <div className="w-full flex justify-center items-center h-fit p-4">
                <h1 className="text-2xl">Profile</h1>
              </div>
              <div className="flex flex-row md:flex-col gap-4">
                <Profile
                  user={[user]}
                  isTrainer={false}
                  className="flex-1 min-w-0"
                />
                <FitnessTracker className="flex-1 min-w-0" />
                <Recommendation />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
