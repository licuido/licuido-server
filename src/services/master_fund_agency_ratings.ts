import { master_fund_agency_rating } from "@models";
import { Op } from "sequelize";

class MasterFundAgencyRatings {
  /**
   * this function used for get all  fund agency ratings.
   *
   * @param {offset:number,limit:number, search?: string} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async findAll(options: {
    offset: number;
    limit: number;
    search?: string;
    agency_id:number;
  }): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const { offset, limit, search,agency_id } = options;

      const { rows, count } = await master_fund_agency_rating.findAndCountAll({
        where: {
          is_active: true,
          name: { [Op.iLike]: `%${search}%` },
          agency_id
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

export { MasterFundAgencyRatings };
