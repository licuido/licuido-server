import { token_valuation, token_offering } from "@models";
import { createTokenValuation } from "@types";
// import cron from "node-cron";

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

      const cronSchedule = `${start_time.split(":")[1]} ${
        start_time.split(":")[0]
      } ${start_date.split("-")[1]} ${start_date.split("-")[2]} *`; // Example cron schedule

      console.log(cronSchedule,"cronSchedule")

      return cronSchedule

      token_valuation
        .create({
          token_offering_id: token_id,
          created_by,
          offer_price,
          bid_price,
          start_date,
          start_time,
          valuation_price,
          is_active: false,
        })
        .then((res) => {
          // let data: any = JSON.parse(JSON.stringify(res));

          const cronSchedule = `${start_time.split(":")[1]} ${
            start_time.split(":")[0]
          } ${start_date.split("-")[0]} ${start_date.split("-")[1]} *`; // Example cron schedule

          console.log(cronSchedule,"cronSchedule")
          // cron.schedule(cronSchedule, () => {
          //   TokenValuations.updateTokenVaulation({
          //     token_id,
          //     id: data?.[0]?.id,
          //     offer_price,
          //     valuation_price,
          //   });
          // });

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
