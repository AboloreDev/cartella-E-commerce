import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const FooterNewsLetter = () => {
  return (
    <div className="flex space-y-3 flex-col">
      <div>
        <h2 className="font-bold">NewsLetter</h2>
        <p className=" text-slate-900 dark:text-slate-400">
          Subscribe to our Newsletter to receive updates and Exclusive Offers
        </p>
      </div>
      <form className="flex flex-col space-y-1">
        <Input placeholder="Enter your email address" type="email" required />
        <Button type="submit" className="cursor-pointer">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default FooterNewsLetter;
