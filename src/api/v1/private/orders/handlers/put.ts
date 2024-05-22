import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenOrders } from "@interactors";
import { postRequestInfo } from "@mappers";

/* CANCEL_ORDER */
export async function CANCEL_ORDER(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, user_profile_id, ...rest } =
      postRequestInfo(request);

    if (entity_id !== 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only investor can cancel the token order",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.cancelOrder({
      user_profile_id,
      user_entity_id,
      ...rest,
    });

    /* -----------  Response  ----------- */
    return handleResponse(request, reply, responseType?.OK, {
      customMessage: result?.message,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

/* CONFRIM_PAYMENT */
export async function CONFRIM_PAYMENT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, user_profile_id, ...rest } =
      postRequestInfo(request);

    if (entity_id !== 3) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only issuer can confirm the received payment",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.confirmPayment({
      user_profile_id,
      user_entity_id,
      ...rest,
    });

    /* -----------  Response  ----------- */
    return handleResponse(request, reply, responseType?.OK, {
      customMessage: result?.message,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

/* SEND_PAYMENT */
export async function SEND_PAYMENT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, user_profile_id, ...rest } =
      postRequestInfo(request);

    if (entity_id !== 3) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only issuer can send the payment",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.sendPayment({
      user_profile_id,
      user_entity_id,
      ...rest,
    });

    /* -----------  Response  ----------- */
    return handleResponse(request, reply, responseType?.OK, {
      customMessage: result?.message,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
