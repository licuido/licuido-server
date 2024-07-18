import { entity_investor } from "@models";
import queries from "@queries";
import { sequelize } from "@utils";

class EntityInvestor {
  /**
   * this function used for create new entity investor against issuer
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async create(options: {
    status_id: number;
    investor_type_id: number;
    investor_entity_id: string;
    user_profile_id?: string;
    user_entity_id?: string;
  }): Promise<any> {
    try {
      const {
        status_id,
        investor_type_id,
        investor_entity_id,
        user_profile_id,
        user_entity_id,
      } = options;

      // Create Entity Investor Data
      const entityInvestor: any = await entity_investor.create({
        investor_type_id,
        investor_entity_id,
        status_id,
        is_active: true,
        created_by: user_profile_id,
        issuer_entity_id: user_entity_id,
      });

      let entityInvestorData: any = entityInvestor
        ? JSON.parse(JSON.stringify(entityInvestor))
        : null;

      return entityInvestorData?.id;
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update Investor Entity Status
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async update({
    id,
    status_id,
    user_profile_id,
  }: {
    id: string;
    status_id: number;
    user_profile_id?: string;
  }): Promise<any> {
    try {
      // Update Entity Investor Status Meta Data
      await entity_investor.update(
        { status_id: status_id, updated_by: user_profile_id },
        {
          where: {
            id: id,
          },
        }
      );

      return id;
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for to get count of given qualified investor for given issuer
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async count({
    issuer_entity_id,
    investor_entity_id,
    status_id,
  }: {
    issuer_entity_id: string;
    investor_entity_id: string;
    status_id: 1 | 2 | 3;
  }): Promise<any> {
    try {
      // Get Count Of Given of data Whether the given investor is qualified for given issuer
      return await entity_investor.count({
        where: {
          investor_entity_id,
          issuer_entity_id,
          status_id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getInvestorListData(options: {
    offset: number;
    limit: number;
    search?: string;
    status_filters?: number[] | [];
    investor_type_filters?: number[] | [];
    country_filters?: number[] | [];
    user_entity_id?: string;
    minimum_investment_value?: string;
    maximum_investment_value?: string;
    request?: any;
  }): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const {
        offset,
        limit,
        search,
        status_filters,
        investor_type_filters,
        country_filters,
        user_entity_id,
        minimum_investment_value,
        maximum_investment_value,
        request,
      } = options;

      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getInvestorListQuery(
          offset,
          limit,
          search,
          status_filters,
          investor_type_filters,
          country_filters,
          user_entity_id,
          minimum_investment_value,
          maximum_investment_value,
          request
        )
      );

      // For Count
      const [allData]: any[] = await sequelize.query(
        queries.getInvestorListQuery(
          null,
          null,
          search,
          status_filters,
          investor_type_filters,
          country_filters,
          user_entity_id,
          minimum_investment_value,
          maximum_investment_value,
          request
        )
      );

      return {
        rows: result,
        count: allData?.length ?? 0,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  static async getInvestorListAsCSV(options: {
    search?: string;
    status_filters?: number[] | [];
    investor_type_filters?: number[] | [];
    country_filters?: number[] | [];
    user_entity_id?: string;
    minimum_investment_value?: string;
    maximum_investment_value?: string;
    request?: any;
  }): Promise<{
    rows: any[];
  }> {
    try {
      const {
        search,
        status_filters,
        investor_type_filters,
        country_filters,
        user_entity_id,
        minimum_investment_value,
        maximum_investment_value,
        request,
      } = options;

      // For All Data
      const [allData]: any[] = await sequelize.query(
        queries.getInvestorListQuery(
          null,
          null,
          search,
          status_filters,
          investor_type_filters,
          country_filters,
          user_entity_id,
          minimum_investment_value,
          maximum_investment_value,
          request
        )
      );

      return {
        rows: allData,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export { EntityInvestor };
