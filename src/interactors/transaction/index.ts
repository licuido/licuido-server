import { Logger } from "@helpers";
import {
  TokenOrders,
  TokenTransactions,
  TrackTokenOrderActions,
} from "@services";

const mintToken = async (params: any) => {
  try {
    const { order_id, user_profile_id, user_entity_id } = params;
    // get order detail to get transaction made by perticular token investor transaction
    const tokenOrders = await TokenOrders.getOrderToken({
      token_order_id: order_id,
    });

    const {
      receiver_entity_id,
      token_offering_id,
      total_paid,
      ordered_tokens,
      type,
      status_id,
    } = tokenOrders;

    //validate order type is subscription
    if (type !== "subscription") {
      return {
        success: false,
        message: "Only Subscription Will be mint",
      };
    }
    //validate order already burn
    if (status_id === 5) {
      return {
        success: false,
        message: "Order was already burned",
      };
    }
    // get latest token investor transaction for balance calculation
    const lastTransacation =
      await TokenTransactions.getLatestTransactionAgainstInvestor(
        token_offering_id,
        receiver_entity_id
      );

    // get totalsupply
    const totalSupply = await TokenTransactions.getTotalSupply(
      token_offering_id
    );

    let inserParams: any = {
      type: "mint",
      order_id,
      amount: total_paid,
      status_id: 2,
      created_by: user_profile_id,
      is_active: true,
    };

    //note : later we need to add total_supply

    //if first time transaction we can't add previouse balance
    if (lastTransacation?.length === 0) {
      inserParams["sender_balance"] = parseFloat(ordered_tokens);
      inserParams["unblock_token"] = parseFloat(ordered_tokens);
      inserParams["block_token"] = 0;
    }

    //if already had atransaction we add previouse balance
    if (lastTransacation?.length !== 0) {
      let sender_balance = lastTransacation?.[0]?.sender_balance ?? 0;

      inserParams["sender_balance"] =
        parseFloat(ordered_tokens) + parseFloat(sender_balance);
      inserParams["unblock_token"] =
        parseFloat(ordered_tokens) + parseFloat(sender_balance);
      inserParams["block_token"] = 0;
    }

    //note : later we need to add from block chain network

    //if there is no total supply assign order token
    if (totalSupply?.length === 0) {
      inserParams["total_supply"] = parseFloat(ordered_tokens);
    }

    //if there is total supply assign sum to total supply
    if (totalSupply?.length !== 0) {
      const total_supply = totalSupply?.[0]?.total_supply ?? 0;
      inserParams["total_supply"] =
        parseFloat(ordered_tokens) + parseFloat(total_supply ?? 0);
    }

    //create transaction
    await TokenTransactions.createTransactions(inserParams).then(async () => {
      //update order status
      await TokenOrders.update({
        options: {
          status_id: 5,
          updated_by: user_profile_id,
        },
        id: order_id,
      });

      await TrackTokenOrderActions.create({
        user_profile_id,
        user_entity_id,
        action_status_id: 5,
        is_active: true,
        created_by: user_profile_id,
      });
    });

    return {
      success: true,
      message: "Token Successfully minted",
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const burnToken = async (params: any) => {
  try {
    const { order_id, user_profile_id, user_entity_id } = params;
    // get order detail to get transaction made by perticular token investor transaction
    const tokenOrders = await TokenOrders.getOrderToken({
      token_order_id: order_id,
    });

    const {
      receiver_entity_id,
      token_offering_id,
      ordered_tokens,
      type,
      net_investment_value,
    } = tokenOrders;

    //validate order type is subscription
    if (type !== "redemption") {
      return {
        success: false,
        message: "Only Redemption Will be Burn",
      };
    }
    // get latest token investor transaction for balance calculation
    const lastTransacation =
      await TokenTransactions.getLatestTransactionAgainstInvestor(
        token_offering_id,
        receiver_entity_id
      );

    // get totalsupply
    const totalSupply = await TokenTransactions.getTotalSupply(
      token_offering_id
    );

    let inserParams: any = {
      type: "burn",
      order_id,
      amount: net_investment_value,
      status_id: 2,
      created_by: user_profile_id,
      is_active: true,
    };

    //note : later we need to add total_supply

    //if first time transaction we can't add previouse balance
    if (lastTransacation?.length === 0) {
      return {
        success: false,
        message: "You don't have a token to burn",
      };
    }

    //if already had atransaction we add previouse balance
    if (lastTransacation?.length !== 0) {
      let sender_balance = lastTransacation?.[0]?.sender_balance ?? 0;

      if (parseFloat(sender_balance) < parseFloat(ordered_tokens)) {
        return {
          success: false,
          message: `your balance is ${sender_balance} but you try to burn ${ordered_tokens}`,
        };
      }

      inserParams["sender_balance"] =
        parseFloat(sender_balance) - parseFloat(ordered_tokens);
      inserParams["unblock_token"] =
        parseFloat(sender_balance) - parseFloat(ordered_tokens);
      inserParams["block_token"] = parseFloat(ordered_tokens);
    }

    //note : later we need to add from block chain network

    //if there is total supply assign sum to total supply
    if (totalSupply?.length !== 0) {
      const total_supply = totalSupply?.[0]?.total_supply ?? 0;
      inserParams["total_supply"] =
        parseFloat(total_supply ?? 0) - parseFloat(ordered_tokens);
    }

    //create transaction
    await TokenTransactions.createTransactions(inserParams).then(async () => {
      //update order status
      await TokenOrders.update({
        options: {
          status_id: 11,
          updated_by: user_profile_id,
        },
        id: order_id,
      });

      await TrackTokenOrderActions.create({
        user_profile_id,
        user_entity_id,
        action_status_id: 11,
        is_active: true,
        created_by: user_profile_id,
      });
    });

    return {
      success: true,
      message: "Token Successfully burned",
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

//get all tokens
const getAllTransactions = async (options: any) => {
  try {
    const {
      offset = 0,
      limit = 0,
      search = "",
      type,
      token_offering_id,
      start_date,
      status,
      end_date,
      issuer_id,
      investor_id,
    } = options;

    // For Status Filters
    const status_filters: any[] =
      status && typeof status === "string"
        ? status === ""
          ? []
          : status.split(",")
        : Array.isArray(status)
        ? status
        : [];

    // For type filter
    const type_filters: any[] =
      type && typeof type === "string"
        ? type === ""
          ? []
          : type.split(",")
        : Array.isArray(type)
        ? type
        : [];

    // Getting Rows & Count Data of Transaction
    const { rows, count } = await TokenTransactions.getAllTransaction({
      offset,
      limit,
      type: type_filters,
      token_offering_id,
      issuer_id,
      investor_id,
      search,
      status_filters,
      start_date,
      end_date,
    });

    const page = rows?.map((val) => {
      let isMint = val?.type === "mint";
      return {
        id: val?.id,
        type: val?.type,
        amount: val?.amount,
        token_name: val?.token_name,
        token_logo: val?.token_logo,
        total_supply: val?.total_supply,
        transaction_hash: val?.transaction_hash,
        creation_date: val?.creation_date,
        receiver_block: isMint ? val?.block_token : null,
        receiver_unblock: isMint ? val?.unblock_token : null,
        sender_block: isMint ? null : val?.unblock_token,
        sender_unblock: isMint ? null : val?.unblock_token,
        receiver_balance: isMint ? val?.sender_balance : null,
        sender_balance: isMint ? null : val?.sender_balance,
        sender_name: isMint ? null : val?.investor_name,
        sender_image: isMint ? null : val?.investor_logo,
        receiver_image: isMint ? val?.investor_logo : null,
        receiver_name: isMint ? val?.investor_name : null,
        issuer_name:val?.issuer_name,
        issuer_logo:val?.issuer_logo,
      };
    });

    return { page, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default { mintToken, burnToken, getAllTransactions };
