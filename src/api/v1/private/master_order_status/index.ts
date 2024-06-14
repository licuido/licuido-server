import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const masterOrderStatus: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_ORDER_STATUS },
    handlers.GET_ALL_ORDER_STATUS
  );
};

export default masterOrderStatus;
