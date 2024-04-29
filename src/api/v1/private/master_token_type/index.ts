import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const masterTokenTypes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_TOKEN_TYPES },
    handlers.GET_ALL_TOKEN_TYPES
  );
};

export default masterTokenTypes;
