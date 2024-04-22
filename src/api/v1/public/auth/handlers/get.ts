/**
 * API handler for refreshing the access token in a user.
 *
 * @param {FastifyRequest} request - the request object
 * @param {FastifyReply} reply - the reply object
 * @return {Promise<void>} a promise that resolves when the sign in process is complete
 */

import { FastifyReply, FastifyRequest } from "fastify";

import { Logger, handleResponse, responseType } from "@helpers";
import { refreshToken, validateToken } from "interactors/auth";

// REFRESH TOKEN
export async function REFRESH_TOKEN(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const token = request.headers.authorization;
    const data = await refreshToken(token as string);

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

// Validate Token
export async function VALIDATE_TOKEN(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const token = request.headers.authorization;
    const data = await validateToken(token as string);

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
