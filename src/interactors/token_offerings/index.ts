import { Logger, errorCustomMessage, successCustomMessage } from "@helpers";
import {
  Asset,
  TokenOfferings,
  TokenOfferingsAllowedCurrecies,
  TokenOfferingsAllowedCountries,
  TokenOfferingsTeams,
  TokenOfferingsDocuments,
} from "@services";
import {
  createTokenOfferingPayload,
  createTokenOfferingSubData,
  updateTokenOfferingPayload,
  updateTokenOfferingSubData,
} from "@types";

const createOfferingSubDatas = async (
  options: createTokenOfferingSubData,
  token_offering_id: string,
  user_profile_id: string
) => {
  try {
    const { teams, allowed_countries, allowed_currencies, documents } = options;

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
    } = options;

    let logo_asset_id;
    let banner_asset_id;

    if (logo_asset?.url) {
      const asset = await Asset.upsert({
        type: logo_asset?.type,
        url: logo_asset?.url,
        is_active: true,
      });
      logo_asset_id = asset?.[0]?.dataValues?.id;
    }
    if (banner_asset?.url) {
      const asset = await Asset.upsert({
        type: banner_asset?.type,
        url: banner_asset?.url,
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
      offer_status_id: 1,
    });

    await createOfferingSubDatas(
      {
        teams,
        allowed_countries,
        allowed_currencies,
        documents,
      },
      data?.dataValues?.id,
      user_profile_id
    );

    return data;
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
        const asset = await Asset.upsert({
          type: team?.member_picture?.type,
          url: team?.member_picture?.url,
          is_active: true,
        });

        const teamsPayload = {
          member_picture_id: asset?.[0]?.dataValues?.id,
          member_name: team?.member_name,
          member_title: team?.member_title,
          updated_by: user_profile_id,
        };

        await TokenOfferingsTeams.update({
          options: teamsPayload,
          id: team?.member_id,
        });
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
        is_active: true,
      });
      logo_asset_id = asset?.[0]?.dataValues?.id;
    }

    // For Banner Assets
    if (banner_asset && banner_asset?.url) {
      const asset = await Asset.upsert({
        type: banner_asset?.type,
        url: banner_asset?.url,
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

export default {
  createTokenOfferings,
  updateTokenStatus,
  updateTokenOfferings,
};
