import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { queryRequestInfo, postRequestInfo } from "@mappers";
import { EntityInvestors, TokenOfferings, TokenOrders } from "@interactors";
import { preparePagination } from "serializers/getResponse";
import { makeExcelFile } from "@utils";

// Get Orders Graph for Issuer Portfolio
export async function GET_ORDERS_GRAPH(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, offset, limit, url, ...rest } =
      queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get token order graph",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getOrderGraph({
      user_entity_id,
      offset,
      limit,
      ...rest,
    });

    /* -----------  SERIALIZER  ----------- */
    const data = preparePagination({
      result,
      url,
      offset,
      limit,
      entity_id,
    });

    /* -----------  RESPONSE ----------- */

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

// Get Tokens By Investors Graph for Issuer Portfolio
export async function GET_TOKEN_BY_INVESTOR_GRAPH(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get token by investor order graph",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getTokensByInvestorGraph({
      user_entity_id,
      ...rest,
    });

    /* -----------  RESPONSE ----------- */

    return handleResponse(request, reply, responseType?.OK, {
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

// Get Dashboard
export async function GET_DASHBOARD(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id } = queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get portfolio dashboard",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOrders.getDashboard({
      user_entity_id,
    });

    /* -----------  RESPONSE ----------- */

    return handleResponse(request, reply, responseType?.OK, {
      data: { ...result },
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

// Get Fund Offerings
export async function GET_FUND_OFFERINGS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, offset, limit, url } =
      queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get fund offerings list",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await TokenOfferings.getAllFundOfferings({
      user_entity_id,
      offset,
      limit,
      request,
    });

    /* -----------  SERIALIZER  ----------- */
    const data = preparePagination({
      result,
      url,
      offset,
      limit,
      entity_id,
    });

    /* -----------  RESPONSE ----------- */

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

// export async function UPDATE_FUND_OFFERINGS(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   try {
//     /* -----------  MAPPER ----------- */
//     const { entity_id, user_profile_id, ...rest } = postRequestInfo(request);

//     if (entity_id === 2) {
//       return handleResponse(request, reply, responseType?.FORBIDDEN, {
//         error: {
//           message: "Only Issuer and admin can be update token offering data",
//         },
//       });
//     }

//     /* -----------  INTERACTOR ----------- */
//     const result = await TokenOfferings.updateTokenOfferings({
//       ...rest,
//       user_profile_id,
//     });

//     /* -----------  RESPONSE ----------- */
//     if (result && result?.code === 200) {
//       return handleResponse(request, reply, responseType?.CREATED, {
//         customMessage: result?.customMessage,
//       });
//     } else if (result && result?.code === 409) {
//       return handleResponse(request, reply, responseType?.CONFLICT, {
//         customMessage: result?.customMessage,
//       });
//     } else {
//       return handleResponse(request, reply, responseType?.ACCEPTED, {
//         customMessage: "Token offering update is in progress.",
//       });
//     }
//   } catch (error: any) {
//     Logger.error(request, error.message, error);
//     return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
//       error: {
//         message: responseType?.INTERNAL_SERVER_ERROR,
//       },
//     });
//   }
// }

// Get Investor List
export async function GET_INVESTOR_LIST(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, url, search, offset, limit, ...rest } =
      queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "No Access for Investor",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await EntityInvestors.getInvestorList({
      search,
      offset,
      limit,
      user_entity_id,
      ...rest,
    });

    /* -----------  SERIALIZER  ----------- */
    const data = preparePagination({
      result,
      url,
      offset,
      limit,
      entity_id,
    });

    /* -----------  Response  ----------- */
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

// Get Investor List as CSV
export async function GET_INVESTOR_LIST_AS_CSV(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, ...rest } = queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "No Access for Investor",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await EntityInvestors.getInvestorListAsCSV({
      user_entity_id,
      ...rest,
    });

    if (result?.length <= 0) {
      return handleResponse(request, reply, responseType?.NO_CONTENT, {
        customMessage: "No Data Found",
      });
    }

    const excelData =
      result?.length > 0 &&
      result.map((item: any) => ({
        Investor: item?.investor_name ?? "",
        "Wallet Id": item?.wallet_address ?? "",
        Status: item?.status_name ?? "",
        Investment: item?.investment ?? "",
        Tokens: item?.tokens ?? "",
        Country: item?.country_name ?? "",
        Sector: item?.sector ?? "",
      }));

    /* Make Excel File */
    const data = await makeExcelFile(excelData, "investors_list_portfolio");

    /* -----------  Response  ----------- */
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
