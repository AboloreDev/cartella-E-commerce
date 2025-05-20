import { HomeIcon } from "lucide-react";
import { defineType, defineField } from "sanity";

export const addressType = defineType({
  name: "address",
  title: "Addresses",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "User Email",
      type: "email",
    }),
    defineField({
      name: "streetAddress",
      title: "Street Address",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State / Province",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "postalCode",
      title: "Postal Code",
      type: "string",
      description: "Format: 12345 or 12345-6789",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[A-Za-z0-9 -]{4,10}$/, {
            name: "postalCode",
            invert: false,
          })
          .custom((postalCode: string | undefined) => {
            if (!postalCode) {
              return "Postal Code is required";
            }
            if (!postalCode.match(/^[A-Za-z0-9 -]{4,10}$/)) {
              return "Please enter a valid Postal Code (e.g. 12345 or 12345-6789)";
            }
            return true;
          }),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isDefault",
      title: "Default Address",
      type: "boolean",
      description: "Is this the shipping address",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "fullName",
      subtitle: "address",
      city: "city",
      state: "state",
      country: "country",
      isDefault: "isDefault",
    },
    prepare(selection) {
      const { title, state, country, city, isDefault, subtitle } = selection;
      return {
        title: `${title} ${isDefault ? "(Default)" : ""},`,
        subtitle: `${subtitle}, ${city}, ${state}, ${country}`,
      };
    },
  },
});
