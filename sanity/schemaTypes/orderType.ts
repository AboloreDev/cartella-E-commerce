import { PackageCheck } from "lucide-react";
import { defineType, defineField } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: PackageCheck,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    {
      name: "invoice",
      type: "object",
      fields: [
        { name: "id", type: "string" },
        { name: "number", type: "string" },
        { name: "hoste_invoive_url", type: "ur;" },
      ],
    },
    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout Session ID",
      type: "string",
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clerkUserId",
      title: "Store User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customer",
      title: "Customer",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "reference",
      to: [{ type: "email" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Store Payment Intent ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineField({
          name: "productItem",
          title: "Product Item",
          type: "object",
          fields: [
            {
              name: "product",
              title: "product Purchased",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "quantity",
              type: "number",
              title: "Quantity Purchased",
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: "selectedSize",
              type: "string",
            },
            {
              name: "selectedColor",
              type: "string",
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount (USD)",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: ["Pending", "Paid", "Failed", "Refunded"],
        layout: "radio",
      },
      initialValue: "Pending",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deliveryStatus",
      title: "Delivery Status",
      type: "string",
      options: {
        list: ["Processing", "Shipped", "Delivered", "Cancelled"],
        layout: "radio",
      },
      initialValue: "Processing",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "reference",
      to: [{ type: "address" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderedAt",
      title: "Ordered At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: "orderNumber",
      subtitle: "customer.name",
      product: "product.name",
      quantity: "quantity",
      image: "product.image",
      currency: "product.currency",
    },
    prepare({ title, subtitle, image, product, quantity }) {
      return {
        title: `Order #${title}`,
        subtitle: subtitle
          ? `Customer: ${subtitle} ${product} ${quantity}`
          : "Order",
        media: image,
      };
    },
  },
});
