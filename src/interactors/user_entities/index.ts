import { Logger } from "@helpers";
import {
  getAllInvestorData,
  getInvestorCount,
  getInvestorData,
} from "@services";
import {
  getInvestorDataForQualificationCSVPayload,
  getInvestorDataForQualificationPayload,
} from "@types";

const getInvestorCountForQualification = async ({
  entity_type_id, // Investor
}: {
  entity_type_id: 1 | 2 | 3;
}) => {
  try {
    const count: number = await getInvestorCount({
      entity_type_id,
    });

    return count;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getInvestorDataForQualification = async (
  options: getInvestorDataForQualificationPayload
) => {
  try {
    const {
      entity_type_id,
      user_entity_id,
      offset = 0,
      limit = 10,
      search = "",
      status_filter,
      kyc_status_filter,
      investor_type_filter,
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

    // For KYC Status Filter Filters
    const kyc_status_filters: any[] =
      kyc_status_filter && typeof kyc_status_filter === "string"
        ? kyc_status_filter === ""
          ? []
          : kyc_status_filter.split(",")
        : Array.isArray(kyc_status_filter)
        ? kyc_status_filter
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
    const { rows, count } = await getInvestorData({
      search,
      offset,
      limit,
      status_filters,
      kyc_status_filters,
      investor_type_filters,
      entity_type_id,
      user_entity_id,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getInvestorDataAsCSV = async (
  options: getInvestorDataForQualificationCSVPayload
) => {
  try {
    const {
      entity_type_id,
      user_entity_id,
      search = "",
      status_filter,
      kyc_status_filter,
      investor_type_filter,
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

    // For KYC Status Filter Filters
    const kyc_status_filters: any[] =
      kyc_status_filter && typeof kyc_status_filter === "string"
        ? kyc_status_filter === ""
          ? []
          : kyc_status_filter.split(",")
        : Array.isArray(kyc_status_filter)
        ? kyc_status_filter
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
    // Getting All Invetsor Data
    const data: any = await getAllInvestorData({
      search,
      status_filters,
      kyc_status_filters,
      investor_type_filters,
      entity_type_id,
      user_entity_id,
    });

    return data?.rows;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  getInvestorCountForQualification,
  getInvestorDataForQualification,
  getInvestorDataAsCSV,
};
