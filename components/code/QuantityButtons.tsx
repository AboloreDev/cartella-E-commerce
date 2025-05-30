"use client";

import { Product } from "@/sanity.types";
import useStore from "@/store";
import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface QuantityButtonsProps {
  product: Product;
  className?: string;
}

const QuantityButtons = ({ product, className }: QuantityButtonsProps) => {
  const { addItem, removeItem, getItemCount } = useStore();
  const itemIndex = getItemCount(product._id);
  const isOutOfStock = product.stock === 0;

  const handleRemoveItem = () => {
    removeItem(product._id);
    if (itemIndex > 1) {
      toast.success("Item quantity decreased.");
    } else {
      toast.success(`${product.name?.substring(0, 12)} ... removed from cart!`);
    }
  };

  const handleAddToCart = () => {
    if ((product.stock as number) > itemIndex) {
      addItem(product);
      toast.success("Quantity increased.");
    } else {
      toast.error("This product is out of stock.");
      return;
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={handleRemoveItem}
        variant="outline"
        size="icon"
        disabled={itemIndex === 0 || isOutOfStock}
        className="w-5 h-5 cursor-pointer"
      >
        <Minus />
      </Button>
      <span className="font-bold">{itemIndex}</span>
      <Button
        onClick={handleAddToCart}
        variant="outline"
        size="icon"
        disabled={isOutOfStock}
        className="w-5 h-5 cursor-pointer"
      >
        <Plus size={14} />
      </Button>
    </div>
  );
};

export default QuantityButtons;
