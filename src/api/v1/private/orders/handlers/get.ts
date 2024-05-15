import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenOrders } from "@interactors";
import { queryRequestInfo } from "@mappers";
import { preparePagination } from "serializers/getResponse";

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
