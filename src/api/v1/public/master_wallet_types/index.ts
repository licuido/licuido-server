import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const masterWallet: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  // fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_WALLETMASTER },
    handlers.GET_ALL_WALLETMASTER
  );
};

export default masterWallet;
