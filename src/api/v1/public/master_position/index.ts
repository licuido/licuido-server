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
    { schema: schema.GET_ALL_POSITION },
    handlers.GET_ALL_POSITION
  );
};

export default masterBusinessSectors;
