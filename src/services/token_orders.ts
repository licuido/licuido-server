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
import { RESPONSE_VALUE } from "helpers/constants";
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
  }: {
    user_entity_id?: string;
    currency?: string;
  }): Promise<any> {
    try {
      let overallInvestment: any = 0;
      let overallInvestmentTillYesterday: any = 0;
      let changePercentage: any = 0;
      let circulatingSupply: any = 0;
      let circulatingSupplyAmount: any = 0;
      let pendingRedemption: any = 0;
      let pendingRedemptionAmount: any = 0;
      let availableToken: any = 0;
      let availableTokenAmount: any = 0;

      /* --------- For Total Investment Data----------- */
      const [total_investment_result]: any[] = await sequelize.query(
        queries.getTotalInvestmentQuery(user_entity_id)
      );

      /*------------ For Circulating Supply Data -----------*/
      const [circulating_supply_result]: any[] = await sequelize.query(
        queries.getCirculatingSupplyQuery(user_entity_id)
      );

      /*------------ For Pending Redemption Data -----------*/
      const [pending_redemption_result]: any[] = await sequelize.query(
        queries.getPendingRedemptionQuery(user_entity_id)
      );

      // For Total Investment In Required Currency
      if (total_investment_result && total_investment_result?.length > 0) {
        const overallInvestmentResult: any = Object.values(
          total_investment_result.reduce((acc: any, curr: any) => {
            const {
              base_currency,
              overall_investment,
              overall_investment_till_yesterday,
            } = curr;

            if (!acc[base_currency]) {
              acc[base_currency] = {
                base_currency,
                overall_investment: 0,
                overall_investment_till_yesterday: 0,
              };
            }

            acc[base_currency].overall_investment += Number(overall_investment);
            acc[base_currency].overall_investment_till_yesterday += Number(
              overall_investment_till_yesterday
            );

            return acc;
          }, {})
        );

        if (overallInvestmentResult.length > 0) {
          for (let overallInvData of overallInvestmentResult) {
            if (
              overallInvData?.overall_investment &&
              Number(overallInvData?.overall_investment) > 0
            ) {
              const convertedAmount: any = await currencyConvert({
                from_currency_code: overallInvData?.base_currency,
                to_currency_code: currency,
                amount: Number(overallInvData?.overall_investment),
              });

              overallInvestment = overallInvestment + convertedAmount;
            }

            if (
              overallInvData?.overall_investment_till_yesterday &&
              Number(overallInvData?.overall_investment_till_yesterday) > 0
            ) {
              const convertedAmount: any = await currencyConvert({
                from_currency_code: overallInvData?.base_currency,
                to_currency_code: currency,
                amount: Number(
                  overallInvData?.overall_investment_till_yesterday
                ),
              });

              overallInvestmentTillYesterday =
                overallInvestmentTillYesterday + convertedAmount;
            }
          }
        }
      }

      // Change Percentage
      changePercentage =
        overallInvestmentTillYesterday !== 0
          ? ((overallInvestment - overallInvestmentTillYesterday) /
              overallInvestmentTillYesterday) *
            100
          : 0;

      // For Circulating Supply Amount In Required Currency
      if (circulating_supply_result && circulating_supply_result?.length > 0) {
        const circulattingSupplyResult: any = Object.values(
          circulating_supply_result.reduce((acc: any, curr: any) => {
            const {
              base_currency,
              circulating_supply,
              circulating_supply_amount,
            } = curr;

            if (!acc[base_currency]) {
              acc[base_currency] = {
                base_currency,
                circulating_supply: 0,
                circulating_supply_amount: 0,
              };
            }

            acc[base_currency].circulating_supply += Number(circulating_supply);
            acc[base_currency].circulating_supply_amount += Number(
              circulating_supply_amount
            );

            return acc;
          }, {})
        );

        if (circulattingSupplyResult.length > 0) {
          for (let cirSupData of circulattingSupplyResult) {
            if (
              cirSupData?.circulating_supply_amount &&
              Number(cirSupData?.circulating_supply_amount) > 0
            ) {
              const convertedAmount: any = await currencyConvert({
                from_currency_code: cirSupData?.base_currency,
                to_currency_code: currency,
                amount: Number(cirSupData?.circulating_supply_amount),
              });

              circulatingSupplyAmount =
                circulatingSupplyAmount + convertedAmount;
            }

            circulatingSupply =
              circulatingSupply + Number(cirSupData?.circulating_supply);
          }
        }
      }

      // For Pending Redemption Amount In Required Currency
      if (pending_redemption_result && pending_redemption_result?.length > 0) {
        const pendingRedemptionResult: any = Object.values(
          pending_redemption_result.reduce((acc: any, curr: any) => {
            const {
              base_currency,
              pending_redemption,
              pending_redemption_amount,
            } = curr;

            if (!acc[base_currency]) {
              acc[base_currency] = {
                base_currency,
                pending_redemption: 0,
                pending_redemption_amount: 0,
              };
            }

            acc[base_currency].pending_redemption += Number(pending_redemption);
            acc[base_currency].pending_redemption_amount += Number(
              pending_redemption_amount
            );

            return acc;
          }, {})
        );

        if (pendingRedemptionResult.length > 0) {
          for (let pendRedData of pendingRedemptionResult) {
            if (
              pendRedData?.pending_redemption_amount &&
              Number(pendRedData?.pending_redemption_amount) > 0
            ) {
              const convertedAmount: any = await currencyConvert({
                from_currency_code: pendRedData?.base_currency,
                to_currency_code: currency,
                amount: Number(pendRedData?.pending_redemption_amount),
              });

              pendingRedemptionAmount =
                pendingRedemptionAmount + convertedAmount;
            }

            pendingRedemption =
              pendingRedemption + Number(pendRedData?.pending_redemption);
          }
        }
      }

      // For Available Token
      availableToken = circulatingSupply - pendingRedemption;
      availableTokenAmount = circulatingSupplyAmount - pendingRedemptionAmount;

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
        circulatingSupplyAmount.toString() ?? RESPONSE_VALUE.DEFAULT;

      obj["pending_redemption_amount"] =
        pendingRedemptionAmount.toString() ?? RESPONSE_VALUE.DEFAULT;

      obj["total_investment"] =
        overallInvestment.toString() ?? RESPONSE_VALUE.DEFAULT;

      obj["percentage_change_from_yesterday"] =
        changePercentage.toString() ?? RESPONSE_VALUE.DEFAULT;

      obj["circulating_supply"] =
        circulatingSupply.toString() ?? RESPONSE_VALUE.DEFAULT;

      obj["pending_redemption"] =
        pendingRedemption.toString() ?? RESPONSE_VALUE.DEFAULT;

      obj["available_tokens"] =
        availableToken.toString() ?? RESPONSE_VALUE.DEFAULT;

      obj["available_tokens_amount"] =
        availableTokenAmount.toString() ?? RESPONSE_VALUE.DEFAULT;

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

      if (result && result.length > 0) {
        for (let item of result) {
          const offeringPrice = Number(item?.offering_price);
          const valuationPrice = Number(item?.valuation_price);

          item["valuation_change_percentage"] =
            offeringPrice > 0
              ? (
                  ((valuationPrice - offeringPrice) / offeringPrice) *
                  100
                ).toString()
              : RESPONSE_VALUE.DEFAULT;
        }
      }

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

      let object: any = {
        current_value: RESPONSE_VALUE.DEFAULT,
        investment: RESPONSE_VALUE.DEFAULT,
        percentage_change: RESPONSE_VALUE.DEFAULT,
      };

      if (investor_data && investor_data?.length > 0) {
        const investmentResult: any = Object.values(
          investor_data.reduce((acc: any, curr: any) => {
            const { base_currency, investment } = curr;

            if (!acc[base_currency]) {
              acc[base_currency] = { base_currency, investment: 0 };
            }

            acc[base_currency].investment += Number(investment);

            return acc;
          }, {})
        );

        const valuationResult: any = Object.values(
          investor_data.reduce((acc: any, curr: any) => {
            const { base_currency, valuation_price, sender_balance } = curr;

            const validSenderBalance = Number(sender_balance) || 0;
            const validValuationPrice = Number(valuation_price) || 0;

            if (!acc[base_currency]) {
              acc[base_currency] = { base_currency, valuation_price: 0 };
            }

            acc[base_currency].valuation_price +=
              validSenderBalance * validValuationPrice;

            return acc;
          }, {})
        );

        let investment_value: any = 0;
        let valuation_value: any = 0;

        if (investmentResult.length > 0) {
          for (let invData of investmentResult) {
            if (invData?.investment && Number(invData?.investment) > 0) {
              const convertedAmount: any = await currencyConvert({
                from_currency_code: invData?.base_currency,
                to_currency_code: currency,
                amount: Number(invData?.investment),
              });

              investment_value = investment_value + convertedAmount;
            }
          }
        }

        if (valuationResult.length > 0) {
          for (let valData of valuationResult) {
            if (
              valData?.valuation_price &&
              Number(valData?.valuation_price) > 0
            ) {
              const convertedAmount: any = await currencyConvert({
                from_currency_code: valData?.base_currency,
                to_currency_code: currency,
                amount: Number(valData?.valuation_price),
              });

              valuation_value = valuation_value + convertedAmount;
            }
          }
        }

        let percentage: any =
          investment_value > 0
            ? ((valuation_value - investment_value) / investment_value) * 100
            : 0;

        object = {
          current_value: valuation_value.toString() ?? RESPONSE_VALUE.DEFAULT,
          investment: investment_value.toString() ?? RESPONSE_VALUE.DEFAULT,
          percentage_change: percentage.toString() ?? RESPONSE_VALUE.DEFAULT,
        };
      }

      return object;
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
      let limit: number = 5;
      let offset: number = 0;

      // For Last 7 days
      let start_date = moment()
        .subtract(6, "days")
        .startOf("day")
        .toISOString();
      let end_date = moment().endOf("day").toISOString();

      // For Total Investors
      const calculateTotalInvestors: any = (period: any) => {
        if (!period) return 0;
        return period.reduce((acc: any, investor: any) => {
          return acc + parseFloat(investor.investor_count);
        }, 0);
      };

      // For Total Investment
      const calculateTotalInvestment: any = (period: any) => {
        if (!period) return 0;
        return period.reduce((acc: any, investment: any) => {
          return acc + parseFloat(investment.net_investment);
        }, 0);
      };

      // By No Of Invetors --------------------
      if (investor_distribution_by === "noi") {
        // Investors List in last 7 days With Limit 5 Countries
        const [investors_result_in_last_seven_days]: any[] =
          await sequelize.query(
            queries.getByNoOfInvestorsQuery(
              limit,
              offset,
              token_offering_id,
              start_date,
              end_date
            )
          );

        // Overall Investors in last 7 days
        const [overall_investors_result_in_last_seven_days]: any[] =
          await sequelize.query(
            queries.getByNoOfInvestorsQuery(
              null,
              null,
              token_offering_id,
              start_date,
              end_date
            )
          );

        // Investors List Before 7 days
        const [investors_result_before_seven_days]: any[] =
          await sequelize.query(
            queries.getByNoOfInvestorsQuery(
              null,
              null,
              token_offering_id,
              start_date,
              null
            )
          );

        obj["investor_country_data"] =
          investors_result_in_last_seven_days || [];

        const total_investors_last_seven_days = Array.isArray(
          overall_investors_result_in_last_seven_days
        )
          ? calculateTotalInvestors(overall_investors_result_in_last_seven_days)
          : 0;

        const total_investors_before_seven_days = Array.isArray(
          investors_result_before_seven_days
        )
          ? calculateTotalInvestors(investors_result_before_seven_days)
          : 0;

        obj["total_investors"] = total_investors_last_seven_days.toString();

        obj["country_count"] = (
          overall_investors_result_in_last_seven_days?.length || 0
        ).toString();

        const total_investors_till_now =
          total_investors_last_seven_days + total_investors_before_seven_days;

        obj["change_percentage"] = total_investors_before_seven_days
          ? (
              ((total_investors_till_now - total_investors_before_seven_days) /
                total_investors_before_seven_days) *
              100
            ).toString()
          : "0";
      }

      // By Investment Amount --------------------
      if (investor_distribution_by === "ia") {
        // Investment in last 7 days With First Limit 5 Countries
        const [investment_result_in_last_seven_days]: any[] =
          await sequelize.query(
            queries.getByInvestmentAmountQuery(
              limit,
              offset,
              token_offering_id,
              start_date,
              end_date
            )
          );

        // Overall Investment in last 7 days
        const [overall_investment_in_last_seven_days]: any[] =
          await sequelize.query(
            queries.getByInvestmentAmountQuery(
              null,
              null,
              token_offering_id,
              start_date,
              end_date
            )
          );

        // Overall Investment List Before 7 days
        const [investment_result_before_seven_days]: any[] =
          await sequelize.query(
            queries.getByInvestmentAmountQuery(
              null,
              null,
              token_offering_id,
              start_date,
              null
            )
          );

        obj["investment_country_data"] =
          investment_result_in_last_seven_days || [];

        const total_investment_last_seven_days = Array.isArray(
          overall_investment_in_last_seven_days
        )
          ? calculateTotalInvestment(overall_investment_in_last_seven_days)
          : 0;

        const total_investment_before_seven_days = Array.isArray(
          investment_result_before_seven_days
        )
          ? calculateTotalInvestment(investment_result_before_seven_days)
          : 0;

        obj["total_investment"] = total_investment_last_seven_days.toString();

        obj["investors_count"] = (
          calculateTotalInvestors(overall_investment_in_last_seven_days) || 0
        ).toString();

        const total_investments_till_now =
          total_investment_last_seven_days + total_investment_before_seven_days;

        obj["change_percentage"] = total_investment_before_seven_days
          ? (
              ((total_investments_till_now -
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

  static async getTokenOverview(options: {
    user_entity_id?: string;
    token_id?: string;
  }): Promise<any> {
    try {
      const { user_entity_id, token_id } = options;

      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getTokenOverviewQuery(user_entity_id, token_id)
      );

      return result;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export { TokenOrders };
