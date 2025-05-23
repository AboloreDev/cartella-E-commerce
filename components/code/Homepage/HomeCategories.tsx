import { Category } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="my-10 md:my-20 p-5 lg:p-7 rounded-md border">
      <h2 className="uppercase font-bold">Popular Categories</h2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-slate-50 dark:bg-slate-950 p-5 flex items-center gap-3 group"
          >
            {category.image && (
              <div className="overflow-hidden hoverEffect w-20 h-20 p-1">
                <Link href={`/category/${category.slug?.current}`}>
                  <Image
                    src={urlFor(category.image).url()}
                    width={200}
                    height={200}
                    alt="Category Image"
                    loading="lazy"
                    className="object-contain w-full h-full hoverEffect"
                  />
                </Link>
              </div>
            )}
            <Link
              href={`/category/${category.slug?.current}`}
              className="space-y-1"
            >
              <h3 className="font-semibold">{category.title}</h3>
              <p className="font-thin text-sm">
                <span>{`(${category.productCount})`}</span> items Available
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
