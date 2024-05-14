import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

// Response Schema of Reset password
const countryResponse: JSONSchema = Schema.object()
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
  .prop("previousPageLink", Schema.anyOf([Schema.string(), Schema.null()]))
  .prop("currentPageLink", Schema.string())
  .prop("nextPageLink", Schema.anyOf([Schema.string(), Schema.null()]))
  .prop("firstPageLink", Schema.string())
  .prop("lastPageLink", Schema.string())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

const customParams = Schema.object()
  .prop("region_id", Schema.number())
  .prop("offset", Schema.number())
  .prop("limit", Schema.number())
  .prop("search", Schema.string());

export const GET_ALL_COUNTRIES = {
  description: "Retrieves all countries with the specified region ID.",
  tags: ["Master Countries"],
  response: makeResponseSchema(countryResponse),
  query: customParams,
};

const customCurrencyParams = Schema.object()
  .prop("region_id", Schema.number())
  .prop("offset", Schema.number())
  .prop("limit", Schema.number())
  .prop("search", Schema.string());

export const GET_ALL_CURRENCIES = {
  description: "Retrieves all currencies.",
  tags: ["Master Countries"],
  response: makeResponseSchema(countryResponse),
  query: customCurrencyParams,
};

const customRegionCountryParams = Schema.object().prop(
  "search",
  Schema.string()
);

export const GET_ALL_COUNTRY_WITH_REGIONS = {
  description: "Retrieves all countries with their regions.",
  tags: ["Master Countries"],
  response: makeResponseSchema(
    Schema.object().prop("page", Schema.object().additionalProperties(true))
  ),
  query: customRegionCountryParams,
};
