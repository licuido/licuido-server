import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

const updateTokenStatusBody = Schema.object()
  .prop("status_id", Schema.number())
  .prop("token_id", Schema.string())
  .valueOf();

const updateTokenStatusResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const UPDATE_TOKEN_STATUS = {
  description: "The purpose of this schema is to update token offering status",
  tags: ["TOKEN_OFFERING"],
  body: updateTokenStatusBody,
  response: makeResponseSchema(updateTokenStatusResponse),
};
