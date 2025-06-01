import React from "react";
import Container from "@/components/code/Container";
import { getAllBlogs } from "@/sanity/queries";
import Image from "next/image";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

const BlogPage = async () => {
  const blogs = await getAllBlogs(10);
  return (
    <Container>
      <div>
        <h2 className="font-bold text-2xl text-center">Our blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-10">
          {blogs?.map((blog) => (
            <div key={blog?._id} className="rounded-md overflow-hidden group">
              {blog?.mainImage && (
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover"
                />
              )}
              <div className=" p-5">
                <div className="text-xs flex items-center gap-5">
                  <div className="flex items-center relative group cursor-pointer">
                    {blog?.blogcategories?.map((item, index) => (
                      <p
                        key={index}
                        className="font-semibold tracking-wider"
                      ></p>
                    ))}
                    <span className="absolute left-0 -bottom-1.5  inline-block w-full h-[2px] hover:cursor-pointer hoverEffect" />
                  </div>
                  <p className="flex items-center gap-1  relative group hover:cursor-pointer  ">
                    <Calendar size={15} />{" "}
                    {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                    <span className="absolute left-0 -bottom-1.5inline-block w-full h-[2px] " />
                  </p>
                </div>
                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="text-base font-bold tracking-wide mt-5 line-clamp-2 hover:text-shop_dark_green hoverEffect"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BlogPage;
