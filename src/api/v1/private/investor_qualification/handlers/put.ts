import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { postRequestInfo } from "@mappers";
import { EntityInvestors } from "@interactors";

export async function UPSERT_INVESTOR_STATUS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_profile_id, ...rest } = postRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer and admin can be update token offering status",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await EntityInvestors.UpsertInvestorQualifyStatus({
      user_profile_id,
      ...rest,
    });
    // -----------------------------
    //  RESPONSE
    // -----------------------------

    return handleResponse(request, reply, responseType?.CREATED, {
      customMessage: "Investor Qualfication Status Updated",
      data: result,
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
