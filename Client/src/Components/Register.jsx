import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isTrainer = location.pathname.includes("/trainer");
  const loginType = isTrainer ? "trainer" : "user";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    weight: "",
    height: "",
    age: "",
    gender: "",
    caloriesIntake: "",
    experience: "",
    qualification: "",
    specialization: "",
    availability: "",
    socialMedia: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const requestBody = loginType
        ? {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            weight: formData.weight,
            height: formData.height,
            age: formData.age,
            gender: formData.gender,
            experience: formData.experience,
            qualification: formData.qualification,
            specialization: formData.specialization,
            availability: formData.availability,
            socialMedia: formData.socialMedia,
          }
        : {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            weight: formData.weight,
            height: formData.height,
            age: formData.age,
            gender: formData.gender,
            caloriesIntake: formData.caloriesIntake,
          };

      const response = await axios.post(
        `https://personalized-fitness-class-booking.onrender.com/api/${loginType}/register`,
        requestBody,
        { withCredentials: true }
      );

      toast.success("Registered successfully");
    } catch (err) {
      console.error("Error during registration:", err);
      setError(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
      toast.error("occured an error");
    } finally {
      setLoading(false);
      navigate(`/login/${loginType}`);
    }
  };

  return (
    <div className="flex bg min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl text-gray-200">Sign Up</h2>

        {/* Error Message */}
        {error && (
          <div className="p-2 mb-4 text-sm text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3">
          {/* Common Fields */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
          />
          <input
            type="text"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
          />
          <input
            type="text"
            name="height"
            placeholder="Height (cm)"
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
          />

          {/* Conditionally Render Additional Fields */}
          {isTrainer ? (
            <>
              <input
                type="text"
                name="experience"
                placeholder="Experience (years)"
                onChange={handleChange}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
              />
              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                onChange={handleChange}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                onChange={handleChange}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
              />
              <input
                type="text"
                name="availability"
                placeholder="Availability"
                onChange={handleChange}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
              />
              <input
                type="text"
                name="socialMedia"
                placeholder="Social Media"
                onChange={handleChange}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
              />
            </>
          ) : (
            <input
              type="text"
              name="caloriesIntake"
              placeholder="Daily Calories Intake"
              onChange={handleChange}
              className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-600 bg-transparent"
            />
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Navigation back to Login */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to={`/login/${loginType}`} className="a hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
