import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { postRequestInfo } from "@mappers";
import { TokenOfferings } from "@interactors";

export async function UPDATE_TOKEN_STATUS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const { entity_id, user_profile_id, ...rest } = postRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message:
              "Only Issuer and admin can be update token offering status",
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
      customMessage: "Token Status Updated",
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
export async function UPDATE_TOKEN_OFFERINGS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_profile_id, ...rest } = postRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer and admin can be update token offering data",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOfferings.updateTokenOfferings({
      ...rest,
      user_profile_id,
    });

    /* -----------  RESPONSE ----------- */
    if (result && result?.code === 200) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.customMessage,
      });
    } else if (result && result?.code === 409) {
      return handleResponse(request, reply, responseType?.CONFLICT, {
        customMessage: result?.customMessage,
      });
    } else {
      return handleResponse(request, reply, responseType?.ACCEPTED, {
        customMessage: "Token offering update is in progress.",
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
export async function UPDATE_TOKEN_VALUATION(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_profile_id, ...rest } = postRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer and admin can be update token offering data",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await TokenOfferings.updateTokenValuation({
      ...rest,
      user_profile_id,
    });

    /* -----------  RESPONSE ----------- */
    
    return handleResponse(request, reply, responseType?.CREATED, {
      customMessage: result?.message,
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
export async function UPDATE_TOKEN_OFFERING_STATUS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const { entity_id, user_profile_id, ...rest } = postRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message:
              "Only Issuer and admin can be update token offering status",
          },
        }
      );
    }
    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    await TokenOfferings.updateTokenOfferingStatus({
      ...rest,
      user_profile_id,
    });
    // -----------------------------
    //  RESPONSE
    // -----------------------------

    return handleResponse(request, reply, responseType?.CREATED, {
      customMessage: "Token Offering Status Updated",
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