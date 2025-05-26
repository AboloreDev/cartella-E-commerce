import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

const priceArray = [
  { title: "Under $50", value: [0, 50] },
  { title: "$50 - $100", value: [50, 100] },
  { title: "$100 - $200", value: [100, 200] },
  { title: "$200 - $500", value: [200, 500] },
  { title: "$500 - $1000", value: [500, 1000] },
  { title: "Above $1000", value: [1000, 10000] },
];

interface StorePriceRangeProps {
  selectedPriceRange: string | null;
  setSelectedPriceRange: React.Dispatch<React.SetStateAction<string | null>>;
}
const StorePriceRange = ({
  selectedPriceRange,
  setSelectedPriceRange,
}: StorePriceRangeProps) => {
  return (
    <div className="w-full p-5">
      <h4 className="text-base font-bold">Price Range</h4>
      <RadioGroup className="mt-2 space-y-1">
        {priceArray.map((price, index) => (
          <div
            key={index}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setSelectedPriceRange(price.title)}
          >
            <RadioGroupItem
              value={price.title}
              id={price.title}
              className="rounded-sm"
            />
            <Label
              htmlFor={price.title}
              className={`${selectedPriceRange === price.title ? "font-semibold" : "font-normal"}`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
        {selectedPriceRange && (
          <button
            onClick={() => setSelectedPriceRange(null)}
            className="text-sm font-medium flex items-start justify-start text-blue-600 underline cursor-pointer"
          >
            Reset Selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default StorePriceRange;
