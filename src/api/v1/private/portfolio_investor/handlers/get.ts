import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { queryRequestInfo } from "@mappers";
import { TokenOrders } from "@interactors";

// Get Tokens Holdings Graph for Investor Portfolio
export async function GET_TOKEN_HOLDINGS_GRAPH(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    if (entity_id !== 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Investor can be get token holdings graph",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getTokensHoldingsGraph({
      user_entity_id,
      ...rest,
    });

    /* -----------  RESPONSE ----------- */

    return handleResponse(request, reply, responseType?.OK, {
      data: result,
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
