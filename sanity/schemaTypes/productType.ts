import { ShoppingBag } from "lucide-react";
import { defineType, defineField } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: ShoppingBag,
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
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
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discountPrice",
      title: "Discount Price (optional)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),
    defineField({
      name: "variant",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "T-shirt", value: "tshirt" },
          { title: "Jeans", value: "jeans" },
          { title: "Hoodie", value: "hoodie" },
          { title: "Dress", value: "dress" },
          { title: "Jacket", value: "jacket" },
          { title: "Sweater", value: "sweater" },
          { title: "Skirt", value: "skirt" },
          { title: "Shorts", value: "shorts" },
          { title: "Sneakers", value: "sneakers" },
          { title: "Heels", value: "heels" },
          { title: "Boots", value: "boots" },
          { title: "Sandals", value: "sandals" },
          { title: "Cap", value: "cap" },
          { title: "Bag", value: "bag" },
          { title: "Accessories", value: "accessories" },
          { title: "Others", value: "others" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["XS", "S", "M", "L", "XL", "XXL"],
        layout: "tags",
      },
    }),
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "images",
      price: "price",
    },
    prepare(selection) {
      const { title, media, price } = selection;
      const image = media && media[0];
      return {
        title,
        subtitle: `$${price}`,
        media: image,
      };
    },
  },
});
