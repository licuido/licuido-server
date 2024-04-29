import { token_offering_allowed_country } from "@models";
import { createTokenOfferingCountries } from "@types";

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
}

export { TokenOfferingsAllowedCountries };
