import { Logger } from "@helpers";

/**
 * Represents the parameters extracted from a FastifyRequest object.
 */
interface RequestParameters {
  id: string;
  offset: number;
  limit: number;
  search?: string;
  entity_id: number; // Remove duplicate declaration here
  url: string;
  user_profile_id?: string;
  from?: string;
  to?: string;
  amount?: string;
  user_entity_id?: string;
  start_date?: string;
  end_date?: string;
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
      query: {
        id,
        offset = 0,
        limit = 10,
        search,
        entity_id,
        start_date,
        end_date,
        ...rest
      },
      url,
      user_profile_id,
      user_entity_id,
    } = request as {
      query: {
        id: string;
        offset: string;
        limit: string;
        search: string;
        entity_id: number; // Include entity_id only once here
        rest: { [key: string]: string | number };
        start_date?: string;
        end_date?: string;
      };
      url: string;
      user_profile_id?: string;
      user_entity_id?: string;
      start_date?: string;
      end_date?: string;
    };

    return {
      id,
      offset: Number(offset),
      limit: Number(limit),
      search,
      url,
      user_profile_id,
      user_entity_id,
      start_date,
      end_date,
      entity_id: request?.entity_id, // Ensure entity_id is of type number
      ...rest,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw new Error("Failed to extract request parameters.");
  }
}

export { queryRequestInfo };
