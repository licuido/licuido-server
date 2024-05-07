import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

const createSubscriptionBody = Schema.object()
  .prop("type", Schema.string())
  .prop("investment_type", Schema.string())
  .prop("issuer_entity_id", Schema.string().format("uuid"))
  .prop("token_offering_id", Schema.string().format("uuid"))
  .prop("currency", Schema.string())
  .prop("currency_code", Schema.string())
  .prop("ordered_tokens", Schema.number())
  .prop("price_per_token", Schema.number())
  .prop("net_investment_value", Schema.number())
  .prop("fee", Schema.number())
  .prop("total_paid", Schema.number())
  .prop("payment_reference", Schema.string())
  .required([
    "type",
    "investment_type",
    "issuer_entity_id",
    "token_offering_id",
    "currency",
    "currency_code",
    "ordered_tokens",
    "price_per_token",
    "net_investment_value",
    "fee",
    "total_paid",
    "payment_reference",
  ])
  .valueOf();

const subscriptionCreateResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const CREATE_SUBSCRIPTION_ORDER = {
  description: "The purpose of this schema is to create subscription order",
  tags: ["MARKET PLACE INVEST"],
  body: createSubscriptionBody,
  response: makeResponseSchema(subscriptionCreateResponse),
};
