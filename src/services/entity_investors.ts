import { currencyConvert } from "@helpers";
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
    top_five?: boolean;
    currency?: string;
    currency_values?: any;
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
        top_five,
        currency,
        currency_values,
      } = options;

      // Currency Data
      const currency_data =
        currency_values?.length > 0
          ? currency_values
              .map((cv: any) => `('${cv.currency_code}', ${cv.euro_value})`)
              .join(",")
          : "";

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
          request,
          top_five,
          currency_data
        )
      );

      let finalData = [];
      let convertedResult = [];

      // Currency Conversion At Amount 1 for Expected Currency
      let convertedamount = await currencyConvert({
        from_currency_code: "EUR",
        to_currency_code: currency ?? "EUR",
        amount: 1,
      });

      for (const item of result) {
        let convertedInvestamount = 0;
        if (currency && currency !== "EUR") {
          if (item?.investment && Number(item?.investment) > 0) {
            convertedInvestamount = item?.investment * convertedamount;
            convertedInvestamount = parseFloat(
              convertedInvestamount.toFixed(2)
            );
          }
        } else {
          const investmentAmount = Number(item?.investment ?? 0);
          convertedInvestamount = parseFloat(investmentAmount.toFixed(2));
        }

        convertedResult.push({
          ...item,
          investment: convertedInvestamount,
        });
      }

      if (
        minimum_investment_value &&
        maximum_investment_value &&
        convertedResult?.length > 0
      ) {
        const minValue = Number(minimum_investment_value);
        const maxValue = Number(maximum_investment_value);

        finalData = convertedResult.filter((item: any) => {
          const investment = Number(item?.investment);
          return investment >= minValue && investment <= maxValue;
        });
        finalData = finalData.slice(offset * limit, (offset + 1) * limit);
      } else {
        finalData = convertedResult;
      }

      return {
        rows: finalData ?? [],
        count: result?.length > 0 ? result?.[0]?.total_count : 0,
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
    top_five?: boolean;
    currency?: string;
    currency_values?: any;
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
        top_five,
        currency,
        currency_values,
      } = options;

      // Currency Data
      const currency_data =
        currency_values?.length > 0
          ? currency_values
              .map((cv: any) => `('${cv.currency_code}', ${cv.euro_value})`)
              .join(",")
          : "";

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
          request,
          top_five,
          currency_data
        )
      );

      let finalData = [];
      let convertedResult = [];

      // Currency Conversion At Amount 1 for Expected Currency
      let convertedamount = await currencyConvert({
        from_currency_code: "EUR",
        to_currency_code: currency ?? "EUR",
        amount: 1,
      });

      for (const item of allData) {
        let convertedInvestamount = 0;
        if (currency && currency !== "EUR") {
          if (item?.investment && Number(item?.investment) > 0) {
            convertedInvestamount = item?.investment * convertedamount;
            convertedInvestamount = parseFloat(
              convertedInvestamount.toFixed(2)
            );
          }
        } else {
          const investmentAmount = Number(item?.investment ?? 0);
          convertedInvestamount = parseFloat(investmentAmount.toFixed(2));
        }

        convertedResult.push({
          ...item,
          investment: convertedInvestamount,
        });
      }

      if (
        minimum_investment_value &&
        maximum_investment_value &&
        convertedResult?.length > 0
      ) {
        const minValue = Number(minimum_investment_value);
        const maxValue = Number(maximum_investment_value);

        finalData = convertedResult.filter((item: any) => {
          const investment = Number(item?.investment);
          return investment >= minValue && investment <= maxValue;
        });
      } else {
        finalData = convertedResult;
      }

      return {
        rows: finalData,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export { EntityInvestor };
