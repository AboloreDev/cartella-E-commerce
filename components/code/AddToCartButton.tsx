"use client";

import React from "react";
import { Button } from "../ui/button";
import { Product } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import { toast } from "sonner";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
  const { addItem, getItemCount } = useStore();

  const itemIndex = getItemCount(product._id);
  const isOutOfStock = product.stock === 0;

  function handleAddtoCart() {
    if ((product.stock as number) > itemIndex) {
      addItem(product);
      toast.success(`${product.name?.substring(0, 12)} ... added to cart!`);
    } else {
      toast.error("This product is out of stock.");
      return;
    }
  }

  return (
    <div className="w-full h-12 flex items-center">
      {itemIndex ? (
        <div className="text-sm w-full">
          <div className="flex items-center p-1 justify-between">
            <span className="text-xs">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemIndex : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddtoCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full cursor-pointer hoverEffect font-bold",
            className
          )}
        >
          <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
