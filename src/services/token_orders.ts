import {
  customer_wallet,
  entity,
  master_order_status,
  token_offering,
  token_order,
  user_profile,
} from "@models";
import queries from "@queries";
import { createTokenOrders, updateTokenOrders } from "@types";
import { sequelize } from "@utils";
import { Transaction } from "sequelize";

class TokenOrders {
  /**
   * this function used for create token order/invest
   *
   * @param {createTokenOrders} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(
    options: createTokenOrders,
    transaction: Transaction
  ): Promise<any> {
    try {
      const tokenOrder = await token_order.create(options, {
        raw: false,
        returning: true,
        transaction,
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

  static async update(
    {
      options,
      id,
    }: {
      options: updateTokenOrders;
      id: string;
    },
    transaction?: Transaction
  ): Promise<any> {
    try {
      return await token_order.update(
        {
          ...options,
        },
        {
          where: {
            id,
          },
          transaction,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * A function to get subscription order data.
   *
   * @param {Object} options - The options object containing parameters for fetching subscription order data.
   * @param {number} options.entity_type_id - The entity type ID.
   * @param {number} options.offset - The offset for pagination.
   * @param {number} options.limit - The limit for pagination.
   * @param {string} [options.user_entity_id] - The user entity ID (optional).
   * @param {string} [options.search] - The search query (optional).
   * @param {number[] | []} [options.status_filters] - The status filters (optional).
   * @param {string[]} [options.investment_currency_filters] - The investment currency filters (optional).
   * @param {string[]} [options.order_fulfillment_filters] - The order fulfillment filters (optional).
   * @param {string} [options.start_date] - The start date (optional).
   * @param {string} [options.end_date] - The end date (optional).
   * @param {string} [options.token_id] - The token ID (optional).
   * @return {Promise<{ rows: any[]; count: number; }>} The promise with rows array and count of subscription order data.
   */

  static async getSubscriptionOrderData(options: {
    entity_type_id: number;
    offset: number;
    limit: number;
    user_entity_id?: string;
    search?: string;
    status_filters?: number[] | [];
    investment_currency_filters?: string[] | [];
    order_fulfillment_filters?: string[] | [];
    start_date?: string;
    end_date?: string;
    token_id?: string;
  }): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const {
        entity_type_id,
        offset,
        limit,
        user_entity_id,
        search,
        status_filters,
        investment_currency_filters,
        order_fulfillment_filters,
        start_date,
        end_date,
        token_id,
      } = options;

      // For Data
      const [result]: any[] = await sequelize.query(
        await queries.getAllSubscriptionOrderQuery(
          entity_type_id,
          "subscription",
          offset,
          limit,
          user_entity_id,
          search,
          status_filters,
          investment_currency_filters,
          order_fulfillment_filters,
          start_date,
          end_date,
          token_id
        )
      );

      // For Count
      const [dataWithoutOffsetLimit]: any[] = await sequelize.query(
        await queries.getAllSubscriptionOrderQuery(
          entity_type_id,
          "subscription",
          null,
          null,
          user_entity_id,
          search,
          status_filters,
          investment_currency_filters,
          order_fulfillment_filters,
          start_date,
          end_date,
          token_id
        )
      );

      return {
        rows: result,
        count: dataWithoutOffsetLimit?.length ?? 0,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  /**
   * A function to retrieve redemption order data.
   *
   * @param {Object} options - The options for retrieving data.
   * @param {number} options.entity_type_id - The entity type ID.
   * @param {number} options.offset - The offset for data retrieval.
   * @param {number} options.limit - The limit of data to retrieve.
   * @param {string} [options.user_entity_id] - The user entity ID (optional).
   * @param {string} [options.search] - The search query (optional).
   * @param {number[] | []} [options.status_filters] - The status filters (optional).
   * @param {string[] | []} [options.investment_currency_filters] - The investment currency filters (optional).
   * @param {string[] | []} [options.order_fulfillment_filters] - The order fulfillment filters (optional).
   * @param {string} [options.start_date] - The start date for data retrieval (optional).
   * @param {string} [options.end_date] - The end date for data retrieval (optional).
   * @param {string} [options.token_id] - The token ID for retrieval (optional).
   * @return {Promise<{ rows: any[]; count: number; }>} The retrieved data rows and count.
   */

  static async getRedmptionOrderData(options: {
    entity_type_id: number;
    offset: number;
    limit: number;
    user_entity_id?: string;
    search?: string;
    status_filters?: number[] | [];
    order_fulfillment_filters?: string[] | [];
    start_date?: string;
    end_date?: string;
    token_id?: string;
  }): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const {
        entity_type_id,
        offset,
        limit,
        user_entity_id,
        search,
        status_filters,
        order_fulfillment_filters,
        start_date,
        end_date,
        token_id,
      } = options;

      // For Data
      const [result]: any[] = await sequelize.query(
        await queries.getAllRedemptionOrderQuery(
          entity_type_id,
          "redemption",
          offset,
          limit,
          user_entity_id,
          search,
          status_filters,
          order_fulfillment_filters,
          start_date,
          end_date,
          token_id
        )
      );

      // For Count
      const [dataWithoutOffsetLimit]: any[] = await sequelize.query(
        await queries.getAllRedemptionOrderQuery(
          entity_type_id,
          "redemption",
          null,
          null,
          user_entity_id,
          search,
          status_filters,
          order_fulfillment_filters,
          start_date,
          end_date,
          token_id
        )
      );

      return {
        rows: result,
        count: dataWithoutOffsetLimit?.length ?? 0,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  static async getSubscriptionOrderDataAsCSV(options: {
    entity_type_id: number;
    user_entity_id?: string;
    search?: string;
    status_filters?: number[] | [];
    investment_currency_filters?: string[] | [];
    order_fulfillment_filters?: string[] | [];
    start_date?: string;
    end_date?: string;
    token_id?: string;
  }): Promise<{
    rows: any[];
  }> {
    try {
      const {
        entity_type_id,
        user_entity_id,
        search,
        status_filters,
        investment_currency_filters,
        order_fulfillment_filters,
        start_date,
        end_date,
        token_id,
      } = options;

      // For Data
      const [result]: any[] = await sequelize.query(
        await queries.getAllSubscriptionOrderQuery(
          entity_type_id,
          "subscription",
          null,
          null,
          user_entity_id,
          search,
          status_filters,
          investment_currency_filters,
          order_fulfillment_filters,
          start_date,
          end_date,
          token_id
        )
      );

      return {
        rows: result,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  static async getRedemptionOrderDataAsCSV(options: {
    entity_type_id: number;
    user_entity_id?: string;
    search?: string;
    status_filters?: number[] | [];
    order_fulfillment_filters?: string[] | [];
    start_date?: string;
    end_date?: string;
    token_id?: string;
  }): Promise<{
    rows: any[];
  }> {
    try {
      const {
        entity_type_id,
        user_entity_id,
        search,
        status_filters,
        order_fulfillment_filters,
        start_date,
        end_date,
        token_id,
      } = options;

      // For Data
      const [result]: any[] = await sequelize.query(
        await queries.getAllRedemptionOrderQuery(
          entity_type_id,
          "redemption",
          null,
          null,
          user_entity_id,
          search,
          status_filters,
          order_fulfillment_filters,
          start_date,
          end_date,
          token_id
        )
      );

      return {
        rows: result,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  static async viewOrderDetails({
    token_order_id,
  }: {
    token_order_id?: string;
  }): Promise<any> {
    try {
      const token_order_details = await token_order.findOne({
        where: {
          id: token_order_id,
        },
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
            required: false,
          },
          {
            model: entity,
            as: "issuer_entity",
            required: false,
          },
          {
            model: entity,
            as: "receiver_entity",
            required: false,
            include: [
              {
                model: customer_wallet,
                as: "customer_wallets",
                where: { is_authenticated: true },
                required: false,
              },
            ],
          },
        ],
      });

      return JSON.parse(JSON.stringify(token_order_details));
    } catch (error) {
      throw error;
    }
  }

  static async getOrderToken({
    token_order_id,
  }: {
    token_order_id?: string;
  }): Promise<any> {
    try {
      const token_order_details = await token_order.findOne({
        where: {
          id: token_order_id,
          is_active: true,
        },
        attributes: [
          "id",
          "issuer_entity_id",
          "receiver_entity_id",
          "token_offering_id",
          "type",
          "ordered_tokens",
          "total_paid",
          "type",
          "status_id",
          "net_investment_value",
        ],
        include: [
          {
            model: token_offering,
            as: "token_offering",
            required: true,
            attributes: ["id"],
            include: [
              {
                model: entity,
                as: "issuer_entity",
                required: false,
                attributes: ["id"],
                include: [
                  {
                    model: user_profile,
                    as: "contact_profile",
                    required: false,
                    attributes: ["id", "name", "is_fund_offered_by_licuido"],
                  },
                ],
              },
            ],
          },
        ],
      });

      return JSON.parse(JSON.stringify(token_order_details));
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

  static async getTokensByInvestorGraph({
    user_entity_id,
    from_date,
    to_date,
  }: {
    user_entity_id?: string;
    from_date?: string;
    to_date?: string;
  }): Promise<any> {
    try {
      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getTokensByInvestorGraphQuery(
          from_date,
          to_date,
          user_entity_id
        )
      );

      return {
        rows: result,
        count: result?.length ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getDashboard({
    user_entity_id,
  }: {
    user_entity_id?: string;
  }): Promise<any> {
    try {
      // For Total Investment Data
      const [total_investment_result]: any[] = await sequelize.query(
        queries.getTotalInvestmentQuery(user_entity_id)
      );
      // For Circulating Supply Data
      const [circulating_supply_result]: any[] = await sequelize.query(
        queries.getCirculatingSupplyQuery(user_entity_id)
      );
      // For Pending Redemption Data
      const [pending_redemption_result]: any[] = await sequelize.query(
        queries.getPendingRedemptionQuery(user_entity_id)
      );

      const obj: any = {};

      obj["total_investment"] =
        total_investment_result &&
        total_investment_result[0]?.overall_investment
          ? total_investment_result[0]?.overall_investment.toString()
          : "0.00";
      obj["percentage_change_from_yesterday"] =
        total_investment_result &&
        total_investment_result[0]?.percentage_change_till_today
          ? total_investment_result[0]?.percentage_change_till_today.toString()
          : "0";
      obj["circulating_supply"] =
        circulating_supply_result &&
        circulating_supply_result[0]?.circulating_supply
          ? circulating_supply_result[0]?.circulating_supply.toString()
          : "0";
      obj["circulating_supply_amount"] =
        circulating_supply_result &&
        circulating_supply_result[0]?.circulating_supply_amount
          ? circulating_supply_result[0]?.circulating_supply_amount.toString()
          : "0.00";
      obj["pending_redemption"] =
        pending_redemption_result &&
        pending_redemption_result[0]?.pending_redemption
          ? pending_redemption_result[0]?.pending_redemption.toString()
          : "0";
      obj["pending_redemption_amount"] =
        pending_redemption_result &&
        pending_redemption_result[0]?.pending_redemption_amount
          ? pending_redemption_result[0]?.pending_redemption_amount.toString()
          : "0.00";
      obj["available_tokens"] = (
        parseInt(obj["circulating_supply"]) -
        parseInt(obj["pending_redemption"])
      ).toString();
      obj["available_tokens_amount"] = (
        parseInt(obj["circulating_supply_amount"]) -
        parseInt(obj["pending_redemption_amount"])
      ).toString();
      return obj;
    } catch (error) {
      throw error;
    }
  }

  static async getTokensHoldingsGraph({
    user_entity_id,
    from_date,
    to_date,
  }: {
    user_entity_id?: string;
    from_date?: string;
    to_date?: string;
  }): Promise<any> {
    try {
      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getTokensHoldingsGraphQuery(from_date, to_date, user_entity_id)
      );

      return {
        rows: result,
        count: result?.length ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getCurrentTokenInvestment({
    user_entity_id,
    offset,
    limit,
  }: {
    user_entity_id?: string;
    offset: number;
    limit: number;
  }): Promise<any> {
    try {
      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getCurrentTokenInvestmentQuery(offset, limit, user_entity_id)
      );

      // For Count
      const [resultCount]: any[] = await sequelize.query(
        queries.getCurrentTokenInvestmentQuery(null, null, user_entity_id)
      );

      return {
        rows: result,
        count: resultCount?.length ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getInvestorDashboard({
    user_entity_id,
  }: {
    user_entity_id?: string;
  }): Promise<any> {
    try {
      // For Investor Dashboard
      const [investor_data]: any[] = await sequelize.query(
        queries.getInvestorDashboardQuery(user_entity_id)
      );

      let obj: any = investor_data && investor_data?.[0];

      return obj;
    } catch (error) {
      throw error;
    }
  }
}

export { TokenOrders };
