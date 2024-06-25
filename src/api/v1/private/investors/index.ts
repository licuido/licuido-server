import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const orderRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  /* Get Investors List for Issuer & Admin */

  fastify
    .get(
      "/list",
      { schema: schema.GET_ALL_INVESTORS },
      handler.GET_ALL_INVESTORS
    )
    .get(
      "/list/export/file",
      { schema: schema.EXPORT_INVESTORS_LIST_AS_CSV },
      handler.EXPORT_INVESTORS_LIST_AS_CSV
    )
    .get("/view", { schema: schema.VIEW_INVESTOR }, handler.VIEW_INVESTOR);
};

export default orderRoute;
