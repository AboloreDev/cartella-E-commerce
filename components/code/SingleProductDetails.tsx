import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import React from "react";
import Price from "./Price";
import AddToCartButton from "./AddToCartButton";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import Favorite from "./Navbar/Favorite";

interface Product {
  name: string;
  description?: string;
  price?: number;
  discount?: number;
  stock?: number;
  _createdAt?: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

const SingleProductDetails = ({ product }: { product: Product }) => {
  return (
    <div>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{product?.name}</h2>
        <p className="text-sm text-gray-600 tracking-wide">
          {product?.description}
        </p>
        <div className="flex items-center gap-0.5 text-xs">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              size={12}
              className="text-shop_light_green"
              fill={"#3b9c3c"}
            />
          ))}
          <p className="font-semibold">{`(120)`}</p>
        </div>
      </div>
      <div className="space-y-2 border-t border-b border-gray-200 py-5">
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
      <div className="flex items-center gap-2.5 lg:gap-3">
        <AddToCartButton product={product} />
        {/* <Favorite showProduct={true} product={product} /> */}
      </div>
      {/* <ProductCharacteristics product={product} /> */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
        <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
          <RxBorderSplit className="text-lg" />
          <p>Compare color</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
          <FaRegQuestionCircle className="text-lg" />
          <p>Ask a question</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
          <TbTruckDelivery className="text-lg" />
          <p>Delivery & Return</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
          <FiShare2 className="text-lg" />
          <p>Share</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
          <Truck size={30} className="text-shop_orange" />
          <div>
            <p className="text-base font-semibold text-black">Free Delivery</p>
            <p className="text-sm text-gray-500 underline underline-offset-2">
              Enter your Postal code for Delivey Availability.
            </p>
          </div>
        </div>
        <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
          <CornerDownLeft size={30} className="text-shop_orange" />
          <div>
            <p className="text-base font-semibold text-black">
              Return Delivery
            </p>
            <p className="text-sm text-gray-500 ">
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
