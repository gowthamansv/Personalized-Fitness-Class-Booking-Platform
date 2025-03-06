import React from "react";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import { MdMenu } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-scroll";
import { CgGym } from "react-icons/cg";
// import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="flex z-50 sticky top-0 text-white w-full justify-between p-4 bg-cover bg-center bg-no-repeat backdrop-blur-sm bg-s4 font-mono">
      <div className="flex items-center space-x-2">
        <CgGym className="text-3xl cursor-pointer" />
        <h1 className="text-2xl font-bold font-Gruppo tracking-widest">
          FITCENTER
        </h1>
      </div>
      <div className="hidden mobile:flex">
        <ul className="flex space-x-6 text-xl">
          <li>
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={-60}
              duration={1000}
              className="hover:text-gold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="service"
              spy={true}
              smooth={true}
              offset={-50}
              duration={1000}
              className="hover:text-gold"
            >
              Program
            </Link>
          </li>
          <li>
            <Link
              to="trainers"
              spy={true}
              smooth={true}
              offset={-100}
              duration={1000}
              className="hover:text-gold"
            >
              Trainers
            </Link>
          </li>
          <li>
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={-50}
              duration={1000}
              className="hover:text-gold"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="membership"
              spy={true}
              smooth={true}
              offset={-50}
              duration={1000}
              className="hover:text-gold"
            >
              MemberShip
            </Link>
          </li>
        </ul>
      </div>
      <div className="hidden mobile:flex">
        <a href="/logintype">
          <button className="btn px-4 py-2 text-black rounded bg-gray hover:bg-gold">
            Sign Up
          </button>
        </a>
      </div>
      <div className="relative inline-block mobile:hidden" ref={dropdownRef}>
        {/* Profile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          {isOpen ? (
            <LiaTimesSolid className="text-2xl" />
          ) : (
            <MdMenu className="text-2xl" />
          )}
        </button>

        {/* Dropdown Menu with Slide Animation */}
        <div
          className={`absolute right-0 mt-2 w-48 bg-s2 shadow-lg rounded-lg py-2 transition-all duration-300 transform ${
            isOpen
              ? "scale-100 translate-y-0 z-50"
              : "scale-0 -translate-y-4 z-[0]"
          }`}
        >
          <ul className="flex flex-col gap-5 p-5 text-xl">
            <li>
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={-70}
                duration={1000}
                className="hover:text-gold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="service"
                spy={true}
                smooth={true}
                offset={-50}
                duration={1000}
                className="hover:text-gold"
              >
                Program
              </Link>
            </li>
            <li>
              <Link
                to="trainers"
                spy={true}
                smooth={true}
                offset={-100}
                duration={1000}
                className="hover:text-gold"
              >
                Trainers
              </Link>
            </li>
            <li>
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={-50}
                duration={1000}
                className="hover:text-gold"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="membership"
                spy={true}
                smooth={true}
                offset={-50}
                duration={1000}
                className="hover:text-gold"
              >
                MemberShip
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
