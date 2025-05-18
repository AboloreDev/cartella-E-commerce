import React from "react";
import { Button } from "../ui/button";

const Login = () => {
  return (
    <Button
      variant="outline"
      className="text-sm p-2 font-semibold hoverEffect hover:bg-slate-700 dark:hover:bg-white hover:text-white dark:hover:text-black cursor-pointer"
    >
      Login
    </Button>
  );
};

export default Login;
