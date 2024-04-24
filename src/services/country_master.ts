import { master_country } from "@models";
import { Op } from "sequelize";

class Countries {
  /**
   * this function used for get all country master list.
   *
   * @param {offset:number,limit:number,region_id:number, search?: string} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async findAll(options: {
    offset: number;
    limit: number;
    region_id: number;
    search?: string;
  }): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const { offset, limit, region_id, search } = options;

      const { rows, count } = await master_country.findAndCountAll({
        where: {
          is_active: true,
          region_id,
          name: { [Op.iLike]: `%${search}%` },
        },
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

export { Countries };
