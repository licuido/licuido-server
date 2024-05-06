import { offer_fund_rating } from "@models";
import { FundRatingPayload } from "@types";

class TokenOfferFund {
  /**
   * this function used for create token offering fund rating
   *
   * @param {createTokenOfferingCurrencies} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: FundRatingPayload[]): Promise<any> {
    try {
      return await offer_fund_rating.bulkCreate(options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update Offer Rating
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async update({
    options,
    id,
  }: {
    options: FundRatingPayload;
    id?: string;
  }): Promise<any> {
    try {
      return await offer_fund_rating.update(
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

export { TokenOfferFund };
