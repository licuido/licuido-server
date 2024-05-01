import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import {
  Entity,
  UserProfile,
  BusinessDocuments,
  Ekyc,
  CustomersWallet,
} from "interactors";
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
        data: result?.data,
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

export async function CREATE_CONTACT_PERSON(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const { ...rest } = postRequestInfo(request);
    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    const result = await UserProfile.createPersonInfoDetails({
      ...rest,
    });
    // -----------------------------
    //  RESPONSE
    // -----------------------------

    if (result?.success) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.message,
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

export async function CREATE_BUSINESS_DOCUMENT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const { ...rest } = postRequestInfo(request);
    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    const result = await BusinessDocuments.createBussinessDocuments({
      ...rest,
    });
    // -----------------------------
    //  RESPONSE
    // -----------------------------

    if (result?.success) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.message,
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

export async function CREATE_EKYC(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const { ...rest } = postRequestInfo(request);
    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    const result = await Ekyc.createKyc({
      ...rest,
    });
    // -----------------------------
    //  RESPONSE
    // -----------------------------

    if (result?.success) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.message,
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

export async function CREATE_CUSTOMER_WALLET(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const { ...rest } = postRequestInfo(request);
    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    const result = await CustomersWallet.createCustomersWallet({
      ...rest,
    });
    // -----------------------------
    //  RESPONSE
    // -----------------------------

    if (result?.success) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.message,
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

export async function SET_ACCOUNT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  MAPPER
    // -----------------------------
    const { profile_id, is_fund_offered_by_licuido } = postRequestInfo(request);
    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    const result = await UserProfile.setupUserAccount(
      profile_id,
      is_fund_offered_by_licuido
    );
    // -----------------------------
    //  RESPONSE
    // -----------------------------

    if (result?.success) {
      return handleResponse(request, reply, responseType?.CREATED, {
        customMessage: result?.message,
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
