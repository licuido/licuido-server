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
  .prop("new_password", Schema.string())
  .additionalProperties(true)
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
  .prop(
    "data",
    Schema.object()
      .prop("token", Schema.string())
      .prop("isAlreadyLoggedin", Schema.boolean())
  )
  .prop("message", Schema.string())
  .prop("success", Schema.boolean())
  .valueOf() as JSONSchema;

// Response Schema of PreValidate
const preValidateResponse: JSONSchema = Schema.object()
  .prop("message", Schema.string())
  .prop("success", Schema.boolean())
  .valueOf() as JSONSchema;

// Response Schema of Sign In
const forgetPassWordResponse: JSONSchema = Schema.object()
  .prop(
    "data",
    Schema.object()
      .prop("token", Schema.string())
      .prop("valid_till", Schema.string())
  )
  .prop("message", Schema.string())
  .prop("success", Schema.boolean())
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
    "The purpose of this schema is to define the structure and constraints for an API endpoint that logs in a user.",
  tags: ["AUTH"],
  body: signInBodyPayload,
  response: makeResponseSchema(signInResponse),
};

// PREVALIDATE
export const PRE_VALIDATE_SIGNIN = {
  description:
    "The purpose of this schema is to define the structure and constraints for an API endpoint that prevalidates a user.",
  tags: ["AUTH"],
  body: signInBody,
  response: makeResponseSchema(preValidateResponse),
};

// FORGET PASSWORD
export const FORGET_PASSWORD = {
  description:
    "The purpose of this schema is to define the structure and constraints for an API endpoint that gets a password reset token.",
  tags: ["AUTH"],
  body: forgetBody,
  response: makeResponseSchema(forgetPassWordResponse),
};

// RESET PASSWORD
export const RESET_PASSWORD = {
  description:
    "The purpose of this schema is to define the structure and constraints for an API endpoint that resets the password of a user if forgotten.",
  tags: ["AUTH"],
  body: ResetBody,
  response: makeResponseSchema(resetPassWordResponse),
};

// RESET PASSWORD BY USER
export const RESET_PASSWORD_BY_USER = {
  description:
    "The purpose of this schema is to define the structure and constraints for an API endpoint that resets the password of a user if he wanst to change.",
  tags: ["AUTH"],
  body: ResetBodyByUser,
  response: makeResponseSchema(resetPassWordResponse),
};

// SEND EMAIL OTP
export const SEND_EMAIL_OTP = {
  description:
    "The purpose of this schema is to define the structure and constraints for an API endpoint that sends an OTP to an email.",
  tags: ["AUTH"],
  body: forgetBody,
  response: makeResponseSchema(sendEmailOTPResponse),
};

// VALIDATE EMAIL OTP
export const VERIFY_EMAIL_OTP = {
  description:
    "The purpose of this schema is to define the structure and constraints for an API endpoint that validates an OTP sent to an email.",
  tags: ["AUTH"],
  body: VerifyEmailOTPBody,
  response: makeResponseSchema(verifyOTPResponse),
};

// RESEND EMAIL OTP
export const RESEND_EMAIL_OTP = {
  description:
    "The purpose of this schema is to define the structure and constraints for an API endpoint that resends an OTP to an email.",
  tags: ["AUTH"],
  body: forgetBody,
  response: makeResponseSchema(resetPassWordResponse),
};
