"use client";
import React, { useCallback } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./Button";
import GoogleAuthButton from "./GoogleAuthButton";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  disabled?: boolean;
  submitButton?: boolean;
  googleButton?: boolean;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  onSubmit?: () => void;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  disabled,
  body,
  footer,
  actionLabel,
  onClose,
  onSubmit,
  googleButton,
  submitButton,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
    flex
    justify-center
    items-center
    overflow-x-hidden
    overflow-y-auto
    z-50
    bg-neutral-800
    bg-opacity-70
    inset-0
    fixed "
    >
      <div
        className="
        relative
        w-full
        lg:w-3/6
        my-6
        mx-auto
        lg:max-w-xl
        h-full
        lg:h-auto
        "
      >
        <div
          className="
          bg-black
            h-full
            lg:h-auto
            rounded-lg
            shadow-lg
            flex
            flex-col
            relative
            w-full
            outline-none
            focus:outline-none

        "
        >
          <div
            className="
            flex
            flex-row
            justify-between
            items-center
            p-10
            rounded-t
            "
          >
            {" "}
            <h3
              className="
            text-3xl
            font-semibold
            text-white

            "
            >
              {title}
            </h3>
            <button onClick={handleClose}>
              <IoCloseOutline size={28} color="white" />
            </button>
          </div>
          <div className="flex-auto">{body}</div>
          <div className="flex flex-col p-10 gap-2">
            {submitButton && (
              <Button
                label={actionLabel}
                secondary
                fullWidth
                onClick={handleSubmit}
              />
            )}
            {googleButton && <GoogleAuthButton />}
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
