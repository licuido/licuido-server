import { Logger } from "@helpers";
import { MasterFundAgencyRatings } from "@services";

// get all master fund list
const getAllMasterFundAgencyRatingList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "",agency_id } = options;

    const { rows, count } = await MasterFundAgencyRatings.findAll({
      search,
      offset,
      limit,
      agency_id
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
    getAllMasterFundAgencyRatingList,
};
