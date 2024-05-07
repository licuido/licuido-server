import { Logger, errorCustomMessage, successCustomMessage } from "@helpers";
import { EntityInvestor, TokenOrders } from "@services";
import { createTokenOrderPayload } from "@types";

const createTokenOrders = async (options: createTokenOrderPayload) => {
  try {
    const {
      issuer_profile_id,
      type,
      invesment_type,
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
    const count: number = await EntityInvestor.count({
      issuer_profile_id,
      investor_entity_id: user_entity_id,
      status_id: 3, // Approved | Qualified
    });

    // If the Given Token Name Already Exists
    if (count <= 0) {
      return {
        code: 409,
        customMessage: errorCustomMessage.notQualified,
      };
    }

    // For Creating Token Orders
    const createData = TokenOrders.create({
      type,
      invesment_type,
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
      status_id: 1,
    });

    return {
      code: 200,
      customMessage: successCustomMessage.tokenOrderCreated,
      data: {
        token_order_id: createData,
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
    data,
  };
};

export default {
  createTokenOrders,
  getTokenOrder,
};
