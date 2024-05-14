import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

const getResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object())
  .additionalProperties(true)
  .valueOf() as JSONSchema;

const customParams = Schema.object().prop("user_profile_id", Schema.string());

export const GET_ENTITY = {
  description:
    "Defines the structure and constraints for an API endpoint to get user onboarding detail.",
  tags: ["Onboarding"],
  response: makeResponseSchema(getResponse),
  query: customParams,
};
