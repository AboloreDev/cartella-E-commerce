import { Brand } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { getAllBrands } from "@/sanity/queries";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrands = async () => {
  const brands: Brand[] = await getAllBrands();

  return (
    <div className="mb-10 lg:pb-16 p-4 lg:p-6 rounded-md border">
      <div className="flex items-center gap-5 justify-between mb-10 ">
        <h2 className="text-xl uppercase">Shop by Brands</h2>
        <Link
          href={"/store"}
          className="text-sm border rounded-full font-semibold px-2 tracking-wide hoverEffect"
        >
          View All
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-2  bg-slate-50 dark:bg-slate-950 p-4">
        {brands.map((brand, index) => (
          <Link
            href={`brand/${brand.slug?.current}`}
            key={index}
            className="verflow-hidden relative mb-2 flex items-center justify-center rounded-md hoverEffect"
          >
            {brand.image ? (
              <div className="w-16 h-16 overflow-hidden relative mb-2 flex items-center justify-center rounded-md hoverEffect">
                <Image
                  src={urlFor(brand.image).url()}
                  width={200}
                  height={200}
                  alt="Category Image"
                  loading="lazy"
                  className="object-contain w-full h-full hoverEffect"
                />
              </div>
            ) : (
              <div className="w-16 h-16 mb-2 flex items-center justify-center bg-gray-100 text-gray-400 rounded-full text-sm">
                No Image
              </div>
            )}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10 p-2 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-950"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className=" font-bold capitalize">{item?.title}</p>
              <p className="">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
