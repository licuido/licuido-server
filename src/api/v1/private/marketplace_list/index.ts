import { FastifyPluginAsync } from "fastify";
// import schema from "./schema";
import handlers from './handlers';

const marketPlace: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    // { schema: schema.GET_ALL_INVESTOR_TYPES },
    handlers.GET_MARKETPLACE_LISTING
  );
};

export default marketPlace;
