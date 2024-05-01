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
  fastify.put(
    "/update",
    { schema: schema.UPDATE_TOKEN_OFFERINGS },
    handler.UPDATE_TOKEN_OFFERINGS
  );
};

export default onBoarding;
