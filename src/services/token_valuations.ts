import { token_valuation, token_offering } from "@models";
import queries from "@queries";
import { createTokenValuation } from "@types";
import { sequelize } from "@utils";

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
        offer_price,
        bid_price,
        start_date,
        start_time,
        valuation_price,
        created_by,
        valuation_price_in_euro,
      } = options;

      await token_valuation.create({
        token_offering_id: token_id,
        created_by,
        offer_price,
        bid_price,
        start_date,
        start_time,
        valuation_price,
        is_active: true,
        created_at: new Date(),
        valuation_price_in_euro,
      });

      token_offering.update(
        {
          offering_price: offer_price,
          valuation_price,
          updated_by: created_by,
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

  static async getTokenValuationGraph({
    user_entity_id,
    from_date,
    to_date,
    token_offering_id,
  }: {
    user_entity_id?: string;
    from_date?: string;
    to_date?: string;
    token_offering_id?: string;
  }): Promise<any> {
    try {
      // get Token Valuaion Graph Query
      const [result]: any[] = await sequelize.query(
        queries.getTokenValuationGraphQuery(
          from_date,
          to_date,
          token_offering_id
        )
      );

      // Get Today Valuation price
      const [today_valuation_price]: any[] = await sequelize.query(
        queries.getTodayTokenValuationPriceQuery(token_offering_id)
      );

      return {
        valuation_data: result ?? [],
        max_valuation_price: result?.[0]?.max_valuation_price ?? 0,
        today_valuation_price: today_valuation_price?.[0]?.valuation_price ?? 0,
        issuer_entity_id: user_entity_id,
      };
    } catch (error) {
      throw error;
    }
  }
}

export { TokenValuations };
