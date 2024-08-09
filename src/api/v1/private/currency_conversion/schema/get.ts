import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

/* For Get Investor Data For Qualification */
export const currency = Schema.object()
  .prop("base", Schema.string())
  .prop("amount", Schema.string());

const currencyResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const CURRENCY_CONVERSION_SCHEMA = {
  description:
    "Defines the structure and constraints for an API endpoint to get all investor data in CSV file.",
  tags: ["Investor Qualification"],
  response: makeResponseSchema(currencyResponse),
  query: currency,
};
