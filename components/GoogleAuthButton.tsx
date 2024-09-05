import { signIn, useSession } from "next-auth/react";
import Button from "./Button";


const GoogleAuthButton = () => {
  const handleClick = () => {
    signIn("google", { callbackUrl: "/" });  
  };
  return (
    <Button label="Continue with Google" fullWidth onClick={handleClick} />
  );
};

export default GoogleAuthButton;
