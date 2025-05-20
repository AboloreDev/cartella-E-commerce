import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { brandType } from "./brandType";
import { blogTypes } from "./blogTypes";
import { blogCategoryType } from "./blogCategoryType";
import { blockCategoryType } from "./blockCategoryType";
import { authorType } from "./authorType";
import { addressType } from "./addressType";
import { productType } from "./productType";
import { orderType } from "./orderType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    brandType,
    blogTypes,
    blogCategoryType,
    blockCategoryType,
    authorType,
    addressType,
    productType,
    orderType,
  ],
};
