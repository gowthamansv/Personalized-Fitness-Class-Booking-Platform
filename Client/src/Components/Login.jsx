import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const isTrainer = location.pathname.includes("/trainer");
  const loginType = isTrainer ? "trainer" : "user";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://personalized-fitness-class-booking.onrender.com/api/${loginType}/login`,
        { email, password }, // Move this inside the request
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure cookies are sent if needed
        }
      );

      if (response.status === 200) {
        toast.success("Login successful!", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
        });

        localStorage.setItem("token", response.data.token); // Save token
        setTimeout(() => {
          window.location.href = `/dashboard/${loginType}`; // Redirect to dashboard
        }, 1000);
      } else {
        toast.error(
          response.data.message || "Login failed. Please try again.",
          {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
          }
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred. Please try again later.",
        {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
        }
      );
    }
  };

  return (
    <div className="flex justify-center items-center w-screen">
      <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl text-center bg-secondary bg-opacity-15 flex flex-col gap-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-2xl font-semibold text-accent">
            Sign in to your account {loginType}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-base text-gray-200">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base text-gray-200"
              >
                Password
              </label>
              <input
                type={visible ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-left">
            <p className="text-sm">
              Forgot your password?{" "}
              <Link
                to={`/forgotpassword/${loginType}`}
                className="hover:underline"
              >
                Forgot Password
              </Link>
            </p>
            <p className="mt-2 text-sm">
              Don't have an account?{" "}
              <Link to={`/register/${loginType}`} className="a hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
