import { Logger } from "@helpers";
import { getInvestorCount } from "@services";

const getInvestorCountForQualification = async ({
  entity_type_id, // Investor
}: {
  entity_type_id: 1 | 2 | 3;
}) => {
  try {
    const count: number = await getInvestorCount({
      entity_type_id,
    });

    return count;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default { getInvestorCountForQualification };
