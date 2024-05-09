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
    "Defines the structure and constraints for an API endpoint to validate the password reset token.",
  tags: ["Auth"],
  response: makeResponseSchema(tokenResponse),
};

// REFRESH TOKEN
export const REFRESH_TOKEN = {
  description:
    "Defines the structure and constraints for an API endpoint to refresh the user's access token and get a new one.",
  tags: ["Auth"],
  response: makeResponseSchema(tokenResponse),
};
