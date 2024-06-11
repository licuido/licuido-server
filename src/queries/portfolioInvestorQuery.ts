export const getTokensHoldingsGraphQuery = (
  from_date?: string,
  to_date?: string,
  user_entity_id?: string
) => {
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
};

export const getCurrentTokenInvestmentQuery = (
  offset: number | null,
  limit: number | null,
  user_entity_id?: string
) => {
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
  tof.isin_number AS token_isin,
  tof.start_date AS token_start_date,
  tof.end_date AS token_end_date,
  tof.status_id AS status_id,
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
  ) AS total_holdings
FROM
  token_orders AS tor
  INNER JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
  LEFT JOIN assets AS t_ast ON tof.logo_asset_id = t_ast.id
  INNER JOIN entities AS iss_ent ON tor.issuer_entity_id = iss_ent.id
  LEFT JOIN assets AS iss_ast ON iss_ent.logo_asset_id = iss_ast.id
  INNER JOIN master_token_status AS mts ON tof.status_id = mts.id
  LEFT JOIN balances AS ba ON tor.token_offering_id = ba.token_offering_id
WHERE
  tor.receiver_entity_id = '${user_entity_id}'
GROUP BY
  tor.receiver_entity_id,
  iss_ent.legal_name,
  iss_ast.url,
  tor.token_offering_id,
  tof.name,
  t_ast.url,
  tof.symbol,
  tof.isin_number,
  tof.start_date,
  tof.end_date,
  tof.status_id,
  mts.name,
  tof.offering_price,
  ba.total_balance
ORDER BY
  total_holdings DESC
  ${limitStatment};`;

  return baseQuery;
};

export const getInvestorDashboardQuery = (user_entity_id?: string) => {
  /* Get Investor DashBoard  */

  /* In Where Condition
          
           */

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
      SUM(
        CASE
          WHEN tor.type = 'subscription'
          AND tor.status_id = 5 THEN COALESCE(tor.net_investment_value_in_euro, 0)
          ELSE 0
        END
      ) - SUM(
        CASE
          WHEN tor.type = 'redemption'
          AND tor.status_id = 11 THEN COALESCE(tor.net_investment_value_in_euro, 0)
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
      token_status.sender_balance
  )
SELECT
  SUM(COALESCE(investment, 0)) AS investment,
  SUM(COALESCE(sender_balance * valuation_price, 0)) AS current_value,
  ROUND(
    (
      (
        SUM(COALESCE(sender_balance * valuation_price, 0)) - SUM(COALESCE(investment, 0))
      ) / NULLIF(ABS(SUM(COALESCE(investment, 0))), 0)
    ) * 100,
    2
  ) AS percentage_change
FROM
  vas_inv`;

  return baseQuery;
};
