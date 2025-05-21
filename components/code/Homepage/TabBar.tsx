import { productType } from "@/app/constant/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface TabBarProps {
  selectedTab: string;
  onSelectedTab: (tab: string) => void;
}

const TabBar = ({ selectedTab, onSelectedTab }: TabBarProps) => {
  console.log(selectedTab);
  return (
    <div className="flex justify-between items-center flex-wrap">
      <div className="flex gap-2 items-center">
        {productType.map((product, index) => (
          <Button
            onClick={() => onSelectedTab(product.title)}
            key={index}
            className={`cursor-pointer font-semibold ${selectedTab === product.title ? "bg-slate-700 text-white dark:bg-slate-400 dark:text-black" : ""}`}
          >
            {product.title}
          </Button>
        ))}
      </div>
      <Link href={"/store"}>
        <Button className="cursor-pointer font-semibold">See All</Button>
      </Link>
    </div>
  );
};

export default TabBar;
