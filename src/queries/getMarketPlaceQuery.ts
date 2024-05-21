import { ENTITY_INVESTOR_STATUS } from "helpers/constants";

export const getMarketPlaceListingQuery = (
  offset: number | null,
  limit: number | null,
  search?: string,
  tokenTypeId?: number[] | [],
  currencyCode?: string[] | [],
  fundStatus?: string[] | [],
  countryId?: number,
  user_entity_id?: string,
  investorStatus?: number | null,
  countryFilterId?: string[] | []
) => {
  // For countryFilterId
  let countryFilter = ``;
  if (countryFilterId && countryFilterId?.length > 0) {
    countryFilter = ` AND toac.allowed_country_id IN ('${countryFilterId?.join(
      ","
    )}')`;
  }

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }

  // For investor status
  let investorStatusFilter = ``;
  if (investorStatus === ENTITY_INVESTOR_STATUS.APPROVED) {
    investorStatusFilter = ` AND ei.status_id = ${investorStatus} AND '${user_entity_id}' = ei.investor_entity_id`;
  } else if (investorStatus === ENTITY_INVESTOR_STATUS.NOT_APPROVED) {
    investorStatusFilter = ` AND ei.status_id IS NULL OR ei.status_id != ${ENTITY_INVESTOR_STATUS.APPROVED}`;
  }

  // For Search
  let searchFilter = ``;
  if (search) {
    searchFilter = ` AND ts.name ILIKE '${search}%'`;
  }

  //For tokenTypeId
  let tokenTypeIdFilter = ``;
  if (tokenTypeId && tokenTypeId?.length > 0) {
    tokenTypeIdFilter = ` AND ts.token_type_id IN (${tokenTypeId?.join(",")})`;
  }

  //For currencyCode
  let currencyCodeFilter = ``;
  if (currencyCode && currencyCode?.length > 0) {
    currencyCodeFilter = ` AND ts.base_currency_code IN (${currencyCode
      ?.map((value: any) => `'${value}'`)
      .join(",")})`;
  }

  let fundStatusFilter = ``;
  if (fundStatus && fundStatus?.length > 0) {
    fundStatusFilter = ` AND mts.name IN (${fundStatus
      ?.map((value: any) => `'${value}'`)
      .join(",")})`;
  }

  let listQuery = `WITH
    cte AS (
      SELECT
        ts.id,
        ts.name,
        ts.description,
        ts.isin_number,
        ts.symbol,
        ts.base_currency_code,
        ts.offer_status_id,
        ts.base_currency,
        ts.offering_price,
        ts.start_date,
        ts.token_type_id,
        ts.end_date,
        ts.is_fund_rating_enabled,
        ts.projected_rate_return,
        ts.annual_percentage_yield,
        ass.url as logo_assets_url,
        ass.type as logo_assets_type,
        mtt.name as master_token_type_name,
        mts.name as master_token_status_name,
        array_to_string(array_agg(DISTINCT mfa.name), ',') AS agency_name,
        array_to_string(array_agg(DISTINCT mfar.name), ',') AS rating_name,
        ts.is_all_countries_allowed,
        array_agg(DISTINCT toac.allowed_country_id) AS allowed_country_ids,
        ei.status_id as is_qualified_status_id,
        meis.name as investor_status
      FROM
        token_offerings AS ts
        INNER JOIN assets AS ass ON ts.logo_asset_id = ass.id
        INNER JOIN master_token_type AS mtt ON ts.token_type_id = mtt.id
        INNER JOIN master_token_status AS mts ON ts.status_id = mts.id
        LEFT JOIN offer_fund_ratings AS ofr ON ts.id = ofr.offer_token_id
        LEFT JOIN master_fund_agencies AS mfa ON ofr.agency_id = mfa.id
        LEFT JOIN master_fund_agency_ratings AS mfar ON ofr.rating_id = mfar.id
        LEFT JOIN token_offering_allowed_countries AS toac ON ts.id = toac.token_offering_id
        LEFT JOIN entity_investors AS ei ON ts.issuer_entity_id = ei.issuer_entity_id
        LEFT JOIN master_entity_investor_status AS meis ON ei.status_id = meis.id
          AND '${user_entity_id}' = ei.investor_entity_id
      WHERE ts.is_active = true AND ts.offer_status_id = 1 ${searchFilter} ${tokenTypeIdFilter} ${currencyCodeFilter} ${investorStatusFilter}
         ${countryFilter} ${fundStatusFilter}
      GROUP BY
        ts.id,
        ass.url,
        ass.type,
        mtt.name,
        mts.name,
        ei.status_id,
        meis.name
    )
  SELECT
    *
  FROM
    cte
  ORDER BY
    CASE
      WHEN is_all_countries_allowed IS TRUE
      OR array_position(allowed_country_ids, ${countryId}) IS NOT NULL THEN 0
      ELSE 1
    END
    ${limitStatment}
    `;
  console.log(listQuery, "listQuery");
  return listQuery;
};

export const getMarketPlaceListingQueryCount = () => {
  let listQueryCount = `WITH
    cte AS (
      SELECT
        ts.id,
        ts.name,
        ts.description,
        ts.isin_number,
        ts.symbol,
        ts.offer_status_id,
        ts.base_currency_code,
        ts.base_currency,
        ts.offering_price,
        ts.start_date,
        ts.token_type_id,
        ts.end_date,
        ts.is_fund_rating_enabled,
        ts.projected_rate_return,
        ts.annual_percentage_yield,
        ass.url,
        mtt.name,
        mts.name,
        array_to_string(array_agg(DISTINCT mfa.name), ',') AS agency_name,
        array_to_string(array_agg(DISTINCT mfar.name), ',') AS rating_name,
        array_agg(DISTINCT toac.allowed_country_id) AS allowed_country_ids -- Keep as array
      FROM
        token_offerings AS ts
        INNER JOIN assets AS ass ON ts.logo_asset_id = ass.id
        INNER JOIN master_token_type AS mtt ON ts.token_type_id = mtt.id
        INNER JOIN master_token_status AS mts ON ts.status_id = mts.id
        LEFT JOIN offer_fund_ratings AS ofr ON ts.id = ofr.offer_token_id
        LEFT JOIN master_fund_agencies AS mfa ON ofr.agency_id = mfa.id
        LEFT JOIN master_fund_agency_ratings AS mfar ON ofr.rating_id = mfar.id
        LEFT JOIN token_offering_allowed_countries AS toac ON ts.id = toac.token_offering_id
      GROUP BY
        ts.id,
        ass.url,
        mtt.name,
        mts.name
    )
  SELECT
  COUNT(*) AS count 
  FROM
    cte`;

  return listQueryCount;
};
