import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
// import schema from "./schema";

const onBoarding: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  fastify.post("/mint", {}, handler.MINT_TOKEN);
};

export default onBoarding;
