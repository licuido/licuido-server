import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

/* For Get Investor Count For Qualification */

const getInvestorCountResponse: JSONSchema = Schema.object()
  .prop("count", Schema.integer())
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const GET_INVESTOR_COUNT_FOR_QUALIFY = {
  description:
    "The purpose of this schema is to get investor count for qualification",
  tags: ["INVESTOR QUALIFICATION"],
  response: makeResponseSchema(getInvestorCountResponse),
};
