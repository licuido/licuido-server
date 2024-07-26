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

  /* Get Token deployment Count */
  fastify.get(
    "/token_deployment_count",
    { schema: schema.GET_TOKEN_DEPLOYMENT_COUNT },
    handler.GET_TOKEN_DEPLOYMENT_COUNT
  );

  /* Get Issuer approval Count */
  fastify.get(
    "/issuer_approval_count",
    { schema: schema.GET_ISSUER_APPROVAL_COUNT },
    handler.GET_ISSUER_APPROVAL_COUNT
  );

  /* Get Token deployment Count */
  fastify.get(
    "/total_investment_issuers_investors_count",
    { schema: schema.GET_TOTAL_INVESTMENT_ISSUERS_INVESTORS_COUNT },
    handler.GET_TOTAL_INVESTMENT_ISSUERS_INVESTORS_COUNT
  );

  /* List Fund Offeings */
  fastify.get(
    "/fund_offerings",
    { schema: schema.GET_FUND_OFFERINGS },
    handler.GET_FUND_OFFERINGS
  );

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
