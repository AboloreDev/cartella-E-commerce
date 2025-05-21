"use client";

import React from "react";
import { Button } from "../ui/button";
import { Product } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
  const isOutOfStock = product.stock === 0;
  return (
    <div>
      <Button
        //   onClick={addToCart}
        disabled={isOutOfStock}
        className={cn(
          "w-full shadow-none font-semibold tracking-wide cursor-pointer hoverEffect",
          className
        )}
      >
        <ShoppingBag size={14} />
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default AddToCartButton;
