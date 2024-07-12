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
  token_valuation,
} from "@models";
import queries from "@queries";
import { createTokenOffering, updateTokenOffering } from "@types";
import { sequelize } from "@utils";
import { ENTITY_INVESTOR_STATUS } from "helpers/constants";
// import { sequelize } from "@utils";
import { Op, Transaction } from "sequelize";
// import moment from "moment";

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
    user_entity_id,
  }: {
    token_id: string;
    user_entity_id: string;
  }): Promise<any> {
    try {
      const token_offer = await token_offering.findOne({
        where: {
          id: token_id,
        },
        attributes: [
          "id",
          "issuer_entity_id",
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
          "valuation_price",
        ],
        include: [
          {
            model: token_valuation,
            as: "token_valuations",
            attributes: [
              "id",
              "offer_price",
              "bid_price",
              "valuation_price",
              "start_date",
              "start_time",
            ],
            required: false,
            where: {
              is_active: true,
              [Op.or]: [
                {
                  start_date: {
                    [Op.lt]: new Date(), // Less than the current date
                  },
                },
                {
                  start_date: new Date(), // Equal to the current date
                  start_time: {
                    [Op.lte]: new Date(), // Less than or equal to the current time
                  },
                },
              ],
            },
            order: [
              ["start_date", "DESC"], // Order by start_date in descending order
              ["start_time", "ASC"], // Then order by start_time in ascending order
            ],
          },
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
      const token_transactions = await sequelize.query(
        `SELECT
      tor.token_offering_id,
      tt.sender_balance,
      ROW_NUMBER() OVER (
        PARTITION BY tor.token_offering_id
        ORDER BY
          tt.updated_at DESC
      ) AS rn
    FROM
      token_transactions AS tt
      INNER JOIN token_orders AS tor ON tt.order_id = tor.id
    WHERE
      tt.status_id = 2
      AND tor.receiver_entity_id = '${user_entity_id}'`
      );
      let tt = JSON.parse(JSON.stringify(token_transactions));
      const tot =
        tt?.[0]?.filter(
          (vl: any) => vl.token_offering_id == token_id && vl.rn == "1"
        )?.[0]?.sender_balance ?? 0;
      let offer = JSON.parse(JSON.stringify(token_offer));
      offer.token_count = tot ?? 0;
      return offer;
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
    countryFilterId?: string[] | [];
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
        countryFilterId,
      } = options;

      let investorStatus = null;
      if (isQualified) {
        investorStatus = ENTITY_INVESTOR_STATUS.APPROVED;
      } else if (isQualified !== undefined && isQualified === false) {
        investorStatus = ENTITY_INVESTOR_STATUS.NOT_APPROVED;
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
        queries.getMarketPlaceListingQuery(
          null,
          null,
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
      return {
        rows,
        count: dataCount?.length ?? 0,
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
    offset,
    limit,
  }: {
    user_entity_id: string;
    search: string;
    offset: number;
    limit: number;
  }): Promise<any> {
    try {
      const { rows, count } = await token_offering.findAndCountAll({
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
        offset,
        limit,
      });

      return { rows, count };
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for get all tokens for admin
   *
   * @param {token_id:string} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async getAllTokens(options: {
    offset: number;
    limit: number;
    search?: string;
    status_filters?: number[] | [];
    currency_filter?: string[] | [];
    token_type_filters?: number[] | [];
    block_chain_filters?: number[] | [];
    created_by_filters?: number[] | [];
    issuer_filters?: string[] | [];
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
        created_by_filters,
        currency_filter,
        block_chain_filters,
        issuer_filters,
        token_type_filters,
      } = options;

      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getAllTokensQuery(
          offset,
          limit,
          search,
          status_filters,
          currency_filter,
          token_type_filters,
          block_chain_filters,
          created_by_filters,
          issuer_filters
        )
      );

      // For Count
      const [dataCount]: any[] = await sequelize.query(
        queries.getAllTokensCountQuery(
          search,
          status_filters,
          currency_filter,
          token_type_filters,
          block_chain_filters,
          created_by_filters,
          issuer_filters
        )
      );

      return {
        rows: result,
        count: dataCount?.[0]?.count ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update token offering status
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async updateTokenOfferingStatus({
    offer_status_id,
    token_ids,
    updated_by,
  }: {
    offer_status_id: number;
    token_ids: string[];
    updated_by: string;
  }): Promise<any> {
    try {
      return await token_offering.update(
        {
          offer_status_id,
          updated_by,
          updated_at: new Date(),
        },
        {
          where: {
            id: {
              [Op.in]: token_ids, // Assuming Sequelize is being used and token_id is an array of IDs
            },
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async getAllFundOfferingsByIssuer(options: {
    offset: number;
    limit: number;
    user_entity_id?: string;
    request?: any;
  }): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const { offset, limit, user_entity_id, request } = options;

      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getAllFundOfferingsForPortfolioQuery(
          offset,
          limit,
          user_entity_id,
          request
        )
      );

      // For Count
      const [dataCount]: any[] = await sequelize.query(
        queries.getAllFundOfferingsForPortfolioQuery(null, null, user_entity_id)
      );

      return {
        rows: result,
        count: dataCount?.length ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }

  static async updateTokenOffering(
    options: updateTokenOffering,
    token_id: string,
    transaction: Transaction
  ): Promise<any> {
    try {
      // Update Token Offering Meta Data
      return await token_offering.update(options, {
        where: {
          id: token_id,
        },
        transaction,
      });
    } catch (error) {
      throw error;
    }
  }
}

export { TokenOfferings };
