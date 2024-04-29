import { Logger } from "@helpers";
import { MasterWallet } from "@services";

// get all wallet master
const getAllWalletMasterList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await MasterWallet.findAll({
      search,
      offset,
      limit,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
    getAllWalletMasterList,
};
