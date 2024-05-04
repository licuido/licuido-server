import { Logger } from "@helpers";
import { EntityInvestor } from "@services";
import { UpsertInvestorQualifyStatusPayload } from "@types";

const UpsertInvestorQualifyStatus = async ({
  user_profile_id,
  id,
  status_id,
  investor_type_id,
  investor_entity_id,
}: UpsertInvestorQualifyStatusPayload) => {
  try {
    let res: string;

    // For Update
    if (id) {
      res = await EntityInvestor.update({
        id,
        status_id,
        user_profile_id,
      });
    }
    // For Create
    else {
      res = await EntityInvestor.create({
        status_id,
        investor_type_id,
        investor_entity_id,
        user_profile_id,
      });
    }

    return { id: res };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  UpsertInvestorQualifyStatus,
};
