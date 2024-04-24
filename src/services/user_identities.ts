import { user_identity } from "@models";
import { createUserIndentity } from "@types";
import { Op } from "sequelize";

class UserIdentities {
  /**
   * this function used for delete Identity
   *
   * @param {createEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async deleteIdentity(ids: string[]): Promise<any> {
    try {
      return await user_identity.update(
        {
          is_active: false,
        },
        {
          where: {
            id: {
              [Op.in]: ids,
            },
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for create Identity
   *
   * @param {createEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async createBulkIdentity(
    options: createUserIndentity[]
  ): Promise<any> {
    try {
      return await user_identity.bulkCreate(options);
    } catch (error) {
      throw error;
    }
  }
}

export { UserIdentities };
