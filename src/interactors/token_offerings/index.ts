import { Logger } from "@helpers";
import {
  Asset,
  TokenOfferings,
  TokenOfferingsAllowedCurrecies,
  TokenOfferingsAllowedCountries,
  TokenOfferingsTeams,
  TokenOfferingsDocuments,
} from "@services";
import { createTokenOfferingPayload, createTokenOfferingSubData } from "@types";

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

const updateTokenStatus = async({token_id,status_id,user_profile_id}:{token_id:string,status_id:number,user_profile_id:string})=>{
  try {
    return TokenOfferings.updateTokenStatus({token_id,status_id,updated_by:user_profile_id})
  } catch (error:any) {
    Logger.error(error.message, error);
    throw error;
  }
}

// // find entitity
// const findToken = async ({token_id,user_entity_id}:{token_id:string;user_entity_id:string;}) => {
//   try {
//     const data = await TokenOfferings.findOne(user_profile_id);

//     return {
//       success: true,
//       message: `Business Detail Successfully`,
//       data,
//     };
//   } catch (error: any) {
//     Logger.error(error.message, error);
//     throw error;
//   }
// };

export default {
  createTokenOfferings,
  updateTokenStatus
};
