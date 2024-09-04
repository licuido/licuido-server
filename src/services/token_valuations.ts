import { token_valuation, token_offering } from "@models";
import queries from "@queries";
import { createTokenValuation } from "@types";
import { sequelize } from "@utils";
import { TIME_VALUE } from "helpers/constants";
import moment from "moment";

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

      let date: string = from_date
        ? moment(from_date).subtract(1, "days").format("YYYY-MM-DD")
        : "";

      let time: string = from_date ? TIME_VALUE?.DEFAULT_END_TIME : "";

      // For Graph , Get before Valuation Price,, If Not Exists
      const [before_valuation_data]: any[] = await sequelize.query(
        queries.getBeforeValuationPriceQuery(token_offering_id, date, time)
      );

      let token_offering_data: any = await token_offering.findOne({
        attributes: ["start_date"],
        where: {
          id: token_offering_id,
        },
      });

      token_offering_data = JSON.parse(JSON.stringify(token_offering_data));

      let start_date = from_date
        ? moment(from_date).format("YYYY-MM-DD")
        : token_offering_data?.start_date;

      let start_offering_date = token_offering_data?.start_date;

      let end_date: string = moment().format("YYYY-MM-DD");

      // Max Valuation Price
      let maxValuationPrice = Math.max(
        result?.[0]?.max_valuation_price ?? 0,
        today_valuation_price?.[0]?.valuation_price ?? 0,
        before_valuation_data?.[0]?.valuation_price ?? 0
      ).toString();

      let final_start_date = "";

      if (start_offering_date) {
        final_start_date =
          new Date(start_offering_date) > new Date(start_date)
            ? start_offering_date
            : start_date;
      } else {
        final_start_date = start_date;
      }

      if (result && result.length > 0) {
        if (result?.[0]?.start_date !== start_date) {
          if (before_valuation_data && before_valuation_data?.length > 0) {
            if (result?.[0]?.start_date !== final_start_date) {
              result?.unshift({
                start_date: final_start_date,
                start_time: TIME_VALUE?.DEFAULT_START_TIME,
                valuation_price: before_valuation_data?.[0]?.valuation_price,
                created_at: "",
                max_valuation_price: "",
              });
            }
          }
        }
      } else {
        if (before_valuation_data && before_valuation_data?.length > 0) {
          if (!from_date && !to_date) {
            result?.push({
              start_date: final_start_date,
              start_time: TIME_VALUE?.DEFAULT_START_TIME,
              valuation_price: before_valuation_data?.[0]?.valuation_price,
              created_at: "",
              max_valuation_price: "",
            });

            if (final_start_date !== end_date) {
              result?.push({
                start_date: end_date,
                start_time: TIME_VALUE?.DEFAULT_START_TIME,
                valuation_price: before_valuation_data?.[0]?.valuation_price,
                created_at: "",
                max_valuation_price: "",
              });
            }
          } else {
            if (
              from_date &&
              to_date &&
              new Date(from_date) < new Date(start_offering_date) &&
              new Date(to_date) > new Date(start_offering_date)
            ) {
              result?.push({
                start_date: final_start_date,
                start_time: TIME_VALUE?.DEFAULT_START_TIME,
                valuation_price: before_valuation_data?.[0]?.valuation_price,
                created_at: "",
                max_valuation_price: "",
              });

              if (final_start_date !== end_date) {
                result?.push({
                  start_date: end_date,
                  start_time: TIME_VALUE?.DEFAULT_START_TIME,
                  valuation_price: before_valuation_data?.[0]?.valuation_price,
                  created_at: "",
                  max_valuation_price: "",
                });
              }
            }
          }
        }
      }

      return {
        valuation_data: result ?? [],
        max_valuation_price: maxValuationPrice,
        today_valuation_price: today_valuation_price?.[0]?.valuation_price ?? 0,
        issuer_entity_id: user_entity_id,
      };
    } catch (error) {
      throw error;
    }
  }
}

export { TokenValuations };
