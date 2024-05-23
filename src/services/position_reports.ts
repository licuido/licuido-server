import { position_report } from "@models";

class PositionReports {
  /**
   * this function used for create position reports
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: any): Promise<any> {
    try {
      const result= await position_report.create(options,{
        raw: false,
        returning: true,
      });
      return JSON.parse(JSON.stringify(result));
    } catch (error) {
      throw error;
    }
  }

}

export { PositionReports };
