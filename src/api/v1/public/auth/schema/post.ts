import Schema, { JSONSchema } from "fluent-json-schema";

import { makeResponseSchema } from "@helpers";

// BODY SCHEMA
// ============================================================
// Sign In and Prevalidate Body Schema
const signInBody = Schema.object()
  .prop("email", Schema.string())
  .prop("password", Schema.string())
  .valueOf() as JSONSchema;

const signInBodyPayload = Schema.object()
  .prop("email", Schema.string())
  .prop("password", Schema.string())
  .prop("timestamp", Schema.string().format("date-time"))
  .prop("deviceId", Schema.string().format("uuid"))
  .prop("platform", Schema.string())
  .valueOf() as JSONSchema;

// Forget Body Schema
const forgetBody = Schema.object()
  .prop("email_id", Schema.string())
  .valueOf() as JSONSchema;

// Verify Body Schema
const VerifyEmailOTPBody = Schema.object()
  .prop("email_id", Schema.string())
  .prop("otp", Schema.string())
  .valueOf() as JSONSchema;

// Reset Body Schema
const ResetBody = Schema.object()
  .additionalProperties(true)
  .prop("new_password", Schema.string())
  .valueOf() as JSONSchema;

// Reset Body Schema
const ResetBodyByUser = Schema.object()
  .prop("old_password", Schema.string())
  .prop("new_password", Schema.string())
  .valueOf() as JSONSchema;

// RESPONSE SCHEMA
// ====================================================================
// Response Schema of Sign In
const signInResponse: JSONSchema = Schema.object()
  .prop("token", Schema.string())
  .prop("user_profile", Schema.string())
  .prop("message", Schema.string())
  .prop("success", Schema.boolean())
  .prop("error", Schema.object())
  .prop("meta", Schema.object().additionalProperties(true))
  .valueOf() as JSONSchema;

// Response Schema of PreValidate
const preValidateResponse: JSONSchema = Schema.object()
  .prop("message", Schema.string())
  .prop("success", Schema.boolean())
  .valueOf() as JSONSchema;

// Response Schema of Sign In
const forgetPassWordResponse: JSONSchema = Schema.object()
  .additionalProperties(true)
  .valueOf() as JSONSchema;

// Response Schema of Sign In
const sendEmailOTPResponse: JSONSchema = Schema.object()
  .prop("isExistingUser", Schema.boolean())
  .valueOf() as JSONSchema;

// Response Schema of Forget password
const resetPassWordResponse: JSONSchema = Schema.object()
  .prop("message", Schema.string())
  .prop("success", Schema.boolean())
  .valueOf() as JSONSchema;

// Response Schema of Forget password
const verifyOTPResponse: JSONSchema = Schema.object()
  .prop("token", Schema.string())
  .prop("id", Schema.integer())
  .valueOf() as JSONSchema;

// =========================================================
// SIGN IN
export const SIGN_IN = {
  description:
    "Defines the structure and constraints for an API endpoint that allows logging in a user with the given email and password.",
  tags: ["Auth"],
  body: signInBodyPayload,
  response: makeResponseSchema(signInResponse),
};

// PREVALIDATE
export const PRE_VALIDATE_SIGNIN = {
  description:
    "Defines the structure and constraints for an API endpoint that allows prevalidating a user by checking their email and phone number before they sign in.",
  tags: ["Auth"],
  body: signInBody,
  response: makeResponseSchema(preValidateResponse),
};

// FORGET PASSWORD
export const FORGET_PASSWORD = {
  description:
    "Defines structure and constraints for an API endpoint that requests a password reset token for a user.",
  tags: ["Auth"],
  body: forgetBody,
  response: makeResponseSchema(forgetPassWordResponse),
};

// RESET PASSWORD
export const RESET_PASSWORD = {
  description:
    "Defines the structure and constraints for an API endpoint that allows resetting the password of a user if it has been forgotten.",
  tags: ["Auth"],
  body: ResetBody,
  response: makeResponseSchema(resetPassWordResponse),
};

// RESET PASSWORD BY USER
export const RESET_PASSWORD_BY_USER = {
  description:
    "Defines the structure and constraints for an API endpoint that allows resetting the user's password upon request for a change.",
  tags: ["Auth"],
  body: ResetBodyByUser,
  response: makeResponseSchema(resetPassWordResponse),
};

// SEND EMAIL OTP
export const SEND_EMAIL_OTP = {
  description:
    "Defines structure and constraints for an API endpoint that sends an OTP (One-Time Password) to an email address for password reset or account verification.",
  tags: ["Auth"],
  body: forgetBody,
  response: makeResponseSchema(sendEmailOTPResponse),
};

// VALIDATE EMAIL OTP
export const VERIFY_EMAIL_OTP = {
  description:
    "Defines structure and constraints for an API endpoint that validates the OTP sent to an email address for user verification.",
  tags: ["Auth"],
  body: VerifyEmailOTPBody,
  response: makeResponseSchema(verifyOTPResponse),
};

// RESEND EMAIL OTP
export const RESEND_EMAIL_OTP = {
  description:
    "Defines the structure and constraints for an API endpoint that resends the OTP (One-Time Password) to an email address if the OTP was not received or expired.",
  tags: ["Auth"],
  body: forgetBody,
  response: makeResponseSchema(resetPassWordResponse),
};
