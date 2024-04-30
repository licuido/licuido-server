import { token_offering } from "@models";
import { createTokenOffering } from "@types";

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
