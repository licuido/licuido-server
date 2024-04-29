import { Logger } from "@helpers";
import { MasterInvestorTypes } from "@services";

// get all investor tyoe
const getAllInvestorTypesList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await MasterInvestorTypes.findAll({
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
  getAllInvestorTypesList,
};
