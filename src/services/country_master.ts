import { master_country, master_region } from "@models";
import queries from "@queries";
import { sequelize } from "@utils";
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
        attributes: ["id", "name", "iso3", "emoji", "phone_code"],
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
          // name: { [Op.iLike]: `%${search}%` },
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { "$region.name$": { [Op.iLike]: `%${search}%` } },
          ],
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

      // const { rows ,count} = await master_country.findAndCountAll({
      //   attributes: [
      //     // [sequelize.fn('DISTINCT', sequelize.col('currency')) ,'currency'],
      //     // [sequelize.fn('DISTINCT', sequelize.col('currency_symbol')) ,'currency_symbol'],
      //     // [sequelize.fn('DISTINCT', sequelize.col('currency_code')) ,'currency_code'],
      // ],
      //   where: {
      //     is_active: true,
      //     [Op.or]: [
      //       { currency: { [Op.iLike]: `%${search}%` } },
      //       { currency_symbol: { [Op.iLike]: `%${search}%` } },
      //       { currency_code: { [Op.iLike]: `%${search}%` } },
      //   ],
      //   },
      //   offset,
      //   limit,
      // });

      const [result]: any = await sequelize.query(
        queries.getAllCurrenciesQuery(offset, limit, search)
      );

      const [resultCount]: any = await sequelize.query(
        queries.getAllCurrenciesQuery(null, null, search)
      );

      return {
        rows: result,
        count: resultCount?.length ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }
}

export { Countries };
