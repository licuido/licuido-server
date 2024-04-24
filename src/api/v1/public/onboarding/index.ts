import { FastifyPluginAsync } from "fastify";

import schema from "./schema";
import handler from "./handlers";

const onBoarding: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  fastify.post("/business", { schema: schema.CREATE_BUSSINESS_DETAILS }, handler.CREATE_BUSSINESS_DETAILS)
  .post("/person_info", { schema: schema.CREATE_PERSON_INFO_DETAILS }, handler.CREATE_CONTACT_PERSON)
  .post("/business_documents", { schema: schema.CREATE_BUSINESS_DOCUMENT }, handler.CREATE_BUSINESS_DOCUMENT)
    
};

export default onBoarding;
