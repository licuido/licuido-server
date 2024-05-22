import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenTransaction } from "interactors";
import { postRequestInfo } from "@mappers";

export async function MINT_TOKEN(request: FastifyRequest, reply: FastifyReply) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const { entity_id, user_entity_id, user_profile_id, ...rest } =
      postRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message: "Only Issuer and admin can be create token offering",
          },
        }
      );
    }
    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    const result = await TokenTransaction.mintToken({
      ...rest,
      user_entity_id,
      user_profile_id,
    });
    // -----------------------------
    //  RESPONSE
    // -----------------------------

    if (result?.success) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.message,
        data: result?.data,
      });
    } else {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message: result?.message,
            data: result?.data,
          },
        }
      );
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
