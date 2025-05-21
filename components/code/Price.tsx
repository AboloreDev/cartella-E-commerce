import React from "react";
import PriceFormatter from "./PriceFormatter";

interface PriceProps {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}
const Price = ({ price, discount }: PriceProps) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <PriceFormatter amount={price} className="text-green-500" />
        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className="text-slate-400 line-through text-xs font-normal"
          />
        )}
      </div>
    </div>
  );
};

export default Price;
