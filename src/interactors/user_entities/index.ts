import { Logger } from "@helpers";
import { getInvestorCount, getInvestorData } from "@services";
import { getInvestorDataForQualificationPayload } from "@types";

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
      user_profile_id,
      offset = 0,
      limit = 0,
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
      user_profile_id,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  getInvestorCountForQualification,
  getInvestorDataForQualification,
};
