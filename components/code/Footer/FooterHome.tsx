import React from "react";
import Logo from "../Navbar/Logo";
import FooterSocials from "./FooterSocials";

const FooterHome = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex gap-2 flex-col">
        <Logo />
        <p className="text-slate-900 dark:text-slate-400 max-w-md">
          Welcome to Cartella <br /> Your all-in-one destination for smarter,
          <br />
          simpler shopping.
        </p>
      </div>
      <div>
        <FooterSocials />
      </div>
    </div>
  );
};

export default FooterHome;
