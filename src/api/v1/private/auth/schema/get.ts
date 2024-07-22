import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

//------------------------ Request Params --------------------------

// Request Params of Get User Device Token
const getDeviceTokenparams = Schema.object()
  .prop("id", Schema.string().format("uuid"))
  .required(["id"]);

//------------------------ Response Schema -------------------------

// Response Schema of Get User Device Token
const getDeviceTokenResponse: JSONSchema = Schema.object()
  .additionalProperties(true)
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

//------------------------------------------------------------------

// GET USER DEVICE TOKEN
export const GET_USER_DEVICE_TOKEN = {
  description:
    "Defines the structure and constraints for an API endpoint to get a user device token",
  tags: ["Private Auth"],
  response: makeResponseSchema(getDeviceTokenResponse),
  query: getDeviceTokenparams,
};

//------------------------------------------------------------------

// GET USER DEVICE TOKEN
export const GET_USER_DETAILS = {
  description:
    "Defines the structure and constraints for an API endpoint to get a user device token",
  tags: ["Private Auth"],
  response: makeResponseSchema(getDeviceTokenResponse),
};
