import { Logger } from "@helpers";
import { Countries } from "@services";

export function groupByRegion(array: any[]) {
  return array.reduce((result: Record<string, any[]>, obj: any) => {
    const key = obj?.region?.name;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(obj);
    return result;
  }, {} as Record<string, any[]>);
}

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

// get all countries based on regions
const getAllCountriesListGroupByRegion = async (options: any) => {
  try {
    const { search = "" } = options;

    const { rows } = await Countries.findAllCountriesBasedRegion({
      search,
    });

    const result = groupByRegion(rows);

    return { page: result };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// get all currencies
const getAllCurrenciesList = async (options: any) => {
  try {
    const { offset = 0, limit = 0, search = "" } = options;

    const { rows, count } = await Countries.findAllCurrencies({
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
  getAllCountriesList,
  getAllCountriesListGroupByRegion,
  getAllCurrenciesList,
};
