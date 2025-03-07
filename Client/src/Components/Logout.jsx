import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTrainer = location.pathname.includes("/trainer");
  const loginType = isTrainer ? "trainer" : "user";

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post(
          `https://personalized-fitness-class-booking.onrender.com/api/${loginType}/logout`,
          {},
          { withCredentials: true }
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setTimeout(() => navigate("/"), 2000);
      } catch (error) {
        toast.error("Failed to log out. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center w-screen">
      <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl text-center bg-secondary bg-opacity-15 flex flex-col gap-10">
        <p>Logging out...</p>
      </div>
    </div>
  );
};

export default Logout;
