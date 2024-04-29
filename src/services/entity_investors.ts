import { entity_investor } from "@models";

class UserIdentities {
  /**
   * this function used for create new entity investor against issuer
   *
   * @param {createEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async create(options: {
    investor_type_id: number;
    investor_entity_id: string;
  }): Promise<any> {
    try {
      const { investor_type_id, investor_entity_id } = options;
      return await entity_investor.create({
        investor_type_id,
        investor_entity_id,
      });
    } catch (error) {
      throw error;
    }
  }
}

export { UserIdentities };
