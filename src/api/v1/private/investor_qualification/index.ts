import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const investorQualification: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  // Get Investor Count & All Data for Qualification
  fastify
    .get(
      "/count/get",
      { schema: schema.GET_INVESTOR_COUNT_FOR_QUALIFY },
      handler.GET_INVESTOR_COUNT_FOR_QUALIFY
    )
    .get(
      "/get",
      { schema: schema.GET_INVESTOR_DATA_FOR_QUALIFY },
      handler.GET_INVESTOR_DATA_FOR_QUALIFY
    )
    .get(
      "/export/file",
      // { schema: schema.EXPORT_INVESTOR_DATA_AS_CSV_FILE },
      handler.EXPORT_INVESTOR_DATA_AS_CSV_FILE
    );

  // Upsert Investor Status
  fastify.put(
    "/status/upsert",
    { schema: schema.UPSERT_INVESTOR_STATUS },
    handler.UPSERT_INVESTOR_STATUS
  );
};

export default investorQualification;
