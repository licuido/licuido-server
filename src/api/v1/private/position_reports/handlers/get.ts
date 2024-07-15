import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { PositionReports } from "@interactors";
import { queryRequestInfo } from "@mappers";
import { preparePagination } from "serializers/getResponse";
import { makeExcelFile } from "@utils";

/* GET_ALL_POSITION_REPORTS */
export async function GET_ALL_POSITION_REPORTS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, url, search, offset, limit, ...rest } =
      queryRequestInfo(request);

    if (entity_id !== 3) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get position reports",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await PositionReports.getAllPositionReports({
      offset,
      limit,
      search,
      ...rest,
      id: user_entity_id ?? "",
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

/* GET_ALL_INVESTORS */
export async function GET_ALL_INVESTORS(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, url, offset, limit, ...rest } =
      queryRequestInfo(request);

    if (entity_id !== 3) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get position reports investors",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await PositionReports.getAllInvestors({
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

/* EXPORT_INVESTORS_AS_CSV */
export async function EXPORT_INVESTORS_AS_CSV(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { entity_id, user_entity_id, url, ...rest } =
      queryRequestInfo(request);

    if (entity_id !== 3) {
      return handleResponse(request, reply, responseType?.FORBIDDEN, {
        error: {
          message: "Only Issuer can be get position reports investors",
        },
      });
    }

    /* -----------  INTERACTOR ----------- */
    const result = await PositionReports.getAllInvestorsAsCSV({
      user_entity_id,
      ...rest,
    });

    if (result?.code === 200) {
      /* Make Excel File */
      const data = await makeExcelFile(
        result?.data,
        "position_report_investors"
      );

      /* -----------  Response  ----------- */
      return handleResponse(request, reply, responseType?.OK, {
        data,
      });
    } else if (result?.code === 204) {
      /* -----------  Response  ----------- */
      return handleResponse(request, reply, responseType?.NO_CONTENT, {
        customMessage: result?.message,
      });
    } else {
      return handleResponse(request, reply, responseType?.ACCEPTED, {
        customMessage: "in progress.",
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
