import Container from "@/components/code/Container";
import ProductCard from "@/components/code/ProductCard";
import { Product } from "@/sanity.types";
import { getTrendingProducts } from "@/sanity/queries";
import React from "react";

const Trending = async () => {
  const trendingProducts: Product[] = await getTrendingProducts();

  return (
    <Container>
      <div className="py-10">
        <h2 className="mt-5 tracking-wide uppercase font-bold">
          Trending Products
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 mb-5">
        {trendingProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </Container>
  );
};

export default Trending;
