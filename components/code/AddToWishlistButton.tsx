"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AddToWishlistButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteItems, addFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableProduct = favoriteItems.find(
      (item) => item._id === product._id
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteItems]);

  const handleFavorite = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product._id) {
      addFavorite(product);
      toast.success(
        existingProduct
          ? "Product removed successfully"
          : "Product added to wishlist!"
      );
    }
  };

  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <div
        onClick={handleFavorite}
        className={cn(
          "p-2 rounded-full cursor-pointer hoverEffect transition-colors",
          existingProduct
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        )}
      >
        <Heart size={16} />
      </div>
    </div>
  );
};

export default AddToWishlistButton;
