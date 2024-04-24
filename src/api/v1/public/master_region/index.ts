import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const masterRegions: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  // fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_REGIONS },
    handlers.GET_ALL_REGIONS
  );
};

export default masterRegions;
