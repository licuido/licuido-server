import { Logger } from "@helpers";
import { MasterTokenTypes } from "@services";

// get all wallet master
const getAllMasterTokenTypesList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await MasterTokenTypes.findAll({
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
  getAllMasterTokenTypesList,
};
