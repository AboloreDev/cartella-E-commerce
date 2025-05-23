import Container from "@/components/code/Container";
import ProductCategory from "@/components/code/ProductCategory";
import { getCategories } from "@/sanity/queries";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const category = await getCategories();
  const { slug } = await params;
  return (
    <Container>
      <div className="py-10">
        <h2 className="mt-5 tracking-wide uppercase font-bold">
          Categories: <span className="text-blue-600">{slug}</span>
        </h2>
        <div>
          <ProductCategory category={category} slug={slug} />
        </div>
      </div>
    </Container>
  );
};

export default CategoryPage;
