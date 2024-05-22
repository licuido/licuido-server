import { FastifyPluginAsync } from "fastify";

import handler from "./handlers";
import schema from "./schema";

const orderRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("preHandler", fastify.authenticate);

  /* Get Subscription Order & Redemption Order Details */

  fastify
    .get(
      "/subscription/get",
      { schema: schema.GET_ALL_SUBSCRIPTION_ORDER },
      handler.GET_ALL_SUBSCRIPTION_ORDER
    )
    .get(
      "/redemption/get",
      { schema: schema.GET_ALL_REDEMPTION_ORDER },
      handler.GET_ALL_REDEMPTION_ORDER
    )
    .get(
      "/subscription/export/file",
      { schema: schema.EXPORT_SUBSCRIPTION_ORDER_AS_CSV },
      handler.EXPORT_SUBSCRIPTION_ORDER_AS_CSV
    )
    .get(
      "/redemption/export/file",
      { schema: schema.EXPORT_REDEMPTION_ORDER_AS_CSV },
      handler.EXPORT_REDEMPTION_ORDER_AS_CSV
    )
    .get(
      "/details/get",
      { schema: schema.VIEW_ORDER_DETAILS },
      handler.VIEW_ORDER_DETAILS
    );

  fastify
    .put("/cancel", { schema: schema.CANCEL_ORDER }, handler.CANCEL_ORDER)
    .put(
      "/payment/confirm",
      { schema: schema.CONFRIM_PAYMENT },
      handler.CONFRIM_PAYMENT
    )
    .put(
      "/payment/send",
      { schema: schema.SEND_PAYMENT },
      handler.SEND_PAYMENT
    );
};

export default orderRoute;