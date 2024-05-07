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
    );

  fastify
    .get("/", { schema: schema.GET_TOKEN }, handler.FIND_TOKEN)
    .get(
      "/issuer_tokens",
      { schema: schema.GET_ISSUER_TOKENS },
      handler.GET_ISSUER_TOKENS
    );
};

export default onBoarding;
