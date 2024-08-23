import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { queryRequestInfo } from "@mappers";
import { TokenOrders } from "@interactors";
import { preparePagination } from "serializers/getResponse";

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

// Get Current Investment Tokens for Investor Portfolio
export async function GET_CURRENT_TOKEN_INVESTMENT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, offset, limit, url } =
      queryRequestInfo(request);

    if (entity_id !== 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Investor can get current token listing",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getCurrentTokenListing({
      user_entity_id,
      offset,
      limit,
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

// Get Dashboard

export async function GET_DASHBOARD(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, currency }: any =
      queryRequestInfo(request);

    if (entity_id !== 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Investor can be get portfolio dashboard",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getInvestorDashboard({
      user_entity_id,
      currency,
    });

    /* -----------  RESPONSE ----------- */

    return handleResponse(request, reply, responseType?.OK, {
      data: { ...result },
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

// GET_LAST_PERFORMANCE

export async function GET_LAST_PERFORMANCE(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    if (entity_id !== 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message:
            "Only Investor can be get portfolio last 3 months performance",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getInvestorlast3MonthsPerformance({
      user_entity_id,
      ...rest,
    });

    /* -----------  RESPONSE ----------- */

    return handleResponse(request, reply, responseType?.OK, {
      data: { ...result },
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
