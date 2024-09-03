import {
  Logger,
  currencyConvert,
  currencyDetails,
  dateTime,
  errorCustomMessage,
  fulfilledStatus,
  qualifiedStatus,
  successCustomMessage,
} from "@helpers";
import {
  TokenOfferings,
  TokenOrders,
  TokenTransactions,
  TrackTokenOrderActions,
} from "@services";
import {
  createTokenRedemptionOrderPayload,
  createTokenSubscriptionOrderPayload,
  getRedemptionOrderPayload,
  getSubscriptionOrderPayload,
  getTokenRedemptionOrderAsCSVPayload,
  getTokenSubscriptionOrderAsCSVPayload,
} from "@types";
import { sequelize } from "@utils";
import moment from "moment";

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

    const tokenOffering: any =
      await TokenOfferings.getTokenOfferingBaseCurrency(token_offering_id);

    const tokenconversionResponse = await currencyConvert({
      from_currency_code: currency_code,
      to_currency_code: tokenOffering?.base_currency,
      amount: net_investment_value,
    });
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
          currency:
            currency === tokenOffering?.base_currency_code
              ? currency
              : tokenOffering?.base_currency_code,
          currency_code:
            currency_code === tokenOffering?.base_currency
              ? currency_code
              : tokenOffering?.base_currency,
          ordered_tokens,
          price_per_token,
          net_investment_value,
          fee,
          total_paid,
          payment_reference,
          default_currency: default_currency,
          default_currency_code: default_currency_code,
          net_investment_value_in_euro: parseFloat(
            conversionResponse.toFixed(2)
          ),
          net_investment_value_by_token: parseFloat(
            tokenconversionResponse.toFixed(2)
          ),
          created_by: user_profile_id,
          is_active: true,
          status_id: 1, // Pending Order
          fulfilled_by: isFulfilledBylicuido ? "admin" : "issuer",
        },
        transaction
      );

      // Get Last Transaction Against Investor
      const lastTransacation =
        await TokenTransactions.getLatestTransactionAgainstInvestor(
          token_offering_id,
          user_entity_id
        );

      // Get Token Total Supply
      const totalSupply = await TokenTransactions.getTotalSupply(
        token_offering_id
      );

      let insertParams: any = {
        type: "mint",
        order_id: tokenOrderId,
        amount: ordered_tokens,
        status_id: 1, // Pending
        created_by: user_profile_id,
        is_active: true,
      };

      // If first time transaction we can't add previous balance
      if (lastTransacation?.length === 0) {
        insertParams["sender_balance"] = 0;
        insertParams["block_token"] = 0;
        insertParams["unblock_token"] = 0;
      }

      // If already had a transaction we add previous balance
      if (lastTransacation?.length > 0) {
        let sender_balance = lastTransacation?.[0]?.sender_balance ?? 0;
        let unblock_token = lastTransacation?.[0]?.unblock_token ?? 0;
        insertParams["sender_balance"] = parseFloat(sender_balance);
        insertParams["unblock_token"] = parseFloat(unblock_token);
        insertParams["block_token"] = 0;
      }

      //note : later we need to add from block chain network

      // If there is no total supply assign order token
      if (totalSupply?.length === 0) {
        insertParams["total_supply"] = 0;
      }

      // If there is total supply assign sum to total supply
      if (totalSupply?.length > 0) {
        const total_supply = totalSupply?.[0]?.total_supply ?? 0;
        insertParams["total_supply"] = total_supply;
      }

      // Create Token Transactions Table Record
      await TokenTransactions.createTransactions(insertParams, transaction);

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

    const tokenOffering: any =
      await TokenOfferings.getTokenOfferingBaseCurrency(token_offering_id);

    const tokenconversionResponse = await currencyConvert({
      from_currency_code: currency_code,
      to_currency_code: tokenOffering?.base_currency,
      amount: net_investment_value,
    });

    const default_currency = "€";
    const default_currency_code = "EUR";
    const amount = ordered_tokens * tokenOffering?.offering_price;

    const conversionResponse = await currencyConvert({
      from_currency_code: currency_code,
      to_currency_code: default_currency_code,
      amount: amount,
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
          currency:
            currency === tokenOffering?.base_currency_code
              ? currency
              : tokenOffering?.base_currency_code,
          currency_code:
            currency_code === tokenOffering?.base_currency
              ? currency_code
              : tokenOffering?.base_currency,
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
          fulfilled_by: isFulfilledBylicuido ? "admin" : "issuer",
          default_currency: default_currency,
          default_currency_code: default_currency_code,
          net_investment_value_in_euro: parseFloat(
            conversionResponse.toFixed(2)
          ),
          net_investment_value_by_token: parseFloat(
            tokenconversionResponse.toFixed(2)
          ),
        },
        transaction
      );

      // Get Last Transaction
      const lastTransacation =
        await TokenTransactions.getLatestTransactionAgainstInvestor(
          token_offering_id,
          user_entity_id
        );

      // Get Token Total Supply
      const totalSupply = await TokenTransactions.getTotalSupply(
        token_offering_id
      );

      let insertParams: any = {
        type: "burn",
        order_id: tokenOrderId,
        amount: ordered_tokens,
        status_id: 1,
        created_by: user_profile_id,
        is_active: true,
      };

      // if first time transaction we can't add previous balance
      if (lastTransacation?.length === 0) {
        return {
          code: 500,
          customMessage: "You don't have a token to burn",
          data: {},
        };
      }

      if (lastTransacation?.length > 0) {
        let sender_balance = lastTransacation?.[0]?.sender_balance ?? 0;

        if (parseFloat(sender_balance) < ordered_tokens) {
          return {
            code: 500,
            customMessage: `your balance is ${sender_balance} but you try to burn ${ordered_tokens}`,
            data: {},
          };
        }
        let unblock_token = lastTransacation?.[0]?.unblock_token ?? 0;

        insertParams["sender_balance"] = parseFloat(sender_balance);
        insertParams["unblock_token"] =
          parseFloat(unblock_token) - ordered_tokens;
        insertParams["block_token"] = ordered_tokens;
      }

      // Total Supply
      if (totalSupply?.length > 0) {
        const total_supply = totalSupply?.[0]?.total_supply ?? 0;
        insertParams["total_supply"] = parseFloat(total_supply ?? 0);
      }

      // Create Token Transactions Table Record
      await TokenTransactions.createTransactions(insertParams, transaction);

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

    await TokenTransactions.UpdateTransactions(
      {
        options: {
          status_id: 3, // Failed
          updated_by: user_profile_id,
        },
        order_id: id,
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

    const order = await TokenOrders.getOrder({ token_order_id: id });

    // const euroConvert = await currencyConvert({
    //   from_currency_code: order?.currency_code,
    //   to_currency_code: "EUR",
    //   amount: Number(received_payment),
    // });

    // const tokenConvert = await currencyConvert({
    //   from_currency_code: order?.currency_code,
    //   to_currency_code: order?.token_offering?.base_currency,
    //   amount: Number(received_payment),
    // });

    if (received_payment !== order?.net_investment_value) {
      return {
        message: successCustomMessage?.amountMismatch,
      };
    }

    await TokenOrders.update(
      {
        options: {
          status_id:
            is_mint_enabled === true && status_id === 3
              ? status_id
              : status_id === 8
              ? status_id
              : 9, // 3 --> Payment Confirmed | 8 --> Rejected By Issuer | 9 --> Request to mint
          recived_amount_by_token:
            status_id === 3 ? received_payment : undefined,
          is_payment_confirmed: status_id === 3 ? true : false,
          updated_by: user_profile_id,
        },
        id: id,
      },
      transaction
    );

    // If Reject By issuer
    if (status_id === 8) {
      await TokenTransactions.UpdateTransactions(
        {
          options: {
            status_id: 3, // Failed
            updated_by: user_profile_id,
          },
          order_id: id,
        },
        transaction
      );
    }

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
  // const euroConvert = await currencyConvert({
  //   from_currency_code: order?.currency_code,
  //   to_currency_code: "EUR",
  //   amount: Number(amount_to_pay),
  // });

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
          payment_reference: status_id === 4 ? payment_reference : undefined,
          recived_amount_by_token: status_id === 4 ? amount_to_pay : undefined,
          is_payment_confirmed: status_id === 4 ? true : false,
          updated_by: user_profile_id,
        },
        id: id,
      },
      transaction
    );

    // If Reject By issuer
    if (status_id === 8) {
      await TokenTransactions.UpdateTransactions(
        {
          options: {
            status_id: 3, // Failed
            updated_by: user_profile_id,
          },
          order_id: id,
        },
        transaction
      );
    }

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
  request,
}: {
  user_entity_id?: string;
  offset?: number;
  limit?: number;
  from_date?: string;
  to_date?: string;
  request?: any;
}) => {
  // Get Token Order Graph Data
  const { rows, count } = await TokenOrders.getTokenOrderGraph({
    user_entity_id,
    offset,
    limit,
    from_date,
    to_date,
    request,
  });

  return { page: rows, count: rows?.length, totalCount: count };
};

const getTokensByInvestorGraph = async ({
  user_entity_id,
  from_date,
  to_date,
  request,
}: {
  user_entity_id?: string;
  from_date?: string;
  to_date?: string;
  request?: any;
}) => {
  // Get Token Order Graph Data
  const result: any = await TokenOrders.getTokensByInvestorGraph({
    user_entity_id,
    from_date,
    to_date,
    request,
  });

  return { page: result?.rows, count: result?.count };
};

const getDashboard = async ({
  user_entity_id,
  currency,
}: {
  user_entity_id?: string;
  currency: string;
}) => {
  let currency_codes: any = await currencyDetails.getTokenCurrencyDetails({
    issuer_entity_id: user_entity_id,
  });

  let currency_values = [];
  for (const item of currency_codes) {
    let convertedamount = await currencyConvert({
      from_currency_code: item,
      to_currency_code: "EUR",
      amount: 1,
    });

    currency_values.push({
      currency_code: item,
      euro_value: parseFloat(convertedamount.toFixed(2)),
    });
  }

  // Get Dashboard
  const result: any = await TokenOrders.getDashboard({
    user_entity_id,
    currency,
    currency_values,
  });

  return result;
};

const getTokenDeploymentCount = async ({
  start_date,
  end_date,
}: {
  start_date?: string;
  end_date?: string;
}) => {
  // Get TokenDeploymentCount
  const result: any = await TokenOrders.getTokenDeploymentCount({
    start_date,
    end_date,
  });

  return result;
};

const getIssuerApprovalCount = async ({
  start_date,
  end_date,
}: {
  start_date?: string;
  end_date?: string;
}) => {
  // Get IssuerApprovalCount
  const result: any = await TokenOrders.getIssuerApprovalCount({
    start_date,
    end_date,
  });

  return result;
};

const getTotalInvestmentIssuersInvestorsCount = async ({
  start_date,
  end_date,
}: {
  start_date?: string;
  end_date?: string;
}) => {
  // Get IssuerApprovalCount
  const result: any = await TokenOrders.getTotalInvestmentIssuersInvestorsCount(
    {
      start_date,
      end_date,
    }
  );

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
  currency,
}: {
  user_entity_id?: string;
  currency?: string;
}) => {
  // Get Investor Dashboard
  const result: any = await TokenOrders.getInvestorDashboard({
    user_entity_id,
    currency,
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

    // If Reject By issuer
    await TokenTransactions.UpdateTransactions(
      {
        options: {
          status_id: 3, // Failed
          updated_by: user_profile_id,
        },
        order_id: id,
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
const calculation = (startDate: any, endDate: any, arr1: any, arr2: any) => {
  const datesArray = [];
  let currentDate = startDate;

  while (currentDate.isSameOrBefore(endDate)) {
    datesArray.push(currentDate.format("YYYY-MM-DD"));
    currentDate.add(1, "day");
  }

  // Calculate progress array
  const progressArray = datesArray.map((date) => {
    // Get the closest valuation price available on or before the current date
    const applicableValuation = arr2.reduce((closest: any, current: any) => {
      if (
        moment(current.date).isSameOrBefore(date) &&
        (!closest || moment(current.date).isAfter(closest.date))
      ) {
        return current;
      }
      return closest;
    }, null);

    // Get the balance from arr1 (assuming the balance stays constant for the 90 days)
    const balance = arr1[0].sender_balance;

    // Calculate the result for the current date
    const calculatedValue =
      balance * (applicableValuation ? applicableValuation.valuation_price : 0);

    return {
      date: date,
      value: calculatedValue,
    };
  });
  return progressArray;
};
const mergeValuesByDate = (arrays: any) => {
  const result: any = {};

  arrays.forEach((array: any) => {
    array.forEach((item: any) => {
      const date: any = item.date;
      if (!result[date]) {
        result[date] = 0;
      }
      result[date] += item.value;
    });
  });

  return Object.keys(result).map((date) => ({
    date: date,
    value: result[date],
  }));
};

const getInvestorlast3MonthsPerformance = async ({
  user_entity_id,
  from_date,
  to_date,
}: {
  user_entity_id?: string;
  from_date?: string;
  to_date?: string;
}) => {
  // Get Valuation Price Data

  // Get Token Holdings Data
  const tokenHoldings: any = await TokenOrders.getInvestorTokenHoldings({
    user_entity_id,
  });
  let token_ids: any = [];
  for (const tokenHold of tokenHoldings) {
    token_ids?.push(tokenHold?.token_offering_id);
  }

  const TokenValuationPrice: any =
    token_ids?.length > 0
      ? await TokenOrders.getValuationPrice({
          from_date,
          to_date,
          token_ids,
        })
      : [];

  let graphData: any = [];

  const dates: any = [];
  tokenHoldings.map((vl: any) => {
    const matchingEntry = TokenValuationPrice.find(
      (entry2: any) => entry2.token_id === vl.token_offering_id
    );
    let datevalues = calculation(
      moment(from_date, "YYYY-MM-DD"),
      moment(to_date, "YYYY-MM-DD"),
      vl?.aggregated_balance_json ?? [],
      matchingEntry?.aggregated_valuations ?? []
    );
    dates.push(datevalues);
  });
  graphData = mergeValuesByDate(dates);

  let totalInvestment: any = await TokenOrders.getInvestorDashboard({
    user_entity_id,
  });

  return {
    graphData,
    profitPercentage: totalInvestment?.percentage_change ?? 0,
  };
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
  getTokenDeploymentCount,
  getIssuerApprovalCount,
  getTotalInvestmentIssuersInvestorsCount,
  getInvestorlast3MonthsPerformance,
};
