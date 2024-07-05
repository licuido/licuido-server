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

  /* Get Token By Investors Graph */
  fastify.get(
    "/token_by_investor/graph",
    { schema: schema.GET_TOKEN_BY_INVESTOR_GRAPH },
    handler.GET_TOKEN_BY_INVESTOR_GRAPH
  );

  /* Get Dashboard */
  fastify.get(
    "/dashboard",
    { schema: schema.GET_DASHBOARD },
    handler.GET_DASHBOARD
  );

  /* List Fund Offeings */
  fastify.get(
    "/fund_offerings",
    { schema: schema.GET_FUND_OFFERINGS },
    handler.GET_FUND_OFFERINGS
  );

  /* Update Token Offerings */
  // fastify
  // .put(
  //   "/update",
  //   { schema: schema.UPDATE_TOKEN_OFFERINGS },
  //   handler.UPDATE_TOKEN_OFFERINGS
  // )

  // fastify
  // .put(
  //   "/update",
  //   { schema: schema.GET_FUND_OFFERINGS },
  //   handler.GET_FUND_OFFERINGS
  // )

  /* Investors List */
  fastify.get(
    "/investor/list",
    { schema: schema.GET_INVESTOR_LIST },
    handler.GET_INVESTOR_LIST
  );

  /* Investors List CSV */
  fastify.get(
    "/investor/list/export/file",
    { schema: schema.GET_INVESTOR_LIST_AS_CSV },
    handler.GET_INVESTOR_LIST_AS_CSV
  );
};

export default issuerPortFolioRoute;
