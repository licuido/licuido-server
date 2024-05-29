import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

/* For Get Orders Graph for Issuer Portfolio */
const getOrdersGraphParams = Schema.object()
  .prop("offset", Schema.number())
  .prop("limit", Schema.number())
  .required(["offset", "limit"]);

const getOrdersGraphResponse: JSONSchema = Schema.object()
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

export const GET_ORDERS_GRAPH = {
  description:
    "Defines the structure and constraints for an API endpoint to get all token order graph data",
  tags: ["Issuer Portfolio"],
  response: makeResponseSchema(getOrdersGraphResponse),
  query: getOrdersGraphParams,
};

/* GET_TOKEN_BY_INVESTOR_GRAPH */
const getTokenByInvestorGraphParams = Schema.object()
  .prop("from_date", Schema.string())
  .prop("to_date", Schema.string());

const getTokenByInvestorGraphResponse: JSONSchema = Schema.object()
  .prop(
    "page",
    Schema.array().items(Schema.object().additionalProperties(true))
  )
  .prop("count", Schema.integer())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_TOKEN_BY_INVESTOR_GRAPH = {
  description:
    "Defines the structure and constraints for an API endpoint to get all token by investors graph data",
  tags: ["Issuer Portfolio"],
  response: makeResponseSchema(getTokenByInvestorGraphResponse),
  query: getTokenByInvestorGraphParams,
};

/* GET_DASHBOARD */

const getDashboardResponse: JSONSchema = Schema.object()
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_DASHBOARD = {
  description:
    "Defines the structure and constraints for an API endpoint to get Issuer Portfolio Dashboard",
  tags: ["Issuer Portfolio"],
  response: makeResponseSchema(getDashboardResponse),
};

/* GET_FUND_OFFERINGS */

const getfundOfferingsGraphParams = Schema.object()
  .prop("offset", Schema.number())
  .prop("limit", Schema.number());

const getfundOfferingsResponse: JSONSchema = Schema.object()
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

export const GET_FUND_OFFERINGS = {
  description:
    "Defines the structure and constraints for an API endpoint to get Issuer fund Offerings",
  tags: ["Issuer Portfolio"],
  response: makeResponseSchema(getfundOfferingsResponse),
  query: getfundOfferingsGraphParams,
};
