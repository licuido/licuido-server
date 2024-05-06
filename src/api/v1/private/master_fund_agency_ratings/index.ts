import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const masterAgencyRatings: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_AGENCY_RATINGS },
    handlers.GET_ALL_AGENCY_RATINGS
  );
};

export default masterAgencyRatings;
