import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoImage from "../../../app/favicon.ico";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={cn("flex items-center gap-1", className)}>
      <Image
        src={LogoImage}
        alt="Logo Image"
        className="w-8 h-8 hidden md:flex"
      />

      <h3
        className={cn(
          "text-xl prata-regular font-semibold tracking-wide uppercase cursor-pointer",
          className
        )}
      >
        Cartella
      </h3>
    </Link>
  );
};

export default Logo;
