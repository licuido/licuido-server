import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

// Response Schema of Reset password
const tokenResponse: JSONSchema = Schema.object()
  .prop("message", Schema.string())
  .prop("success", Schema.boolean())
  .valueOf() as JSONSchema;

// VALIDATE TOKEN
export const VALIDATE_TOKEN = {
  description:
    "The purpose of this schema is to define the structure and constraints for an API endpoint that validates the passowrd reset token.",
  tags: ["AUTH"],
  response: makeResponseSchema(tokenResponse),
};

// REFRESH TOKEN
export const REFRESH_TOKEN = {
  description:
    "The purpose of this schema is to define the structure and constraints for an API endpoint that refreshes a user.",
  tags: ["AUTH"],
  response: makeResponseSchema(tokenResponse),
};
