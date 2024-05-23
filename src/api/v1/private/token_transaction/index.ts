import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const tokenTransaction: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  fastify.post("/mint", {schema:schema.MINT_TOKEN}, handler.MINT_TOKEN)
  .post("/burn", {schema:schema.MINT_TOKEN}, handler.BURN_TOKEN);

  fastify.get("/", {schema:schema.GET_TRANSACTION}, handler.GET_ALL_TRANSACTION).get("/export", {}, handler.EXPORT_ALL_TRANSACTION_AS_CSV_FILE)
};

export default tokenTransaction;
