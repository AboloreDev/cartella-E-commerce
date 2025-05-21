"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import React from "react";

const AddToWishlistButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button
        className={`p-2 rounded-full hover:bg-black hover:dark:bg-white hover:text-white hover:dark:text-black cursor-pointer hoverEffect`}
      >
        <Heart size={16} />
      </button>
    </div>
  );
};

export default AddToWishlistButton;
