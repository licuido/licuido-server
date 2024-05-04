import { Logger, handleResponse, responseType } from "@helpers";
import { buildCodes } from "helpers/constants";

export const checkUserBuild = (request: any, response: any, next: any) => {
  if (!request?.headers?.build) {
    Logger.error(request, "Please Provide Build", false, "APP");
    return handleResponse(request, response, responseType.FORBIDDEN, {
      customMessage: "Please Provide Build",
    });
  }

  request.entity_id = buildCodes[request?.headers?.build];

  return next();
};
