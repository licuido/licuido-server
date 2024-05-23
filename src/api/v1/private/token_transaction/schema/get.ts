import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

const getResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .valueOf() as JSONSchema;

const customParams = Schema.object()
.prop("offset", Schema.number())
.prop("limit", Schema.number())
.prop("search", Schema.string())
.prop("status", Schema.string())
.prop("start_date", Schema.string())
.prop("end_date", Schema.string())
.prop("token_offering_id", Schema.string())
.prop("type", Schema.string())


export const GET_TRANSACTION = {
  description:
    "Defines the structure and constraints for an API endpoint to get token offering detail",
  tags: ["Token Transaction"],
  response: makeResponseSchema(getResponse),
  query: customParams,
};