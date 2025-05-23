import { productType } from "@/app/constant/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface TabBarProps {
  selectedTab: string;
  onSelectedTab: (tab: string) => void;
}

const TabBar = ({ selectedTab, onSelectedTab }: TabBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-4 sm:gap-2 mb-4">
      <div className="flex flex-wrap gap-2">
        {productType.map((product, index) => (
          <Button
            onClick={() => onSelectedTab(product.title)}
            key={index}
            className={`cursor-pointer font-semibold ${
              selectedTab === product.title
                ? "bg-slate-700 text-white dark:bg-slate-400 dark:text-black"
                : ""
            }`}
          >
            {product.title}
          </Button>
        ))}
      </div>
      <Link href={"/store"}>
        <Button className="cursor-pointer font-semibold w-full sm:w-auto">
          See All
        </Button>
      </Link>
    </div>
  );
};

export default TabBar;
