import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

const getPaymentResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .valueOf() as JSONSchema;

const getPaymentparams = Schema.object()
  .prop("token_order_id", Schema.string().format("uuid"))
  .required(["token_order_id"]);

export const GET_SUBSCRIPTION_PAYMENT_DETAILS = {
  description:
    "The purpose of this schema is get token order subcription payment details",
  tags: ["MARKET PLACE INVEST"],
  response: makeResponseSchema(getPaymentResponse),
  query: getPaymentparams,
};
