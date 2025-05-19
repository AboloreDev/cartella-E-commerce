import React from "react";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

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
