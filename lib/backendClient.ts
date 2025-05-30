import { apiVersion, dataset, projectId } from "@/sanity/env";
import { createClient } from "next-sanity";

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});
