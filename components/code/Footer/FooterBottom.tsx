import React from "react";
import FooterHome from "./FooterHome";
import FooterCategories from "./FooterCategories";
import FooterNavLinks from "./FooterNavLinks";
import FooterNewsLetter from "./FooterNewsLetter";

const FooterBottom = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-10">
      <FooterHome />
      <FooterCategories />
      <FooterNavLinks />
      <FooterNewsLetter />
    </div>
  );
};

export default FooterBottom;
