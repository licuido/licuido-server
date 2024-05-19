import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

/* Get All Subscription Order  */
const getAllSubscriptionResponse: JSONSchema = Schema.object()
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

const getAllSubscriptionparams = Schema.object()
  .prop("search", Schema.string())
  .prop("offset", Schema.number())
  .prop("limit", Schema.number())
  .prop("status_filter", Schema.string())
  .prop("investment_currency_filter", Schema.string())
  .prop("start_date", Schema.string())
  .prop("end_date", Schema.string())
  .prop("order_fulfillment_filter", Schema.string())
  .prop("token_id", Schema.string().format("uuid"));

export const GET_ALL_SUBSCRIPTION_ORDER = {
  description:
    "Defines the structure and constraints for an API endpoint to get all token subscription order.",
  tags: ["Token Order"],
  response: makeResponseSchema(getAllSubscriptionResponse),
  query: getAllSubscriptionparams,
};

/* Get All Redemption Order  */
const getAllRedemptionResponse: JSONSchema = Schema.object()
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

const getAllRedemptionparams = Schema.object()
  .prop("search", Schema.string())
  .prop("offset", Schema.number())
  .prop("limit", Schema.number())
  .prop("status_filter", Schema.string())
  .prop("start_date", Schema.string())
  .prop("end_date", Schema.string())
  .prop("order_fulfillment_filter", Schema.string())
  .prop("token_id", Schema.string().format("uuid"));

export const GET_ALL_REDEMPTION_ORDER = {
  description:
    "Defines the structure and constraints for an API endpoint to get all token redemption order.",
  tags: ["Token Order"],
  response: makeResponseSchema(getAllRedemptionResponse),
  query: getAllRedemptionparams,
};

/* Get All Subscription Order As Csv */
const getSubscriptionOrderCSVParams = Schema.object()
  .prop("search", Schema.string())
  .prop("status_filter", Schema.string())
  .prop("investment_currency_filter", Schema.string())
  .prop("start_date", Schema.string())
  .prop("end_date", Schema.string())
  .prop("order_fulfillment_filter", Schema.string())
  .prop("token_id", Schema.string().format("uuid"));

const getSubscriptionOrderAsCSV: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const EXPORT_SUBSCRIPTION_ORDER_AS_CSV = {
  description:
    "Defines the structure and constraints for an API endpoint to get all Subscription order data in CSV file.",
  tags: ["Token Order"],
  response: makeResponseSchema(getSubscriptionOrderAsCSV),
  query: getSubscriptionOrderCSVParams,
};

/* Get All Redemption Order As Csv */
const getRedemptionOrderCSVParams = Schema.object()
  .prop("search", Schema.string())
  .prop("status_filter", Schema.string())
  .prop("start_date", Schema.string())
  .prop("end_date", Schema.string())
  .prop("order_fulfillment_filter", Schema.string())
  .prop("token_id", Schema.string().format("uuid"));

const getRedemptionOrderAsCSV: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const EXPORT_REDEMPTION_ORDER_AS_CSV = {
  description:
    "Defines the structure and constraints for an API endpoint to get all Redemption order data in CSV file.",
  tags: ["Token Order"],
  response: makeResponseSchema(getRedemptionOrderAsCSV),
  query: getRedemptionOrderCSVParams,
};

/* VIEW_ORDER_DETAILS */
const getOrderDetailsParams = Schema.object()
  .prop("id", Schema.string().format("uuid"))
  .required(["id"]);

const getOrderDetails: JSONSchema = Schema.object()
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const VIEW_ORDER_DETAILS = {
  description:
    "Defines the structure and constraints for an API endpoint to get order details",
  tags: ["Token Order"],
  response: makeResponseSchema(getOrderDetails),
  query: getOrderDetailsParams,
};
