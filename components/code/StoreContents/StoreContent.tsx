"use client";

import React, { useEffect, useState } from "react";
import { BRAND_QUERYResult, Category, Product } from "@/sanity.types";
import { X, SlidersHorizontal, Loader2 } from "lucide-react";
import StoreCategoriesList from "./StoreCategoriesList";
import StoreBrandsList from "./StoreBrandsList";
import { useSearchParams } from "next/navigation";
import StorePriceRange from "./StorePriceRange";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "../ProductCard";
import NoProductAvailable from "../NoProductAvailable";

interface StoreContentProps {
  categories: Category[];
  brands: BRAND_QUERYResult;
}

const StoreContent = ({ categories, brands }: StoreContentProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice: number = 0;
      let maxPrice: number = 10000;
      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && price >= $minPrice && price <= $maxPrice
      ] 
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;

      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand, minPrice, maxPrice },
        { next: { revalidate: 0 } }
      );
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPriceRange]);

  return (
    <div className="flex flex-col md:flex-row gap-5 border-t relative">
      {/* Mobile Filters Toggle Button */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className="md:hidden p-2 text-sm font-medium border rounded-md w-fit m-4"
      >
        <SlidersHorizontal className="inline-block mr-2" size={16} />
        Filters
      </button>

      {/* Mobile Filter Slide-in Panel */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          ></div>

          {/* Slide-in filter panel */}
          <div className="relative z-[70] w-64 h-full bg-white dark:bg-black overflow-y-auto shadow-lg animate-slide-in-left">
            <div className="sticky top-0 bg-white dark:bg-black z-10 p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="p-4 space-y-4">
              <StoreCategoriesList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              {/* Brands Filter */}
              <StoreBrandsList
                brands={brands}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
              />

              {/* Price Range Filter */}
              <StorePriceRange
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 border-r scrollbar-hide">
        <StoreCategoriesList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <StoreBrandsList
          brands={brands}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
        />
        <StorePriceRange
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
        />
      </div>

      {/* Product grid or list */}
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
          <NoProductAvailable />
        )}
      </div>
    </div>
  );
};

export default StoreContent;
