"use client";

import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { toast } from "sonner";

const Favorite = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product;
}) => {
  const { favoriteItems, addFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      const availableProduct = favoriteItems.find(
        (item) => item._id === product._id
      );
      setExistingProduct(availableProduct || null);
    } else {
      setExistingProduct(null);
    }
  }, [product, favoriteItems]);

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!product) return;

    addFavorite(product);
    toast.success(
      existingProduct
        ? "Product removed successfully"
        : "Product added to wishlist!"
    );
  };

  return (
    <>
      {!showProduct ? (
        <Link href={"/favorite"} className="group relative">
          <MdFavorite className="w-5 h-5 hover:text-slate-700 hoverEffect" />
          <span className="absolute top-3 -right-1 bg-white dark:bg-black text-black dark:text-white rounded-full h-4 w-4 text-xs font-semibold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {favoriteItems.length}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className={`group relative border p-2 rounded-md transition-colors ${
            existingProduct
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          }`}
        >
          <Heart className="w-5 h-5 hoverEffect" />
        </button>
      )}
    </>
  );
};

export default Favorite;
