import { Logger } from "@helpers";
import { MasterBusinessSectors } from "@services";

// get all countries
const getAllMasterBusinessSectorsList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await MasterBusinessSectors.findAll({
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
  getAllMasterBusinessSectorsList,
};
