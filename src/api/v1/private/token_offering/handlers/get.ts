import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenOfferings } from "interactors";
import { queryRequestInfo } from "@mappers";

export async function FIND_TOKEN(request: FastifyRequest, reply: FastifyReply) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const { entity_id, user_entity_id, user_profile_id, ...rest } =
      queryRequestInfo(request);

    console.log(user_entity_id, "user_entity_id");

    if (entity_id === 2) {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message: "Only Issuer and admin can be view token offering",
          },
        }
      );
    }

    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    const result = await TokenOfferings.findToken({
      user_entity_id: user_entity_id,
      ...rest,
    });
    // -----------------------------
    //  RESPONSE
    // -----------------------------
    if (result?.success) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.message,
        data: result,
      });
    } else {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message: result?.message,
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
