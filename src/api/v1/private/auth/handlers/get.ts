import { FastifyReply, FastifyRequest } from "fastify";

import {
  Logger,
  handleResponse,
  responseType,
  successCustomMessage,
} from "@helpers";
import { queryRequestInfo } from "@mappers";
import { UserDeviceToken } from "@interactors";

// Get User Device Token
export async function GET_USER_DEVICE_TOKEN(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* ----------- Mapper ----------- */
    const { id } = queryRequestInfo(request);

    /* ----------- Interactor ----------- */
    const result = await UserDeviceToken.get({
      device_token_id: id,
    });

    /* ----------- Response ----------- */
    return handleResponse(request, reply, responseType?.OK, {
      data: result,
      customMessage: successCustomMessage?.getDeviceToken,
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
