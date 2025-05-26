import Container from "@/components/code/Container";
import StoreContent from "@/components/code/StoreContents/StoreContent";
import { getAllBrands, getCategories } from "@/sanity/queries";
import React from "react";

const StorePage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return (
    <div className="border-t py-5">
      <Container>
        <div className="sticky top-0 z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 ">
            <h2 className=" tracking-wide text-xl font-semibold">
              Explore our wide range of products from various categories and
              brands.
            </h2>
            <button className="text-blue-600 text-left underline text-sm hoverEffect cursor-pointer">
              Reset Filters
            </button>
          </div>
        </div>
        <div>
          <StoreContent categories={categories} brands={brands} />
        </div>
      </Container>
    </div>
  );
};

export default StorePage;
