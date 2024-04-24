import { Logger } from "@helpers";
import { Countries } from "@services";

// get all countries
const getAllCountriesList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "", region_id } = options;

    const { rows, count } = await Countries.findAll({
      search,
      offset,
      limit,
      region_id,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  getAllCountriesList,
};
