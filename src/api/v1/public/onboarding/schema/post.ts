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
  