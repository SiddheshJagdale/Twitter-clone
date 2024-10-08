"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { BsTwitter } from "react-icons/bs";

const SideBarLogo = () => {
  const router = useRouter();
  return (
    <div
      className="
      rounded-full
      h-14
      w-14
      p-4
      flex
      items-center
      
      justify-center
      hover:bg-sky-500
      hover:bg-opacity-10
      cursor-pointer
      transition
    "
      onClick={() => router.push("/")}
    >
      <BsTwitter size={28} color="white" className="hover:bg-sky-500"/>
    </div>
  );
};

export default SideBarLogo;
