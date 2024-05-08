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
  description: "The purpose of this schema is to get User Device Token",
  tags: ["AUTH"],
  response: makeResponseSchema(getDeviceTokenResponse),
  query: getDeviceTokenparams,
};

//------------------------------------------------------------------
