import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  outline?: boolean;
  icon?: IconType;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  fullWidth,
  large,
  onClick,
  outline,
  secondary,
  icon: Icon,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
        rounded-full
        disabled:opacity-70
        disabled:cursor-not-allowed
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWidth ? "w-full" : "w-fit"}
        ${secondary ? "bg-white" : "bg-sky-500"}
        ${secondary ? "text-black" : "text-white"}
        ${secondary ? "border-black" : "border-sky-500"}
        ${large ? "text-xl" : "text-md"}
        ${large ? "px-5" : "px-4"}
        ${large ? "py-3" : "py-2"}
        ${outline ? "bg-transparent" : ""}
        ${outline ? "border-white" : ""}
        ${outline ? "text-white" : ""}
        
        
        `}
      >
        {label}
      </button>
    </>
  );
};

export default Button;
