"use client";

import React, { useState } from "react";
import Container from "./Container";
import useStore from "@/store";
import { Product } from "@/sanity.types";
import { toast } from "sonner";
import { Heart, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import AddToCartButton from "./AddToCartButton";
import PriceFormatter from "./PriceFormatter";
import { Button } from "../ui/button";

const FavoriteItems = () => {
  const [visibleProducts, setVisibleProducts] = useState(5);

  const { favoriteItems, removeFromFavorite, resetFavorite } = useStore();
  const loadMoreFavorite = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteItems.length));
  };

  const handleResetFavorite = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your favorite?"
    );
    if (confirmReset) {
      resetFavorite();
      toast.success("Favorite reset successfully");
    }
  };
  return (
    <Container>
      {favoriteItems?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b">
                <tr className="bg-black/5">
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left hidden md:table-cell">
                    Category
                  </th>
                  <th className="p-2 text-left hidden md:table-cell">Type</th>
                  <th className="p-2 text-left hidden md:table-cell">Status</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-center md:text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {favoriteItems
                  ?.slice(0, visibleProducts)
                  ?.map((product: Product) => (
                    <tr key={product?._id} className="border-b">
                      <td className="px-2 py-4 flex items-center gap-2">
                        <X
                          onClick={() => {
                            removeFromFavorite(product?._id);
                            toast.success("Product removed from wishlist");
                          }}
                          size={18}
                          className="hover:text-red-600 hover:cursor-pointer hoverEffect"
                        />
                        {product?.images && (
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            className="border rounded-md group hidden md:inline-flex"
                          >
                            <Image
                              src={urlFor(product?.images[0]).url()}
                              alt={"product image"}
                              width={80}
                              height={80}
                              className="rounded-md group-hover:scale-105 hoverEffect object-center"
                            />
                          </Link>
                        )}
                        <p className="line-clamp-1">{product?.name}</p>
                      </td>
                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.categories && (
                          <p className="uppercase line-clamp-1 text-xs font-medium">
                            {product.categories.map((cat) => cat).join(", ")}
                          </p>
                        )}
                      </td>
                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.variant}
                      </td>
                      <td
                        className={`p-2 w-24 ${
                          (product?.stock as number) > 0
                            ? "text-green-600"
                            : "text-red-600"
                        } font-medium text-sm hidden md:table-cell`}
                      >
                        {(product?.stock as number) > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </td>
                      <td className="p-2">
                        <PriceFormatter amount={product?.price} />
                      </td>
                      <td className="p-2">
                        <AddToCartButton product={product} className="w-full" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2">
            {visibleProducts < favoriteItems?.length && (
              <div className="my-5">
                <Button
                  onClick={loadMoreFavorite}
                  className="cursor-pointer"
                  variant="outline"
                >
                  Load More Items
                </Button>
              </div>
            )}
            {visibleProducts > 5 && (
              <div className="my-5">
                <Button
                  className="cursor-pointer"
                  onClick={() => setVisibleProducts(5)}
                  variant="outline"
                >
                  Load Less Items
                </Button>
              </div>
            )}
          </div>
          {favoriteItems?.length > 0 && (
            <Button
              onClick={handleResetFavorite}
              className="mb-5 mt-5 cursor-pointer font-semibold"
              variant="destructive"
              size="lg"
            >
              Reset Favorite
            </Button>
          )}
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center">
          <div className="relative mb-4">
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-muted-foreground/20" />
            <Heart
              className="h-12 w-12 text-muted-foreground"
              strokeWidth={1.5}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Your favorite is empty
            </h2>
            <p className="text-sm text-muted-foreground">
              Items added to your favorites will appear here
            </p>
          </div>
          <Button asChild>
            <Link href="/store">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default FavoriteItems;
