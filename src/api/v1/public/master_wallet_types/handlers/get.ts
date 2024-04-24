/**
 * API handler for refreshing the access token in a user.
 *
 * @param {FastifyRequest} request - the request object
 * @param {FastifyReply} reply - the reply object
 * @return {Promise<void>} a promise that resolves when the sign in process is complete
 */

import { FastifyReply, FastifyRequest } from "fastify";

import { Logger, handleResponse, responseType } from "@helpers";
import { queryRequestInfo } from "@mappers";
import { preparePagination } from "serializers/getResponse";
import { MasterWallet } from "@interactors";

//GET_ALL_WALLETMASTER
export async function GET_ALL_WALLETMASTER(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { entity_id, url, search, offset, limit, ...rest } =
      queryRequestInfo(request);
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const result = await MasterWallet.getAllWalletMasterList({
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
