import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { postRequestInfo } from "@mappers";
import { PledgeToken } from "@interactors";

// Get Investor Count for Qualification
export async function UPSERT_PLEDGE_REPO_HANDLER(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { edit_id, ...rest } = postRequestInfo(request);

    if (edit_id) {
      await PledgeToken.editPledge({
        edit_id,
        ...rest,
      });
    } else {
      await PledgeToken.createPledge({
        ...rest,
      });
    }
    return handleResponse(request, reply, responseType?.OK, {
      data: {},
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
