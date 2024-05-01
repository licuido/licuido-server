import { token_offering_allowed_country } from "@models";
import { createTokenOfferingCountries } from "@types";
import { Op } from "sequelize";

class TokenOfferingsAllowedCountries {
  /**
   * this function used for create token offering allowed counties
   *
   * @param {createTokenOfferingCountries} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: createTokenOfferingCountries[]): Promise<any> {
    try {
      return await token_offering_allowed_country.bulkCreate(options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update token offering  allowed counties
   *
   * @param {createTokenOfferingCountries} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async update({
    options,
    id,
  }: {
    options: createTokenOfferingCountries;
    id: string;
  }): Promise<any> {
    try {
      return await token_offering_allowed_country.update(
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
   * this function used for update Deleted Status Of Existing Token Offering Allowed Countries
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async updateDeletedStatus({
    removed_countries,
    updated_by,
  }: {
    removed_countries: string[];
    updated_by: string;
  }): Promise<any> {
    try {
      // Update The Status As Deleted [Soft Delete - is_active: false]
      return await token_offering_allowed_country.update(
        {
          is_active: false,
          updated_by: updated_by,
        },
        {
          where: {
            id: {
              [Op.in]: removed_countries,
            },
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

export { TokenOfferingsAllowedCountries };
