import { entity } from "@models";
import { createEntity,findEntity } from "@types";


class Entities {
  /**
   * this function used for insert user entities.
   *
   * @param {createEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async upsert(options: createEntity): Promise<any> {
    try {
        return await entity.upsert(options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for entity already exisit or not for that user with that role
   *
   * @param {findEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async findEntityExisit(options: findEntity): Promise<{
    count: number;
  }> {
    try {
      const {
        entity_type_id,
        contact_profile_id,
      } = options;

      const count = await entity.count({
       where:{
        entity_type_id,
        contact_profile_id
       }
      });

      return {count};
    } catch (error) {
      throw error;
    }
  }

}

export { Entities };
