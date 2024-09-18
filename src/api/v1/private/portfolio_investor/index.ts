import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const investorPortFolioRoute: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  // Get Investor Portfolio
  /* Token Holdings Graph */
  fastify.get(
    "/token_holdings/graph",
    { schema: schema.GET_TOKEN_HOLDINGS_GRAPH },
    handler.GET_TOKEN_HOLDINGS_GRAPH
  );

  /* Current Token Investments */
  fastify.get(
    "/current_token_investments",
    { schema: schema.GET_CURRENT_TOKEN_INVESTMENT },
    handler.GET_CURRENT_TOKEN_INVESTMENT
  );

  /* Portfolio Dashboard */
  fastify.get(
    "/dashboard",
    { schema: schema.GET_DASHBOARD },
    handler.GET_DASHBOARD
  );

  /* Last 3 Month Performance */
  fastify.get(
    "/investor/performance",
    { schema: schema.GET_LAST_PERFORMANCE },
    handler.GET_LAST_PERFORMANCE
  );

  /* Token Overview */
  fastify.get(
    "/token/overview",
    { schema: schema.GET_TOKEN_OVERVIEW },
    handler.GET_TOKEN_OVERVIEW
  );
};

export default investorPortFolioRoute;
