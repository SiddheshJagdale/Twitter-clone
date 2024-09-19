// "use client";

import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginModal = () => {
  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      loginModal.onClose();

      await signIn("credentials", { email, password });
      toast.success(`Logged In`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);

  const BodyContent = (
    <div className="flex flex-col gap-4 p-4">
      <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  const FooterContent = (
    <div className="flex justify-center ">
      <p className=" text-neutral-400 ">
        New to Twitter ?{" "}
        <span
          className="text-white 
      hover:underline 
      cursor-pointer"
          onClick={() => onToggle()}
        >
          Sign Up
        </span>
      </p>
    </div>
  );

  return (
    <>
      <Modal
        title="Login"
        actionLabel="Sign In"
        isOpen={loginModal.isOpen}
        body={BodyContent}
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        disabled={isLoading}
        footer={FooterContent}
        googleButton
        submitButton
      />
    </>
  );
};

export default LoginModal;
