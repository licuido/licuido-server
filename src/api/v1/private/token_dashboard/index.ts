import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const tokenDashboardRoute: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  // Get Token Dashboard
  /* Token Holdings Graph */
  fastify.get(
    "/issuer/valuation/graph",
    { schema: schema.GET_VALUATION_GRAPH },
    handler.GET_VALUATION_GRAPH
  );

  // Token Orders Graph
  fastify.get(
    "/issuer/orders/graph",
    { schema: schema.GET_ORDERS_GRAPH },
    handler.GET_ORDERS_GRAPH
  );

  // Summary & Recent Activities
  fastify.get(
    "/summary/recent_activities",
    { schema: schema.GET_SUMMARY_RECENT_ACTIVITIES },
    handler.GET_SUMMARY_RECENT_ACTIVITIES
  );

  // Investor Distribution
  fastify.get(
    "/investor_distribution",
    { schema: schema.GET_INVESTOR_DISTRIBUTION },
    handler.GET_INVESTOR_DISTRIBUTION
  );
};

export default tokenDashboardRoute;
