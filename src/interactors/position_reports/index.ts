import { Logger } from "@helpers";
import { createPositionReport } from "@types";
import { PositionReports, PositionReportInvestors } from "@services";

const createPositionReport = async (options: createPositionReport) => {
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
    } = options;
    PositionReports.create({
      title,
      start_date,
      start_time,
      end_date,
      end_time,
      is_all_investors,
      created_by: user_profile_id,
    }).then(async (res) => {
      if (investors && investors?.length > 0) {
        const insertParams = investors?.map((val: any) => {
          return {
            investor_id: val,
            is_active: true,
            created_by: user_profile_id,
            report_id:res?.id
          };
        });
        await PositionReportInvestors.create(insertParams);
      } else {
        return;
      }
    });
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  createPositionReport,
};
