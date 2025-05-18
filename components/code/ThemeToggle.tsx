"use client";
import React from "react";
import { Button } from "../ui/button";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  // change the theme using a hook
  const { theme, setTheme } = useTheme();

  // handle theme change

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-none border-none bg-transparent cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FaSun className="absolute h-6 w-6 rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
      <FaMoon className="absolute h-6 w-6 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export default ThemeToggle;
