import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

/* Get All Investors */
const getAllInvestorsResponse: JSONSchema = Schema.object()
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

const getAllInvestorsparams = Schema.object()
  .prop("search", Schema.string())
  .prop("offset", Schema.number())
  .prop("limit", Schema.number())
  .prop("status_filter", Schema.string())
  .prop("investor_type_filter", Schema.string())
  .prop("minimum_balance", Schema.string())
  .prop("maximum_balance", Schema.string())
  .prop("country_filter", Schema.string())
  .prop("token_id", Schema.string().format("uuid"));

export const GET_ALL_INVESTORS = {
  description:
    "Defines the structure and constraints for an API endpoint to get all investors list.",
  tags: ["Investors List"],
  response: makeResponseSchema(getAllInvestorsResponse),
  query: getAllInvestorsparams,
};

/* Get All Investors As Csv */
const getAllInvestorsCSVParams = Schema.object()
  .prop("search", Schema.string())
  .prop("status_filter", Schema.string())
  .prop("investor_type_filter", Schema.string())
  .prop("minimum_balance", Schema.string())
  .prop("maximum_balance", Schema.string())
  .prop("country_filter", Schema.string())
  .prop("token_id", Schema.string().format("uuid"));

const getAllInvestorsAsCSV: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const EXPORT_INVESTORS_LIST_AS_CSV = {
  description:
    "Defines the structure and constraints for an API endpoint to get all investors list in CSV file.",
  tags: ["Token Order"],
  response: makeResponseSchema(getAllInvestorsAsCSV),
  query: getAllInvestorsCSVParams,
};
