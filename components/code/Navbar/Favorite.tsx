import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MdFavorite } from "react-icons/md";

const Favorite = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product;
}) => {
  return (
    <>
      {!showProduct ? (
        <Link href={"/favorite"} className="group relative">
          <MdFavorite className="w-5 h-5 hover:text-slate-700 hoverEffect " />
          <span className="absolute top-3 -right-1 bg-white dark:bg-black text-black dark:text-white rounded-full h-4 w-4 text-sx font-semibold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            0
          </span>
        </Link>
      ) : (
        <button className="group relative border p-2 rounded-md">
          <Heart className="w-5 h-5 hoverEffect" />
        </button>
      )}
    </>
  );
};

export default Favorite;
