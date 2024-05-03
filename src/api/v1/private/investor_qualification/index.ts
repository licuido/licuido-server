import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const investorQualification: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  // Get Investor Count for Qualification
  fastify.get(
    "/count/get",
    { schema: schema.GET_INVESTOR_COUNT_FOR_QUALIFY },
    handler.GET_INVESTOR_COUNT_FOR_QUALIFY
  );
};

export default investorQualification;
