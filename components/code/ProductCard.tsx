import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { FlameIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import Price from "./Price";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative overflow-hidden rounded-t-md bg-slate-50 dark:bg-slate-950">
        <Link
          href={`/product/${product.slug?.current}`}
          className="block w-full aspect-square relative"
        >
          {product.images && (
            <Image
              src={urlFor(product.images[0]).url()}
              alt="Product Image"
              loading="lazy"
              fill
              className="object-contain w-full h-full"
              sizes="(min-width: 768px) 200px, 100vw"
            />
          )}
        </Link>

        {/* Product status tags */}
        {product.status === "sale" && (
          <p className="absolute top-2 left-2 z-10 text-xs bg-white/80 dark:bg-slate-800/80 text-black dark:text-white rounded-full px-2 py-0.5 border border-slate-300 dark:border-slate-600 cursor-pointer">
            Sale
          </p>
        )}
        {product.status === "hot" && (
          <Link
            href={"/trending"}
            className="absolute top-2 left-2 z-10 text-xs bg-white/80 dark:bg-slate-800/80 text-black dark:text-white rounded-full px-2 py-0.5 border border-slate-300 dark:border-slate-600 cursor-pointer"
          >
            <FlameIcon size={18} fill="#fb6c08" />
          </Link>
        )}
        {product.status === "new" && (
          <Link
            href={"/trending"}
            className="absolute top-2 left-2 z-10 text-xs bg-white/80 dark:bg-slate-800/80 text-black dark:text-white rounded-full px-2 py-0.5 border border-slate-300 dark:border-slate-600 cursor-pointer"
          >
            New
          </Link>
        )}

        {/* Wishlist button */}
        <AddToWishlistButton product={product} />
      </div>

      {/* Product Details */}
      <div className="p-3 space-y-3">
        <Link href={`/product/${product.slug?.current}`}>
          <div className="space-y-1">
            {product.categories && (
              <p className="text-slate-400 uppercase text-xs">
                {product.categories.map((category) => category).join(", ")}
              </p>
            )}
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {product.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ${product.price}
            </p>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    size={14}
                    key={index}
                    className={index < 4 ? "" : "text-slate-800"}
                    fill={index < 4 ? "#fb6c08" : "#ababab"}
                  />
                ))}
              </div>
              <p className="text-slate-400">5 reviews</p>
            </div>
          </div>
        </Link>

        {/* Stock & Actions */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <p className="font-medium text-slate-400">In Stock</p>
            <p
              className={`font-semibold ${
                product.stock === 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {(product.stock as number) > 0 ? product.stock : "Unavailable"}
            </p>
          </div>
          <Price
            price={product.price}
            discount={product.discount}
            className="text-sm"
          />
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
