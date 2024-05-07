import { entity_investor } from "@models";

async function getInvestorQualifiedStatus({
  issuer_entity_id,
  investor_entity_id,
}: {
  issuer_entity_id: string;
  investor_entity_id: string;
}): Promise<any> {
  try {
    // To CHeck given investor is qualified for given issuer
    const qualifiedCount: number = await entity_investor.count({
      where: {
        investor_entity_id,
        issuer_entity_id,
        status_id: 3, // 3--> Approved
      },
    });

    // If qualifiedCount > 0 , Investor is qualified for that issuer
    if (qualifiedCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export default { getInvestorQualifiedStatus };
