import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

/* For Get Investor Count For Qualification */
const getInvestorCountResponse: JSONSchema = Schema.object()
  .prop("count", Schema.integer())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_INVESTOR_COUNT_FOR_QUALIFY = {
  description:
    "The purpose of this schema is to get investor count for qualification",
  tags: ["INVESTOR QUALIFICATION"],
  response: makeResponseSchema(getInvestorCountResponse),
};

/* For Get Investor Data For Qualification */
const getInvestorParams = Schema.object()
  .prop("offset", Schema.number())
  .prop("limit", Schema.number())
  .prop("search", Schema.string())
  .prop("status_filter", Schema.string())
  .prop("kyc_status_filter", Schema.string())
  .prop("investor_type_filter", Schema.string())
  .required(["offset", "limit"]);

const getInvestorResponse: JSONSchema = Schema.object()
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

export const GET_INVESTOR_DATA_FOR_QUALIFY = {
  description:
    "The purpose of this schema is get all investor data for qualification",
  tags: ["INVESTOR QUALIFICATION"],
  response: makeResponseSchema(getInvestorResponse),
  query: getInvestorParams,
};

const getInvestorResponseAsCSV: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

/* For Export Investor Data into CSV File*/
export const EXPORT_INVESTOR_DATA_AS_CSV_FILE = {
  description:
    "The purpose of this schema is get all investor data in CSV File",
  tags: ["INVESTOR QUALIFICATION"],
  response: makeResponseSchema(getInvestorResponseAsCSV),
};
