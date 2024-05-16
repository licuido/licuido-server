import {
  asset,
  master_blockchain_network,
  token_offering,
  master_token_type,
  master_token_status,
  master_token_offering_status,
  master_country,
  token_offering_allowed_country,
  token_offering_allowed_currency,
  token_offering_document,
  token_offering_team,
  offer_fund_rating,
  master_fund_agency,
  master_fund_agency_rating,
} from "@models";
import queries from "@queries";
import { createTokenOffering, updateTokenOffering } from "@types";
import { sequelize } from "@utils";
import { ENTITY_INVESTOR_STATUS } from "helpers/constants";
// import { sequelize } from "@utils";
import { Op } from "sequelize";

class TokenOfferings {
  /**
   * this function used for create token offering
   *
   * @param {createTokenOffering} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: createTokenOffering): Promise<any> {
    try {
      return await token_offering.create(options, {
        raw: false,
        returning: true,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update token offering
   *
   * @param {updateTokenOffering} options - The response object containing update data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async update(
    options: updateTokenOffering,
    token_id: string
  ): Promise<any> {
    try {
      // Update Token Offering Meta Data
      return await token_offering.update(options, {
        where: {
          id: token_id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for to get count of given token name
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async count({
    id,
    name,
  }: {
    id: string | null;
    name: string;
  }): Promise<any> {
    try {
      // Get Count Of Given Token Offering Name
      const whereClause: any = {
        name: name,
        is_active: true,
      };

      if (id) {
        whereClause["id"] = {
          [Op.ne]: id,
        };
      }

      // To Get Token Name Count Data With this given Token Name
      return await token_offering.count({
        where: whereClause,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update token status
   *
   * @param {createTokenOffering} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async updateTokenStatus({
    status_id,
    token_id,
    updated_by,
  }: {
    status_id: number;
    token_id: string;
    updated_by: string;
  }): Promise<any> {
    try {
      return await token_offering.update(
        {
          status_id,
          updated_by,
        },
        {
          where: {
            id: token_id,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for get token offering
   *
   * @param {token_id:string} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async getTokenOffering({
    token_id,
  }: {
    token_id: string;
  }): Promise<any> {
    try {
      const token_offer = await token_offering.findOne({
        where: {
          id: token_id,
        },
        attributes: [
          "id",
          "name",
          "description",
          "isin_number",
          "symbol",
          "base_currency",
          "base_currency_code",
          "offering_price",
          "start_date",
          "end_date",
          "minimum_investment_limit",
          "maximum_investment_limit",
          "bank_name",
          "bank_account_name",
          "swift_bic_no",
          "iban_no",
          "is_fund_rating_enabled",
          "is_projected_rate_of_return_enabled",
          "is_expected_annual_perc_yield_enabled",
          "is_payback_period_enabled",
          "is_eligible_for_collateral_enabled",
          "is_all_countries_allowed",
          "projected_rate_return",
          "annual_percentage_yield",
          "payback_period",
          "payback_period_type",
        ],
        include: [
          {
            model: asset,
            as: "logo_asset",
            attributes: ["id", "type", "url", "file_meta"],
            required: false,
          },
          {
            model: asset,
            as: "banner_asset",
            attributes: ["id", "type", "url", "file_meta"],
            required: false,
          },
          {
            model: master_blockchain_network,
            as: "blockchain_network_master_blockchain_network",
            attributes: ["id", "name"],
            required: false,
          },
          {
            model: master_token_type,
            as: "token_type",
            attributes: ["id", "name"],
            required: false,
          },
          {
            model: master_token_status,
            as: "status",
            attributes: ["id", "name"],
            required: false,
          },
          {
            model: master_token_offering_status,
            as: "offer_status",
            attributes: ["id", "name"],
            required: false,
          },
          {
            model: master_country,
            as: "jurisdiction_master_country",
            attributes: ["id", "name"],
            required: false,
          },
          {
            model: token_offering_allowed_country,
            as: "token_offering_allowed_countries",
            attributes: ["id"],
            required: false,
            where: {
              is_active: true,
            },
            include: [
              {
                model: master_country,
                as: "allowed_country",
                attributes: ["id", "name"],
                required: false,
              },
            ],
          },
          {
            model: token_offering_allowed_currency,
            as: "token_offering_allowed_currencies",
            attributes: ["id", "currency", "currency_code"],
            required: false,
            where: {
              is_active: true,
            },
          },
          {
            model: token_offering_document,
            as: "token_offering_documents",
            attributes: ["id"],
            required: false,
            include: [
              {
                model: asset,
                as: "document",
                attributes: ["id", "type", "url", "file_meta"],
                required: false,
              },
            ],
            where: {
              is_active: true,
            },
          },
          {
            model: token_offering_team,
            as: "token_offering_teams",
            attributes: ["id", "member_name", "member_title"],
            required: false,
            include: [
              {
                model: asset,
                as: "member_picture",
                attributes: ["id", "type", "url", "file_meta"],
                required: false,
              },
            ],
            where: {
              is_active: true,
            },
          },
          {
            model: offer_fund_rating,
            as: "offer_fund_ratings",
            attributes: ["id"],
            include: [
              {
                model: master_fund_agency,
                as: "agency",
                attributes: ["id", "name"],
                required: false,
              },
              {
                model: master_fund_agency_rating,
                as: "rating",
                attributes: ["id", "name"],
                required: false,
              },
            ],
            where: {
              is_active: true,
            },
            required: false,
          },
        ],
      });

      return JSON.parse(JSON.stringify(token_offer));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all token offerings based on the provided options.
   *
   * @param {Object} options - The options for retrieving token offerings.
   * @param {number} options.offset - The offset for pagination.
   * @param {number} options.limit - The limit for pagination.
   * @param {string} [options.search] - The search query for filtering token offerings.
   * @return {Promise<Object>} - A promise that resolves to an object containing the rows and count of token offerings.
   * @throws {Error} - If there is an error retrieving the token offerings.
   */
  static async getAllTokenOfferings(options: {
    offset: number;
    limit: number;
    search?: string;
    tokenTypeId?: [];
    currencyCode?: string[] | [];
    fundStatus?: string[] | [];
    countryId?: number;
    user_entity_id?: string;
    isQualified?: boolean;
    countryFilterId?: number
  }): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const {
        offset,
        limit,
        search,
        tokenTypeId,
        currencyCode,
        fundStatus,
        countryId,
        user_entity_id,
        isQualified,
        countryFilterId
      } = options;

      let investorStatus = null;
      if(isQualified){
        investorStatus = ENTITY_INVESTOR_STATUS.APPROVED
      }else if(isQualified !== undefined && isQualified === false){
        investorStatus = ENTITY_INVESTOR_STATUS.NOT_APPROVED
      }

      const [rows]: any[] = await sequelize.query(
        queries.getMarketPlaceListingQuery(
          offset,
          limit,
          search,
          tokenTypeId,
          currencyCode,
          fundStatus,
          countryId,
          user_entity_id,
          investorStatus,
          countryFilterId
        )
      );
      const [dataCount]: any[] = await sequelize.query(
        queries.getMarketPlaceListingQueryCount()
      );
      return {
        rows,
        count: dataCount?.[0]?.count ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for checking user have token access
   *
   * @param {token_id:string, user_entity_id:string} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async checkTokenHaveAccess({
    token_id,
    user_entity_id,
  }: {
    token_id: string;
    user_entity_id: string;
  }): Promise<any> {
    try {
      return await token_offering.count({
        where: {
          id: token_id,
          issuer_entity_id: user_entity_id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for get token offering
   *
   * @param {token_id:string} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async getTokenIssuerList({
    user_entity_id,
    search,
  }: {
    user_entity_id: string;
    search: string;
  }): Promise<any> {
    try {
      const token_offer = await token_offering.findAll({
        where: {
          issuer_entity_id: user_entity_id,
          name: { [Op.iLike]: `%${search}%` },
        },
        attributes: ["id", "name", "isin_number", "symbol"],
        include: [
          {
            model: asset,
            as: "logo_asset",
            attributes: ["id", "url"],
            required: false,
          },
          {
            model: master_token_offering_status,
            as: "offer_status",
            attributes: ["id", "name"],
            required: false,
          },
        ],
      });

      return JSON.parse(JSON.stringify(token_offer));
    } catch (error) {
      throw error;
    }
  }
}

export { TokenOfferings };
