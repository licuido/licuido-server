import { token_valuation, token_offering } from "@models";
import { createTokenValuation } from "@types";

class TokenValuations {
  /**
   * this function used for create token order/invest
   *
   * @param {createTokenOrders} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async updateTokenVaulation({
    token_id,
    id,
    offer_price,
    valuation_price,
  }: {
    token_id: string;
    id: string;
    offer_price: number;
    valuation_price: number;
  }): Promise<any> {
    try {
      token_valuation.update(
        {
          is_active: true,
        },
        {
          where: {
            id,
          },
        }
      );

      token_offering.update(
        {
          offering_price: offer_price,
          valuation_price,
        },
        {
          where: {
            id: token_id,
          },
        }
      );

      return true;
    } catch (error) {
      throw error;
    }
  }

  static async create(options: createTokenValuation): Promise<any> {
    try {
      const {
        token_id,
        created_by,
        offer_price,
        bid_price,
        start_date,
        start_time,
        valuation_price,
      } = options;

      token_valuation
        .create({
          token_offering_id: token_id,
          created_by,
          offer_price,
          bid_price,
          start_date,
          start_time,
          valuation_price,
          is_active: true,
          created_at: new Date(),
        })
        .then((res) => {
          return true;
        })
        .catch(() => {
          return false;
        });

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export { TokenValuations };
