import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

const createBussinessBody = Schema.object()
  .prop("id", Schema.string().format("uuid"))
  .prop("legal_name", Schema.string())
  .prop("lei_number", Schema.string())
  .prop("legal_address", Schema.string())
  .prop("zipcode", Schema.string())
  .prop("country_id", Schema.number())
  .prop("region_id", Schema.number())
  .prop("logo_asset_id", Schema.string().format("uuid"))
  .prop("business_sector_id", Schema.number())
  .prop("contact_profile_id", Schema.string().format("uuid"))
  .prop("investor_type_id", Schema.number())
  .prop("file_meta", Schema.object().additionalProperties(true))
  .valueOf() as JSONSchema;

const businessCreateResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const CREATE_BUSSINESS_DETAILS = {
  description:
    "Defines the structure and constraints for an API endpoint to create and update bussiness details of a user",
  tags: ["Onboarding"],
  body: createBussinessBody,
  response: makeResponseSchema(businessCreateResponse),
};

const createPersonBody = Schema.object()
  .prop("id", Schema.string().format("uuid"))
  .prop("name", Schema.string())
  .prop("mobile_no_std_code", Schema.string())
  .prop("mobile_no", Schema.string())
  .prop("position_id", Schema.number())
  .prop("contact_email", Schema.string())
  .prop("identity", Schema.array())
  .prop("deletedIdentity", Schema.array())
  .valueOf() as JSONSchema;

const personInfoCreateResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const CREATE_PERSON_INFO_DETAILS = {
  description:
    "Defines the structure and constraints for an API endpoint to create and update person information details of a user.",
  tags: ["Onboarding"],
  body: createPersonBody,
  response: makeResponseSchema(personInfoCreateResponse),
};

const createBusinessBody = Schema.object()
  .prop("entity_id", Schema.string().format("uuid"))
  .prop("business_registeration_url", Schema.string())
  .prop("auth_url", Schema.string())
  .prop("user_profile", Schema.string().format("uuid"))
  .prop("deleted_asset", Schema.array())
  .prop("registeration_file_meta", Schema.object().additionalProperties(true))
  .prop("authorization_file_meta", Schema.object().additionalProperties(true))
  .valueOf() as JSONSchema;

const businessDocumentCreateResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const CREATE_BUSINESS_DOCUMENT = {
  description:
    "Defines the structure and constraints for an API endpoint to create and update business documents of a user.",
  tags: ["Onboarding"],
  body: createBusinessBody,
  response: makeResponseSchema(businessDocumentCreateResponse),
};

const createkycBody = Schema.object()
  .prop("profile_id", Schema.string().format("uuid"))
  .prop("captured_url", Schema.string())
  .prop("is_verified", Schema.boolean())
  .prop("status_id", Schema.integer())
  .prop("file_meta", Schema.object().additionalProperties(true))
  .valueOf() as JSONSchema;

export const CREATE_EKYC = {
  description:
    "Defines the structure and constraints for an API endpoint to create eKYC verification.",
  tags: ["Onboarding"],
  body: createkycBody,
  response: makeResponseSchema(businessDocumentCreateResponse),
};

const createWalletBody = Schema.object()
  .prop("profile_id", Schema.string().format("uuid"))
  .prop("wallet_type_id", Schema.number())
  .prop("investor_entity_id", Schema.string())
  .prop("wallet_address", Schema.string())
  .prop("is_authenticated", Schema.boolean())
  .valueOf() as JSONSchema;

export const CREATE_CUSTOMER_WALLET = {
  description:
    "Defines the structure and constraints for an API endpoint is to create customer wallet.",
  tags: ["Onboarding"],
  body: createWalletBody,
  response: makeResponseSchema(businessDocumentCreateResponse),
};

const setAccountBody = Schema.object()
  .prop("profile_id", Schema.string().format("uuid"))
  .valueOf() as JSONSchema;

export const SET_ACCOUNT = {
  description:
    "Defines the structure and constraints for an API endpoint is to set the final step of onboarding setup.",
  tags: ["Onboarding"],
  body: setAccountBody,
  response: makeResponseSchema(businessDocumentCreateResponse),
};
