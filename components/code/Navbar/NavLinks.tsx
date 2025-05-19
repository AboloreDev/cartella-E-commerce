"use client";

import React from "react";
import { NavHeaderLinks } from "@/app/constant/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-1/3 text-sm items-center gap-5 font-semibold capitalize">
      {NavHeaderLinks?.map((links, index) => (
        <Link
          key={index}
          href={links.href}
          className={`flex relative group hoverEffect ${
            pathname === links.href && "text-slate-900 dark:text-white"
          }`}
        >
          {links.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 group-hover:w-1/2 bg-slate-700 dark:bg-white group-hover:left-0 hoverEffect ${
              pathname === links.href && "w-1/2"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 group-hover:w-1/2 bg-slate-700 dark:bg-white group-hover:right-0 hoverEffect ${
              pathname === links.href && "w-1/2"
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
