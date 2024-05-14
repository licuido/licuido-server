import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenOfferings } from "interactors";
import { postRequestInfo } from "@mappers";

export async function CREATE_TOKEN_OFFERINGS(
  request: FastifyRequest,
  reply: FastifyReply
) {
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
    const result = await TokenOfferings.createTokenOfferings({
      ...rest,
      user_entity_id,
      user_profile_id,
    });
    // -----------------------------
    //  RESPONSE
    // -----------------------------

    if (result && result?.code === 200) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.customMessage,
        data: result?.data,
      });
    } else if (result && result?.code === 409) {
      return handleResponse(request, reply, responseType?.BAD_GATEWAY, {
        error: {
          message: result?.customMessage,
        },
      });
    } else {
      return handleResponse(request, reply, responseType?.ACCEPTED, {
        customMessage: "Token offering Create is in progress.",
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
