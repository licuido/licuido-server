import { FastifyReply, FastifyRequest } from "fastify";

import {
  Logger,
  handleResponse,
  responseType,
  successCustomMessage,
} from "@helpers";

import { postRequestInfo } from "@mappers";
import { UserDeviceToken } from "@interactors";

// Create User Device Token
export async function CREATE_USER_DEVICE_TOKEN(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* ----------- Mapper ----------- */
    const { user_profile_id, user_device_token } = postRequestInfo(request);

    /* ----------- Interactor ----------- */
    const result = await UserDeviceToken.create({
      user_profile_id,
      user_device_token,
    });

    /* ----------- Response ----------- */
    return handleResponse(request, reply, responseType?.CREATED, {
      data: result,
      customMessage: successCustomMessage?.deviceTokenCreated,
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

// LOG OUT
export async function LOG_OUT(request: FastifyRequest, reply: FastifyReply) {
  try {
    /* ----------- Mapper ----------- */
    const { id, user_profile_id } = postRequestInfo(request);

    /* ----------- Interactor ----------- */
    const result: any = await UserDeviceToken.update({
      device_token_id: id,
      user_profile_id,
    });

    /* ----------- Response ----------- */
    return handleResponse(request, reply, responseType?.CREATED, {
      customMessage: result ? successCustomMessage?.logout : "",
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
