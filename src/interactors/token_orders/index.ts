import {
  Logger,
  currencyConvert,
  errorCustomMessage,
  qualifiedStatus,
  successCustomMessage,
} from "@helpers";
import { TokenOrders, TrackTokenOrderActions } from "@services";
import {
  createTokenRedemptionOrderPayload,
  createTokenSubscriptionOrderPayload,
} from "@types";
import { sequelize } from "@utils";

const createTokenSubscriptionOrders = async (
  options: createTokenSubscriptionOrderPayload
) => {
  try {
    const {
      type,
      investment_type,
      issuer_entity_id,
      token_offering_id,
      currency,
      currency_code,
      ordered_tokens,
      price_per_token,
      net_investment_value,
      fee,
      total_paid,
      payment_reference,
      user_entity_id,
      user_profile_id,
    } = options;

    // Check if the Investor Already Qualified for this issuer While invest
    const qualifiedStaus: boolean =
      await qualifiedStatus.getInvestorQualifiedStatus({
        issuer_entity_id,
        investor_entity_id: user_entity_id,
      });

    // For Invest, If the investor is not qualified for this issuer, Send Error Message
    if (!qualifiedStaus) {
      return {
        code: 403,
        customMessage: errorCustomMessage.notQualified,
      };
    }

    const default_currency = "€";
    const default_currency_code = "EUR";
    const conversionResponse = await currencyConvert({
      from_currency_code: currency_code,
      to_currency_code: default_currency_code,
      amount: net_investment_value,
    });

    const result: any = await sequelize.transaction(async (transaction) => {
      // For Creating Token Orders
      const tokenOrderId = await TokenOrders.create(
        {
          type,
          investment_type,
          issuer_entity_id,
          receiver_entity_id: user_entity_id,
          token_offering_id,
          currency,
          currency_code,
          ordered_tokens,
          price_per_token,
          net_investment_value,
          fee,
          total_paid,
          payment_reference,
          created_by: user_profile_id,
          is_active: true,
          status_id: 1, // Pending Order
          default_currency: default_currency,
          default_currency_code: default_currency_code,
          net_investment_value_in_euro: conversionResponse,
        },
        transaction
      );

      // Track Actions Of Order - Insert Track Record
      const track_id = await TrackTokenOrderActions.create(
        {
          user_profile_id,
          user_entity_id,
          action_status_id: 1,
          is_active: true,
          created_by: user_profile_id,
        },
        transaction
      );

      // Update Token Order With Track Id
      await TokenOrders.update(
        {
          options: {
            last_action_track_id: track_id,
            updated_by: user_profile_id,
          },
          id: tokenOrderId,
        },
        transaction
      );

      return tokenOrderId;
    });
    return {
      code: 200,
      customMessage: successCustomMessage.tokenOrderCreated,
      data: {
        token_order_id: result,
      },
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getTokenOrder = async ({
  user_entity_id,
  token_order_id,
}: {
  user_entity_id?: string;
  token_order_id?: string;
}) => {
  // If Request Payload Is Wrong
  if (!token_order_id || !user_entity_id) {
    return {
      success: false,
      message: errorCustomMessage.passTokenOrderId,
    };
  }

  // Get Token Order Payment Data
  const data = await TokenOrders.getTokenOrders({
    user_entity_id,
    token_order_id,
  });

  return {
    success: true,
    message: successCustomMessage.getTokenOrderPaymentDetails,
    resData: data,
  };
};

const createTokenRedemptionOrders = async (
  options: createTokenRedemptionOrderPayload
) => {
  try {
    const {
      type,
      investment_type,
      issuer_entity_id,
      token_offering_id,
      currency,
      currency_code,
      ordered_tokens,
      price_per_token,
      net_investment_value,
      user_entity_id,
      user_profile_id,
      bank_name,
      bank_account_name,
      swift_bic_no,
      iban_no,
    } = options;

    const default_currency = "€";
    const default_currency_code = "EUR";
    const conversionResponse = await currencyConvert({
      from_currency_code: currency_code,
      to_currency_code: default_currency_code,
      amount: net_investment_value,
    });

    const result: any = await sequelize.transaction(async (transaction) => {
      // For Creating Token Orders Redemption
      const tokenOrderId = await TokenOrders.create(
        {
          type,
          investment_type,
          issuer_entity_id,
          receiver_entity_id: user_entity_id,
          token_offering_id,
          currency,
          currency_code,
          ordered_tokens,
          price_per_token,
          net_investment_value,
          created_by: user_profile_id,
          is_active: true,
          status_id: 1,
          bank_name,
          bank_account_name,
          swift_bic_no,
          iban_no,
          default_currency: default_currency,
          default_currency_code: default_currency_code,
          net_investment_value_in_euro: conversionResponse,
        },
        transaction
      );

      // Track Actions Of Order - Insert Track Record
      const track_id = await TrackTokenOrderActions.create(
        {
          user_profile_id,
          user_entity_id,
          action_status_id: 1,
          is_active: true,
          created_by: user_profile_id,
        },
        transaction
      );

      // Update Token Order With Track Id
      await TokenOrders.update(
        {
          options: {
            last_action_track_id: track_id,
            updated_by: user_profile_id,
          },
          id: tokenOrderId,
        },
        transaction
      );

      return tokenOrderId;
    });

    return {
      code: 200,
      customMessage: successCustomMessage.tokenOrderCreated,
      data: {
        token_order_id: result,
      },
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  createTokenSubscriptionOrders,
  getTokenOrder,
  createTokenRedemptionOrders,
};
