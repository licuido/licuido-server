import { FastifyPluginAsync } from "fastify";

import schema from "./schema";
import handler from "./handlers";

const onBoarding: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  fastify.post("/business", { schema: schema.CREATE_BUSSINESS_DETAILS }, handler.CREATE_BUSSINESS_DETAILS)
    
};

export default onBoarding;
