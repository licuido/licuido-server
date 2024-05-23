import { position_report_investor } from "@models";

class PositionReportInvestors {
  /**
   * this function used for create position reports
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: any): Promise<any> {
    try {
      const result= await position_report_investor.bulkCreate(options);
      return JSON.parse(JSON.stringify(result));
    } catch (error) {
      throw error;
    }
  }

}

export { PositionReportInvestors };
