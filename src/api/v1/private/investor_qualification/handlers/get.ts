import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, dateTime, handleResponse, responseType } from "@helpers";
import { queryRequestInfo } from "@mappers";
import { UserEntities } from "@interactors";
import { preparePagination } from "serializers/getResponse";
import { makeExcelFile } from "@utils";

// Get Investor Count for Qualification
export async function GET_INVESTOR_COUNT_FOR_QUALIFY(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id } = queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get investor count for qualification",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await UserEntities.getInvestorCountForQualification({
      entity_type_id: 2, // Investor
    });

    /* -----------  RESPONSE ----------- */

    return handleResponse(request, reply, responseType?.OK, {
      data: { count: result },
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

// Get Investor Data for Qualification
export async function GET_INVESTOR_DATA_FOR_QUALIFY(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_profile_id, url, search, offset, limit, ...rest } =
      queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "No Access for Investor",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await UserEntities.getInvestorDataForQualification({
      search,
      offset,
      limit,
      entity_type_id: 2, // Investor
      user_profile_id,
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

// Get Investor Data For Qualification & Export it As CSV
export async function EXPORT_INVESTOR_DATA_AS_CSV_FILE(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_profile_id } = queryRequestInfo(request);

    if (entity_id === 2) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "No Access for Investor",
        },
      });
    }
    /* -----------  INTERACTOR ----------- */
    const result = await UserEntities.getInvestorDataAsCSV({
      entity_type_id: 2, // Investor
      user_profile_id,
    });

    /* -----------  SERIALIZER ----------- */
    const excelData =
      result?.length > 0 &&
      result.map((item: any) => ({
        "Company name": item?.company_name ?? "",
        Status: item?.investor_status_name ?? "",
        "Email id": item?.email_id ?? "",
        KYC: item?.ekyc_status_name ?? "",
        "Investor Type": item?.investor_type_name ?? "",
        Country: item?.country_name ?? "",
        "Current Section": "",
        Wallet: item?.wallet_address ?? "",
        "Wallet Provider": item?.wallet_type_name ?? "",
        "Creation Date": item?.creation_date
          ? dateTime.formatDate(item?.creation_date)
          : "",
      }));

    /* Make Excel File */
    const data = await makeExcelFile(
      excelData,
      `investor_qualify_data_${new Date()
        .toISOString()
        .replace(/[-T:]/g, "")
        .slice(0, 14)}`
    );

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
