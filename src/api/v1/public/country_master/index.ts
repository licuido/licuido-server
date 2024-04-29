import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const countries: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_COUNTRIES },
    handlers.GET_ALL_COUNTRIES
  );
};

export default countries;
