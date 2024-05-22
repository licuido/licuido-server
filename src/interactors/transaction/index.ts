import { Logger } from "@helpers";
import { TokenOrders, TokenTransactions } from "@services";

const mintToken = async (params: any) => {
  try {
    const { order_id } = params;
    const tokenOrders = await TokenOrders.getOrderToken({
      token_order_id: order_id,
    });

    const { receiver_entity_id, token_offering_id } = tokenOrders;

    const lastTransacation =
      await TokenTransactions.getLatestTransactionAgainstInvestor(
        token_offering_id,
        receiver_entity_id
      );

    let inserParams = {
      type: "mint",
      order_id,
      // amount: number;
      // sender_balance: number;
      // receiver_balance: number;
      // total_supply: number;
      // transaction_hash: string;
      // status_id: number;
      // block_token: number;
      // unblock_token: number;
      // created_by?:string;
    };

    if (lastTransacation?.length === 0) {
    }

    return {
      success: true,
      data: inserParams,
      message: "done",
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default { mintToken };
