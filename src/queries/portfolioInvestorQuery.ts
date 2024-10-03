import { Logger } from "@helpers";

export const getTokensHoldingsGraphQuery = (
  from_date?: string,
  to_date?: string,
  user_entity_id?: string
) => {
  try {
    /* Get All Token Holdings Graph Query  */

    /* In Where Condition
           ---- receiver_entity_id = ""
           ---- status_id = 5
           ---- updated_at BETWEEN '' AND '' [ For Date Filters ]  
           */

    // For Date Filters
    let dateFilter = ``;
    if (from_date && to_date) {
      dateFilter = ` AND tor.updated_at BETWEEN '${from_date}' AND '${to_date}'`;
    }

    /* For Data */
    let baseQuery = `SELECT
  tor.token_offering_id AS token_offering_id,
  MIN(tof.name) AS token_name,
  (
    COALESCE(
      (
        SELECT
          SUM(COALESCE(tord.net_investment_value_in_euro, 0))
        FROM
          token_orders AS tord
        WHERE
          tord.receiver_entity_id = '${user_entity_id}'
          AND tord.token_offering_id = tor.token_offering_id
          AND tord.type = 'subscription'
          AND tord.status_id = 5
      ),
      0
    ) - COALESCE(
      (
        SELECT
          SUM(COALESCE(tord.net_investment_value_in_euro, 0))
        FROM
          token_orders AS tord
        WHERE
          tord.receiver_entity_id = '${user_entity_id}'
          AND tord.token_offering_id = tor.token_offering_id
          AND tord.type = 'redemption'
          AND tord.status_id = 11
      ),
      0
    )
  ) AS investment
FROM
  token_orders AS tor
  INNER JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
WHERE
  tor.receiver_entity_id = '${user_entity_id}'
  ${dateFilter}
GROUP BY
  tor.token_offering_id
ORDER BY
  investment ASC`;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getCurrentTokenInvestmentQuery = (
  offset: number | null,
  limit: number | null,
  user_entity_id?: string
) => {
  try {
    /* Get CurrentTokenInvestment Query  */

    /* In Where Condition
           ---- receiver_entity_id = "" 
            tor.status_id = 5 | 11 [ Minted | Burned ]
           */

    // For Limit & Offset
    let limitStatment = ``;
    if (offset !== null && limit !== null) {
      limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
    }
    /* For Data */
    let baseQuery = `
  WITH
  last_transaction AS (
    SELECT
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
      AND tor.receiver_entity_id = '${user_entity_id}'
  ),
  balances AS (
    SELECT
      token_offering_id,
      sender_balance AS total_balance
    FROM
      last_transaction
    WHERE
      rn = 1
    GROUP BY
      token_offering_id,
      sender_balance
  )
SELECT
  tor.receiver_entity_id AS investor_entity_id,
  iss_ent.legal_name AS issuer_name,
  iss_ast.url AS issuer_logo_url,
  tor.token_offering_id AS token_offering_id,
  tof.name AS token_name,
  t_ast.url AS token_logo_url,
  tof.symbol AS token_symbol,
  tof.base_currency_code,
  tof.base_currency,
  tof.isin_number AS token_isin,
  tof.start_date AS token_start_date,
  tof.end_date AS token_end_date,
  tof.status_id AS status_id,
  tp.id as token_pledge_id,
  tp.pledge_token as token_pledge_count,
  mts.name AS status,
  (
    COALESCE(
      (
        SELECT
          tv.valuation_price
        FROM
          token_valuations AS tv
        WHERE
          tv.token_offering_id = tor.token_offering_id
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
      ), tof.offering_price
    ) * ba.total_balance
  ) AS total_holdings, 
  ba.total_balance AS token_count,
  tof.issuer_entity_id AS issuer_entity_id,
  COALESCE(
    (
      SELECT
        tv.valuation_price
      FROM
        token_valuations AS tv
      WHERE
        tv.token_offering_id = tor.token_offering_id
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
    ), tof.offering_price
  ) AS valuation_price,
   tof.offering_price AS offering_price
FROM
  token_orders AS tor
  INNER JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
  LEFT JOIN assets AS t_ast ON tof.logo_asset_id = t_ast.id
  INNER JOIN entities AS iss_ent ON tor.issuer_entity_id = iss_ent.id
  LEFT JOIN assets AS iss_ast ON iss_ent.logo_asset_id = iss_ast.id
  INNER JOIN master_token_status AS mts ON tof.status_id = mts.id
  LEFT JOIN balances AS ba ON tor.token_offering_id = ba.token_offering_id
  LEFT JOIN token_pledges AS tp ON tp.token_offering_id = tof.id
WHERE
  tor.receiver_entity_id = '${user_entity_id}' 
  AND tor.status_id IN (5, 11)
GROUP BY
  tor.receiver_entity_id,
  iss_ent.legal_name,
  iss_ast.url,
  tor.token_offering_id,
  tof.name,
  t_ast.url,
  tp.id,
  tof.symbol,
  tof.isin_number,
  tof.start_date,
  tof.end_date,
  tof.status_id,
  mts.name,
  tof.offering_price,
  ba.total_balance,
  tof.issuer_entity_id,
  tof.base_currency_code,
  tof.base_currency
ORDER BY
  total_holdings DESC
  ${limitStatment};`;
    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getInvestorDashboardQuery = (user_entity_id?: string) => {
  try {
    /* Get Investor DashBoard  */

    /* In Where Condition
          
           */
    // Currency table Sample

    /* For Data */
    let baseQuery = `WITH 
  last_transaction AS (
    SELECT
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
      tor.receiver_entity_id = '${user_entity_id}'
      AND tt.status_id = 2
  ),
  summed_balances AS (
    SELECT
      token_offering_id,
      sender_balance AS sender_balance
    FROM
      last_transaction
    WHERE
      rn = 1
    GROUP BY
      token_offering_id,
      sender_balance
  ),
  vas_inv AS(
    SELECT
      tor.token_offering_id,
      tof.base_currency,
      SUM(
        CASE
          WHEN tor.type = 'subscription'
          AND tor.status_id = 5 THEN COALESCE(tor.ordered_tokens * tof.offering_price, 0)
          ELSE 0
        END
      ) - SUM(
        CASE
          WHEN tor.type = 'redemption'
          AND tor.status_id = 11 THEN COALESCE(tor.ordered_tokens * tof.offering_price, 0)
          ELSE 0
        END
      ) AS investment,
      COALESCE(
        (
          SELECT
            tv.valuation_price
          FROM
            token_valuations AS tv
          WHERE
            tv.token_offering_id = tor.token_offering_id
            AND (
              tv.start_date < CURRENT_DATE
              OR (
                tv.start_date = CURRENT_DATE
                AND start_time <= CURRENT_TIME
              )
            )
          ORDER BY
            start_date DESC,
            start_time DESC
          LIMIT
            1
        ), tof.offering_price
      ) AS valuation_price,
      token_status.sender_balance AS sender_balance
    FROM
      token_orders AS tor
      INNER JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
      LEFT JOIN summed_balances AS token_status ON tof.id = token_status.token_offering_id 
    WHERE
      tor.receiver_entity_id = '${user_entity_id}'
    GROUP BY
      tor.token_offering_id,
      tof.offering_price,
      token_status.sender_balance,
      tof.base_currency
  )
SELECT
  *
FROM
  vas_inv`;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getAllValuationPriceQuery = (
  from_date?: string,
  to_date?: string,
  token_ids?: any[]
) => {
  try {
    /* Get Valuation Price Query  */

    /* In Where Condition
          
           */

    /* For Data */
    let baseQuery = `WITH
  date_series AS (
    SELECT
      generate_series(
        '${from_date}'::date, -- Replace with your from_date
        '${to_date}'::date, -- Replace with your end_date
        '1 day'::interval
      ) AS date
  ),
  valuations AS (
    SELECT
      ds.date,
      tof.id AS token_id,
      COALESCE(
        (
          SELECT
            tv.valuation_price
          FROM
            token_valuations AS tv
          WHERE
            tv.token_offering_id = tof.id
            AND (
              tv.start_date < ds.date
              OR (
                tv.start_date = ds.date
                AND tv.start_time <= CURRENT_TIME
              )
            )
          ORDER BY
            tv.start_date DESC,
            tv.start_time DESC
          LIMIT
            1
        ),
        tof.offering_price
      ) AS valuation_price
    FROM
      token_offerings AS tof
      CROSS JOIN date_series AS ds
    WHERE
      tof.id IN (${token_ids?.map((id) => `'${id}'`).join(", ")})
  ),
  numbered_valuations AS (
    SELECT
      v.*,
      ROW_NUMBER() OVER (
        ORDER BY
          v.date
      ) AS id
    FROM
      valuations AS v
  )
SELECT
  nv.token_id,
  json_agg(
    json_build_object(
      'id',
      nv.id,
      'date',
      nv.date::date,
      'valuation_price',
      nv.valuation_price
    )
  ) AS aggregated_valuations
FROM
  numbered_valuations AS nv
GROUP BY
  nv.token_id`;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getInvestorTokenHoldingsQuery = (user_entity_id?: string) => {
  try {
    /* Get Investor Token Holdings Query  */

    /* In Where Condition
          
           */

    /* For Data */
    let baseQuery = `WITH
  aggregated_balances AS (
    SELECT
      tor.token_offering_id,
      tof.base_currency,
      tt.updated_at::date AS transaction_date,
      COALESCE(tt.sender_balance, 0) AS sender_balance,
      ROW_NUMBER() OVER (
        PARTITION BY
          tor.token_offering_id,
          tof.base_currency
        ORDER BY
          tt.updated_at DESC
      ) AS rn
    FROM
      token_transactions tt
      INNER JOIN token_orders tor ON tt.order_id = tor.id
      INNER JOIN token_offerings tof ON tor.token_offering_id = tof.id
    WHERE
      tt.status_id = 2
      AND tor.receiver_entity_id = '${user_entity_id}'
  )
SELECT
  token_offering_id,
  base_currency,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'date',
      transaction_date,
      'sender_balance',
      sender_balance
    )
  ) AS aggregated_balance_json
FROM
  aggregated_balances
  WHERE rn = 1
GROUP BY
  token_offering_id,
  base_currency
ORDER BY
  token_offering_id`;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getAllTokensDeploymentCountQuery = (
  start_date?: string,
  end_date?: string
) => {
  // Date Filter
  let dateFilter = ``;
  if (start_date && end_date) {
    dateFilter = `AND created_at::date >= '${start_date}' AND created_at::date <= '${end_date}'`;
  }

  // Count Query
  let countQuery = `
    SELECT
      COUNT(*) AS count
    FROM
      token_offerings
    WHERE
      offer_status_id = 3
      ${dateFilter}
  `;

  return countQuery;
};

export const getIssuerApprovalCountQuery = (
  start_date?: string,
  end_date?: string
) => {
  // Date filter
  let dateFilter = "";
  if (start_date && end_date) {
    dateFilter = `AND ue.created_at::date >= '${start_date}' AND ue.created_at::date <= '${end_date}'`;
  }

  // Count Query
  let countQuery = `
    SELECT
      COUNT(*) AS count
    FROM
      user_entities ue
      INNER JOIN user_profiles up ON ue.user_profile_id = up.id
    WHERE
      ue.entity_id = 3
      AND up.is_setup_done = true
      ${dateFilter}
  `;

  return countQuery;
};

export const getTotalInvestmentIssuersInvestorsCount = (
  start_date?: string,
  end_date?: string
) => {
  // Date filter
  let dateFilter = "";
  if (start_date && end_date) {
    dateFilter = `AND up.created_at::date >= '${start_date}' AND up.created_at::date <= '${end_date}'`;
  }

  // Count Query
  let countQuery = `
    SELECT
      SUM(CASE WHEN ue.entity_id = 2 THEN 1 ELSE 0 END) AS total_investor_count,
      SUM(CASE WHEN ue.entity_id = 3 THEN 1 ELSE 0 END) AS total_issuer_count,
      SUM(CASE WHEN ue.entity_id = 2 ${dateFilter} THEN 1 ELSE 0 END) AS investor_count,
      SUM(CASE WHEN ue.entity_id = 3 ${dateFilter} THEN 1 ELSE 0 END) AS issuer_count
    FROM
      user_profiles up
      INNER JOIN user_entities ue ON up.id = ue.user_profile_id
    WHERE
      ue.entity_id IN (2, 3);
  `;

  return countQuery;
};

export const getTokenOverviewQuery = (
  user_entity_id?: string,
  token_id?: string
) => {
  try {
    /* For Data */
    let baseQuery = `SELECT
  tof.id,
  tof.offering_price AS offering_price,
  tof.symbol AS token_symbol,
  tof.base_currency_code AS investment_currency,
  tof.base_currency AS investment_currency_code,
  COALESCE((
    SELECT
      tt.sender_balance AS balance
    FROM
      token_transactions AS tt
      INNER JOIN token_orders AS tor ON tt.order_id = tor.id
    WHERE
      tt.status_id IN (1, 2)
      AND tor.token_offering_id = '${token_id}'
      AND tor.receiver_entity_id = '${user_entity_id}'
    ORDER BY
      tt.updated_at DESC
    LIMIT
      1
  ), 0) AS balance,
  COALESCE((
    SELECT
      SUM(tt.block_token) AS pending
    FROM
      token_transactions AS tt
      INNER JOIN token_orders AS tor ON tt.order_id = tor.id
    WHERE
      tt.status_id IN (1, 2)
      AND tor.token_offering_id = '${token_id}'
      AND tor.receiver_entity_id = '${user_entity_id}'
  ),0) AS pending,
  COALESCE(
    (
      SELECT
        valuation_price
      FROM
        token_valuations AS tv
      WHERE
        tv.token_offering_id = '${token_id}'
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
    ),
    tof.offering_price
  ) AS valuation_price
FROM
  token_offerings AS tof
WHERE
  tof.id = '${token_id}'`;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};
