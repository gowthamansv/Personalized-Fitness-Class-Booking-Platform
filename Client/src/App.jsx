import React from "react";
import "./App.css";
import "./assets/fonts/fonts.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import PasswordReset from "./Components/ResetPassword";
import Register from "./Components/Register";
import Dashboard from "./Features/Dashboard";
import LoginType from "./Pages/LoginType";
import Payment from "./Pages/Payment";
import ClassBooking from "./Pages/ClassBooking";
import { ToastContainer } from "react-toastify";
import History from "./Pages/History";
import DashboardTrainer from "./Trainers/DashboardTrainer";
import UserReview from "./Features/UserReview";
import Logout from "./Components/Logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logintype" element={<LoginType />} />
          <Route path="/login/user" element={<Login />} />
          <Route path="/login/trainer" element={<Login />} />
          <Route path="/logout/user" element={<Logout />} />
          <Route path="/logout/trainer" element={<Logout />} />
          <Route path="/forgotpassword/user" element={<ForgotPassword />} />
          <Route path="/resetpassword/user" element={<PasswordReset />} />
          <Route path="/register/user" element={<Register />} />
          <Route path="/dashboard/user" element={<Dashboard />} />
          <Route path="/dashboard/trainer" element={<DashboardTrainer />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/classbooking" element={<ClassBooking />} />
          <Route path="/forgotpassword/trainer" element={<ForgotPassword />} />
          <Route path="/resetpassword/trainer" element={<PasswordReset />} />
          <Route path="/register/trainer" element={<Register />} />
          <Route path="/dashboard/trainer" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/userreview" element={<UserReview />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
