export const getTokenValuationGraphQuery = (
  from_date?: string,
  to_date?: string,
  token_offering_id?: string
) => {
  /* Get All Token Valuation Graph Query  */

  /* In Where Condition
            
             */

  // For Date Filters
  let dateFilter = ``;
  if (from_date && to_date) {
    dateFilter = ` AND tv.created_at BETWEEN '${from_date}' AND '${to_date}'`;
  }

  /* For Data */
  let baseQuery = `SELECT
  tv.start_date,
  tv.start_time,
  tv.valuation_price,
  tv.created_at,
  MAX(tv.valuation_price) OVER () AS max_valuation_price
from
  token_valuations AS tv
WHERE
  tv.token_offering_id = '${token_offering_id}' 
  ${dateFilter} 
ORDER BY
  tv.start_date,
  tv.start_time`;

  return baseQuery;
};

export const getTodayTokenValuationPriceQuery = (
  token_offering_id?: string
) => {
  /* Get Today Token Valuation Price Query  */

  /* In Where Condition
              
               */

  /* For Data */
  let baseQuery = `SELECT
  tv.valuation_price
FROM
  token_valuations AS tv
WHERE
  tv.token_offering_id = '${token_offering_id}'
  AND (tv.start_date < CURRENT_DATE)
  OR (
    tv.start_date = CURRENT_DATE
    AND start_time <= CURRENT_TIME
  )
ORDER BY
  start_date DESC,
  start_time DESC
LIMIT
  1`;

  return baseQuery;
};

export const getTokenOrdersGraphQuery = (
  from_date?: string,
  to_date?: string,
  token_offering_id?: string
) => {
  /* Get All Token Orders Graph Query  */

  /* In Where Condition
              
             */

  // For Date Filters
  let dateFilter = ``;
  if (from_date && to_date) {
    dateFilter = ` '${from_date}' ::date, '${to_date}'  ::date,`;
  } else {
    dateFilter = ` COALESCE(
        (
          SELECT
            MIN(DATE(created_at))
          FROM
            token_orders
          WHERE
            token_offering_id = '${token_offering_id}'
        ),
        current_date
      ),
      current_date,`;
  }

  /* For Data */
  let baseQuery = `WITH
  date_range AS (
    SELECT
      generate_series(
        ${dateFilter} 
        interval '1 day'
      ) ::date AS order_date
  )
SELECT
  date_range.order_date,
  COALESCE(subscription_count, 0) AS subscription_count,
  COALESCE(redemption_count, 0) AS redemption_count
FROM
  date_range
  LEFT JOIN (
    SELECT
      DATE(tor.created_at) AS order_date,
      COUNT(
        CASE
          WHEN tor.type = 'subscription'
          AND tor.status_id = 5 THEN 1
        END
      ) AS subscription_count,
      COUNT(
        CASE
          WHEN tor.type = 'redemption'
          AND tor.status_id = 11 THEN 1
        END
      ) AS redemption_count
    FROM
      token_orders AS tor
    WHERE
      tor.token_offering_id = '${token_offering_id}'
    GROUP BY
      DATE(tor.created_at)
  ) AS counts ON date_range.order_date = counts.order_date
ORDER BY
  date_range.order_date ASC`;

  return baseQuery;
};

export const getTokenStatusQuery = (token_offering_id?: string) => {
  /* Get Token Status Graph Query  */

  /* In Where Condition
                
               */

  /* For Data */
  let baseQuery = `SELECT
  tof.id AS token_id,
  tof.name AS token_name,
  tof.symbol AS token_symbol,
  mtot.name AS token_type_name,
  ast_t.url AS token_logo_url,
  tof.offer_status_id AS status_id,
  mtos.name AS status_name,
  COALESCE(v.valuation_price, tof.offering_price) AS valuation_price
from
  token_offerings AS tof
  INNER JOIN master_token_type AS mtot ON tof.token_type_id = mtot.id
  LEFT JOIN assets AS ast_t ON tof.logo_asset_id = ast_t.id
  INNER JOIN master_token_offering_status AS mtos ON tof.offer_status_id = mtos.id
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
  tof.id = '${token_offering_id}'
`;

  return baseQuery;
};

export const getTokenCirculatingSupplyQuery = (token_offering_id?: string) => {
  /* Get Circulating Supply Graph Query  */

  /* In Where Condition
                  
                 */

  /* For Data */
  let baseQuery = `SELECT
  tof.id AS token_offering_id,
  COALESCE(tof.circulating_supply_count, 0) AS circulating_supply,
  CASE
    WHEN v.valuation_price IS NOT NULL
    AND v.valuation_price != 0 THEN COALESCE(tof.circulating_supply_count, 0) * v.valuation_price
    ELSE COALESCE(tof.circulating_supply_count, 0) * tof.offering_price
  END AS circulating_supply_amount
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
  tof.id = '${token_offering_id}'
  AND tof.is_active = true
  AND tof.status_id = 1
  AND tof.offer_status_id = 1
  `;

  return baseQuery;
};

export const getTokenPendingRedemptionQuery = (token_offering_id?: string) => {
  /* Get Pending Redemption Graph Query  */

  /* In Where Condition
                    
                   */

  /* For Data */
  let baseQuery = `SELECT
  tor.token_offering_id AS token_offering_id,
  SUM(COALESCE(tor.ordered_tokens, 0)) AS pending_redemption,
  SUM(
    CASE
      WHEN v.valuation_price IS NOT NULL
      AND v.valuation_price != 0 THEN COALESCE(tor.ordered_tokens, 0) * v.valuation_price
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
  tor.token_offering_id = '${token_offering_id}'
  AND tor.type = 'redemption'
  AND tor.status_id NOT IN (6, 7, 8, 11)
GROUP BY
  tor.token_offering_id
    `;

  return baseQuery;
};

export const getTokenRecentActivitiesQuery = (token_offering_id?: string) => {
  /* Get Recent Activities Graph Query  */

  /* In Where Condition
                      
                     */

  /* For Data */
  let baseQuery = `SELECT
  tor.token_offering_id AS token_offering_id,
  tt.created_at AS date_time,
  ent_iss.legal_name AS issuer_name,
  ast_iss.url AS issuer_logo_url,
  ent_inv.legal_name AS investor_name,
  ast_inv.url AS investor_logo_url,
  tt.type AS type,
  tt.amount AS amount,
  tt.status_id AS status_id,
  mts.name AS status_name,
  tt.id AS token_transaction_id
FROM
  token_transactions AS tt
  INNER JOIN token_orders AS tor ON tt.order_id = tor.id
  INNER JOIN master_transaction_status AS mts ON tt.status_id = mts.id
  INNER JOIN entities AS ent_iss ON tor.issuer_entity_id = ent_iss.id
  INNER JOIN entities AS ent_inv ON tor.receiver_entity_id = ent_inv.id
  LEFT JOIN assets AS ast_iss ON ent_iss.logo_asset_id = ast_iss.id
  LEFT JOIN assets AS ast_inv ON ent_inv.logo_asset_id = ast_inv.id
WHERE
  tor.token_offering_id = '${token_offering_id}'
  ORDER BY tt.created_at DESC 
  OFFSET 0 LIMIT 5
      `;

  return baseQuery;
};

export const getByNoOfInvestorsQuery = (
  token_offering_id?: string,
  start_date?: string,
  end_date?: string | null
) => {
  /* Get Investor Distribution By no of investors Query  */

  /* In Where Condition
                        
                       */

  let dateQuery = ``;
  if (start_date && end_date && start_date.length > 0 && end_date.length > 0) {
    // dateQuery = ` AND tor.updated_at BETWEEN '${start_date}' AND '${end_date}'`;
    dateQuery = ``;
  } else {
    dateQuery = ` AND tor.updated_at < '${start_date}'`;
  }

  /* For Data */
  let baseQuery = `WITH
  vas_id_noi AS(
    SELECT
      COUNT (DISTINCT(tor.receiver_entity_id)) AS investor_count,
      mc.name AS country_name
    FROM
      token_orders AS tor
      INNER JOIN entities AS inv_en ON tor.receiver_entity_id = inv_en.id
      INNER JOIN master_countries AS mc ON inv_en.country_id = mc.id
    WHERE
      tor.token_offering_id = '${token_offering_id}'
      AND tor.status_id IN (5, 11) 
      ${dateQuery}
    GROUP BY
      mc.name
  )
SELECT
  *
FROM
  vas_id_noi
ORDER BY
  investor_count DESC
        `;

  return baseQuery;
};

export const getByInvestmentAmountQuery = (
  token_offering_id?: string,
  start_date?: string,
  end_date?: string | null
) => {
  /* Get Investor Distribution By investment amount Query */

  /* In Where Condition
                          
                         */

  let dateQuery = ``;
  if (start_date && end_date && start_date.length > 0 && end_date.length > 0) {
    // dateQuery = ` AND tor.updated_at BETWEEN '${start_date}' AND '${end_date}'`;
    dateQuery = ``;
  } else {
    dateQuery = ` AND tor.updated_at < '${start_date}'`;
  }

  /* For Data */
  let baseQuery = `WITH
  vas_id_ia AS (
    SELECT
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
      ) net_investment,
      COUNT (DISTINCT(tor.receiver_entity_id)) AS investor_count,
      mc.name AS country_name
    FROM
      token_orders AS tor
      INNER JOIN entities AS inv_en ON tor.receiver_entity_id = inv_en.id
      INNER JOIN master_countries AS mc ON inv_en.country_id = mc.id
    WHERE
      tor.token_offering_id = '${token_offering_id}'
      AND tor.status_id IN (5, 11) 
      ${dateQuery}
    GROUP BY
      mc.name
  )
SELECT
  *
FROM
  vas_id_ia
ORDER BY
  net_investment DESC
          `;

  return baseQuery;
};