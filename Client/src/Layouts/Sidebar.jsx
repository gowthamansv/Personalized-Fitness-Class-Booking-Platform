import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } transform transition-all duration-700 ease-in-out opacity-0 translate-y-[-10px] scale-95 ${
        isOpen && "opacity-100 translate-y-0 scale-100"
      }`}
    >
      <ul className="flex flex-col gap-5 p-5 text-xl">
        <li>
          <Link to="/Dashboard/user" className="hover:text-gold">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/classbooking" className="hover:text-gold">
            Booking
          </Link>
        </li>
        <li>
          <Link to="/history" className="hover:text-gold">
            Class
          </Link>
        </li>
        <li>
          <Link to="/payment" className="hover:text-gold">
            Payment
          </Link>
        </li>
        <li>
          <Link to="/userreview" className="hover:text-gold">
            Review
          </Link>
        </li>
        <li>
          <Link to="/logout/user" className="hover:text-gold">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
