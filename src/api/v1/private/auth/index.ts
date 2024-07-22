import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  // Create User Device Token & Log Out
  fastify
    .post(
      "/user_device_token/create",
      { schema: schema.CREATE_USER_DEVICE_TOKEN },
      handlers.CREATE_USER_DEVICE_TOKEN
    )
    .post("/logout", { schema: schema.LOG_OUT }, handlers.LOG_OUT);

  // Get User Device Token
  fastify.get(
    "/user_device_token/get",
    { schema: schema.GET_USER_DEVICE_TOKEN },
    handlers.GET_USER_DEVICE_TOKEN
  );
  fastify.get(
    "/user_details",
    { schema: schema.GET_USER_DETAILS },
    handlers.GET_USER_DETAILS
  );
};

export default authRoute;
