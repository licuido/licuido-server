import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { Entity } from "interactors";
import { postRequestInfo } from "@mappers";

export async function CREATE_BUSSINESS_DETAILS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const { entity_id, ...rest } = postRequestInfo(request);
    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    const result = await Entity.createBussinessDetails({
      entity_type_id: entity_id,
      ...rest,
    });
    // -----------------------------
    //  RESPONSE
    // -----------------------------

    if (result?.success) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.message,
        data:result?.data
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
