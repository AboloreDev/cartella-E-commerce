import { sanityFetch } from "../lib/live";
import {
  BRAND_QUERY,
  BRANDS_QUERY,
  GET_ALL_BLOG,
  GET_SINGLE_BLOG,
  GET_SINGLE_PRODUCT,
  LATEST_BLOG,
  MY_ORDERS,
  TRENDING_PRODUCTS,
} from "./query";

export const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data;
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};

export const getAllBrands = async () => {
  try {
    const query = BRANDS_QUERY;
    const { data } = await sanityFetch({ query });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching brands", error);
    return [];
  }
};

export const getLatestBlogs = async () => {
  try {
    const query = LATEST_BLOG;
    const { data } = await sanityFetch({ query });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching blog", error);
    return [];
  }
};

export const getTrendingProducts = async () => {
  try {
    const query = TRENDING_PRODUCTS;
    const { data } = await sanityFetch({ query });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching trending products", error);
    return [];
  }
};

export const getSingleProduct = async (slug: string) => {
  try {
    const query = GET_SINGLE_PRODUCT;
    const { data } = await sanityFetch({ query, params: { slug } });
    return data ?? null;
  } catch (error) {
    console.log("Error fetching single product", error);
    return null;
  }
};

export const getBrandQuery = async (slug: string) => {
  try {
    const query = BRAND_QUERY;
    const { data } = await sanityFetch({ query, params: { slug } });
    return data ?? null;
  } catch (error) {
    console.log("Error fetching single Brand", error);
    return null;
  }
};

export const getAllOrders = async (userId: string) => {
  try {
    const query = MY_ORDERS;
    const orders = await sanityFetch({ query, params: { userId } });
    return orders.data || null;
  } catch (error) {
    console.log("Error fetching orders", error);
    return null;
  }
};

export const getAllBlogs = async (quantity: number) => {
  try {
    const query = GET_ALL_BLOG;
    const { data } = await sanityFetch({ query, params: { quantity } });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching orders", error);
    return null;
  }
};

export const getSingleBlog = async (slug: string) => {
  try {
    const query = GET_SINGLE_BLOG;
    const { data } = await sanityFetch({ query, params: { slug } });
    return data ?? null;
  } catch (error) {
    console.log("Error fetching single product", error);
    return null;
  }
};
