// "use client";

import React, { use, useCallback, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { signIn } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const id = uuidv4();

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/register", {
        id,
        email,
        password,
        username,
        name,
      });
      registerModal.onClose();

      toast.success("Account Created");

      await signIn("credentials", {
        email,
        password,
      });
    } catch (err) {
      toast.error(`${err}`);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, name, username, password, email]);

  const BodyContent = (
    <div className="flex flex-col gap-4 p-4">
      <Input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
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
        Already have an account ?{" "}
        <span
          className="text-white 
        hover:underline 
        cursor-pointer"
          onClick={() => onToggle()}
        >
          Sign In
        </span>
      </p>
    </div>
  );
  return (
    <>
      <Modal
        title="Sign Up"
        actionLabel="Register"
        isOpen={registerModal.isOpen}
        body={BodyContent}
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        disabled={isLoading}
        footer={FooterContent}
        googleButton
        submitButton
      />
    </>
  );
};

export default RegisterModal;
