import React from "react";
import Container from "../Container";
import FooterDetails from "./FooterDetails";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <footer className="border-t-2 prata-regular">
      <Container>
        <FooterDetails />
        <div>
          <FooterBottom />
        </div>

        {/* Copyright */}
        <div className="py-4 mt-4 text-sm text-center text-slate-900 dark:text-slate-400">
          <h4>
            &copy; {new Date().getFullYear()}{" "}
            <span className="uppercase font-bold">Cartella</span>.... All Right
            Reserved.
          </h4>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
