import { footerCategories } from "@/app/constant/data";
import Link from "next/link";
import React from "react";

const FooterCategories = () => {
  return (
    <div className="flex space-y-3 flex-col">
      <h2 className="font-bold">Categories</h2>
      <ul className="flex flex-col space-y-1">
        {footerCategories.map((categories, index) => (
          <li
            key={index}
            className=" text-slate-900 dark:text-slate-400 hoverEffect"
          >
            <Link href={`/category/${categories.href}`}>
              {categories.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterCategories;
