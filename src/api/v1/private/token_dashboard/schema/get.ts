import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

/* For Get Valuation Graph for token dashboard */
const getValuationGraphParams = Schema.object()
  .prop("from_date", Schema.string())
  .prop("to_date", Schema.string())
  .prop("token_offering_id", Schema.string().format("uuid"))
  .required(["token_offering_id"]);

const getValuationGraphResponse: JSONSchema = Schema.object()
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_VALUATION_GRAPH = {
  description:
    "Defines the structure and constraints for an API endpoint to get valuation graph data",
  tags: ["Token Dashboard"],
  response: makeResponseSchema(getValuationGraphResponse),
  query: getValuationGraphParams,
};

// Get Orders Graph
const getOrdersGraphParams = Schema.object()
  .prop("from_date", Schema.string())
  .prop("to_date", Schema.string())
  .prop("token_offering_id", Schema.string().format("uuid"))
  .required(["token_offering_id"]);

const getOrdersGraphResponse: JSONSchema = Schema.object()
  .prop(
    "page",
    Schema.array().items(Schema.object().additionalProperties(true))
  )
  .prop("count", Schema.integer())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_ORDERS_GRAPH = {
  description:
    "Defines the structure and constraints for an API endpoint to get orders graph data",
  tags: ["Token Dashboard"],
  response: makeResponseSchema(getOrdersGraphResponse),
  query: getOrdersGraphParams,
};

// Get Token Summary & Recent Activities

const getSummayRecentActivitiesParams = Schema.object()
  .prop("token_offering_id", Schema.string().format("uuid"))
  .required(["token_offering_id"]);

const getSummayRecentActivitiesResponse: JSONSchema = Schema.object()
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_SUMMARY_RECENT_ACTIVITIES = {
  description:
    "Defines the structure and constraints for an API endpoint to get Token summary & Recent ACtivities",
  tags: ["Token Dashboard"],
  response: makeResponseSchema(getSummayRecentActivitiesResponse),
  query: getSummayRecentActivitiesParams,
};
