import React from "react";
import { quickFooterLinks } from "@/app/constant/data";
import Link from "next/link";

const FooterNavLinks = () => {
  return (
    <div className="flex space-y-3 flex-col">
      <h2 className="font-bold">Quick Links</h2>
      <ul className="flex flex-col space-y-1">
        {quickFooterLinks.map((footerLinks, index) => (
          <li
            key={index}
            className=" text-slate-900 dark:text-slate-400 hoverEffect space-y-2"
          >
            <Link href={footerLinks.href}>{footerLinks.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNavLinks;
