"use client";

import React, { useEffect, useState } from "react";
import TabBar from "./TabBar";
import { productType } from "@/app/constant/data";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "../NoProductAvailable";
import ProductCard from "../ProductCard";
import { Product } from "@/sanity.types";

const ProductGrid = () => {
  // states
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0].title || "");
  const query = `* [_type == "product" && variant== $variant ] | order(name desc) {
  ...,"categories":categories[]->title
}`;

  const params = { variant: selectedTab.toLowerCase() };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.error("Product fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);
  return (
    <div>
      <TabBar selectedTab={selectedTab} onSelectedTab={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center py-10 min-h-80 justify-center gap-4 w-full mt-10 bg-gray-200 dark:bg-slate-800">
          <div className="space-x-2 flex items-center">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Product is loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {products.length ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {products.map((product) => (
                <AnimatePresence key={product._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          ) : (
            <NoProductAvailable selectedTab={selectedTab} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
