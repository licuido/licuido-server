import { master_country, master_region } from "@models";
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

      let where: any = {
        is_active: true,
        name: { [Op.iLike]: `%${search}%` },
      };

      if (region_id) {
        where["region_id"] = region_id;
      }

      const { rows, count } = await master_country.findAndCountAll({
        where,
        attributes: ["id", "name", "iso3", "emoji"],
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

  /**
   * this function used for get all country master based on region.
   *
   * @param {offset:number,limit:number,region_id:number, search?: string} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async findAllCountriesBasedRegion(options: {
    search?: string;
  }): Promise<{
    rows: any[];
  }> {
    try {
      const { search } = options;

      const data = await master_country.findAll({
        where: {
          is_active: true,
          name: { [Op.iLike]: `%${search}%` },
        },
        attributes: ["id", "name"],
        include: [
          {
            model: master_region,
            as: "region",
            required: false,
            attributes: ["id", "name"],
          },
        ],
      });

      return { rows: JSON.parse(JSON.stringify(data)) };
    } catch (error) {
      throw error;
    }
  }

  static async findAllCurrencies(options: {
    offset: number;
    limit: number;
    search?: string;
  }): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const { offset, limit, search } = options;

      const { rows, count } = await master_country.findAndCountAll({
        where: {
          is_active: true,
          currency: { [Op.iLike]: `%${search}%` },
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
