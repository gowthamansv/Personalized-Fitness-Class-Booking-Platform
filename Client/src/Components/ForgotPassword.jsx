import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const isTrainer = location.pathname.includes("/trainer");
  const loginType = isTrainer ? "trainer" : "user";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/${loginType}/forgotpassword`,
        { email }
      );
      toast.success(response.data.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };
  return (
    <div className="flex w-full h-[92vh] justify-center items-center">
      <div className="flex w-fit bg-secondary bg-opacity-15 flex-col justify-center items-center gap-2 p-5 rounded-2xl shadow-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl text-gray-200">
            Forgot your password?
          </h2>
        </div>
        {isSubmitted ? (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h2>Password reset instructions have been sent to your email.</h2>
            <Link to="/">
              <button className="w-full mt-4 flex justify-center py-2 px-4">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-base text-gray-200">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 flex justify-center py-2 px-4"
              >
                reset password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
