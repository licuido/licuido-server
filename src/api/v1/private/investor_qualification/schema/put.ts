import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

/* For Upsert Investor Qualification Status */
const upsertInvestorQualifyStatusBody = Schema.object()
  .prop("id", Schema.string())
  .prop("status_id", Schema.number())
  .prop("investor_type_id", Schema.number())
  .prop("investor_entity_id", Schema.string())
  .valueOf();

const upsertInvestorQualifyStatusResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const UPSERT_INVESTOR_STATUS = {
  description:
    "The purpose of this schema is to Investor Qualfication Status By Issuer",
  tags: ["INVESTOR QUALIFICATION"],
  body: upsertInvestorQualifyStatusBody,
  response: makeResponseSchema(upsertInvestorQualifyStatusResponse),
};
