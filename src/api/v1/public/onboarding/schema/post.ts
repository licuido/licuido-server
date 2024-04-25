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
  .valueOf() as JSONSchema;


  const businessCreateResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object()
  .prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const CREATE_BUSSINESS_DETAILS = {
    description:
      "The purpose of this schema is to create and update bussiness detail of user",
    tags: ["ONBOARDING"],
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
  .prop("data", Schema.object()
  .prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const CREATE_PERSON_INFO_DETAILS = {
    description:
      "The purpose of this schema is to create and update person info detail of user",
    tags: ["ONBOARDING"],
    body: createPersonBody,
    response: makeResponseSchema(personInfoCreateResponse),
  };




  const createBusinessBody = Schema.object()
  .prop("entity_id", Schema.string().format("uuid"))
  .prop("business_registeration_url", Schema.string())
  .prop("auth_url", Schema.string())
  .prop("user_profile", Schema.string().format("uuid"))
  .prop("deleted_asset", Schema.array())
  .valueOf() as JSONSchema;


  const businessDocumentCreateResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object()
  .prop("message", Schema.string()))
  .valueOf() as JSONSchema;

  export const CREATE_BUSINESS_DOCUMENT = {
    description:
      "The purpose of this schema is to create and update bussiness Document of user",
    tags: ["ONBOARDING"],
    body: createBusinessBody,
    response: makeResponseSchema(businessDocumentCreateResponse),
  };


  const createkycBody = Schema.object()
  .prop("profile_id", Schema.string().format("uuid"))
  .prop("captured_url", Schema.string())
  .prop("is_verified", Schema.boolean())
  .valueOf() as JSONSchema;



  export const CREATE_EKYC = {
    description:
      "The purpose of this schema is to create ekyc verification",
    tags: ["ONBOARDING"],
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



  export const   CREATE_CUSTOMER_WALLET  = {
    description:
      "The purpose of this schema is to create ekyc verification",
    tags: ["ONBOARDING"],
    body: createWalletBody,
    response: makeResponseSchema(businessDocumentCreateResponse),
  };


  

  const setAccountBody = Schema.object()
  .prop("profile_id", Schema.string().format("uuid"))
  .valueOf() as JSONSchema;



  export const   SET_ACCOUNT  = {
    description:
      "The purpose of this schema is set final step of setup",
    tags: ["ONBOARDING"],
    body: setAccountBody,
    response: makeResponseSchema(businessDocumentCreateResponse),
  };


  