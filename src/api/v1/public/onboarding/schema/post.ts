import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";


const createBussinessBody = Schema.object()
  .prop("id", Schema.string().format("uuid"))
  .prop("legal_name", Schema.string())
  .prop("lei_number", Schema.string())
  .prop("legal_address", Schema.string())
  .prop("zipcode", Schema.string()) 
  .prop("country_id", Schema.number())
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