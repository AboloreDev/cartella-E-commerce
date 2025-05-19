import React from "react";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";

const Login = () => {
  return (
    <SignInButton mode="modal">
      <Button
        variant="outline"
        className="text-sm p-2 font-semibold hoverEffect cursor-pointer"
      >
        Login
      </Button>
    </SignInButton>
  );
};

export default Login;
