import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Category } from "@/sanity.types";
import React from "react";

interface StoreCategoryListProps {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const StoreCategoriesList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: StoreCategoryListProps) => {
  return (
    <div className="w-full p-5">
      <h4 className="text-sm font-semibold mb-2">Product Categories</h4>
      <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              setSelectedCategory(category.slug?.current as string)
            }
          >
            <RadioGroupItem
              value={category.slug?.current as string}
              id={category.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={category.slug?.current}
              className={`${selectedCategory === category?.slug?.current ? "font-semibold" : "font-normal"}`}
            >
              {category?.title}
            </Label>
          </div>
        ))}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm font-medium flex items-start justify-start text-blue-600 underline cursor-pointer"
          >
            Reset Selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default StoreCategoriesList;
