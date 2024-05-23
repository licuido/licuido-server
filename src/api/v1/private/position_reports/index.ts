import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
// import schema from "./schema";

const positionReport: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  fastify.post("/", {}, handler.CREATE_POSITION_REPORT)

};

export default positionReport;
