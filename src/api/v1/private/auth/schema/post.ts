import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

// BODY SCHEMA
// ============================================================

// Create User Device Token Body Schema
const createUserDeviceTokenBody = Schema.object()
  .prop("user_device_token", Schema.string())
  .required(["user_device_token"])
  .valueOf() as JSONSchema;

// Log Out Body Schema
const logOutBody = Schema.object()
  .prop("id", Schema.string().format("uuid"))
  .required(["id"])
  .valueOf() as JSONSchema;

// RESPONSE SCHEMA
// ====================================================================

// Response Schema of Create user device token
const createUserDeviceTokenResponse: JSONSchema = Schema.object()
  .prop("device_token_id", Schema.string().format("uuid"))
  .valueOf() as JSONSchema;

// Response Schema of Log out
const logOutResponse: JSONSchema = Schema.object()
  .prop("message", Schema.string())
  .prop("success", Schema.boolean())
  .valueOf() as JSONSchema;

// =========================================================

// ADD USER DEVICE TOKEN
export const CREATE_USER_DEVICE_TOKEN = {
  description: "The purpose of this schema is to create user device token",
  tags: ["AUTH"],
  body: createUserDeviceTokenBody,
  response: makeResponseSchema(createUserDeviceTokenResponse),
};

// LOG OUT
export const LOG_OUT = {
  description: "The purpose of this schema is to logout user",
  tags: ["AUTH"],
  body: logOutBody,
  response: makeResponseSchema(logOutResponse),
};
