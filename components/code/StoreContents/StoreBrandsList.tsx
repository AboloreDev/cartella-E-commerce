import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BRAND_QUERYResult } from "@/sanity.types";
import React from "react";

interface StoreBrandsListProps {
  brands: BRAND_QUERYResult;
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const StoreBrandsList = ({
  brands,
  selectedBrand,
  setSelectedBrand,
}: StoreBrandsListProps) => {
  return (
    <div className="w-full p-5">
      <h4 className="text-sm font-semibold mb-3">Brands</h4>
      <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex items-center gap-2 space-y-1 cursor-pointer"
            onClick={() => setSelectedBrand(brand.slug?.current as string)}
          >
            <RadioGroupItem
              value={brand.slug?.current as string}
              id={brand.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={brand.slug?.current}
              className={`${selectedBrand === brand?.slug?.current ? "font-semibold" : "font-normal"}`}
            >
              {brand?.title}
            </Label>
          </div>
        ))}
        {selectedBrand && (
          <button
            onClick={() => setSelectedBrand(null)}
            className="text-sm flex items-start justify-start font-medium text-blue-600 underline cursor-pointer"
          >
            Reset Selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default StoreBrandsList;
