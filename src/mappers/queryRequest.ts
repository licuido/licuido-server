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
  user_entity_id?: string;
  from_date?: string;
  to_date?: string;
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
        from_date,
        to_date,
        entity_id,
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
        from_date?: string;
        to_date?: string;
        rest: { [key: string]: string | number };
      };
      url: string;
      user_profile_id?: string;
      user_entity_id?: string;
    };

    return {
      id,
      offset: Number(offset),
      limit: Number(limit),
      search,
      from_date,
      to_date,
      url,
      user_profile_id,
      user_entity_id,
      entity_id: request?.entity_id, // Ensure entity_id is of type number
      ...rest,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw new Error("Failed to extract request parameters.");
  }
}

export { queryRequestInfo };
