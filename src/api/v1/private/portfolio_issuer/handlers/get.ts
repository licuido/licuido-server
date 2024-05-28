import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { queryRequestInfo } from "@mappers";
import { TokenOrders } from "@interactors";
import { preparePagination } from "serializers/getResponse";

// Get Orders Graph for Issuer Portfolio
export async function GET_ORDERS_GRAPH(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, offset, limit, url, ...rest } =
      queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get token order graph",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getOrderGraph({
      user_entity_id,
      offset,
      limit,
      ...rest,
    });

    /* -----------  SERIALIZER  ----------- */
    const data = preparePagination({
      result,
      url,
      offset,
      limit,
      entity_id,
    });

    /* -----------  RESPONSE ----------- */

    return handleResponse(request, reply, responseType?.OK, {
      data,
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

// Get Tokens By Investors Graph for Issuer Portfolio
export async function GET_TOKEN_BY_INVESTOR_GRAPH(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get token by investor order graph",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getTokensByInvestorGraph({
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
