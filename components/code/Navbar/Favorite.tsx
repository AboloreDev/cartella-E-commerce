import Link from "next/link";
import React from "react";
import { MdFavorite } from "react-icons/md";

const Favorite = () => {
  return (
    <Link href={"/favorite"} className="group relative">
      <MdFavorite className="w-5 h-5 hover:text-slate-700 hoverEffect " />
      <span className="absolute top-3 -right-1 bg-white dark:bg-black text-black dark:text-white rounded-full h-4 w-4 text-sx font-semibold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        0
      </span>
    </Link>
  );
};

export default Favorite;
