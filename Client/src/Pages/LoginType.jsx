import React from "react";

const LoginType = () => {
  return (
    <div className="flex justify-center items-center w-screen">
      <div className="max-w-md mx-auto p-6 shadow-lg rounded-xl text-center bg-secondary bg-opacity-15 flex flex-col gap-10">
        <h1 className="font-semibold text-2xl text-accent">
          Choose your destination
        </h1>
        <ul className="text-center w-full text-xl flex flex-col gap-5">
          <li>
            <a href="/login/user">User</a>
          </li>
          <li>
            <a href="/login/trainer">Trainer</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginType;
