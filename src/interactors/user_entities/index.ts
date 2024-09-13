import { Logger, dateTime } from "@helpers";
import {
  getAllInvestorData,
  getInvestorCount,
  getInvestorData,
  getInvestorDetail,
  getInvestorList,
  getInvestorListAsCSV,
} from "@services";
import {
  getInvestorDataForQualificationCSVPayload,
  getInvestorDataForQualificationPayload,
  getInvestorListCSVType,
  getInvestorListType,
} from "@types";

const getInvestorCountForQualification = async ({
  entity_type_id, // Investor
  user_entity_id,
}: {
  entity_type_id: 1 | 2 | 3;
  user_entity_id: string;
}) => {
  try {
    const data: number = await getInvestorCount({
      entity_type_id,
      user_entity_id,
    });

    return data;
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

const getInvestorsList = async (options: getInvestorListType) => {
  try {
    const {
      entity_type_id,
      user_entity_id,
      offset = 0,
      limit = 10,
      search = "",
      status_filter,
      investor_type_filter,
      country_filter,
      minimum_balance,
      maximum_balance,
      token_id,
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
    const { rows, count } = await getInvestorList({
      offset,
      limit,
      search,
      status_filters,
      country_filters,
      investor_type_filters,
      entity_type_id,
      user_entity_id,
      minimum_balance,
      maximum_balance,
      token_id,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getInvestorsListAsCSV = async (options: getInvestorListCSVType) => {
  try {
    const {
      entity_type_id,
      user_entity_id,
      search = "",
      status_filter,
      investor_type_filter,
      country_filter,
      minimum_balance,
      maximum_balance,
      token_id,
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

    // Getting Rows Data of Investor
    const data: any = await getInvestorListAsCSV({
      search,
      status_filters,
      country_filters,
      investor_type_filters,
      entity_type_id,
      user_entity_id,
      minimum_balance,
      maximum_balance,
      token_id,
    });

    if (!data || !data?.rows || data?.rows?.length <= 0) {
      return {
        code: 204,
        message: "No Data found",
      };
    }

    // Construct Json Data For CSV/Excel Export File
    let excelData: any;

    /* For Admin */
    if (entity_type_id === 1) {
      excelData =
        data?.rows?.length > 0 &&
        data?.rows?.map((item: any) => ({
          Investor: item?.investor_name ?? "",
          Status: item?.status_name ?? "",
          "Email id": item?.email,
          Type: item?.investor_type_name ?? "",
          Country: item?.country_name ?? "",
          Balance: item?.balance ?? "",
          Pending: item?.pending ?? "",
          Available: item?.available ?? "",
          Wallet: item?.wallet ?? "",
          "Wallet provider": item?.wallet_type ?? "",
          "Last Transaction": item?.last_transaction
            ? dateTime.formatDate(item?.last_transaction)
            : "",
        }));
    }
    /* For Issuer */
    if (entity_type_id === 3) {
      excelData =
        data?.rows?.length > 0 &&
        data?.rows?.map((item: any) => ({
          Investor: item?.investor_name ?? "",
          Status: item?.status_name ?? "",
          "Email id": item?.email,
          Type: item?.investor_type_name ?? "",
          Country: item?.country_name ?? "",
          Balance:
            (item?.balance ?? "") +
            " " +
            (item?.balance != null ? item?.token_symbol : ""),
          Pending: item?.pending ?? "",
          Available: item?.available ?? "",
          Wallet: item?.wallet ?? "",
          "Wallet provider": item?.wallet_type ?? "",
          "Last Transaction": item?.last_transaction
            ? dateTime.formatDate(item?.last_transaction)
            : "",
        }));
    }

    return {
      code: 200,
      data: excelData,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getInvestorDetails = async ({ id }: { id?: string }) => {
  try {
    const data: any = await getInvestorDetail(id);

    return {
      message: "Investor Details Fetched Successfully",
      data: data,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  getInvestorCountForQualification,
  getInvestorDataForQualification,
  getInvestorDataAsCSV,
  getInvestorsList,
  getInvestorsListAsCSV,
  getInvestorDetails,
};
