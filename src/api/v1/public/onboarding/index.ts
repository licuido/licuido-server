import { FastifyPluginAsync } from "fastify";

import schema from "./schema";
import handler from "./handlers";

const onBoarding: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  fastify.post("/business", { schema: schema.CREATE_BUSSINESS_DETAILS }, handler.CREATE_BUSSINESS_DETAILS)
  .post("/person_info", { schema: schema.CREATE_PERSON_INFO_DETAILS }, handler.CREATE_CONTACT_PERSON)
  .post("/business_documents", { schema: schema.CREATE_BUSINESS_DOCUMENT }, handler.CREATE_BUSINESS_DOCUMENT)
  .post("/e_kyc", { schema: schema.CREATE_EKYC }, handler.CREATE_EKYC)
  .post("/wallet", { schema: schema.CREATE_CUSTOMER_WALLET }, handler.CREATE_CUSTOMER_WALLET)
  .post("/set_account", { schema: schema.SET_ACCOUNT }, handler.SET_ACCOUNT)

  fastify.get("/",{schema: schema.GET_ENTITY}, handler.FIND_ONE)
    
};

export default onBoarding;
