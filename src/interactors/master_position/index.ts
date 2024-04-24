import { Logger } from "@helpers";
import { MasterPosition } from "@services";

// get all positions
const getAllMasterPositionList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await MasterPosition.findAll({
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
  getAllMasterPositionList,
};
