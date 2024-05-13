import { master_order_status, token_offering, token_order } from "@models";
import queries from "@queries";
import { createTokenOrders } from "@types";
import { sequelize } from "@utils";

class TokenOrders {
  /**
   * this function used for create token order/invest
   *
   * @param {createTokenOrders} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: createTokenOrders): Promise<any> {
    try {
      const tokenOrder = await token_order.create(options, {
        raw: false,
        returning: true,
      });

      let tokenOrderData: any = tokenOrder
        ? JSON.parse(JSON.stringify(tokenOrder))
        : null;

      return tokenOrderData?.id;
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for get token orders
   *
   * @param {token_order_id?: string; user_entity_id?: string;} - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async getTokenOrders({
    token_order_id,
    user_entity_id,
  }: {
    token_order_id?: string;
    user_entity_id?: string;
  }): Promise<any> {
    try {
      const token_offer = await token_order.findOne({
        where: {
          id: token_order_id,
          receiver_entity_id: user_entity_id,
        },
        attributes: [
          ["id", "token_order_id"],
          "type",
          "investment_type",
          "currency",
          "currency_code",
          "ordered_tokens",
          "price_per_token",
          "net_investment_value",
          "fee",
          "total_paid",
          "payment_reference",
          "status_id",
          "token_offering_id",
          "bank_name",
          "bank_account_name",
          "swift_bic_no",
          "iban_no",
        ],
        include: [
          {
            model: master_order_status,
            as: "status",
            attributes: ["id", "name"],
            required: false,
          },
          {
            model: token_offering,
            as: "token_offering",
            attributes: [
              "id",
              "bank_name",
              "bank_account_name",
              "swift_bic_no",
              "iban_no",
            ],
            required: false,
          },
        ],
      });

      return JSON.parse(JSON.stringify(token_offer));
    } catch (error) {
      throw error;
    }
  }

  static async getTokenOrderGraph({
    user_entity_id,
    offset,
    limit,
    from_date,
    to_date,
  }: {
    user_entity_id?: string;
    offset: number;
    limit: number;
    from_date?: string;
    to_date?: string;
  }): Promise<any> {
    try {
      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getAllTokenOrderGraphQuery(
          offset,
          limit,
          user_entity_id,
          from_date,
          to_date
        )
      );

      // For Count
      const [dataCount]: any[] = await sequelize.query(
        queries.getAllTokenOrderGraphQuery(
          null,
          null,
          user_entity_id,
          from_date,
          to_date
        )
      );

      return {
        rows: result,
        count: dataCount?.length ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }
}

export { TokenOrders };
