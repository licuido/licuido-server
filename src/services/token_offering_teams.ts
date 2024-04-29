import { token_offering_team } from "@models";
import { createTokenOfferingTeams } from "@types";

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
    options: createTokenOfferingTeams;
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
}

export { TokenOfferingsTeams };
