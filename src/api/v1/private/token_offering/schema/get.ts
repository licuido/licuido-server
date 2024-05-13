import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

const getResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .valueOf() as JSONSchema;

const customParams = Schema.object().prop("token_id", Schema.string());

export const GET_TOKEN = {
  description: "The purpose of this schema is get token detail",
  tags: ["TOKEN_OFFERING"],
  response: makeResponseSchema(getResponse),
  query: customParams,
};

const getIssuerTokenResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .valueOf() as JSONSchema;

const customIssuerParams = Schema.object().prop("token_id", Schema.string());

export const GET_ISSUER_TOKENS = {
  description: "The purpose of this schema is get issuer tokens",
  tags: ["TOKEN_OFFERING"],
  response: makeResponseSchema(getIssuerTokenResponse),
  query: customIssuerParams,
};
