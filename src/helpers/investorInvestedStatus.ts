import { token_order } from "@models";

async function getInvestorInvestedStatus({
  token_id,
  investor_entity_id,
}: {
  token_id: string;
  investor_entity_id: string;
}): Promise<any> {
  try {
    // To Check given investor is invested for given token
    const investedCount: number = await token_order.count({
      where: {
        receiver_entity_id: investor_entity_id,
        token_offering_id: token_id,
        status_id: 5, // Subscription
      },
    });

    // If investedCount > 0 , Investor is Invested for that token
    if (investedCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export default { getInvestorInvestedStatus };
