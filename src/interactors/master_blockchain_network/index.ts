import { Logger } from "@helpers";
import { MasterBlockChainNetworks } from "@services";

// get all master block chain network
const getAllMasterBlockChainList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await MasterBlockChainNetworks.findAll({
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
  getAllMasterBlockChainList,
};
