import React from "react";
import { MdPhone, MdEmail } from "react-icons/md";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="grid grid-flow-row mobile:grid-flow-col grid-cols-1 mobile:grid-cols-4 gap-2 mobile:gap-10 p-5 text-text bg-s4">
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-semibold text-s1">FITCENTER</h1>
        <p>
          Build strength and confidence at our gym with state-of-the-art
          equipment, personalized training, and a motivating community
        </p>
      </div>
      <div className="flex flex-col gap-5 p-5 items-start mobile:items-center">
        <h1 className="text-2xl font-semibold text-s1">Quick links</h1>
        <ul className="hidden mobile:flex flex-row mobile:flex-col">
          <li>Home</li>
          <li>Service</li>
          <li>Trainers</li>
          <li>About Us</li>
          <li>MemberShip</li>
        </ul>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-semibold text-s1">Address</h1>
        <p>Republic of Belarus Minsk city Dzerzhinsky Avenue 15</p>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-semibold text-s1">Contact Us</h1>
        <ul>
          <li className="flex items-center gap-2">
            <MdPhone className="text-xl" /> +375(44)-777-24-12
          </li>
          <li className="flex items-center gap-2">
            <MdEmail className="text-xl" /> fitcenter@gmail.com
          </li>
        </ul>
        <div className="flex gap-5 text-s1">
          <FaSquareFacebook className="text-2xl" />
          <FaSquareInstagram className="text-2xl" />
          <FaSquareYoutube className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
