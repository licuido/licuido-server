import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";
// import schema from "./schema";

const positionReport: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  fastify.post("/", {}, handler.CREATE_POSITION_REPORT);

  fastify
    .get(
      "/list",
      { schema: schema.GET_ALL_POSITION_REPORTS },
      handler.GET_ALL_POSITION_REPORTS
    )
    .get(
      "/investors/view",
      { schema: schema.GET_ALL_INVESTORS },
      handler.GET_ALL_INVESTORS
    )
    .get(
      "/investors/export",
      { schema: schema.EXPORT_INVESTORS_AS_CSV },
      handler.EXPORT_INVESTORS_AS_CSV
    );
};

export default positionReport;
