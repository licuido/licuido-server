import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenOrders, UserEntities } from "@interactors";
import { queryRequestInfo } from "@mappers";
import { preparePagination } from "serializers/getResponse";
import { makeExcelFile } from "@utils";

/* GET_ALL_INVESTORS */
export async function GET_ALL_INVESTORS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, url, search, offset, limit, ...rest } =
      queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer & Admin can be get investor list",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await UserEntities.getInvestorsList({
      entity_type_id: entity_id,
      user_entity_id,
      offset,
      limit,
      search,
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

    /* -----------  Response  ----------- */
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

/* EXPORT_INVESTORS_LIST_AS_CSV */
export async function EXPORT_INVESTORS_LIST_AS_CSV(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer & Admin can be get investor list as csv",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */

    const result = await UserEntities.getInvestorsListAsCSV({
      entity_type_id: entity_id,
      user_entity_id,
      ...rest,
    });

    if (result?.code === 200) {
      /* Make Excel File */
      const data = await makeExcelFile(result?.data, "subscription_order_data");

      /* -----------  Response  ----------- */
      return handleResponse(request, reply, responseType?.OK, {
        data,
      });
    } else if (result?.code === 204) {
      /* -----------  Response  ----------- */
      return handleResponse(request, reply, responseType?.NO_CONTENT, {
        customMessage: result?.message,
      });
    } else {
      return handleResponse(request, reply, responseType?.ACCEPTED, {
        customMessage: "in progress.",
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

/* EXPORT_REDEMPTION_ORDER_AS_CSV */

export async function EXPORT_REDEMPTION_ORDER_AS_CSV(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getTokenRedemptionOrderAsCSV({
      entity_type_id: entity_id,
      user_entity_id,
      ...rest,
    });

    if (result?.code === 200) {
      /* Make Excel File */
      const data = await makeExcelFile(result?.data, "redemption_order_data");

      /* -----------  Response  ----------- */
      return handleResponse(request, reply, responseType?.OK, {
        data,
      });
    } else if (result?.code === 204) {
      /* -----------  Response  ----------- */
      return handleResponse(request, reply, responseType?.NO_CONTENT, {
        customMessage: result?.message,
      });
    } else {
      return handleResponse(request, reply, responseType?.ACCEPTED, {
        customMessage: "in progress.",
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

/* VIEW_ORDER_DETAILS */
export async function VIEW_ORDER_DETAILS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { ...rest } = queryRequestInfo(request);

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.viewOrderDetails({
      ...rest,
    });

    /* -----------  Response  ----------- */
    return handleResponse(request, reply, responseType?.OK, {
      data: result?.resData,
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
