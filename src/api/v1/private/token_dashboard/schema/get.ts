import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

/* For Get Valuation Graph for token dashboard */
const getValuationGraphParams = Schema.object()
  .prop("from_date", Schema.string())
  .prop("to_date", Schema.string())
  .prop("token_offering_id", Schema.string())
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
  .prop("token_offering_id", Schema.string())
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
