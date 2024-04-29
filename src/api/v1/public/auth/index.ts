import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // fastify.addHook("preHandler", fastify.authenticate);

  fastify
    .post("/login", { schema: schema.SIGN_IN }, handlers.SIGN_IN)
    .post("/register", { schema: schema.SIGN_IN }, handlers.SIGN_UP)
    .post(
      "/forget_password",
      { schema: schema.FORGET_PASSWORD },
      handlers.FORGET_PASSWORD
    )
    .post(
      "/reset_password",
      { schema: schema.RESET_PASSWORD },
      handlers.RESET_PASSWORD
    );

  fastify
    .get(
      "/validate_token",
      { schema: schema.VALIDATE_TOKEN },
      handlers.VALIDATE_TOKEN
    )
    .get(
      "/refresh_token",
      { schema: schema.REFRESH_TOKEN },
      handlers.REFRESH_TOKEN
    );
};

export default example;
