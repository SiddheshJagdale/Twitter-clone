import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";

const Input = () => {
  return (
    <div
      className="
        flex 
        flex-row 
        w-100 
        border-y-[1px]
      border-neutral-800 
        py-3"
    >
      <div className="px-3 w-100">
        <FaUserCircle size={34} color="white" />
      </div>

      <div className="w-100 ">
        <input
          className="text-neutral-100 
          bg-transparent 
          text-2xl 
          outline-none 
          focus:outline-none"
          placeholder="What is happening?!"
        ></input>
        <div
          className="flex 
          flex-row 
          justify-center 
          items-center 
          cursor-pointer
          mt-4 
          hover:bg-blue-100 
          hover:bg-opacity-10 
          rounded-full w-3/4
        border-neutral-800 "
        >
          <FaEarthAmericas size={18} className="fill-blue-500 mx-2" />
          <span className="text-blue-500 text-base font-semibold">
            Everyone can reply
          </span>
        </div>
      </div>
    </div>
  );
};

export default Input;
