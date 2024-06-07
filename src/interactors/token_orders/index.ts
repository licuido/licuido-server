import {
  Logger,
  currencyConvert,
  dateTime,
  errorCustomMessage,
  fulfilledStatus,
  qualifiedStatus,
  successCustomMessage,
} from "@helpers";
import { TokenOrders, TrackTokenOrderActions } from "@services";
import {
  createTokenRedemptionOrderPayload,
  createTokenSubscriptionOrderPayload,
  getRedemptionOrderPayload,
  getSubscriptionOrderPayload,
  getTokenRedemptionOrderAsCSVPayload,
  getTokenSubscriptionOrderAsCSVPayload,
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

    // To check order fulfilled by licuido or issuer
    const isFulfilledBylicuido: boolean =
      await fulfilledStatus.getOrderFulfilledStatus({
        issuer_entity_id,
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
          fulfilled_by: isFulfilledBylicuido ? "admin" : "issuer",
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

    // To check order fulfilled by licuido or issuer
    const isFulfilledBylicuido: boolean =
      await fulfilledStatus.getOrderFulfilledStatus({
        issuer_entity_id,
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
          status_id: 2, // Pending Redmeption
          bank_name,
          bank_account_name,
          swift_bic_no,
          iban_no,
          default_currency: default_currency,
          default_currency_code: default_currency_code,
          net_investment_value_in_euro: conversionResponse,
          fulfilled_by: isFulfilledBylicuido ? "admin" : "issuer",
        },
        transaction
      );

      // Track Actions Of Order - Insert Track Record
      const track_id = await TrackTokenOrderActions.create(
        {
          user_profile_id,
          user_entity_id,
          action_status_id: 2,
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

const getTokenSubscriptionOrder = async (
  options: getSubscriptionOrderPayload
) => {
  const {
    entity_type_id,
    user_entity_id,
    offset = 0,
    limit = 0,
    search = "",
    status_filter,
    investment_currency_filter,
    start_date,
    end_date,
    order_fulfillment_filter,
    token_id,
  } = options;

  // For Token Order Status Filters
  const status_filters: any[] =
    status_filter && typeof status_filter === "string"
      ? status_filter === ""
        ? []
        : status_filter.split(",")
      : Array.isArray(status_filter)
      ? status_filter
      : [];

  // For Investment Currency Filters
  const investment_currency_filters: any[] =
    investment_currency_filter && typeof investment_currency_filter === "string"
      ? investment_currency_filter === ""
        ? []
        : investment_currency_filter.split(",")
      : Array.isArray(investment_currency_filter)
      ? investment_currency_filter
      : [];

  // For Order Fulfillment Filter
  const order_fulfillment_filters: any[] =
    order_fulfillment_filter && typeof order_fulfillment_filter === "string"
      ? order_fulfillment_filter === ""
        ? []
        : order_fulfillment_filter.split(",")
      : Array.isArray(order_fulfillment_filter)
      ? order_fulfillment_filter
      : [];

  // Getting Rows & Count Data of Subscription Orders
  const { rows, count } = await TokenOrders.getSubscriptionOrderData({
    entity_type_id,
    user_entity_id,
    offset,
    limit,
    search,
    status_filters,
    investment_currency_filters,
    order_fulfillment_filters,
    start_date,
    end_date,
    token_id,
  });

  return { page: rows, count: rows?.length, totalCount: count };
};

const getTokenRedemptionOrder = async (options: getRedemptionOrderPayload) => {
  const {
    entity_type_id,
    user_entity_id,
    offset = 0,
    limit = 0,
    search = "",
    status_filter,
    start_date,
    end_date,
    order_fulfillment_filter,
    token_id,
  } = options;

  // For Token Order Status Filters
  const status_filters: any[] =
    status_filter && typeof status_filter === "string"
      ? status_filter === ""
        ? []
        : status_filter.split(",")
      : Array.isArray(status_filter)
      ? status_filter
      : [];

  // For Order Fulfillment Filter
  const order_fulfillment_filters: any[] =
    order_fulfillment_filter && typeof order_fulfillment_filter === "string"
      ? order_fulfillment_filter === ""
        ? []
        : order_fulfillment_filter.split(",")
      : Array.isArray(order_fulfillment_filter)
      ? order_fulfillment_filter
      : [];

  // Getting Rows & Count Data of Redemption Orders
  const { rows, count } = await TokenOrders.getRedmptionOrderData({
    entity_type_id,
    user_entity_id,
    offset,
    limit,
    search,
    status_filters,
    order_fulfillment_filters,
    start_date,
    end_date,
    token_id,
  });

  return { page: rows, count: rows?.length, totalCount: count };
};

const getTokenSubscriptionOrderAsCSV = async (
  options: getTokenSubscriptionOrderAsCSVPayload
) => {
  try {
    const {
      entity_type_id,
      user_entity_id,
      search = "",
      status_filter,
      investment_currency_filter,
      start_date,
      end_date,
      order_fulfillment_filter,
      token_id,
    } = options;

    // For Token Order Status Filters
    const status_filters: any[] =
      status_filter && typeof status_filter === "string"
        ? status_filter === ""
          ? []
          : status_filter.split(",")
        : Array.isArray(status_filter)
        ? status_filter
        : [];

    // For Investment Currency Filters
    const investment_currency_filters: any[] =
      investment_currency_filter &&
      typeof investment_currency_filter === "string"
        ? investment_currency_filter === ""
          ? []
          : investment_currency_filter.split(",")
        : Array.isArray(investment_currency_filter)
        ? investment_currency_filter
        : [];

    // For Order Fulfillment Filter
    const order_fulfillment_filters: any[] =
      order_fulfillment_filter && typeof order_fulfillment_filter === "string"
        ? order_fulfillment_filter === ""
          ? []
          : order_fulfillment_filter.split(",")
        : Array.isArray(order_fulfillment_filter)
        ? order_fulfillment_filter
        : [];

    // Getting All Subscription Order Data
    const data: any = await TokenOrders.getSubscriptionOrderDataAsCSV({
      entity_type_id,
      user_entity_id,
      search,
      status_filters,
      investment_currency_filters,
      order_fulfillment_filters,
      start_date,
      end_date,
      token_id,
    });

    if (!data || !data?.rows || data?.rows?.length <= 0) {
      return {
        code: 204,
        message: "No Data found",
      };
    }

    // Construct Json Data For CSV/Excel Export File
    let excelData: any;

    /* For Admin */
    if (entity_type_id === 1) {
      excelData =
        data?.rows?.length > 0 &&
        data?.rows?.map((item: any) => ({
          Investor: item?.investor_name ?? "",
          Issuer: item?.issuer_name ?? "",
          Status: item?.status_name ?? "",
          "Creation Date": item?.creation_date
            ? dateTime.formatDate(item?.creation_date)
            : "",
          "Amount to pay": item?.amount_to_pay ?? "",
          "Tokens ordered": item?.token_ordered ?? "",
          "Confirmed Payment": item?.confirmed_payment ?? "",
          "Tokens confirmed": item?.confirmed_tokens ?? "",
          "Token Price": item?.token_price ?? "",
          "Order fulfillment":
            item?.fulfilled_by === "issuer"
              ? "Fulfilled by Issuer"
              : item?.fulfilled_by === "admin"
              ? "Forwarded To Admin"
              : "",
          "Email id": item?.email_id ?? "",
          "Payment reference": item?.payment_reference ?? "",
          TxHash: item?.transaction_hash ?? "",
        }));
    }
    /* For Issuer */
    if (entity_type_id === 3) {
      excelData =
        data?.rows?.length > 0 &&
        data?.rows?.map((item: any) => ({
          Investor: item?.investor_name ?? "",
          Status: item?.status_name ?? "",
          "Creation Date": item?.creation_date
            ? dateTime.formatDate(item?.creation_date)
            : "",
          "Amount to pay": item?.amount_to_pay ?? "",
          "Tokens ordered": item?.token_ordered ?? "",
          "Confirmed Payment": item?.confirmed_payment ?? "",
          "Tokens confirmed": item?.confirmed_tokens ?? "",
          "Token Price": item?.token_price ?? "",
          "Email id": item?.email_id ?? "",
          "Payment reference": item?.payment_reference ?? "",
          TxHash: item?.transaction_hash ?? "",
        }));
    }
    /* For Investor */
    if (entity_type_id === 2) {
      excelData =
        data?.rows?.length > 0 &&
        data?.rows?.map((item: any) => ({
          "Token Name": item?.token_name ?? "",
          ISIN: item?.token_isin ?? "",
          Status: item?.status_name ?? "",
          "Creation Date": item?.creation_date
            ? dateTime.formatDate(item?.creation_date)
            : "",
          "Amount to pay": item?.amount_to_pay ?? "",
          "Tokens ordered": item?.token_ordered ?? "",
          "Confirmed Payment": item?.confirmed_payment ?? "",
          "Tokens confirmed": item?.confirmed_tokens ?? "",
          "Token Price": item?.token_price ?? "",
          "Payment reference": item?.payment_reference ?? "",
          TxHash: item?.transaction_hash ?? "",
        }));
    }

    return {
      code: 200,
      data: excelData,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getTokenRedemptionOrderAsCSV = async (
  options: getTokenRedemptionOrderAsCSVPayload
) => {
  try {
    const {
      entity_type_id,
      user_entity_id,
      search = "",
      status_filter,
      start_date,
      end_date,
      order_fulfillment_filter,
      token_id,
    } = options;

    // For Token Order Status Filters
    const status_filters: any[] =
      status_filter && typeof status_filter === "string"
        ? status_filter === ""
          ? []
          : status_filter.split(",")
        : Array.isArray(status_filter)
        ? status_filter
        : [];

    // For Order Fulfillment Filter
    const order_fulfillment_filters: any[] =
      order_fulfillment_filter && typeof order_fulfillment_filter === "string"
        ? order_fulfillment_filter === ""
          ? []
          : order_fulfillment_filter.split(",")
        : Array.isArray(order_fulfillment_filter)
        ? order_fulfillment_filter
        : [];

    // Getting All Redemption Order Data
    const data: any = await TokenOrders.getRedemptionOrderDataAsCSV({
      entity_type_id,
      user_entity_id,
      search,
      status_filters,
      order_fulfillment_filters,
      start_date,
      end_date,
      token_id,
    });

    if (!data || !data?.rows || data?.rows?.length <= 0) {
      return {
        code: 204,
        message: "No Data found",
      };
    }

    // Construct Json Data For CSV/Excel Export File
    let excelData: any;

    /* For Admin */
    if (entity_type_id === 1) {
      excelData =
        data?.rows?.length > 0 &&
        data?.rows?.map((item: any) => ({
          Investor: item?.investor_name ?? "",
          Issuer: item?.issuer_name ?? "",
          Status: item?.status_name ?? "",
          "Creation Date": item?.creation_date
            ? dateTime.formatDate(item?.creation_date)
            : "",
          "Tokens ordered": item?.token_ordered ?? "",
          "Token price": item?.token_price ?? "",
          "Token price time": item?.token_price_time ?? "",
          "Amount to pay": item?.amount_to_pay ?? "",
          "Order fulfillment":
            item?.fulfilled_by === "issuer"
              ? "Fulfilled by Issuer"
              : item?.fulfilled_by === "admin"
              ? "Forwarded To Admin"
              : "",
        }));
    }
    /* For Issuer */
    if (entity_type_id === 3) {
      excelData =
        data?.rows?.length > 0 &&
        data?.rows?.map((item: any) => ({
          Investor: item?.investor_name ?? "",
          Status: item?.status_name ?? "",
          "Creation Date": item?.creation_date
            ? dateTime.formatDate(item?.creation_date)
            : "",
          "Tokens ordered": item?.token_ordered ?? "",
          "Token Price": item?.token_price ?? "",
          "Token price time": item?.token_price_time ?? "",
          "Amount to pay": item?.amount_to_pay ?? "",
        }));
    }
    /* For Investor */
    if (entity_type_id === 2) {
      excelData =
        data?.rows?.length > 0 &&
        data?.rows?.map((item: any) => ({
          "Token Name": item?.token_name ?? "",
          ISIN: item?.token_isin ?? "",
          Status: item?.status_name ?? "",
          "Creation Date": item?.creation_date
            ? dateTime.formatDate(item?.creation_date)
            : "",
          "Tokens ordered": item?.token_ordered ?? "",
          "Token Price": item?.token_price ?? "",
          "Token price time": item?.token_price_time ?? "",
          "Amount to receive": item?.amount_to_pay ?? "",
        }));
    }

    return {
      code: 200,
      data: excelData,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const viewOrderDetails = async ({ id }: { id: string }) => {
  // Get Token Order Details
  const data = await TokenOrders.viewOrderDetails({
    token_order_id: id,
  });

  return {
    resData: data,
  };
};

const cancelOrder = async ({
  user_profile_id,
  user_entity_id,
  id,
}: {
  user_profile_id: string;
  user_entity_id: string;
  id: string;
}) => {
  // Update Cancel Order Details
  const result: any = await sequelize.transaction(async (transaction) => {
    // Update Token Order Status With Track Id
    await TokenOrders.update(
      {
        options: {
          status_id: 7, // 7--> Canceled By Invstor
          updated_by: user_profile_id,
        },
        id: id,
      },
      transaction
    );

    // Track Actions Of Order Cancel
    const track_id = await TrackTokenOrderActions.create(
      {
        user_profile_id,
        user_entity_id,
        action_status_id: 7,
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
        id: id,
      },
      transaction
    );

    return { message: successCustomMessage.orderCancelled };
  });

  return result;
};

const confirmPayment = async ({
  user_profile_id,
  user_entity_id,
  id,
  received_payment,
  status_id,
  is_mint_enabled,
}: {
  user_profile_id: string;
  user_entity_id: string;
  id: string;
  received_payment: number;
  status_id: number;
  is_mint_enabled: boolean;
}) => {
  // Update Confrim Payment / Reject Order Details
  const result: any = await sequelize.transaction(async (transaction) => {
    // Update Token Order Status With Track Id
    await TokenOrders.update(
      {
        options: {
          status_id:
            is_mint_enabled === true && status_id === 3
              ? status_id
              : status_id === 8
              ? status_id
              : 9, // 3 --> Payment Confirmed | 8 --> Rejected By Issuer | 9 --> Request to mint
          recived_amount_in_euro:
            status_id === 3 ? received_payment : undefined,
          is_payment_confirmed: status_id === 3 ? true : false,
          updated_by: user_profile_id,
        },
        id: id,
      },
      transaction
    );

    // Track Actions Of Order Payment Confirm / Reject
    const track_id = await TrackTokenOrderActions.create(
      {
        user_profile_id,
        user_entity_id,
        action_status_id:
          is_mint_enabled === true && status_id === 3
            ? status_id
            : status_id === 8
            ? status_id
            : 9,
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
        id: id,
      },
      transaction
    );

    return {
      message:
        status_id === 3
          ? successCustomMessage.paymentConfirmed
          : status_id === 8
          ? successCustomMessage.paymentRejected
          : "",
    };
  });

  return result;
};

const sendPayment = async ({
  user_profile_id,
  user_entity_id,
  id,
  status_id,
  is_burn_enabled,
  amount_to_pay,
  payment_reference,
}: {
  user_profile_id: string;
  user_entity_id: string;
  id: string;
  status_id: number;
  is_burn_enabled: boolean;
  amount_to_pay?: number;
  payment_reference?: string;
}) => {
  // Update Send Payment / Reject Order Payment Status
  const result: any = await sequelize.transaction(async (transaction) => {
    // Update Token Order Status With Track Id
    await TokenOrders.update(
      {
        options: {
          status_id:
            is_burn_enabled === true && status_id === 4
              ? status_id
              : status_id === 8
              ? status_id
              : 10, // 3 --> Payment Sent | 8 --> Rejected By Issuer | 10 --> Request to burn
          recived_amount_in_euro: status_id === 4 ? amount_to_pay : undefined,
          payment_reference: status_id === 4 ? payment_reference : undefined,
          is_payment_confirmed: status_id === 4 ? true : false,
          updated_by: user_profile_id,
        },
        id: id,
      },
      transaction
    );

    // Track Actions Of Order Payment Send / Reject
    const track_id = await TrackTokenOrderActions.create(
      {
        user_profile_id,
        user_entity_id,
        action_status_id:
          is_burn_enabled === true && status_id === 4
            ? status_id
            : status_id === 8
            ? status_id
            : 10,
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
        id: id,
      },
      transaction
    );

    return {
      message:
        status_id === 4
          ? successCustomMessage.paymentSend
          : status_id === 8
          ? successCustomMessage.paymentRejected
          : "",
    };
  });

  return result;
};

const getOrderGraph = async ({
  user_entity_id,
  offset = 0,
  limit = 10,
  from_date,
  to_date,
}: {
  user_entity_id?: string;
  offset?: number;
  limit?: number;
  from_date?: string;
  to_date?: string;
}) => {
  // Get Token Order Graph Data
  const { rows, count } = await TokenOrders.getTokenOrderGraph({
    user_entity_id,
    offset,
    limit,
    from_date,
    to_date,
  });

  return { page: rows, count: rows?.length, totalCount: count };
};

const getTokensByInvestorGraph = async ({
  user_entity_id,
  from_date,
  to_date,
}: {
  user_entity_id?: string;
  from_date?: string;
  to_date?: string;
}) => {
  // Get Token Order Graph Data
  const result: any = await TokenOrders.getTokensByInvestorGraph({
    user_entity_id,
    from_date,
    to_date,
  });

  return { page: result?.rows, count: result?.count };
};

const getDashboard = async ({
  user_entity_id,
}: {
  user_entity_id?: string;
}) => {
  // Get Dashboard
  const result: any = await TokenOrders.getDashboard({
    user_entity_id,
  });

  return result;
};

const getTokensHoldingsGraph = async ({
  user_entity_id,
  from_date,
  to_date,
}: {
  user_entity_id?: string;
  from_date?: string;
  to_date?: string;
}) => {
  // Get Token Holdings Graph Data
  const result: any = await TokenOrders.getTokensHoldingsGraph({
    user_entity_id,
    from_date,
    to_date,
  });

  return { page: result?.rows, count: result?.count };
};

const getCurrentTokenListing = async ({
  user_entity_id,
  offset,
  limit,
}: {
  user_entity_id?: string;
  offset: number;
  limit: number;
}) => {
  // Get Current Token Investment for Investor
  const result: any = await TokenOrders.getCurrentTokenInvestment({
    user_entity_id,
    offset,
    limit,
  });

  return {
    page: result?.rows,
    count: result?.length,
    totalCount: result?.count,
  };
};

const getInvestorDashboard = async ({
  user_entity_id,
}: {
  user_entity_id?: string;
}) => {
  // Get Investor Dashboard
  const result: any = await TokenOrders.getInvestorDashboard({
    user_entity_id,
  });

  return result;
};

const getTokenOrdersGraph = async ({
  user_entity_id,
  from_date,
  to_date,
  token_offering_id,
}: {
  user_entity_id?: string;
  from_date?: string;
  to_date?: string;
  token_offering_id?: string;
}) => {
  // Get Token Orders Graph Data
  const result: any = await TokenOrders.getTokenOrdersGraph({
    user_entity_id,
    from_date,
    to_date,
    token_offering_id,
  });

  return { page: result?.rows, count: result?.count };
};

const getTokenSummaryRecentActivities = async ({
  user_entity_id,
  token_offering_id,
}: {
  user_entity_id?: string;
  token_offering_id?: string;
}) => {
  token_offering_id;
  // Get Token Summary & Recent Activites
  const result: any = await TokenOrders.getTokenSummaryRecentActivities({
    user_entity_id,
    token_offering_id,
  });

  return result;
};

const getInvestorDistribution = async ({
  user_entity_id,
  token_offering_id,
  investor_distribution_by,
}: {
  user_entity_id?: string;
  token_offering_id?: string;
  investor_distribution_by?: string;
}) => {
  token_offering_id;
  // Get Token Distribution Data
  const result: any = await TokenOrders.getInvestorDistribution({
    user_entity_id,
    token_offering_id,
    investor_distribution_by,
  });

  return result;
};

const rejectOrder = async ({
  user_profile_id,
  user_entity_id,
  id,
  reason_for_reject,
  rejected_blockchain_reference_id,
  remarks,
}: {
  user_profile_id: string;
  user_entity_id: string;
  id: string;
  reason_for_reject: string;
  rejected_blockchain_reference_id: string;
  remarks?: string;
}) => {
  // Update Reject Order Details
  const result: any = await sequelize.transaction(async (transaction) => {
    // Update Token Order Status As Rejected With Track Id
    await TokenOrders.update(
      {
        options: {
          status_id: 8, // 8--> Rejected By Issuer
          updated_by: user_profile_id,
          reason_for_reject,
          rejected_blockchain_reference_id,
          remarks,
        },
        id: id,
      },
      transaction
    );

    // Track Actions Of Order Rejection
    const track_id = await TrackTokenOrderActions.create(
      {
        user_profile_id,
        user_entity_id,
        action_status_id: 8,
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
        id: id,
      },
      transaction
    );

    return { message: successCustomMessage.orderRejected };
  });

  return result;
};

export default {
  createTokenSubscriptionOrders,
  getTokenOrder,
  createTokenRedemptionOrders,
  getTokenSubscriptionOrder,
  getTokenRedemptionOrder,
  getTokenSubscriptionOrderAsCSV,
  getTokenRedemptionOrderAsCSV,
  viewOrderDetails,
  cancelOrder,
  confirmPayment,
  sendPayment,
  getOrderGraph,
  getTokensByInvestorGraph,
  getDashboard,
  getTokensHoldingsGraph,
  getCurrentTokenListing,
  getInvestorDashboard,
  getTokenOrdersGraph,
  getTokenSummaryRecentActivities,
  getInvestorDistribution,
  rejectOrder,
};
