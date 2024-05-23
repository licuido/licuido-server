import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
// import schema from "./schema";

const onBoarding: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  fastify.post("/mint", {}, handler.MINT_TOKEN)
  .post("/burn", {}, handler.BURN_TOKEN);

  fastify.get("/", {}, handler.GET_ALL_TRANSACTION).get("/export", {}, handler.EXPORT_ALL_TRANSACTION_AS_CSV_FILE)
};

export default onBoarding;
