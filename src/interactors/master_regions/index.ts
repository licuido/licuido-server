import { Logger } from "@helpers";
import { MasterRegion } from "@services";

// get all countries
const getAllRegionList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await MasterRegion.findAll({
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
  getAllRegionList,
};
