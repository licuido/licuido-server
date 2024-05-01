import { token_offering } from "@models";
import { createTokenOffering, updateTokenOffering } from "@types";
import { Op } from "sequelize";

class TokenOfferings {
  /**
   * this function used for create token offering
   *
   * @param {createTokenOffering} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: createTokenOffering): Promise<any> {
    try {
      return await token_offering.create(options, {
        raw: false,
        returning: true,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update token offering
   *
   * @param {updateTokenOffering} options - The response object containing update data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async update(
    options: updateTokenOffering,
    token_id: string
  ): Promise<any> {
    try {
      // Update Token Offering Meta Data
      return await token_offering.update(options, {
        where: {
          id: token_id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for to get count of given token name
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async count({ id, name }: { id: string; name: string }): Promise<any> {
    try {
      // Get Count Of Given Token Offering Name
      const whereClause: any = {
        name: name,
        is_active: true,
      };

      if (id) {
        whereClause["id"] = {
          [Op.ne]: id,
        };
      }

      // To Get Token Name Count Data With this given Token Name
      return await token_offering.count({
        where: whereClause,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update token status
   *
   * @param {createTokenOffering} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async updateTokenStatus({
    status_id,
    token_id,
    updated_by,
  }: {
    status_id: number;
    token_id: string;
    updated_by: string;
  }): Promise<any> {
    try {
      return await token_offering.update(
        {
          status_id,
          updated_by,
        },
        {
          where: {
            id: token_id,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

export { TokenOfferings };
