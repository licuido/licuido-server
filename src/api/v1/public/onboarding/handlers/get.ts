import { FastifyReply, FastifyRequest } from "fastify";

import { Logger, handleResponse, responseType } from "@helpers";
import { queryRequestInfo } from "@mappers";
import {Entity } from "@interactors";

export async function FIND_ONE(request: FastifyRequest, reply: FastifyReply) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const {...rest} = queryRequestInfo(request);

    const {user_profile_id}:any=rest;
    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    const result = await Entity.findEntity(user_profile_id);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.OK, {
      data:result,
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

