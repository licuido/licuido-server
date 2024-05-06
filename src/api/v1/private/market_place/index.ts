import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const marketPlace: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  // For Invest [Create Subscription Order]
  fastify.post(
    "/fund/invest/subscription/create",
    { schema: schema.CREATE_SUBSCRIPTION_ORDER },
    handler.CREATE_SUBSCRIPTION_ORDER
  );

  // Get Subscription Payment Details
  fastify.get(
    "/subscription/payment/get",
    { schema: schema.GET_SUBSCRIPTION_PAYMENT_DETAILS },
    handler.GET_SUBSCRIPTION_PAYMENT_DETAILS
  );
};

export default marketPlace;
