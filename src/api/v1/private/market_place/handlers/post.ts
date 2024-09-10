import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenOrders } from "@interactors";
import { postRequestInfo } from "@mappers";

export async function CREATE_SUBSCRIPTION_ORDER(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, user_profile_id, ...rest } =
      postRequestInfo(request);

    if (entity_id === 3) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only investor can be create subscription order",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.createTokenSubscriptionOrders({
      ...rest,
      user_entity_id,
      user_profile_id,
    });

    /* -----------  RESPONSE ----------- */
    if (result && result?.code === 200) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.customMessage,
        data: result?.data,
      });
    } else if (result && result?.code === 403) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        customMessage: result?.customMessage,
      });
    } else {
      return handleResponse(request, reply, responseType?.ACCEPTED, {
        customMessage: "Token Order Create Subscription is in progress.",
      });
    }
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

export async function CREATE_REDEMPTION_ORDER(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, user_profile_id, ...rest } =
      postRequestInfo(request);

    if (entity_id === 3) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only investor can be create redemption order",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.createTokenRedemptionOrders({
      ...rest,
      user_entity_id,
      user_profile_id,
    });

    /* -----------  RESPONSE ----------- */
    if (result && result?.code === 200) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.customMessage,
        data: result?.data,
      });
    } else if (result && result?.code === 403) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        customMessage: result?.customMessage,
      });
    } else {
      return handleResponse(request, reply, responseType?.ACCEPTED, {
        customMessage: "Token Order Create Redemption is in progress.",
      });
    }
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
