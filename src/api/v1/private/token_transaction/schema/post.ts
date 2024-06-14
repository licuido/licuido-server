import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

const mintTokenBody = Schema.object()
  .prop("order_id", Schema.string())
  .valueOf();

const tokenmintResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const MINT_TOKEN = {
  description:
    "Defines the structure and constraints for an API endpoint to mint / burn token.",
  tags: ["Token Transaction"],
  body: mintTokenBody,
  response: makeResponseSchema(tokenmintResponse),
};
