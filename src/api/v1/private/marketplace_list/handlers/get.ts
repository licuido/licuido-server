import { Logger, handleResponse, responseType } from "@helpers";
import { MarketPlaceList } from "@interactors";
import { queryRequestInfo } from "@mappers";
import { FastifyReply, FastifyRequest } from "fastify";
import { preparePagination } from "serializers/getResponse";

export async function GET_MARKETPLACE_LISTING(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { entity_id, url, search, offset, limit, ...rest } =
      queryRequestInfo(request);
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const result = await MarketPlaceList.getAllMarketPlaceList({
      search,
      offset,
      limit,
      ...rest,
    });

    // -----------------------------
    //  SERIALIZER
    // -----------------------------

    const data = preparePagination({
      result,
      url,
      offset,
      limit,
      entity_id,
    });

    // -----------------------------
    //  RESPONSE
    // -----------------------------
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
