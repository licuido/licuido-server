import { Logger } from "@helpers";
import { EntityInvestor } from "@services";
import {
  UpsertInvestorQualifyStatusPayload,
  getInvestorListAsCSVPayload,
  getInvestorListPayload,
} from "@types";

const UpsertInvestorQualifyStatus = async ({
  user_profile_id,
  user_entity_id,
  id,
  status_id,
  investor_type_id,
  investor_entity_id,
}: UpsertInvestorQualifyStatusPayload) => {
  try {
    let res: string;

    // For Update
    if (id) {
      res = await EntityInvestor.update({
        id,
        status_id,
        user_profile_id,
      });
    }
    // For Create
    else {
      res = await EntityInvestor.create({
        status_id,
        investor_type_id,
        investor_entity_id,
        user_profile_id,
        user_entity_id,
      });
    }

    return { id: res };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getInvestorList = async (options: getInvestorListPayload) => {
  try {
    const {
      offset = 0,
      limit = 5,
      search = "",
      status_filter,
      investor_type_filter,
      country_filter,
      user_entity_id,
      minimum_investment_value,
      maximum_investment_value,
      request,
    } = options;

    // For Investor Status Filters
    const status_filters: any[] =
      status_filter && typeof status_filter === "string"
        ? status_filter === ""
          ? []
          : status_filter.split(",")
        : Array.isArray(status_filter)
        ? status_filter
        : [];

    // For Country Filters
    const country_filters: any[] =
      country_filter && typeof country_filter === "string"
        ? country_filter === ""
          ? []
          : country_filter.split(",")
        : Array.isArray(country_filter)
        ? country_filter
        : [];

    // For Investor Type Filters
    const investor_type_filters: any[] =
      investor_type_filter && typeof investor_type_filter === "string"
        ? investor_type_filter === ""
          ? []
          : investor_type_filter.split(",")
        : Array.isArray(investor_type_filter)
        ? investor_type_filter
        : [];

    // Getting Rows & Count Data of Investor
    const { rows, count } = await EntityInvestor.getInvestorListData({
      offset,
      limit,
      search,
      status_filters,
      investor_type_filters,
      country_filters,
      user_entity_id,
      minimum_investment_value,
      maximum_investment_value,
      request,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getInvestorListAsCSV = async (options: getInvestorListAsCSVPayload) => {
  try {
    const {
      search = "",
      status_filter,
      investor_type_filter,
      country_filter,
      user_entity_id,
      minimum_investment_value,
      maximum_investment_value,
    } = options;

    // For Investor Status Filters
    const status_filters: any[] =
      status_filter && typeof status_filter === "string"
        ? status_filter === ""
          ? []
          : status_filter.split(",")
        : Array.isArray(status_filter)
        ? status_filter
        : [];

    // For Country Filters
    const country_filters: any[] =
      country_filter && typeof country_filter === "string"
        ? country_filter === ""
          ? []
          : country_filter.split(",")
        : Array.isArray(country_filter)
        ? country_filter
        : [];

    // For Investor Type Filters
    const investor_type_filters: any[] =
      investor_type_filter && typeof investor_type_filter === "string"
        ? investor_type_filter === ""
          ? []
          : investor_type_filter.split(",")
        : Array.isArray(investor_type_filter)
        ? investor_type_filter
        : [];

    // Getting Rows & Count Data of Investor
    const data: any = await EntityInvestor.getInvestorListAsCSV({
      search,
      status_filters,
      investor_type_filters,
      country_filters,
      user_entity_id,
      minimum_investment_value,
      maximum_investment_value,
    });

    return data?.rows;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  UpsertInvestorQualifyStatus,
  getInvestorList,
  getInvestorListAsCSV,
};
