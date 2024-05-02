import { token_offering_team } from "@models";
import { createTokenOfferingTeams, updateTokenOfferingTeams } from "@types";
import { Op } from "sequelize";

class TokenOfferingsTeams {
  /**
   * this function used for create token offering documents
   *
   * @param {createTokenOfferingTeams} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: createTokenOfferingTeams[]): Promise<any> {
    try {
      return await token_offering_team.bulkCreate(options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update token offering  offering documents
   *
   * @param {createTokenOfferingTeams} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async update({
    options,
    id,
  }: {
    options: updateTokenOfferingTeams;
    id: string;
  }): Promise<any> {
    try {
      return await token_offering_team.update(
        {
          ...options,
        },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update Deleted Status Of Existing Token Offering Team Members
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async updateDeletedStatus({
    removed_team_members,
    updated_by,
  }: {
    removed_team_members: string[];
    updated_by: string;
  }): Promise<any> {
    try {
      // Update The Status As Deleted [Soft Delete - is_active: false]
      return await token_offering_team.update(
        {
          is_active: false,
          updated_by: updated_by,
        },
        {
          where: {
            id: {
              [Op.in]: removed_team_members,
            },
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

export { TokenOfferingsTeams };
