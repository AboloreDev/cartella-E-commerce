import React from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import AstronautImg from "../../public/images/astro.jpg";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const NoAccess = ({
  details = "Log in to view your cart items and checkout. Don't miss out on your favorite products!",
}: {
  details?: string;
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-20 ">
      <Card className="w-full max-w-md text-center p-6 bg-black text-white dark:bg-white dark:text-black">
        <CardContent className="space-y-4 cursor-pointer">
          <Image
            src={AstronautImg}
            alt="Access Denied Illustration"
            width={150}
            height={150}
            className="mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold">Access Denied 🚀</h2>
          <p className="">{details}</p>
          <SignInButton mode="modal">
            <Button size="lg" className="w-full cursor-pointer">
              Sign In to Continue
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex cursor-pointer flex-col gap-2 mt-4">
          <span className="text-sm text-muted-foreground">
            Don’t have an account?
          </span>
          <SignUpButton mode="modal">
            <Button
              size="lg"
              variant="outline"
              className="w-full cursor-pointer text-white dark:text-black  bg-black dark:bg-white"
            >
              Create Account
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
