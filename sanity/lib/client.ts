import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  token:
    "skXm92Uz0sAtYi09uZCW5NvmWdsFqmG29T94neRHpm1zeJKsFI8S5ac2Xte63ciXHU5ZbEmSo9bBwlOtdzu3BOr8utSTrXsPXl69sRr3OBYRxWLMAxAb1NszaBh0we8LA6Gm6yNIVxOVLoyGT70RAPnDtt7ZGPAmftBoxg12bnufanAGc3l1",
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
