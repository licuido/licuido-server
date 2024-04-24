import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const masterBusinessSectors: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  // fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_BUSINESS_SECTORS },
    handlers.GET_ALL_BUSINESS_SECTORS
  );
};

export default masterBusinessSectors;
