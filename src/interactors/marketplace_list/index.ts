import { Logger } from "@helpers";
import { TokenOfferings } from "@services";

// get all investor tyoe
const getAllMarketPlaceList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await TokenOfferings.getAllTokenOfferings({
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
  getAllMarketPlaceList,
};
