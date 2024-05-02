import { token_offering_allowed_currency } from "@models";
import { createTokenOfferingCurrencies } from "@types";
import { Op } from "sequelize";

class TokenOfferingsAllowedCurrecies {
  /**
   * this function used for create token offering allowed Currencies
   *
   * @param {createTokenOfferingCurrencies} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: createTokenOfferingCurrencies[]): Promise<any> {
    try {
      return await token_offering_allowed_currency.bulkCreate(options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update token offering  allowed Currencies
   *
   * @param {createTokenOfferingCurrencies} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async update({
    options,
    id,
  }: {
    options: createTokenOfferingCurrencies;
    id: string;
  }): Promise<any> {
    try {
      return await token_offering_allowed_currency.update(
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
   * this function used for update Deleted Status Of Existing Token Offering Allowed Currencies
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async updateDeletedStatus({
    removed_currencies,
    updated_by,
  }: {
    removed_currencies: string[];
    updated_by: string;
  }): Promise<any> {
    try {
      // Update The Status As Deleted [Soft Delete - is_active: false]
      return await token_offering_allowed_currency.update(
        {
          is_active: false,
          updated_by: updated_by,
        },
        {
          where: {
            id: {
              [Op.in]: removed_currencies,
            },
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

export { TokenOfferingsAllowedCurrecies };
