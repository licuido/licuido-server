import { Logger, dateTime } from "@helpers";
import {
  createPositionReport,
  getAllInvestorsCSVType,
  getAllInvestorsType,
  getAllPositionReportsType,
} from "@types";
import { PositionReports, PositionReportInvestors } from "@services";
import { tokenFormatter } from "utils/formater";

const createPositionReports = async (options: createPositionReport) => {
  try {
    const {
      title,
      start_date,
      start_time,
      end_date,
      end_time,
      is_all_investors,
      investors,
      user_profile_id,
      user_entity_id,
    } = options;

    PositionReports.create({
      title,
      start_date,
      start_time,
      end_date,
      end_time,
      is_all_investors,
      created_by: user_profile_id,
      issuer_entity_id: user_entity_id,
    }).then(async (res) => {
      if (investors && investors?.length > 0) {
        const insertParams = investors?.map((val: any) => {
          return {
            investor_id: val,
            is_active: true,
            created_by: user_profile_id,
            report_id: res?.id,
          };
        });
        await PositionReportInvestors.create(insertParams);
        return true;
      }
      return true;
    });
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getAllPositionReports = async (options: getAllPositionReportsType) => {
  try {
    const {
      id,
      offset = 0,
      limit = 10,
      search = "",
      reporting_start_date,
      reporting_end_date,
      creation_start_date,
      creation_end_date,
    } = options;

    // Getting Rows & Count Data of Position Reports Created By Issuer
    const { rows, count } = await PositionReports.getAll({
      id,
      offset,
      limit,
      search,
      reporting_start_date,
      reporting_end_date,
      creation_start_date,
      creation_end_date,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getAllInvestors = async (options: getAllInvestorsType) => {
  try {
    const {
      user_entity_id,
      offset = 0,
      limit = 10,
      id,
      reporting_start,
      reporting_end,
      is_all_investors,
    } = options;

    // Getting Rows & Count Data of Investors
    const { rows, count } = await PositionReports.getAllInvestor({
      id,
      offset,
      limit,
      reporting_start,
      reporting_end,
      is_all_investors,
      user_entity_id,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const getAllInvestorsAsCSV = async (options: getAllInvestorsCSVType) => {
  try {
    const {
      user_entity_id,
      id,
      reporting_start,
      reporting_end,
      is_all_investors,
    } = options;

    // Getting Rows & Count Data of Investors
    const data: any = await PositionReports.getAllInvestorCSV({
      id,
      reporting_start,
      reporting_end,
      is_all_investors,
      user_entity_id,
    });

    if (!data || !data?.rows || data?.rows?.length <= 0) {
      return {
        code: 204,
        message: "No Data found",
      };
    }

    // Construct Json Data For CSV/Excel Export File
    let excelData: any;

    excelData =
      data?.rows?.length > 0 &&
      data?.rows?.map((item: any) => ({
        "Investor name": item?.investor_name ?? "",
        // "First name": "",
        // "Last name": "",
        "Email id": item?.email,
        "Country of Residence": item?.country_name ?? "",
        Balance: tokenFormatter(item?.balance),
        Pending: tokenFormatter(item?.pending),
        Available: tokenFormatter(item?.available) ?? "",
        Wallet: item?.wallet ?? "",
        "Wallet provider": item?.wallet_type ?? "",
        "Last Transaction": item?.last_transaction
          ? dateTime.formatDate(item?.last_transaction)
          : "",
      }));

    return {
      code: 200,
      data: excelData,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  createPositionReports,
  getAllPositionReports,
  getAllInvestors,
  getAllInvestorsAsCSV,
};
