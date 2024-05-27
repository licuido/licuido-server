import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const issuerPortFolioRoute: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  // Get Issuer Portfolio
  /* Orders Graph */
  fastify.get(
    "/orders/graph",
    { schema: schema.GET_ORDERS_GRAPH },
    handler.GET_ORDERS_GRAPH
  );
};

export default issuerPortFolioRoute;
