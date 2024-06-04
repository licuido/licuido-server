import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenOrders } from "@interactors";
import { queryRequestInfo } from "@mappers";

export async function GET_SUBSCRIPTION_PAYMENT_DETAILS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    // if (entity_id === 3) {
    //   return handleResponse(request, reply, responseType?.FORBIDDEN, {
    //     error: {
    //       message: "Only Investor can get subscription payement details",
    //     },
    //   });
    // }

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getTokenOrder({
      user_entity_id,
      ...rest,
    });
    /* ----------- RESPONSE ----------- */
    if (result?.success) {
      return handleResponse(request, reply, responseType?.OK, {
        data: result?.resData,
        customMessage: result?.message,
      });
    } else {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message: result?.message,
          },
        }
      );
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
