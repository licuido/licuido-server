import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const orderRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  /* Get Subscription Order Details */

  fastify.get(
    "/subscription/get",
    { schema: schema.GET_ALL_SUBSCRIPTION_ORDER },
    handler.GET_ALL_SUBSCRIPTION_ORDER
  );
};

export default orderRoute;
