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

  fastify.put(
    "/update_status",
    { schema: schema.UPDATE_TOKEN_STATUS },
    handler.UPDATE_TOKEN_STATUS
  );
};

export default onBoarding;
