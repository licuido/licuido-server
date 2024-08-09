import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
// import schema from "./schema";

const currencyConversion: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  // Get Investor Count & All Data for Qualification
  fastify.get(
    "/currency/conversion",
    // { schema: schema.CURRENCY_CONVERSION_SCHEMA },
    handler.CURRENCY_CONVERSION_HANDLER
  );
};

export default currencyConversion;
