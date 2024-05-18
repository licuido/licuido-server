import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenOrders } from "@interactors";
import { queryRequestInfo } from "@mappers";
import { preparePagination } from "serializers/getResponse";
import { makeExcelFile } from "@utils";

/* GET_ALL_SUBSCRIPTION_ORDER */
export async function GET_ALL_SUBSCRIPTION_ORDER(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, url, search, offset, limit, ...rest } =
      queryRequestInfo(request);

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getTokenSubscriptionOrder({
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

/* GET_ALL_REDEMPTION_ORDER */
export async function GET_ALL_REDEMPTION_ORDER(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, url, search, offset, limit, ...rest } =
      queryRequestInfo(request);

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getTokenRedemptionOrder({
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

/* EXPORT_SUBSCRIPTION_ORDER_AS_CSV */
export async function EXPORT_SUBSCRIPTION_ORDER_AS_CSV(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    /* -----------  INTERACTOR ----------- */

    const result = await TokenOrders.getTokenSubscriptionOrderAsCSV({
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
