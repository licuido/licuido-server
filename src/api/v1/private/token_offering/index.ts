import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const onBoarding: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  fastify.post(
    "/",
    { schema: schema.CREATE_TOKEN },
    handler.CREATE_TOKEN_OFFERINGS
  );

  /* Update Token Offerings */
  fastify
    .put(
      "/update",
      { schema: schema.UPDATE_TOKEN_OFFERINGS },
      handler.UPDATE_TOKEN_OFFERINGS
    )
    .put(
      "/update_status",
      { schema: schema.UPDATE_TOKEN_STATUS },
      handler.UPDATE_TOKEN_STATUS
    )
    .put(
      "/update_valuation",
      { schema: schema.UPDATE_TOKEN_VALUATION },
      handler.UPDATE_TOKEN_VALUATION
    )
    .put(
      "/update_offering_status",
      { schema: schema.UPDATE_TOKEN_OFFERING_STATUS },
      handler.UPDATE_TOKEN_OFFERING_STATUS
    );

  fastify
    .get("/", { schema: schema.GET_TOKEN }, handler.FIND_TOKEN)
    .get(
      "/all_tokens",
      { schema: schema.GET_ALL_TOKENS },
      handler.GET_ALL_TOKENS
    )
    .get(
      "/issuer_tokens",
      { schema: schema.GET_ISSUER_TOKENS },
      handler.GET_ISSUER_TOKENS
    );
};

export default onBoarding;
