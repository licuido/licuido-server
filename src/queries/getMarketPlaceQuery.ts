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
    countryFilter = ` AND toac.allowed_country_id IN (${countryFilterId?.join(
      ","
    )})`;
  }

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }

  // For investor status
  let investorStatusFilter = ``;
  if (investorStatus === ENTITY_INVESTOR_STATUS.APPROVED) {
    investorStatusFilter = ` AND ei_sub.is_qualified_status_id = ${investorStatus}`;
  } else if (investorStatus === ENTITY_INVESTOR_STATUS.NOT_APPROVED) {
    investorStatusFilter = ` AND ei_sub.is_qualified_status_id IS NULL OR ei_sub.is_qualified_status_id != ${ENTITY_INVESTOR_STATUS.APPROVED}`;
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

  //For fundStatus
  let fundStatusFilter = ``;
  if (fundStatus && fundStatus?.length > 0) {
    fundStatusFilter = ` WHERE master_token_status_name IN (${fundStatus
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
        CASE
          WHEN ts.start_date > CURRENT_DATE THEN 'Upcoming'
          WHEN order_count > 0 THEN 'Invested'
          ELSE mts.name
        END AS master_token_status_name,
        mts.name AS token_status,
        array_to_string(array_agg(DISTINCT mfa.name), ',') AS agency_name,
        array_to_string(array_agg(DISTINCT mfar.name), ',') AS rating_name,
        ts.is_all_countries_allowed,
        array_agg(DISTINCT toac.allowed_country_id) AS allowed_country_ids,
        COALESCE(ei_sub.is_qualified_status_id, NULL) as is_qualified_status_id,
        COALESCE(ei_sub.investor_status, NULL) as investor_status
      FROM
        token_offerings AS ts
        INNER JOIN assets AS ass ON ts.logo_asset_id = ass.id
        INNER JOIN master_token_type AS mtt ON ts.token_type_id = mtt.id
        INNER JOIN master_token_status AS mts ON ts.status_id = mts.id
        LEFT JOIN offer_fund_ratings AS ofr ON ts.id = ofr.offer_token_id
        LEFT JOIN master_fund_agencies AS mfa ON ofr.agency_id = mfa.id
        LEFT JOIN master_fund_agency_ratings AS mfar ON ofr.rating_id = mfar.id
        LEFT JOIN token_offering_allowed_countries AS toac ON ts.id = toac.token_offering_id
         LEFT JOIN LATERAL (
          SELECT
          ei.status_id as is_qualified_status_id,
          meis.name as investor_status
        FROM
          entity_investors ei
          INNER JOIN master_entity_investor_status meis ON ei.status_id = meis.id
        WHERE
          ei.issuer_entity_id = ts.issuer_entity_id
          AND '${user_entity_id}' = ei.investor_entity_id
        LIMIT
          1
      ) ei_sub ON true
      LEFT JOIN LATERAL (
        SELECT
          COUNT(*) AS order_count
        FROM
          token_orders tor
        WHERE
          tor.receiver_entity_id = '${user_entity_id}'
          AND tor.token_offering_id = ts.id
          AND tor.status_id = 5
      ) order_count_sub ON true
      WHERE ts.is_active = true AND ts.offer_status_id = 1 ${searchFilter} ${tokenTypeIdFilter} ${currencyCodeFilter} ${investorStatusFilter}
         ${countryFilter}
      GROUP BY
        ts.id,
        ass.url,
        ass.type,
        mtt.name,
        mts.name,
        ei_sub.is_qualified_status_id,
        ei_sub.investor_status,
        order_count_sub.order_count
    )
  SELECT
    *
  FROM
    cte ${fundStatusFilter}
  ORDER BY
    CASE
      WHEN is_all_countries_allowed IS TRUE
      OR array_position(allowed_country_ids, ${countryId}) IS NOT NULL THEN 0
      ELSE 1
    END
    ${limitStatment}
    `;

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
