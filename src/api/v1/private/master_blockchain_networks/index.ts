import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const masterBlockChainNetworks: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_BLOCK_CHAIN_NETWORKS },
    handlers.GET_ALL_BLOCK_CHAIN_NETWORKS
  );
};

export default masterBlockChainNetworks;
