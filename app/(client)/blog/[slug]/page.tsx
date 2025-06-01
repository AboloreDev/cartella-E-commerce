import React from "react";
import Container from "@/components/code/Container";
import { getSingleBlog } from "@/sanity/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, ChevronLeftIcon, Pencil } from "lucide-react";
import dayjs from "dayjs";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);
  if (!blog) return notFound();
  return (
    <div className="py-10">
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="md:col-span-3">
          {blog?.mainImage && (
            <Image
              src={urlFor(blog?.mainImage).url()}
              alt={blog.title || "Blog Image"}
              width={800}
              height={800}
              className="w-full max-h-[500px] object-cover rounded-lg"
            />
          )}
          <div>
            <div className="text-xs flex items-center gap-5 my-7">
              <div className="flex items-center relative group cursor-pointer">
                {blog?.blogcategories?.map(
                  (item: { title: string }, index: number) => (
                    <p
                      key={index}
                      className="font-semibold text-shop_dark_green tracking-wider"
                    >
                      {item?.title}
                    </p>
                  )
                )}
                <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect" />
              </div>
              <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                <Pencil size={15} /> {blog?.author?.name}
                <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
              </p>
              <p className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                <Calendar size={15} />{" "}
                {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
              </p>
            </div>
            <h2 className="text-2xl font-bold my-5">{blog?.title}</h2>
            <div className="flex flex-col">
              <div className="text-lightColor">
                <div>
                  {blog.body && (
                    <PortableText
                      value={blog.body}
                      components={{
                        block: {
                          normal: ({ children }) => (
                            <p className="my-5 text-base/8 first:mt-0 last:mb-0">
                              {children}
                            </p>
                          ),
                          h2: ({ children }) => (
                            <h2 className="my-5 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="my-5 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                              {children}
                            </h3>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="my-5 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">
                              {children}
                            </blockquote>
                          ),
                        },
                        types: {
                          image: ({ value }) => (
                            <Image
                              alt={value.alt || ""}
                              src={urlFor(value).width(2000).url()}
                              className="w-full rounded-2xl"
                              width={1400}
                              height={1000}
                            />
                          ),
                          separator: ({ value }) => {
                            switch (value.style) {
                              case "line":
                                return (
                                  <hr className="my-5 border-t border-gray-200" />
                                );
                              case "space":
                                return <div className="my-5" />;
                              default:
                                return null;
                            }
                          },
                        },
                        list: {
                          bullet: ({ children }) => (
                            <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
                              {children}
                            </ul>
                          ),
                          number: ({ children }) => (
                            <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                              {children}
                            </ol>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => {
                            return (
                              <li className="my-2 pl-2 has-[br]:mb-8">
                                {children}
                              </li>
                            );
                          },
                          number: ({ children }) => {
                            return (
                              <li className="my-2 pl-2 has-[br]:mb-8">
                                {children}
                              </li>
                            );
                          },
                        },
                        marks: {
                          strong: ({ children }) => (
                            <strong className="font-semibold text-gray-950">
                              {children}
                            </strong>
                          ),
                          code: ({ children }) => (
                            <>
                              <span aria-hidden>`</span>
                              <code className="text-[15px]/8 font-semibold text-gray-950">
                                {children}
                              </code>
                              <span aria-hidden>`</span>
                            </>
                          ),
                          link: ({ value, children }) => {
                            return (
                              <Link
                                href={value.href}
                                className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-[hover]:decoration-gray-600"
                              >
                                {children}
                              </Link>
                            );
                          },
                        },
                      }}
                    />
                  )}
                  <div className="mt-10">
                    <Link href="/blog" className="flex items-center gap-1">
                      <ChevronLeftIcon className="size-5" />
                      <span className="text-sm font-semibold">
                        Back to blog
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleBlogPage;
