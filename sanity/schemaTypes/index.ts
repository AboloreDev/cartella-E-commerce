import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { brandType } from "./brandType";
import { blogType } from "./blogTypes";
import { blogCategoryType } from "./blogCategoryType";
import { authorType } from "./authorType";
import { addressType } from "./addressType";
import { productType } from "./productType";
import { orderType } from "./orderType";
import { blockContentType } from "./blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    brandType,
    blogType,
    blockContentType,
    blogCategoryType,
    authorType,
    addressType,
    productType,
    orderType,
  ],
};
