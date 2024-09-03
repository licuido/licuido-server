// import { currencyConvert } from "@helpers";
import { currencyConvert } from "@helpers";
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
import moment from "moment";
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
              "symbol",
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
    request,
  }: {
    user_entity_id?: string;
    offset: number;
    limit: number;
    from_date?: string;
    to_date?: string;
    request?: any;
  }): Promise<any> {
    try {
      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getAllTokenOrderGraphQuery(
          offset,
          limit,
          user_entity_id,
          from_date,
          to_date,
          request
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
    request,
  }: {
    user_entity_id?: string;
    from_date?: string;
    to_date?: string;
    request?: any;
  }): Promise<any> {
    try {
      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getTokensByInvestorGraphQuery(
          from_date,
          to_date,
          user_entity_id,
          request
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
    currency,
    currency_values,
  }: {
    user_entity_id?: string;
    currency?: string;
    currency_values?: any;
  }): Promise<any> {
    try {
      // Currency Data
      const currency_data =
        currency_values?.length > 0
          ? currency_values
              .map((cv: any) => `('${cv.currency_code}', ${cv.euro_value})`)
              .join(",")
          : "";

      // For Total Investment Data
      const [total_investment_result]: any[] = await sequelize.query(
        queries.getTotalInvestmentQuery(user_entity_id, currency_data)
      );

      // For Circulating Supply Data
      const [circulating_supply_result]: any[] = await sequelize.query(
        queries.getCirculatingSupplyQuery(user_entity_id, currency_data)
      );
      // For Pending Redemption Data
      const [pending_redemption_result]: any[] = await sequelize.query(
        queries.getPendingRedemptionQuery(user_entity_id, currency_data)
      );

      let overall_investment = 0;
      let circulating_supply_amount = 0;
      let pending_redemption_amount = 0;

      // Currency Conversion At Amount 1 for Expected Currency
      let convertedamount = await currencyConvert({
        from_currency_code: "EUR",
        to_currency_code: currency ?? "EUR",
        amount: 1,
      });

      // Currency Conversion For Dashboard Data - PortFolio Issuer
      /* For Total Investment */
      if (
        total_investment_result &&
        total_investment_result?.length > 0 &&
        total_investment_result[0]?.overall_investment &&
        total_investment_result[0]?.overall_investment > 0
      ) {
        const investmentAmount = Number(
          total_investment_result[0]?.overall_investment ?? 0
        );
        if (currency && currency !== "EUR") {
          overall_investment = investmentAmount * convertedamount;
          overall_investment = parseFloat(overall_investment.toFixed(2));
        } else {
          overall_investment = parseFloat(investmentAmount.toFixed(2));
        }
      }

      /* For Circulating Supply */
      if (
        circulating_supply_result &&
        circulating_supply_result?.length > 0 &&
        circulating_supply_result[0]?.circulating_supply_amount &&
        circulating_supply_result[0]?.circulating_supply_amount > 0
      ) {
        const circulatingSupplyAmount = Number(
          circulating_supply_result[0]?.circulating_supply_amount ?? 0
        );
        if (currency && currency !== "EUR") {
          circulating_supply_amount = circulatingSupplyAmount * convertedamount;
          circulating_supply_amount = parseFloat(overall_investment.toFixed(2));
        } else {
          circulating_supply_amount = parseFloat(
            circulatingSupplyAmount.toFixed(2)
          );
        }
      }

      /* For Pending Redemption */
      if (
        pending_redemption_result &&
        pending_redemption_result?.length > 0 &&
        pending_redemption_result[0]?.pending_redemption_amount &&
        pending_redemption_result[0]?.pending_redemption_amount > 0
      ) {
        const pendingRedemptionAmount = Number(
          pending_redemption_result[0]?.pending_redemption_amount ?? 0
        );
        if (currency && currency !== "EUR") {
          pending_redemption_amount = pendingRedemptionAmount * convertedamount;
          pending_redemption_amount = parseFloat(overall_investment.toFixed(2));
        } else {
          pending_redemption_amount = parseFloat(
            pendingRedemptionAmount.toFixed(2)
          );
        }
      }

      const obj: any = {};

      obj["issuer_name"] =
        total_investment_result && total_investment_result[0]?.issuer_name
          ? total_investment_result[0]?.issuer_name
          : "";

      obj["issuer_logo_url"] =
        total_investment_result && total_investment_result[0]?.issuer_logo_url
          ? total_investment_result[0]?.issuer_logo_url
          : "";

      obj["circulating_supply_amount"] =
        circulating_supply_result &&
        circulating_supply_result[0]?.circulating_supply_amount
          ? circulating_supply_amount.toFixed(2)
          : "0.00";

      obj["pending_redemption_amount"] =
        pending_redemption_result &&
        pending_redemption_result[0]?.pending_redemption_amount
          ? pending_redemption_amount.toFixed(2)
          : "0.00";

      obj["total_investment"] =
        total_investment_result && overall_investment
          ? overall_investment.toFixed(2)
          : "0.00";

      obj["percentage_change_from_yesterday"] =
        total_investment_result &&
        total_investment_result[0]?.percentage_change_from_yesterday
          ? parseFloat(
              total_investment_result[0]?.percentage_change_from_yesterday
            ).toFixed(2)
          : "0.00";

      obj["circulating_supply"] =
        circulating_supply_result &&
        circulating_supply_result[0]?.circulating_supply
          ? parseFloat(
              circulating_supply_result[0]?.circulating_supply
            ).toFixed(2)
          : "0.00";

      obj["pending_redemption"] =
        pending_redemption_result &&
        pending_redemption_result[0]?.pending_redemption
          ? parseFloat(
              pending_redemption_result[0]?.pending_redemption
            ).toFixed(2)
          : "0.00";

      obj["available_tokens"] =
        parseFloat(
          (
            parseFloat(obj["circulating_supply"]) -
            parseFloat(obj["pending_redemption"])
          ).toFixed(2)
        ).toFixed(2) ?? "0.00";

      obj["available_tokens_amount"] =
        parseFloat(
          (
            parseFloat(obj["circulating_supply_amount"]) -
            parseFloat(obj["pending_redemption_amount"])
          ).toFixed(2)
        ).toFixed(2) ?? "0.00";

      return obj;
    } catch (error) {
      throw error;
    }
  }

  static async getTokenDeploymentCount({
    start_date,
    end_date,
  }: {
    start_date?: string;
    end_date?: string;
  }): Promise<any> {
    try {
      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getAllTokensDeploymentCountQuery(start_date, end_date)
      );

      return {
        count: result,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getIssuerApprovalCount({
    start_date,
    end_date,
  }: {
    start_date?: string;
    end_date?: string;
  }): Promise<any> {
    try {
      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getIssuerApprovalCountQuery(start_date, end_date)
      );

      return {
        count: result,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getTotalInvestmentIssuersInvestorsCount({
    start_date,
    end_date,
  }: {
    start_date?: string;
    end_date?: string;
  }): Promise<any> {
    try {
      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getTotalInvestmentIssuersInvestorsCount(start_date, end_date)
      );

      return {
        count: result,
      };
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
    currency,
  }: {
    user_entity_id?: string;
    currency?: string;
  }): Promise<any> {
    try {
      // For Investor Dashboard
      const [investor_data]: any[] = await sequelize.query(
        queries.getInvestorDashboardQuery(user_entity_id)
      );

      let current_value = "0";
      let investment = "0";

      if (
        investor_data?.[0]?.current_value &&
        parseFloat(investor_data?.[0]?.current_value) > 0
      ) {
        const current_value_convert = await currencyConvert({
          from_currency_code: "EUR",
          to_currency_code: currency ?? "EUR",
          amount: Number(investor_data?.[0]?.current_value),
        });
        current_value = Math.round(current_value_convert)?.toString();
      }
      if (
        investor_data?.[0]?.investment &&
        parseFloat(investor_data?.[0]?.investment) > 0
      ) {
        const investment_convert = await currencyConvert({
          from_currency_code: "EUR",
          to_currency_code: currency ?? "EUR",
          amount: Number(investor_data?.[0]?.investment),
        });
        investment = Math.round(investment_convert)?.toString();
      }

      let obj: any = {
        current_value,
        investment,
        percentage_change: investor_data?.[0]?.percentage_change ?? "0.00",
      };

      return obj;
    } catch (error) {
      throw error;
    }
  }

  static async getTokenOrdersGraph({
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
      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getTokenOrdersGraphQuery(from_date, to_date, token_offering_id)
      );

      return {
        rows: result,
        count: result?.length ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getTokenSummaryRecentActivities({
    user_entity_id,
    token_offering_id,
  }: {
    user_entity_id?: string;
    token_offering_id?: string;
  }): Promise<any> {
    try {
      let date = moment().subtract(1, "days").endOf("day").toISOString();
      // For Token Summary
      const [token_status_result]: any[] = await sequelize.query(
        queries.getTokenStatusQuery(token_offering_id)
      );
      // For Circulating Supply Data
      const [circulating_supply_result]: any[] = await sequelize.query(
        queries.getTokenCirculatingSupplyQuery(token_offering_id)
      );
      // For Token CS Before 1 Day
      const [circulating_supply_result_before_1_day]: any[] =
        await sequelize.query(
          queries.getTokenCirculatingSupplyBefore1dayQuery(
            token_offering_id,
            date
          )
        );

      // For Recent Activities Data
      const [recent_activities_result]: any[] = await sequelize.query(
        queries.getTokenRecentActivitiesQuery(token_offering_id)
      );

      const obj: any = {};

      obj["token_status_result"] = token_status_result?.[0] || {};
      obj["circulating_supply"] =
        parseFloat(circulating_supply_result?.[0]?.circulating_supply) || 0;
      obj["circulating_supply_amount"] =
        parseFloat(circulating_supply_result?.[0]?.circulating_supply_amount) ||
        0;
      obj["pending_redemption"] =
        parseFloat(circulating_supply_result?.[0]?.pending_token) || 0;
      obj["pending_redemption_amount"] =
        parseFloat(circulating_supply_result?.[0]?.pending_redemption_amount) ||
        0;

      obj["available_tokens"] =
        obj["circulating_supply"] - obj["pending_redemption"];
      obj["available_tokens_amount"] =
        obj["circulating_supply_amount"] - obj["pending_redemption_amount"];

      let cs_before_1_day =
        parseFloat(
          circulating_supply_result_before_1_day?.[0]?.circulating_supply
        ) || 0;
      let pr_before_1_day =
        parseFloat(
          circulating_supply_result_before_1_day?.[0]?.pending_token
        ) || 0;
      let at_before_1_day = cs_before_1_day - pr_before_1_day;

      obj["cs_change_percentage"] =
        cs_before_1_day !== 0
          ? ((obj["circulating_supply"] - cs_before_1_day) / cs_before_1_day) *
            100
          : 0;

      obj["pr_change_percentage"] =
        pr_before_1_day !== 0
          ? ((obj["pending_redemption"] - pr_before_1_day) / pr_before_1_day) *
            100
          : 0;

      obj["at_change_percentage"] =
        at_before_1_day !== 0
          ? ((obj["available_tokens"] - at_before_1_day) / at_before_1_day) *
            100
          : 0;

      obj["recent_activities"] = recent_activities_result || [];
      return obj;
    } catch (error) {
      throw error;
    }
  }

  static async getInvestorDistribution({
    user_entity_id,
    token_offering_id,
    investor_distribution_by,
  }: {
    user_entity_id?: string;
    token_offering_id?: string;
    investor_distribution_by?: string;
  }): Promise<any> {
    try {
      const obj: any = {};

      // For Last 7 days
      let start_date = moment()
        .subtract(6, "days")
        .startOf("day")
        .toISOString();
      let end_date = moment().endOf("day").toISOString();

      // For Total Investors
      const calculateTotalInvestors: any = (period: any) => {
        return period.reduce((acc: any, investor: any) => {
          return acc + parseFloat(investor.investor_count);
        }, 0);
      };

      // For Total Investment
      const calculateTotalInvestment: any = (period: any) => {
        return period.reduce((acc: any, investment: any) => {
          return acc + parseFloat(investment.net_investment);
        }, 0);
      };

      // By No Of Invetors --------------------
      if (investor_distribution_by === "noi") {
        // Investors List in last 7 days
        const [investors_result_in_last_seven_days]: any[] =
          await sequelize.query(
            queries.getByNoOfInvestorsQuery(
              token_offering_id,
              start_date,
              end_date
            )
          );
        // Investors List Before 7 days
        const [investors_result_before_seven_days]: any[] =
          await sequelize.query(
            queries.getByNoOfInvestorsQuery(token_offering_id, start_date, null)
          );
        obj["investor_country_data"] =
          investors_result_in_last_seven_days || [];

        const total_investors_last_seven_days = Array.isArray(
          investors_result_in_last_seven_days
        )
          ? calculateTotalInvestors(investors_result_in_last_seven_days)
          : 0;
        const total_investors_before_seven_days = Array.isArray(
          investors_result_before_seven_days
        )
          ? calculateTotalInvestors(investors_result_before_seven_days)
          : 0;

        obj["total_investors"] = total_investors_last_seven_days.toString();

        obj["country_count"] = (
          investors_result_in_last_seven_days?.length || 0
        ).toString();

        obj["change_percentage"] = total_investors_before_seven_days
          ? (
              ((total_investors_last_seven_days -
                total_investors_before_seven_days) /
                total_investors_before_seven_days) *
              100
            ).toString()
          : "0";
      }

      // By Investment Amount --------------------
      if (investor_distribution_by === "ia") {
        // Investment in last 7 days
        const [investment_result_in_last_seven_days]: any[] =
          await sequelize.query(
            queries.getByInvestmentAmountQuery(
              token_offering_id,
              start_date,
              end_date
            )
          );
        // Investment List Before 7 days
        const [investment_result_before_seven_days]: any[] =
          await sequelize.query(
            queries.getByInvestmentAmountQuery(
              token_offering_id,
              start_date,
              null
            )
          );

        obj["investment_country_data"] =
          investment_result_in_last_seven_days || [];

        const total_investment_last_seven_days = Array.isArray(
          investment_result_in_last_seven_days
        )
          ? calculateTotalInvestment(investment_result_in_last_seven_days)
          : 0;
        const total_investment_before_seven_days = Array.isArray(
          investment_result_before_seven_days
        )
          ? calculateTotalInvestment(investment_result_before_seven_days)
          : 0;

        obj["total_investment"] = total_investment_last_seven_days.toString();

        obj["investors_count"] = (
          calculateTotalInvestors(investment_result_in_last_seven_days) || 0
        ).toString();

        obj["change_percentage"] = total_investment_before_seven_days
          ? (
              ((total_investment_last_seven_days -
                total_investment_before_seven_days) /
                total_investment_before_seven_days) *
              100
            ).toString()
          : "0";
      }

      return obj;
    } catch (error) {
      throw error;
    }
  }

  static async getValuationPrice(options: {
    from_date?: string;
    to_date?: string;
    token_ids?: string[];
  }): Promise<{
    rows: any[];
  }> {
    try {
      const { from_date, to_date, token_ids } = options;

      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getAllValuationPriceQuery(from_date, to_date, token_ids)
      );

      return result;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  static async getInvestorTokenHoldings(options: {
    user_entity_id?: string;
  }): Promise<{
    rows: any[];
  }> {
    try {
      const { user_entity_id } = options;

      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getInvestorTokenHoldingsQuery(user_entity_id)
      );

      return result;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  static async getOrder({
    token_order_id,
  }: {
    token_order_id?: string;
  }): Promise<any> {
    try {
      const token_offer = await token_order.findOne({
        where: {
          id: token_order_id,
        },
        attributes: ["currency", "currency_code", "net_investment_value"],
        include: [
          {
            model: token_offering,
            as: "token_offering",
            required: false,
            attributes: ["base_currency"],
          },
        ],
      });

      return JSON.parse(JSON.stringify(token_offer));
    } catch (error) {
      throw error;
    }
  }
}

export { TokenOrders };
