import { IoDocument } from "react-icons/io5";
import { defineType, defineField, defineArrayMember } from "sanity";

export const blogType = defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  icon: IoDocument,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) => Rule.required(),
          description: "Important for SEO and accessibility",
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "category" }] }),
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isLatest",
      title: "Latest Blog",
      type: "boolesn",
      description: "Toggje to latest on or off",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { title, author, media, publishedAt } = selection;
      return {
        title: title,
        subtitle: author && `${publishedAt ? "Latest| " : ""} by ${author}`,
        media: media,
      };
    },
  },
});
