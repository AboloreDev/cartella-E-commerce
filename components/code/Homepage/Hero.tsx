import Image from "next/image";
import React from "react";
import heroImage from "../../../public/images/heroImage.webp";

const Hero = () => {
  return (
    <div>
      <Image src={heroImage} alt="Hero Image" />
    </div>
  );
};

export default Hero;
