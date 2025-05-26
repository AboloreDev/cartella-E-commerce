import { defineQuery } from "next-sanity";

export const BRANDS_QUERY = defineQuery(`*[_type=="brand"] | order(name asc)`);

export const LATEST_BLOG = defineQuery(
  `*[_type=="blog" && isLatest == true] | order(name asc){
    ...,
    blogcategories[]->{title}
}`
);

export const TRENDING_PRODUCTS = defineQuery(
  `*[_type=="product" && status == "hot"] | order(name asc){
    ...,
    "categories": categories[]->title
  }`
);

export const GET_SINGLE_PRODUCT = defineQuery(
  `*[_type=="product" && slug.current == $slug] | order(name asc)[0]`
);

export const BRAND_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
  }`
);
