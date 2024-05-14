import { Logger, handleResponse, responseType } from "@helpers";
import { MarketPlaceList } from "@interactors";
import { queryRequestInfo } from "@mappers";
import { Entities } from "@services";
import { FastifyReply, FastifyRequest } from "fastify";
import { preparePagination } from "serializers/getResponse";

export async function GET_MARKETPLACE_LISTING(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { entity_id, url, search, offset, limit,user_entity_id, ...rest } =
      queryRequestInfo(request);
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    let countryId = await Entities.findEntityForCountry(user_entity_id);
    countryId = JSON.stringify(countryId);
    countryId = JSON.parse(countryId)?.country_id;

    const result = await MarketPlaceList.getAllMarketPlaceList({
      search,
      offset,
      limit,
      user_entity_id,
      countryId,
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
