import { Logger, errorCustomMessage, successCustomMessage } from "@helpers";
import {
  Asset,
  TokenOfferings,
  TokenOfferingsAllowedCurrecies,
  TokenOfferingsAllowedCountries,
  TokenOfferingsTeams,
  TokenOfferingsDocuments,
  TokenOfferFund,
  TokenValuations,
} from "@services";
import {
  FundRatingPayload,
  TeamsPayload,
  createTokenOfferingPayload,
  createTokenOfferingSubData,
  updateTokenOfferingPayload,
  updateTokenOfferingSubData,
  createTokenValuation,
  getAllTokenAdmin,
} from "@types";
import { commentFunction } from "@helpers";

const createOfferingSubDatas = async (
  options: createTokenOfferingSubData,
  token_offering_id: string,
  user_profile_id: string
) => {
  try {
    const {
      teams,
      allowed_countries,
      allowed_currencies,
      documents,
      fund_rating,
    } = options;

    if (allowed_currencies?.length > 0) {
      let currenciesPayload = allowed_currencies?.map((val) => {
        return {
          ...val,
          is_active: true,
          token_offering_id,
          created_by: user_profile_id,
        };
      });
      await TokenOfferingsAllowedCurrecies.create(currenciesPayload);
    }

    if (allowed_countries?.length > 0) {
      let countriesPayload = allowed_countries?.map((val) => {
        return {
          allowed_country_id: val,
          is_active: true,
          token_offering_id,
          created_by: user_profile_id,
        };
      });
      await TokenOfferingsAllowedCountries.create(countriesPayload);
    }

    if (teams?.length > 0) {
      const teamsPayload = [];

      for (const team of teams) {
        const asset = await Asset.upsert({
          type: team?.member_picture?.type,
          url: team?.member_picture?.url,
          file_meta: team?.member_picture?.file_meta,
          is_active: true,
        });
        teamsPayload.push({
          member_picture_id: asset?.[0]?.dataValues?.id,
          member_name: team?.member_name,
          member_title: team?.member_title,
          token_offering_id,
          created_by: user_profile_id,
          is_active: true,
        });
      }

      await TokenOfferingsTeams.create(teamsPayload);
    }

    if (documents && documents?.length > 0) {
      const documentssPayload = [];

      for (const document of documents) {
        const asset = await Asset.upsert({
          type: document?.type,
          url: document?.url,
          file_meta: document?.file_meta,
          is_active: true,
        });
        documentssPayload.push({
          document_id: asset?.[0]?.dataValues?.id,
          token_offering_id,
          created_by: user_profile_id,
          is_active: true,
        });
      }

      await TokenOfferingsDocuments.create(documentssPayload);
    }

    if (fund_rating && fund_rating?.length > 0) {
      let funRatingPayload = fund_rating?.map((val) => {
        return {
          offer_token_id: token_offering_id,
          agency_id: val?.agency,
          rating_id: val?.rating,
          created_by: user_profile_id,
        };
      });
      await TokenOfferFund.create(funRatingPayload);
    }
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// create token offerings
const createTokenOfferings = async (options: createTokenOfferingPayload) => {
  try {
    const {
      user_entity_id,
      name,
      description,
      start_date,
      end_date,
      bank_account_name,
      bank_name,
      banner_asset,
      base_currency,
      base_currency_code,
      logo_asset,
      blockchain_network,
      swift_bic_no,
      symbol,
      offering_price,
      is_all_countries_allowed,
      is_eligible_for_collateral_enabled,
      is_expected_annual_perc_yield_enabled,
      is_fund_rating_enabled,
      is_payback_period_enabled,
      is_projected_rate_of_return_enabled,
      isin_number,
      maximum_investment_limit,
      minimum_investment_limit,
      user_profile_id,
      teams,
      allowed_countries,
      allowed_currencies,
      documents,
      jurisdiction,
      iban_no,
      status,
      token_type_id,
      projected_rate_return,
      payback_period,
      payback_period_type,
      annual_percentage_yield,
      fund_rating,
    } = options;

    // Check if the Token Name Already Exists
    const count: number = await TokenOfferings.count({
      id: null,
      name,
    });

    // If the Given Token Name Already Exists
    if (count > 0) {
      return {
        code: 409,
        customMessage: errorCustomMessage.tokenNameAlreadyExists,
      };
    }

    let logo_asset_id;
    let banner_asset_id;

    if (logo_asset && logo_asset?.url) {
      const asset = await Asset.upsert({
        type: logo_asset?.type,
        url: logo_asset?.url,
        file_meta: logo_asset?.file_meta,
        is_active: true,
      });
      logo_asset_id = asset?.[0]?.dataValues?.id;
    }
    if (banner_asset && banner_asset?.url) {
      const asset = await Asset.upsert({
        type: banner_asset?.type,
        url: banner_asset?.url,
        file_meta: banner_asset?.file_meta,
        is_active: true,
      });
      banner_asset_id = asset?.[0]?.dataValues?.id;
    }

    const data = await TokenOfferings.create({
      issuer_entity_id: user_entity_id,
      name,
      description,
      start_date,
      end_date,
      bank_account_name,
      bank_name,
      base_currency,
      base_currency_code,
      blockchain_network,
      swift_bic_no,
      symbol,
      offering_price,
      is_all_countries_allowed,
      is_eligible_for_collateral_enabled,
      is_expected_annual_perc_yield_enabled,
      is_fund_rating_enabled,
      is_payback_period_enabled,
      is_projected_rate_of_return_enabled,
      isin_number,
      maximum_investment_limit,
      minimum_investment_limit,
      jurisdiction,
      created_by: user_profile_id,
      status_id: status,
      logo_asset_id,
      banner_asset_id,
      iban_no,
      token_type_id,
      is_active: true,
      offer_status_id: 3,
      projected_rate_return,
      payback_period,
      payback_period_type,
      annual_percentage_yield,
    });

    await createOfferingSubDatas(
      {
        teams,
        allowed_countries,
        allowed_currencies,
        documents,
        fund_rating,
      },
      data?.dataValues?.id,
      user_profile_id
    );

    return {
      code: 200,
      customMessage: successCustomMessage.tokenOfferingCreated,
      data: { token_id: data?.dataValues?.id },
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const updateTokenStatus = async ({
  token_id,
  status_id,
  user_profile_id,
}: {
  token_id: string;
  status_id: number;
  user_profile_id: string;
}) => {
  try {
    return TokenOfferings.updateTokenStatus({
      token_id,
      status_id,
      updated_by: user_profile_id,
    });
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const updateOfferingSubDatas = async (
  options: updateTokenOfferingSubData,
  token_offering_id: string,
  user_profile_id: string
) => {
  try {
    const {
      added_currencies,
      removed_currencies,
      added_countries,
      removed_countries,
      added_documents,
      removed_documents,
      new_team_members,
      removed_team_members,
      updated_team_members,
      fund_rating,
    } = options;

    /* For Currencies */
    // Removed Existing Currencies
    if (removed_currencies && removed_currencies?.length > 0) {
      let currenciesPayload = {
        removed_currencies,
        updated_by: user_profile_id,
      };

      // Update Deleted Status Of Existing Currency[ Removed- When User Updating ]
      await TokenOfferingsAllowedCurrecies.updateDeletedStatus(
        currenciesPayload
      );
    }

    // Create Newly Added Currencies, If any
    if (added_currencies && added_currencies?.length > 0) {
      let currenciesPayload = added_currencies?.map((val) => {
        return {
          ...val,
          is_active: true,
          token_offering_id,
          created_by: user_profile_id,
        };
      });
      await TokenOfferingsAllowedCurrecies.create(currenciesPayload);
    }

    /* For Countries */
    // Removed Existing Countries
    if (removed_countries && removed_countries?.length > 0) {
      let countriesPayload = {
        removed_countries,
        updated_by: user_profile_id,
      };

      // Update Deleted Status Of Existing Countries[ Removed- When User Updating ]
      await TokenOfferingsAllowedCountries.updateDeletedStatus(
        countriesPayload
      );
    }

    // Create Newly Added Countries, If any
    if (added_countries && added_countries?.length > 0) {
      let countriesPayload = added_countries?.map((val) => {
        return {
          allowed_country_id: val,
          is_active: true,
          token_offering_id,
          created_by: user_profile_id,
        };
      });
      await TokenOfferingsAllowedCountries.create(countriesPayload);
    }

    /* For Documents */
    // Remove Existing Documents
    if (removed_documents && removed_documents?.length > 0) {
      let documentsPayload = {
        removed_documents,
        updated_by: user_profile_id,
      };

      // Update Deleted Status Of Existing Documents[ Removed- When User Updating ]
      await TokenOfferingsDocuments.updateDeletedStatus(documentsPayload);
    }

    // Add New Documents
    if (added_documents && added_documents?.length > 0) {
      const documentssPayload = [];

      for (const document of added_documents) {
        const asset = await Asset.upsert({
          type: document?.type,
          url: document?.url,
          file_meta: document?.file_meta,
          is_active: true,
        });
        documentssPayload.push({
          document_id: asset?.[0]?.dataValues?.id,
          token_offering_id,
          created_by: user_profile_id,
          is_active: true,
        });
      }

      await TokenOfferingsDocuments.create(documentssPayload);
    }

    /* Team Members */
    // For Removed Team Members
    if (removed_team_members && removed_team_members?.length > 0) {
      let teamMembersPayload = {
        removed_team_members,
        updated_by: user_profile_id,
      };

      // Update Deleted Status Of Existing Team Members [ Removed- When User Updating ]
      await TokenOfferingsTeams.updateDeletedStatus(teamMembersPayload);
    }

    // For Newly Added Team Members
    if (new_team_members && new_team_members?.length > 0) {
      const teamsPayload = [];

      for (const team of new_team_members) {
        const asset = await Asset.upsert({
          type: team?.member_picture?.type,
          url: team?.member_picture?.url,
          file_meta: team?.member_picture?.file_meta,
          is_active: true,
        });
        teamsPayload.push({
          member_picture_id: asset?.[0]?.dataValues?.id,
          member_name: team?.member_name,
          member_title: team?.member_title,
          token_offering_id,
          created_by: user_profile_id,
          is_active: true,
        });
      }

      await TokenOfferingsTeams.create(teamsPayload);
    }

    // For Updating existing Team Member Details
    if (updated_team_members && updated_team_members?.length > 0) {
      for (const team of updated_team_members) {
        let teamsPayload: TeamsPayload = {
          member_name: team.member_name,
          member_title: team.member_title,
          updated_by: user_profile_id,
        };

        if (
          team &&
          team?.member_picture &&
          team?.member_picture?.type &&
          team?.member_picture?.url &&
          team?.member_picture?.file_meta
        ) {
          const asset = await Asset.upsert({
            type: team?.member_picture?.type,
            url: team?.member_picture?.url,
            file_meta: team?.member_picture?.file_meta,
            is_active: true,
          });

          teamsPayload.member_picture_id =
            asset && asset.length > 0 ? asset[0].dataValues.id : undefined;
        }

        await TokenOfferingsTeams.update({
          options: teamsPayload,
          id: team?.member_id,
        });
      }
    }

    // For Fund Rating
    if (fund_rating && fund_rating.length > 0) {
      let createfundRatingPayload: FundRatingPayload[] = [];

      for (const fund of fund_rating) {
        let updatefundRatingPayload: FundRatingPayload;

        if (fund.rating_id) {
          updatefundRatingPayload = {
            agency_id: fund.agency,
            rating_id: fund.rating,
            updated_by: user_profile_id,
          };

          await TokenOfferFund.update({
            options: updatefundRatingPayload,
            id: fund.rating_id,
          });
        } else {
          createfundRatingPayload.push({
            agency_id: fund.agency,
            rating_id: fund.rating,
            offer_token_id: token_offering_id,
            created_by: user_profile_id,
          });
        }
      }

      if (createfundRatingPayload.length > 0) {
        await TokenOfferFund.create(createfundRatingPayload);
      }
    }
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// Update Token Offerings
const updateTokenOfferings = async (options: updateTokenOfferingPayload) => {
  try {
    const {
      token_id,
      user_profile_id,
      name,
      isin_number,
      symbol,
      token_type_id,
      base_currency,
      base_currency_code,
      blockchain_network,
      logo_asset,
      description,
      banner_asset,
      offering_price,
      jurisdiction,
      start_date,
      end_date,
      added_currencies,
      removed_currencies,
      maximum_investment_limit,
      minimum_investment_limit,
      is_all_countries_allowed,
      added_countries,
      removed_countries,
      bank_account_name,
      bank_name,
      swift_bic_no,
      iban_no,
      is_fund_rating_enabled,
      is_projected_rate_of_return_enabled,
      is_expected_annual_perc_yield_enabled,
      is_payback_period_enabled,
      is_eligible_for_collateral_enabled,
      added_documents,
      removed_documents,
      new_team_members,
      removed_team_members,
      updated_team_members,
      fund_rating,
      projected_rate_return,
      payback_period,
      payback_period_type,
      annual_percentage_yield,
    } = options;

    // Check if the Token Name Already Exists
    const count: number = await TokenOfferings.count({
      id: token_id,
      name,
    });

    // If the Given Token Name Already Exists
    if (count > 0) {
      return {
        code: 409,
        customMessage: errorCustomMessage.tokenNameAlreadyExists,
      };
    }

    let logo_asset_id;
    let banner_asset_id;

    // For Logo Assets
    if (logo_asset && logo_asset?.url) {
      const asset = await Asset.upsert({
        type: logo_asset?.type,
        url: logo_asset?.url,
        file_meta: logo_asset?.file_meta,
        is_active: true,
      });
      logo_asset_id = asset?.[0]?.dataValues?.id;
    }

    // For Banner Assets
    if (banner_asset && banner_asset?.url) {
      const asset = await Asset.upsert({
        type: banner_asset?.type,
        url: banner_asset?.url,
        file_meta: banner_asset?.file_meta,
        is_active: true,
      });
      banner_asset_id = asset?.[0]?.dataValues?.id;
    }

    // For Token Offerings
    await TokenOfferings.update(
      {
        name,
        description,
        start_date,
        end_date,
        bank_account_name,
        bank_name,
        base_currency,
        base_currency_code,
        blockchain_network,
        swift_bic_no,
        symbol,
        offering_price,
        is_all_countries_allowed,
        is_eligible_for_collateral_enabled,
        is_expected_annual_perc_yield_enabled,
        is_fund_rating_enabled,
        is_payback_period_enabled,
        is_projected_rate_of_return_enabled,
        isin_number,
        maximum_investment_limit,
        minimum_investment_limit,
        jurisdiction,
        updated_by: user_profile_id,
        logo_asset_id,
        banner_asset_id,
        iban_no,
        token_type_id,
        projected_rate_return,
        payback_period,
        payback_period_type,
        annual_percentage_yield,
      },
      token_id
    );

    await updateOfferingSubDatas(
      {
        added_currencies,
        removed_currencies,
        added_countries,
        removed_countries,
        added_documents,
        removed_documents,
        new_team_members,
        removed_team_members,
        updated_team_members,
        fund_rating,
      },
      token_id,
      user_profile_id
    );

    return {
      code: 200,
      customMessage: successCustomMessage.tokenOfferingUpdated,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// find entitity
const findToken = async ({
  token_id,
  user_entity_id,
}: {
  token_id?: string;
  user_entity_id?: string;
}) => {
  try {
    if (!token_id || !user_entity_id) {
      return {
        success: false,
        message: `Please Pass Token ID`,
      };
    }

    const data = await TokenOfferings.getTokenOffering({ token_id });
    const parseData = JSON.parse(JSON.stringify(data));

    const finalData = {
      ...parseData,
      token_valuation_staus: commentFunction.returnValuationPrice(
        parseData?.token_valuations?.[0]?.offer_price,
        parseData?.token_valuations?.[0]?.valuation_price
      ),
    };

    return {
      success: true,
      message: "Token Fetched Successfully",
      data: finalData,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// find issuer tokens
const getIssuerTokens = async ({
  search,
  user_entity_id,
}: {
  search?: string;
  user_entity_id: string;
}) => {
  try {
    const data = await TokenOfferings.getTokenIssuerList({
      search: search ?? "",
      user_entity_id,
    });

    return data?.map((val: any) => {
      return {
        id: val?.id,
        name: val?.name,
        status: val?.offer_status?.name,
        logo: val?.logo_asset?.url,
        isin_number: val?.isin_number,
        symbol: val?.symbol,
      };
    });
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

//update token valuation

const updateTokenValuation = async (option: createTokenValuation) => {
  try {
    const { token_id, user_entity_id, user_profile_id } = option;

    const count = await TokenOfferings.checkTokenHaveAccess({
      token_id,
      user_entity_id: user_entity_id ?? "",
    });

    if (count === 0) {
      return {
        success: false,
        message: `You Don't Have a access for this token or please verify this token`,
      };
    }

    await TokenValuations.create({
      ...option,
      created_by: user_profile_id,
    });

    return {
      success: true,
      message:
        "Token Valuation Added Successfully. It Will Reflected After your start date",
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

//get all tokens
const getAllTokens = async (options: getAllTokenAdmin) => {
  try {
    const {
      offset = 0,
      limit = 0,
      search = "",
      status,
      issuer,
      created_by,
      currency,
      block_chain,
      token_type,
    } = options;

    // For Status Filters
    const status_filters: any[] =
      status && typeof status === "string"
        ? status === ""
          ? []
          : status.split(",")
        : Array.isArray(status)
        ? status
        : [];

    // For issuer filter
    const issuer_filters: any[] =
      issuer && typeof issuer === "string"
        ? issuer === ""
          ? []
          : issuer.split(",")
        : Array.isArray(issuer)
        ? issuer
        : [];

    // For Created by Filters
    const created_by_filters: any[] =
      created_by && typeof created_by === "string"
        ? created_by === ""
          ? []
          : created_by.split(",")
        : Array.isArray(created_by)
        ? created_by
        : [];

    // For Block chain network Filters
    const block_chain_filters: any[] =
      block_chain && typeof block_chain === "string"
        ? block_chain === ""
          ? []
          : block_chain.split(",")
        : Array.isArray(block_chain)
        ? block_chain
        : [];

    // For Block chain network Filters
    const currency_filter: any[] =
      currency && typeof currency === "string"
        ? currency === ""
          ? []
          : currency.split(",")
        : Array.isArray(currency)
        ? currency
        : [];

    // For Token Type Filters
    const token_type_filters: any[] =
      token_type && typeof token_type === "string"
        ? token_type === ""
          ? []
          : token_type.split(",")
        : Array.isArray(token_type)
        ? token_type
        : [];

    // Getting Rows & Count Data of Investor
    const { rows, count } = await TokenOfferings.getAllTokens({
      search,
      offset,
      limit,
      status_filters,
      issuer_filters,
      created_by_filters,
      block_chain_filters,
      currency_filter,
      token_type_filters,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

//update token offering status

const updateTokenOfferingStatus = async ({
  token_ids,
  offer_status_id,
  user_profile_id,
}: {
  token_ids: string[];
  offer_status_id: number;
  user_profile_id: string;
}) => {
  try {
    return TokenOfferings.updateTokenOfferingStatus({
      token_ids,
      offer_status_id,
      updated_by: user_profile_id,
    });
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  createTokenOfferings,
  updateTokenStatus,
  findToken,
  updateTokenOfferings,
  getIssuerTokens,
  updateTokenValuation,
  getAllTokens,
  updateTokenOfferingStatus,
};
