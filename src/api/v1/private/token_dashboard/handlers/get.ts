import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { queryRequestInfo } from "@mappers";
import { TokenOfferings, TokenOrders } from "@interactors";

// Get Token Valuaion Graph for Token Dashboard
export async function GET_VALUATION_GRAPH(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOfferings.getValuationGraph({
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

// Get Orders Graph For Token DashBoard
export async function GET_ORDERS_GRAPH(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    if (entity_id !== 3) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get token orders graph",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getTokenOrdersGraph({
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

// Get Summary & Recent Actvities
export async function GET_SUMMARY_RECENT_ACTIVITIES(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    if (entity_id !== 3) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get Token dashboard",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getTokenSummaryRecentActivities({
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

// Get Investor Distribution
export async function GET_INVESTOR_DISTRIBUTION(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    if (entity_id !== 3) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get Investor Distribution of token",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getInvestorDistribution({
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
