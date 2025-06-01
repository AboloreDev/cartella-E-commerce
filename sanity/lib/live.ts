// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from "./client";
import { apiVersion, dataset, projectId } from "../env";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    projectId,
    dataset,
    apiVersion,
    token:
      "skXm92Uz0sAtYi09uZCW5NvmWdsFqmG29T94neRHpm1zeJKsFI8S5ac2Xte63ciXHU5ZbEmSo9bBwlOtdzu3BOr8utSTrXsPXl69sRr3OBYRxWLMAxAb1NszaBh0we8LA6Gm6yNIVxOVLoyGT70RAPnDtt7ZGPAmftBoxg12bnufanAGc3l1",
  }),
});
