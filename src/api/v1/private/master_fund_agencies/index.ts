import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const masterFundAgency: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_FUND_AGENCY },
    handlers.GET_ALL_FUND_AGENCY
  );
};

export default masterFundAgency;
