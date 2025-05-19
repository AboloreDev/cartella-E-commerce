"use client";

import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { NavHeaderLinks } from "@/app/constant/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialLinks from "./SocialLinks";
import { useOutsideClick } from "@/hook";

interface Sidebar {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<Sidebar> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const SidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        ref={SidebarRef}
        className="min-w-72 max-w-96 bg-black h-screen dark:bg-white p-8 flex flex-col gap-6"
      >
        <div className="flex items-center  text-white dark:text-black justify-between gap-3">
          <Logo />
          <button
            className="hoverRffect cursor-pointer text-white dark:text-black"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <div className="flex  text-white dark:text-black flex-col space-y-4 font-semibold tracking-wide mb-8">
          {NavHeaderLinks.map((links, index) => (
            <Link
              href={links.href}
              key={index}
              className={`hoverEffect ${
                pathname === links.href && "text-white dark:text-black"
              }`}
            >
              {links.title}
            </Link>
          ))}
        </div>
        <SocialLinks />
      </div>
    </div>
  );
};

export default SideMenu;
