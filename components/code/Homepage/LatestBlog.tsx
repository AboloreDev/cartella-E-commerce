import { urlFor } from "@/sanity/lib/image";
import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();

  return (
    <div className="mb-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl uppercase font-bold">
          Latest Blogs
        </h2>
        <Link
          href="/blog"
          className="text-sm border rounded-full font-semibold px-3 py-1 tracking-wide hoverEffect"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 bg-slate-50 dark:bg-slate-950 p-4 rounded-lg">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md flex flex-col"
          >
            <Link
              href={`/blog/${blog.slug?.current}`}
              className="w-full h-32 sm:h-36 md:h-40 relative rounded-md overflow-hidden mb-3"
            >
              {blog.mainImage && (
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt="Blog Image"
                  fill
                  className="object-cover"
                />
              )}
            </Link>

            <div className="text-xs flex items-center justify-between flex-wrap gap-2 mb-2">
              <div className="flex gap-2 flex-wrap">
                {blog?.blogcategories?.map((item, idx) => (
                  <p
                    key={idx}
                    className="font-semibold tracking-wide text-slate-700 dark:text-slate-300"
                  >
                    {item.title}
                  </p>
                ))}
              </div>
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Calendar size={14} />
                {dayjs(blog.publishedAt).format("MMM D, YYYY")}
              </div>
            </div>

            <Link
              href={`/blog/${blog?.slug?.current}`}
              className="text-sm sm:text-base font-semibold tracking-wide line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {blog?.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
