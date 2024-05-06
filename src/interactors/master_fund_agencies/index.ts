import { Logger } from "@helpers";
import { MasterFundAgency } from "@services";

// get all master fund list
const getAllMasterFundAgencyList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await MasterFundAgency.findAll({
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
    getAllMasterFundAgencyList,
};
