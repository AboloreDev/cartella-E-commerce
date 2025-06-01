"use client";

import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SearchIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await client.fetch(
        `*[_type == "product" && (title match $query || description match $query || name match $query || variant match $query || brand match $query)] {
          _id,
          title,
          description,
          brand,
          variant,
          name,
          slug,
          price,
          images
        }`,
        { query: `${query}*` } as Record<string, unknown>
      );
      setResults(response);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Clear search handler
  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  // Effect to handle debounced search when the debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setResults([]);
    } else {
      handleSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="top-1 left-4 cursor-pointer"
      >
        <SearchIcon size={12} className="w-6 h-6 hover:text-slate-700" />
      </button>

      {isSearchOpen && (
        <div className="absolute -translate-x-52 md:-translate-x-96  w-[350px] md:w-[500px] z-50 mt-2 bg-white dark:bg-black p-4 border border-gray-300 rounded-md shadow-md">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search for products..."
              className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm mb-2"
            />
            {/* Clear Search Button */}
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="ml-2 text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Loading Indicator */}
          {loading && <p className="mt-2">Loading...</p>}

          {/* Display Results */}
          {results.length > 0 && !loading ? (
            <div className="mt-2 max-h-60 overflow-y-auto">
              {results.map((product) => (
                <Link
                  href={`/product/${product.slug?.current}`}
                  key={product._id}
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 mr-3">
                      {product.images && (
                        <Image
                          src={urlFor(product.images[0]).url()}
                          alt="Product Image"
                          className="object-cover w-full h-full rounded-md"
                          width={400}
                          height={400}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.description}
                      </p>
                      <p className="text-sm text-gray-500">{product.variant}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : results.length === 0 && !loading ? (
            <p className="mt-2">No products found</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
