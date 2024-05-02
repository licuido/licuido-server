import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenOfferings } from "interactors";
import { postRequestInfo } from "@mappers";


export async function UPDATE_TOKEN_STATUS(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      // -----------------------------
      //  MAPPER
      // -----------------------------
      const { entity_id, user_profile_id, ...rest } =
        postRequestInfo(request);
  
      if (entity_id === 2) {
        return handleResponse(
          request,
          reply,
          responseType?.INTERNAL_SERVER_ERROR,
          {
            error: {
              message: "Only Issuer and admin can be update token offering status",
            },
          }
        );
      }
      // -----------------------------
      //  INTERACTOR
      // -----------------------------
      const result = await TokenOfferings.updateTokenStatus({
        ...rest,
        user_profile_id,
      });
      // -----------------------------
      //  RESPONSE
      // -----------------------------
  
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: "Token Offering Status Updated",
        data: result?.data,
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