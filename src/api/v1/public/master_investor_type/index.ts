import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const masterMasterInvestorTypes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  // fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_INVESTOR_TYPES },
    handlers.GET_ALL_INVESTOR_TYPES
  );
};

export default masterMasterInvestorTypes;
