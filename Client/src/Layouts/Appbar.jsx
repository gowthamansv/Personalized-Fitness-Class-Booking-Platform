import React from "react";
import { MdMenu } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";

const Appbar = ({ isOpen, setIsOpen }) => {
  return (
    <div className="flex z-50 sticky top-0 text-white w-full justify-start items-center p-4 bg-cover bg-center bg-no-repeat backdrop-blur-sm bg-s4 font-mono">
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
      <h1 className="text-2xl">Dashboard</h1>
    </div>
  );
};

export default Appbar;
