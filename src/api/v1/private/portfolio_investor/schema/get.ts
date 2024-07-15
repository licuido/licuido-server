import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

/* For Get Token Holdings Graph for Investor Portfolio */
const getTokenHoldingsGraphParams = Schema.object()
  .prop("from_date", Schema.string())
  .prop("to_date", Schema.string());

const getTokenHoldingsGraphResponse: JSONSchema = Schema.object()
  .prop(
    "page",
    Schema.array().items(Schema.object().additionalProperties(true))
  )
  .prop("count", Schema.integer())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_TOKEN_HOLDINGS_GRAPH = {
  description:
    "Defines the structure and constraints for an API endpoint to get all token holdings graph data",
  tags: ["Investor Portfolio"],
  response: makeResponseSchema(getTokenHoldingsGraphResponse),
  query: getTokenHoldingsGraphParams,
};

/* For Get Current Token Investments for Issuer Portfolio  */
const getCurrentTokenInvestmentParams = Schema.object()
  .prop("offset", Schema.number())
  .prop("limit", Schema.number());

const getCurrentTokenInvestmentResponse: JSONSchema = Schema.object()
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

export const GET_CURRENT_TOKEN_INVESTMENT = {
  description:
    "Defines the structure and constraints for an API endpoint to get all current Token Investment data",
  tags: ["Investor Portfolio"],
  response: makeResponseSchema(getCurrentTokenInvestmentResponse),
  query: getCurrentTokenInvestmentParams,
};

// Get Dashboard

const getDashboardResponse: JSONSchema = Schema.object()
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_DASHBOARD = {
  description:
    "Defines the structure and constraints for an API endpoint to get Investor Portfolio Dashboard",
  tags: ["Investor Portfolio"],
  response: makeResponseSchema(getDashboardResponse),
};

// GET_LAST_PERFORMANCE

const getLastPerformanceResponse: JSONSchema = Schema.object()
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_LAST_PERFORMANCE = {
  description:
    "Defines the structure and constraints for an API endpoint to get Investor Portfolio last 3 months performance",
  tags: ["Investor Portfolio"],
  response: makeResponseSchema(getLastPerformanceResponse),
};
