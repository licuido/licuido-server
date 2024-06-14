import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

const getMarketPlaceList: JSONSchema = Schema.object()
  .prop(
    "page",
    Schema.array().items(Schema.object().additionalProperties(true))
  )
  .prop("count", Schema.integer())
  .prop("limit", Schema.integer())
  .prop("offset", Schema.integer())
  .prop("totalPages", Schema.integer())
  .prop("totalCount", Schema.integer())
  .prop("previousPage", Schema.anyOf([Schema.integer(), Schema.null()]))
  .prop("currentPage", Schema.integer())
  .prop("nextPage", Schema.anyOf([Schema.integer(), Schema.null()]))
  .prop("previous PageLink", Schema.anyOf([Schema.string(), Schema.null()]))
  .prop("currentPageLink", Schema.string())
  .prop("nextPageLink", Schema.anyOf([Schema.string(), Schema.null()]))
  .prop("firstPageLink", Schema.string())
  .prop("lastPageLink", Schema.string())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

const customParams = Schema.object()
  .prop("limit", Schema.number())
  .prop("offset", Schema.number())
  .prop("search", Schema.string())
  .prop("sortBy", Schema.string())
  .prop("isQualified",Schema.boolean())
  .prop("currencyCode",Schema.string())
  .prop("tokenTypeId",Schema.string())
  .prop("countryFilterId",Schema.string())
  .prop("fundStatus",Schema.string())

export const GET_MARKETPLACE_LISTING = {
  description:
    "Defines the structure and constraints for an API endpoint to get marketplace listing.",
  tags: ["Token Order"],
  response: makeResponseSchema(getMarketPlaceList),
  query: customParams,
};
