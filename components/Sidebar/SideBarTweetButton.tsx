import React, { useCallback } from "react";
import { GiFeather } from "react-icons/gi";
import useLoginModal from "@/hooks/useLoginModal";

const SideBarTweetButton = () => {

  const loginModal = useLoginModal();

  const onClick = useCallback(()=>{
    loginModal.onOpen();
  },[loginModal])
  return (
    <div className="flex flex-row items-center mt-1" onClick={()=>onClick()}>
      <div
        className=" 
      bg-blue-500  
        relative    
        rounded-full
        h-14
        w-14
        flex
        items-center
        justify-center
        p-4
      hover:bg-sky-500
        hover:bg-opacity-10
        cursor-pointer 
        lg:hidden 
      "
      >
        <GiFeather size={28} color="white" />
      </div>
      <div
        className=" 
        bg-sky-500 
        relative    
        hidden
        gap-4
        rounded-full
        lg:flex
        items-center
        justify-center
        p-4
      hover:bg-blue-200
        hover:bg-opacity-10
        cursor-pointer 
      "
      >
        <GiFeather size={24} color="white" />
        <p className="text-white lg:block hidden text-xl">Tweet</p>
      </div>
    </div>
  );
};

export default SideBarTweetButton;
