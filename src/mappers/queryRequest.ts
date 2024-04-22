import { Logger } from "@helpers";

/**
 * Represents the parameters extracted from a FastifyRequest object.
 */
interface RequestParameters {
  id: string;
  offset: number;
  limit: number;
  search?: string;
}

/**
 * Extracts relevant parameters from a FastifyRequest object.
 *
 * @param {FastifyRequest} request - The FastifyRequest object containing query parameters and URL.
 * @returns {RequestParameters} An object containing extracted parameters (offset, limit, search, and url).
 * @throws {Error} Throws an error if there's an issue extracting parameters.
 */
function queryRequestInfo(request: any): RequestParameters {
  try {
    const {
      query: { id, offset = 0, limit = 10, search, ...rest },
    } = request as {
      query: {
        id: string;
        offset: string;
        limit: string;
        search: string;
        rest: { [key: string]: string | number };
      };
    };

    return {
      id,
      offset: Number(offset),
      limit: Number(limit),
      search,
      ...rest,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw new Error("Failed to extract request parameters.");
  }
}

export { queryRequestInfo };
