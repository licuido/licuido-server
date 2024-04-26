import { master_investor_type } from "@models";
import { Op } from "sequelize";

class MasterInvestorTypes {
  /**
   * this function used for get all country master list.
   *
   * @param {offset:number,limit:number,region_id:number, search?: string} options - The response object containing paginated information.
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

      const { rows, count } = await master_investor_type.findAndCountAll({
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

export { MasterInvestorTypes };
