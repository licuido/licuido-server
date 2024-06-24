import { position_report } from "@models";
import queries from "@queries";
import {
  getAllInvestorsCSVType,
  getAllInvestorsType,
  getAllPositionReportsType,
} from "@types";
import { sequelize } from "@utils";

class PositionReports {
  /**
   * this function used for create position reports
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: any): Promise<any> {
    try {
      const result = await position_report.create(options, {
        raw: false,
        returning: true,
      });
      return JSON.parse(JSON.stringify(result));
    } catch (error) {
      throw error;
    }
  }

  static async getAll(options: getAllPositionReportsType): Promise<{
    rows: any[];
    count: number;
  }> {
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

      // For Data

      const [result]: any[] = await sequelize.query(
        queries.getAllPositionReportsQuery(
          id,
          offset,
          limit,
          search,
          reporting_start_date,
          reporting_end_date,
          creation_start_date,
          creation_end_date
        )
      );

      // For Count
      const [dataWithoutOffsetLimit]: any[] = await sequelize.query(
        queries.getAllPositionReportsQuery(
          id,
          null,
          null,
          search,
          reporting_start_date,
          reporting_end_date,
          creation_start_date,
          creation_end_date
        )
      );

      return {
        rows: result,
        count: dataWithoutOffsetLimit?.length ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getAllInvestor(options: getAllInvestorsType): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const {
        id,
        offset = 0,
        limit = 10,
        reporting_start,
        reporting_end,
        is_all_investors,
        user_entity_id,
      } = options;

      // For Data

      const [result]: any[] = await sequelize.query(
        queries.getAllPosReportInvestorsQuery(
          id,
          offset,
          limit,
          reporting_start,
          reporting_end,
          is_all_investors,
          user_entity_id
        )
      );

      // For Count
      const [dataWithoutOffsetLimit]: any[] = await sequelize.query(
        queries.getAllPosReportInvestorsQuery(
          id,
          null,
          null,
          reporting_start,
          reporting_end,
          is_all_investors,
          user_entity_id
        )
      );

      return {
        rows: result,
        count: dataWithoutOffsetLimit?.length ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getAllInvestorCSV(options: getAllInvestorsCSVType): Promise<{
    rows: any[];
  }> {
    try {
      const {
        id,
        reporting_start,
        reporting_end,
        is_all_investors,
        user_entity_id,
      } = options;

      // For Data

      const [result]: any[] = await sequelize.query(
        queries.getAllPosReportInvestorsQuery(
          id,
          null,
          null,
          reporting_start,
          reporting_end,
          is_all_investors,
          user_entity_id
        )
      );

      return {
        rows: result,
      };
    } catch (error) {
      throw error;
    }
  }
}

export { PositionReports };
