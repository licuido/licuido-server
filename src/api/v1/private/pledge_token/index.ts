import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
// import schema from "./schema";

const PledgeAndRepo: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);
  // Get Investor Count & All Data for Qualification
  fastify.post(
    "/pledge_repo",
    // { schema: schema.CURRENCY_CONVERSION_SCHEMA },
    handler.UPSERT_PLEDGE_REPO_HANDLER
  );
};

export default PledgeAndRepo;
