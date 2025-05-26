import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import React from "react";
import Price from "./Price";
import AddToCartButton from "./AddToCartButton";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import Favorite from "./Navbar/Favorite";
import { Product } from "@/sanity.types";
import ProductCharacteristics from "./ProductCharacteristics";

const SingleProductDetails = ({ product }: { product: Product }) => {
  return (
    <div>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{product?.name}</h2>
        <p className="text-sm text-slate-400 tracking-wide">
          {product?.description}
        </p>
        <div className="flex items-center gap-0.5 text-xs">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              size={12}
              className="text-yellow-500 hover:text-yellow-600"
              fill={"#fb6c08"}
            />
          ))}
          <p className="font-semibold">{`(100)`}</p>
        </div>
      </div>
      <div className="space-y-2 py-5">
        <Price
          price={product?.price}
          discount={product?.discount}
          className="text-lg font-bold"
        />
        <p
          className={`px-4 py-1.5 text-sm text-center inline-block font-semibold rounded-lg ${product?.stock === 0 ? "bg-red-100 text-red-600" : "text-green-600 bg-green-100"}`}
        >
          {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
        <div className="w-full sm:flex-1">
          <AddToCartButton product={product} className="w-full" />
        </div>
        <div className="sm:ml-3 flex justify-end">
          <Favorite showProduct={true} product={product} />
        </div>
      </div>

      <ProductCharacteristics product={product} />
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
        <div className="flex items-center gap-2 text-sm hoverEffect">
          <RxBorderSplit className="text-lg" />
          <p>Compare color</p>
        </div>
        <div className="flex items-center gap-2 text-sm hoverEffect">
          <FaRegQuestionCircle className="text-lg" />
          <p>Ask a question</p>
        </div>
        <div className="flex items-center gap-2 text-sm hoverEffect">
          <TbTruckDelivery className="text-lg" />
          <p>Delivery & Return</p>
        </div>
        <div className="flex items-center gap-2 text-sm hoverEffect">
          <FiShare2 className="text-lg" />
          <p>Share</p>
        </div>
      </div>
      <div className="flex flex-col border">
        <div className=" p-3 flex items-center gap-2.5">
          <Truck size={30} className="" />
          <div>
            <p className="text-base font-semibold">Free Delivery</p>
            <p className="text-sm text-slate-500 underline underline-offset-2">
              Enter your Postal code for Delivey Availability.
            </p>
          </div>
        </div>
        <div className=" p-3 flex items-center gap-2.5">
          <CornerDownLeft size={30} className="" />
          <div>
            <p className="text-base font-semibold">Return Delivery</p>
            <p className="text-sm text-slate-500 ">
              Free 30days Delivery Returns.{" "}
              <span className="underline underline-offset-2">Details</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
