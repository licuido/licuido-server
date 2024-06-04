export const getTotalInvestmentQuery = (user_entity_id?: string) => {
  /* Get Token Investment & Investment Variation Percentage */

  /* In Where Condition
           ---- issuer_entity_id = ""
           ---- AND tof.status_id = 1
           ---- AND tof.offer_status_id = 1
           ---- AND tor.type = 'subscription' [Only Subscription Investment]
           ---- AND tor.status_id = 5 [Only Minted Status]
           */

  /* For Data */
  let baseQuery = `SELECT
    tof.issuer_entity_id AS issuer_entity_id,
    SUM(COALESCE(tor.net_investment_value_in_euro, 0)) AS overall_investment,
    COALESCE(
      ROUND(
        (
          (
            SUM(
              CASE
                WHEN DATE(tor.created_at) <= CURRENT_DATE THEN COALESCE(tor.net_investment_value_in_euro, 0)
                ELSE 0
              END
            ) - SUM(
              CASE
                WHEN DATE(tor.created_at) <= CURRENT_DATE - INTERVAL '1 day' THEN COALESCE(tor.net_investment_value_in_euro, 0)
                ELSE 0
              END
            )
          ) / SUM(
            CASE
              WHEN DATE(tor.created_at) <= CURRENT_DATE - INTERVAL '1 day' THEN COALESCE(tor.net_investment_value_in_euro, 0)
              ELSE 0
            END
          )
        ) * 100
      ),
      0
    ) AS percentage_change_till_today
  FROM
    token_offerings AS tof
    LEFT JOIN token_orders AS tor ON tof.id = tor.token_offering_id
  WHERE
    tof.issuer_entity_id = '${user_entity_id}'
    AND tof.is_active = true
    AND tof.status_id = 1
    AND tof.offer_status_id = 1
    AND tor.type = 'subscription'
    AND tor.status_id = 5
  GROUP BY
    tof.issuer_entity_id`;

  return baseQuery;
};

export const getCirculatingSupplyQuery = (user_entity_id?: string) => {
  /* Get Circulating Supply & Amount */

  /* In Where Condition
           ---- issuer_entity_id = ""
           ---- AND tof.status_id = 1 Active
           ---- AND tof.offer_status_id = 1 Active
           */

  /* For Data */
  let baseQuery = `SELECT
    tof.issuer_entity_id AS issuer_entity_id,
    SUM(COALESCE(tof.circulating_supply_count, 0)) AS circulating_supply,
    SUM(
      CASE
        WHEN v.valuation_price IS NOT NULL
        AND v.valuation_price != 0 THEN COALESCE(tof.circulating_supply_count, 0) * v.valuation_price
        ELSE COALESCE(tof.circulating_supply_count, 0) * tof.offering_price
      END
    ) AS circulating_supply_amount
  FROM
    token_offerings AS tof 
    LEFT JOIN LATERAL (
      SELECT
        tv.valuation_price
      FROM
        token_valuations AS tv
      WHERE
        tv.token_offering_id = tof.id
        AND (
          tv.start_date < CURRENT_DATE
          OR (
            tv.start_date = CURRENT_DATE
            AND start_time <= CURRENT_TIME
          )
        )
      ORDER BY
        tv.start_date DESC,
        tv.start_time DESC
      LIMIT
        1
    ) v ON true
  WHERE
    tof.issuer_entity_id = '${user_entity_id}'
    AND tof.is_active = true
    AND tof.status_id = 1
    AND tof.offer_status_id = 1
  GROUP BY
    tof.issuer_entity_id`;

  return baseQuery;
};

export const getPendingRedemptionQuery = (user_entity_id?: string) => {
  /* Get Pending Redemption & Amount */

  /* In Where Condition
           ---- issuer_entity_id = ""
           ---- AND tof.status_id = 1 Active
           ---- AND tof.offer_status_id = 1 Active
           */

  /* For Data */
  let baseQuery = `SELECT
    tor.issuer_entity_id AS issuer_entity_id,
    SUM(COALESCE(tor.ordered_tokens, 0)) AS pending_redemption,
    SUM(
      CASE
          WHEN v.valuation_price IS NOT NULL AND v.valuation_price != 0
          THEN COALESCE(tor.ordered_tokens, 0) * v.valuation_price
          ELSE COALESCE(tor.ordered_tokens, 0) * tof.offering_price
      END
  ) AS pending_redemption_amount
  FROM
    token_orders AS tor
    INNER JOIN token_offerings AS tof ON tor.token_offering_id = tof.id 
    LEFT JOIN LATERAL (
      SELECT
          tv.valuation_price
      FROM
          token_valuations AS tv
      WHERE
          tv.token_offering_id = tof.id
          AND (
              tv.start_date < CURRENT_DATE
              OR (
                  tv.start_date = CURRENT_DATE
                  AND start_time <= CURRENT_TIME
              )
          )
      ORDER BY
          tv.start_date DESC,
          tv.start_time DESC
      LIMIT
          1
  ) v ON true
  WHERE
    tor.issuer_entity_id = '${user_entity_id}'
    AND tor.type = 'redemption'
    AND tor.status_id NOT IN (6, 7, 8, 11)
  GROUP BY
    tor.issuer_entity_id`;

  return baseQuery;
};

export const getAllFundOfferingsForPortfolioQuery = (
  offset: number | null,
  limit: number | null,
  user_entity_id?: string
) => {
  /* Get All Fund Offerings For Portfolio */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }

  /* For Data */
  let baseQuery = `WITH
  vas_fo AS (
    SELECT
      tof.id AS token_offering_id,
      tof.name AS token_name,
      tof.symbol AS token_symbol,
      tof.isin_number AS isin_no,
      tof.start_date AS star_date,
      tof.end_date AS end_date,
      tof.offer_status_id AS token_status_id,
      mtos.name AS token_status_name,
      tof.status_id AS status_id,
      mts.name AS status_name,
      tof.offering_price AS offering_price,
      tof.created_at AS created_at,
      COALESCE(tof.circulating_supply_count, 0) AS circulating_supply,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(token_or.ordered_tokens, 0))
          FROM
            token_orders AS token_or
            INNER JOIN token_offerings AS token_of ON token_or.token_offering_id = token_of.id
          WHERE
            token_or.issuer_entity_id = '${user_entity_id}'
            AND token_or.type = 'redemption'
            AND token_or.status_id NOT IN (6, 7, 8, 11)
            AND token_or.token_offering_id = tof.id
        ),
        0
      ) AS pending_token_redemption,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(tor.net_investment_value_in_euro, 0))
          FROM
            token_orders AS tor
          WHERE
            tor.token_offering_id = tof.id
        ),
        0
      ) AS overall_investment,
      COALESCE(v.valuation_price, tof.offering_price) AS valuation
    FROM
      token_offerings AS tof
      INNER JOIN master_token_offering_status AS mtos ON tof.offer_status_id = mtos.id
      INNER JOIN master_token_status AS mts ON tof.status_id = mts.id
      LEFT JOIN LATERAL (
        SELECT
          tv.valuation_price
        FROM
          token_valuations AS tv
        WHERE
          tv.token_offering_id = tof.id
          AND (
            tv.start_date < CURRENT_DATE
            OR (
              tv.start_date = CURRENT_DATE
              AND tv.start_time <= CURRENT_TIME
            )
          )
        ORDER BY
          tv.start_date DESC,
          tv.start_time DESC
        LIMIT
          1
      ) v ON true
    WHERE
      tof.issuer_entity_id = '${user_entity_id}'
  )
SELECT
  *,
  (circulating_supply - pending_token_redemption) AS available_token,
  ROUND(
    ((valuation - offering_price) / offering_price * 100),
    1
  ) AS valuation_percentage
FROM
  vas_fo 
  ORDER BY
  created_at ASC 
  ${limitStatment}`;

  return baseQuery;
};

export const getInvestorListQuery = (
  offset: number | null,
  limit: number | null,
  search?: string,
  status_filters?: number[] | [],
  investor_type_filters?: number[] | [],
  country_filters?: number[] | [],
  user_entity_id?: string,
  minimum_investment_value?: string,
  maximum_investment_value?: string
) => {
  /* Get All Investors Query on Search , Limit & Offset */

  /* In Where Condition
  
   */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }

  // For Search By Investor Name & Wallet Id Filter
  let searchFilter = ``;
  if (search && search.length > 0) {
    searchFilter = ` AND (
      investor_name ILIKE '${search}%'
      OR wallet_address ILIKE '${search}%'
    )`;
  }

  // For Country Filter
  let countryFilter = ``;
  if (country_filters && country_filters?.length > 0) {
    countryFilter = ` AND country_id IN (${country_filters?.join(",")})`;
  }

  // For Investor Type Filter [Corporate | Individual]
  let investorTypeFilter = ``;
  if (investor_type_filters && investor_type_filters?.length > 0) {
    investorTypeFilter = ` AND investor_type_id IN (${investor_type_filters?.join(
      ","
    )})`;
  }

  // Entity Investor Status Filter [Qualify | Tokenholder]
  let statusFilter = ``;
  if (status_filters && status_filters?.length > 0) {
    statusFilter = `  AND status_id IN (${status_filters?.join(",")})
      `;
  }

  // Investment Value Filter
  let invetementValueFilter = ``;
  if (
    minimum_investment_value &&
    minimum_investment_value?.length > 0 &&
    maximum_investment_value &&
    maximum_investment_value?.length > 0
  ) {
    invetementValueFilter = `  AND investment BETWEEN ${minimum_investment_value} AND ${maximum_investment_value}
      `;
  }

  /* For Data */
  let baseQuery = `WITH
  vas_inv AS (
    SELECT
      ei.investor_entity_id AS investor_entity_id,
      ei.is_active AS is_active,
      ei.created_at AS created_at,
      en.legal_name AS investor_name,
      inv_ast.url AS investor_logo_url,
      cw.wallet_address AS wallet_address,
      mwt.name AS wallet_type_name,
      ei.investor_type_id AS investor_type_id,
      mit.name AS investor_type_name,
      CAST(
        CASE
          WHEN token_status.is_tokenholder = 1 THEN 4
          ELSE ei.status_id
        END AS INT
      ) AS status_id,
      CAST(
        CASE
          WHEN token_status.is_tokenholder = 1 THEN 'Tokenholder'
          ELSE meis.name
        END AS VARCHAR
      ) AS status_name,
      COALESCE(token_status.net_investment, 0) AS investment,
      COALESCE(token_status.tokens, 0) AS tokens,
      en.country_id AS country_id,
      mco.name AS country_name,
      mco.emoji AS country_emoji,
      mco.emoji_unicode AS country_emoji_unicode,
      en.business_sector_id AS sector_id,
      mbs.name AS sector
    FROM
      entity_investors AS ei
      INNER JOIN master_investor_types AS mit ON ei.investor_type_id = mit.id
      INNER JOIN entities AS en ON ei.investor_entity_id = en.id
      INNER JOIN master_entity_investor_status AS meis ON ei.status_id = meis.id
      INNER JOIN assets AS inv_ast ON en.logo_asset_id = inv_ast.id
      LEFT JOIN master_countries AS mco ON en.country_id = mco.id
      LEFT JOIN master_business_sectors AS mbs ON en.business_sector_id = mbs.id
      LEFT JOIN customer_wallets AS cw ON en.id = cw.investor_entity_id
      LEFT JOIN master_wallet_types AS mwt ON cw.wallet_type_id = mwt.id
      LEFT JOIN (
        SELECT
          receiver_entity_id,
          MAX(
            CASE
              WHEN status_id = 5 THEN 1
              ELSE 0
            END
          ) AS is_tokenholder,
          SUM(net_investment_value_in_euro) AS net_investment,
          SUM(ordered_tokens) AS tokens
        FROM
          token_orders
        WHERE
          status_id = 5
        GROUP BY
          receiver_entity_id
      ) AS token_status ON ei.investor_entity_id = token_status.receiver_entity_id
    WHERE
      ei.issuer_entity_id = '${user_entity_id}'
      AND ei.status_id = 3
  )
SELECT
  *
FROM
  vas_inv
WHERE
  is_active = true 
  ${searchFilter} 
  ${statusFilter} 
  ${investorTypeFilter} 
  ${countryFilter} 
  ${invetementValueFilter}
ORDER BY
  created_at ASC
  ${limitStatment}`;

  return baseQuery;
};
