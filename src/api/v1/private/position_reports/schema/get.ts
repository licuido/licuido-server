import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

/* Get All Position Reports */
const getAllPositionReportsResponse: JSONSchema = Schema.object()
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

const getAllPositionReportsparams = Schema.object()
  .prop("search", Schema.string())
  .prop("offset", Schema.number())
  .prop("limit", Schema.number())
  .prop("reporting_start_date", Schema.string())
  .prop("reporting_end_date", Schema.string())
  .prop("creation_start_date", Schema.string())
  .prop("creation_end_date", Schema.string())
  .prop("id", Schema.string().format("uuid"))
  .required(["id", "offset", "limit"]);

export const GET_ALL_POSITION_REPORTS = {
  description:
    "Defines the structure and constraints for an API endpoint to get all position reports",
  tags: ["Position Reports"],
  response: makeResponseSchema(getAllPositionReportsResponse),
  query: getAllPositionReportsparams,
};

/* Get All Investors Position reports*/
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
  .prop("id", Schema.string())
  .prop("offset", Schema.number())
  .prop("limit", Schema.number())
  .prop("reporting_start", Schema.string())
  .prop("reporting_end", Schema.string())
  .prop("is_all_investors", Schema.boolean())
  .required([
    "id",
    "offset",
    "limit",
    "is_all_investors",
    "reporting_start",
    "reporting_end",
  ]);

export const GET_ALL_INVESTORS = {
  description:
    "Defines the structure and constraints for an API endpoint to get all position report investors",
  tags: ["Position Reports"],
  response: makeResponseSchema(getAllInvestorsResponse),
  query: getAllInvestorsparams,
};

/* Get All Investors As Csv */
const getInvestorsCSVParams = Schema.object()
  .prop("id", Schema.string())
  .prop("reporting_start", Schema.string())
  .prop("reporting_end", Schema.string())
  .prop("is_all_investors", Schema.boolean())
  .required(["id", "is_all_investors", "reporting_start", "reporting_end"]);

const getInvestorsAsCSV: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const EXPORT_INVESTORS_AS_CSV = {
  description:
    "Defines the structure and constraints for an API endpoint to get all investors as CSV file.",
  tags: ["Token Order"],
  response: makeResponseSchema(getInvestorsAsCSV),
  query: getInvestorsCSVParams,
};
