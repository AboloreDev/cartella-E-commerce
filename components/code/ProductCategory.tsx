"use client";

import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";

const query = `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){...,"categories": categories[] -> title}`;

interface ProductCategoryProps {
  category: Category[];
  slug: string;
}

const ProductCategory = ({ category, slug }: ProductCategoryProps) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  const handleProductFetch = async (categorySlug: string) => {
    setLoading(true);
    try {
      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProductFetch(currentSlug);
  }, [router]);

  return (
    <div className="py-5 flex flex-col md:flex-row gap-5">
      {/* Category Buttons */}
      <div className="w-full md:w-48 md:min-w-[12rem] md:max-w-[14rem]">
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible px-1 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
          {category.map((item, index) => (
            <Button
              key={index}
              onClick={() => handleCategoryChange(item.slug?.current as string)}
              className={`min-w-max font-semibold text-sm border rounded ${
                currentSlug === item.slug?.current
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-black dark:bg-slate-950 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Section */}
      <div className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 w-full bg-gray-50 dark:bg-slate-950">
            <motion.div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading products...</span>
            </motion.div>
          </div>
        ) : products.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
            {products.map((product) => (
              <AnimatePresence key={product._id}>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable selectedTab={currentSlug} />
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
