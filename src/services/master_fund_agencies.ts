import { master_fund_agency } from "@models";
import { Op } from "sequelize";

class MasterFundAgency {
  /**
   * this function used for get all  fund agency.
   *
   * @param {offset:number,limit:number, search?: string} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async findAll(options: {
    offset: number;
    limit: number;
    search?: string;
  }): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const { offset, limit, search } = options;

      const { rows, count } = await master_fund_agency.findAndCountAll({
        where: {
          is_active: true,
          name: { [Op.iLike]: `%${search}%` },
        },
        order: [["id", "ASC"]],
        offset,
        limit,
      });
      return {
        rows,
        count,
      };
    } catch (error) {
      throw error;
    }
  }
}

export { MasterFundAgency };
