import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

const getResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object()).additionalProperties(true)
  .valueOf() as JSONSchema;

  const customParams = Schema.object().prop("user_profile_id", Schema.number())


export const GET_ENTITY = {
  description:
    "The purpose of this schema is get onboarding detail",
  tags: ["ONBOARDING"],
  response: makeResponseSchema(getResponse),
  query:customParams
};
