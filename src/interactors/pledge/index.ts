import { Logger } from "@helpers";
import { TokenPledge } from "@services";

// get all wallet master
const createPledge = async (options: any) => {
  try {
    const { token_offering_id, invester_id, issuer_id, pledge_token } = options;

    const { rows, count } = await TokenPledge.create({
      token_offering_id,
      invester_id,
      issuer_id,
      pledge_token,
      is_active: true,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};
const editPledge = async (options: any) => {
  try {
    const { edit_id, token_offering_id, invester_id, issuer_id, pledge_token } =
      options;

    const { rows, count } = await TokenPledge.update(
      {
        edit_id,
        token_offering_id,
        invester_id,
        issuer_id,
        pledge_token,
        is_active: true,
      },
      edit_id
    );

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  createPledge,
  editPledge,
};
