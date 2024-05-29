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
