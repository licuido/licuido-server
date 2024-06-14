import { Logger } from "@helpers";
import { MasterOrderStatus } from "@services";

// get all master order status
const getAllMasterOrderStatusList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await MasterOrderStatus.findAll({
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
  getAllMasterOrderStatusList,
};
