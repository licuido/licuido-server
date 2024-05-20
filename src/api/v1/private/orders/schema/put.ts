import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

/* CANCEL_ORDER */
const cancelTokenOrderBody = Schema.object()
  .prop("id", Schema.string().format("uuid"))
  .required(["id"]);

const cancelTokenOrder: JSONSchema = Schema.object()
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const CANCEL_ORDER = {
  description:
    "Defines the structure and constraints for an API endpoint to cancel token order",
  tags: ["Token Order"],
  response: makeResponseSchema(cancelTokenOrder),
  body: cancelTokenOrderBody,
};

/* CONFRIM_PAYMENT */
const confirmPaymentBody = Schema.object()
  .prop("id", Schema.string().format("uuid"))
  .prop("received_payment", Schema.string())
  .prop("status_id", Schema.integer())
  .prop("is_mint_enabled", Schema.boolean())
  .required(["id", "is_mint_enabled", "received_payment", "status_id"]);

const confirmPayment: JSONSchema = Schema.object()
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const CONFRIM_PAYMENT = {
  description:
    "Defines the structure and constraints for an API endpoint to confirm the payment",
  tags: ["Token Order"],
  response: makeResponseSchema(confirmPayment),
  body: confirmPaymentBody,
};

/* SEND_PAYMENT */
const sendPaymentBody = Schema.object()
  .prop("id", Schema.string().format("uuid"))
  .prop("status_id", Schema.integer())
  .prop("is_burn_enabled", Schema.boolean())
  .prop("amount_to_pay", Schema.string())
  .prop("payment_reference", Schema.string())
  .required(["id", "is_burn_enabled", "status_id"]);

const sendPayment: JSONSchema = Schema.object()
  .prop("meta", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const SEND_PAYMENT = {
  description:
    "Defines the structure and constraints for an API endpoint to send the payment",
  tags: ["Token Order"],
  response: makeResponseSchema(sendPayment),
  body: sendPaymentBody,
};
