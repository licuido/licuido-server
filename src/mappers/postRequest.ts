import { Logger, processNestedObjects } from "@helpers";

/**
 * Extracts relevant parameters from a FastifyRequest object.
 *
 * @param {FastifyRequest} request - The FastifyRequest object containing body parameters and URL.
 * @returns An object containing extracted parameters.
 * @throws {Error} Throws an error if there's an issue extracting parameters.
 */
function postRequestInfo<T>(request: any) {
  try {
    const body = request.body as any;

    processNestedObjects(body);

    return {
      entity_id: request?.entity_id,
      user_entity_id: request?.user_entity_id,
      user_profile_id: request?.user_profile_id,
      ...body,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw new Error("Failed to extract request parameters.");
  }
}

export { postRequestInfo };
