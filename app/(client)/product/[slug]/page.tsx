import Container from "@/components/code/Container";
import ProductImageView from "@/components/code/ProductImageView";
import SingleProductDetails from "@/components/code/SingleProductDetails";
import { getSingleProduct } from "@/sanity/queries";
import React from "react";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getSingleProduct(slug);

  if (!product) {
    return (
      <Container>
        <div className="py-10 text-center text-red-500 font-semibold">
          Product not found.
        </div>
      </Container>
    );
  }

  const isStock: number | boolean =
    typeof product.stock === "number" && product.stock > 0;

  return (
    <Container>
      <div className="flex flex-col gap-6 md:flex-row py-10">
        {product.images && (
          <ProductImageView
            // @ts-expect-error: ProductImageView images prop
            images={product.images} // ✅ Error is expected
            isStock={isStock}
          />
        )}
        <div className="w-full md:w-1/2 flex flex-col space-y-5">
          <SingleProductDetails product={product} />
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
