import { Logger } from "@helpers";

export const getTokenValuationGraphQuery = (
  from_date?: string,
  to_date?: string,
  token_offering_id?: string
) => {
  try {
    /* Get All Token Valuation Graph Query  */

    /* In Where Condition
            
             */

    // For Date Filters
    let dateFilter = ``;
    if (from_date && to_date) {
      dateFilter = ` AND tv.created_at BETWEEN '${from_date}' AND '${to_date}'`;
    }

    /* For Data */
    let baseQuery = `WITH
  ranked_valuations AS (
    SELECT
      tv.start_date,
      tv.start_time,
      tv.valuation_price,
      tv.created_at,
      ROW_NUMBER() OVER (
        PARTITION BY DATE(tv.created_at)
        ORDER BY
          tv.created_at DESC
      ) AS rn,
      MAX(tv.valuation_price) OVER () AS max_valuation_price
    FROM
      token_valuations AS tv
    WHERE
      tv.token_offering_id = '${token_offering_id}'
      ${dateFilter} 
  )
SELECT
  start_date,
  start_time,
  valuation_price,
  created_at,
  max_valuation_price
FROM
  ranked_valuations
WHERE
  rn = 1
ORDER BY
  created_at ASC`;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getTodayTokenValuationPriceQuery = (
  token_offering_id?: string
) => {
  try {
    /* Get Today Token Valuation Price Query  */

    /* In Where Condition
              
               */

    /* For Data */
    let baseQuery = `SELECT
  COALESCE(
    (
      SELECT
  tv.valuation_price
FROM
  token_valuations AS tv
WHERE
  tv.token_offering_id = '${token_offering_id}'
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
    ),
    (
      SELECT
        tof.offering_price
      FROM
        token_offerings AS tof
      WHERE
        tof.id = '${token_offering_id}'
    )
  ) AS valuation_price`;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getTokenOrdersGraphQuery = (
  from_date?: string,
  to_date?: string,
  token_offering_id?: string
) => {
  try {
    /* Get All Token Orders Graph Query  */

    /* In Where Condition
              
             */

    // For Date Filters
    let dateFilter = ``;
    if (from_date && to_date) {
      dateFilter = ` AND tor.created_at BETWEEN '${from_date}' AND '${to_date}'`;
    }

    /* For Data */
    let baseQuery = `SELECT
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
  AND tor.status_id IN (5, 11) 
  ${dateFilter}
GROUP BY
  DATE(tor.created_at)
ORDER BY
  order_date ASC`;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getTokenStatusQuery = (token_offering_id?: string) => {
  try {
    /* Get Token Status Graph Query  */

    /* In Where Condition
                
               */

    /* For Data */
    let baseQuery = `SELECT
  tof.id AS token_id,
  tof.name AS token_name,
  tof.offering_price AS offering_price,
  tof.symbol AS token_symbol,
  mtot.name AS token_type_name,
  ast_t.url AS token_logo_url,
  tof.offer_status_id AS status_id,
  mtos.name AS status_name,
  COALESCE(v.bid_price, null) AS bid_price,
  COALESCE(v.valuation_price, tof.offering_price) AS valuation_price
from
  token_offerings AS tof
  INNER JOIN master_token_type AS mtot ON tof.token_type_id = mtot.id
  LEFT JOIN assets AS ast_t ON tof.logo_asset_id = ast_t.id
  INNER JOIN master_token_offering_status AS mtos ON tof.offer_status_id = mtos.id
  LEFT JOIN LATERAL (
    SELECT
      tv.valuation_price,
      tv.bid_price
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
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getTokenCirculatingSupplyQuery = (token_offering_id?: string) => {
  try {
    /* Get Circulating Supply Graph Query  */

    /* In Where Condition
                  
                 */

    /* For Data */
    let baseQuery = `WITH
  vas_cs AS (
    SELECT
      tof.id AS token_offering_id,
      COALESCE(
        (
          SELECT
            tt.total_supply
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.token_offering_id = tof.id
            AND tt.status_id IN (1, 2)
          ORDER BY
            tt.updated_at DESC
          LIMIT
            1
        ), 0
      ) AS circulating_supply,
      COALESCE(
        (
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
        ), tof.offering_price
      ) AS valuation_price,
      COALESCE(
        (
          SELECT
            SUM(tt.block_token)
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.token_offering_id = tof.id
            AND tt.status_id IN (1, 2)
        ),
        0
      ) AS pending_token,
    tof.base_currency_code AS currency,
    tof.base_currency AS currency_code
    FROM
      token_offerings AS tof
    WHERE
      tof.id = '${token_offering_id}'
      AND tof.is_active = true
      AND tof.status_id = 1
      AND tof.offer_status_id IN (1,2)
  )
SELECT
  token_offering_id,
  circulating_supply,
  pending_token,
  currency,
  currency_code,
  (circulating_supply * valuation_price) AS circulating_supply_amount,
  (pending_token * valuation_price) AS pending_redemption_amount
FROM
  vas_cs
  `;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getTokenCirculatingSupplyBefore1dayQuery = (
  token_offering_id?: string,
  date?: string
) => {
  try {
    /* Get Circulating Supply Before 1 day Query  */

    /* In Where Condition
                    
                   */

    /* For Data */
    let baseQuery = `WITH
  vas_cs AS (
    SELECT
      tof.id AS token_offering_id,
      COALESCE(
        (
          SELECT
            tt.total_supply
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.token_offering_id = tof.id
            AND tt.status_id IN (1, 2)
            AND tt.updated_at < '${date}'
          ORDER BY
            tt.updated_at DESC
          LIMIT
            1
        ), 0
      ) AS circulating_supply,
      COALESCE(
        (
          SELECT
            tv.valuation_price
          FROM
            token_valuations AS tv
          WHERE
            tv.token_offering_id = tof.id
            AND (
              tv.start_date < CURRENT_DATE - INTERVAL '1 day'
              OR (
                tv.start_date = CURRENT_DATE - INTERVAL '1 day'
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
      COALESCE(
        (
          SELECT
            SUM(tt.block_token)
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.token_offering_id = tof.id
            AND tt.status_id IN (1, 2)
            AND tt.updated_at < '${date}'
        ),
        0
      ) AS pending_token,
    tof.base_currency_code AS currency,
    tof.base_currency AS currency_code
    FROM
      token_offerings AS tof
    WHERE
      tof.id = '${token_offering_id}'
      AND tof.is_active = true
      AND tof.status_id = 1
      AND tof.offer_status_id IN (1,2)
  )
SELECT
  token_offering_id,
  circulating_supply,
  pending_token,
  currency,
  currency_code,
  (circulating_supply * valuation_price) AS circulating_supply_amount,
  (pending_token * valuation_price) AS pending_redemption_amount
FROM
  vas_cs
    `;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getTokenRecentActivitiesQuery = (token_offering_id?: string) => {
  try {
    /* Get Recent Activities Graph Query  */

    /* In Where Condition
                      
                     */

    /* For Data */
    let baseQuery = `SELECT
  tor.token_offering_id AS token_offering_id,
  tt.updated_at AS date_time,
  ent_iss.legal_name AS issuer_name,
  ast_iss.url AS issuer_logo_url,
  ent_inv.legal_name AS investor_name,
  ast_inv.url AS investor_logo_url,
  tt.type AS type,
  tt.amount AS amount,
  tt.status_id AS status_id,
  mts.name AS status_name,
  tt.id AS token_transaction_id,
  tor.currency,
  tof.symbol AS token_symbol
FROM
  token_transactions AS tt
  INNER JOIN token_orders AS tor ON tt.order_id = tor.id
  INNER JOIN master_transaction_status AS mts ON tt.status_id = mts.id
  INNER JOIN entities AS ent_iss ON tor.issuer_entity_id = ent_iss.id
  INNER JOIN entities AS ent_inv ON tor.receiver_entity_id = ent_inv.id
  LEFT JOIN assets AS ast_iss ON ent_iss.logo_asset_id = ast_iss.id
  LEFT JOIN assets AS ast_inv ON ent_inv.logo_asset_id = ast_inv.id
  LEFT JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
WHERE
  tor.token_offering_id = '${token_offering_id}'
  ORDER BY tt.updated_at DESC 
  OFFSET 0 LIMIT 5
      `;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getByNoOfInvestorsQuery = (
  limit: number | null,
  offset: number | null,
  token_offering_id?: string,
  start_date?: string,
  end_date?: string | null
) => {
  try {
    /* Get Investor Distribution By no of investors Query  */

    /* In Where Condition
                        
                       */

    let dateQuery = ``;
    let limitStatment = ``;
    if (
      start_date &&
      end_date &&
      start_date.length > 0 &&
      end_date.length > 0
    ) {
      dateQuery = ` AND tor.updated_at BETWEEN '${start_date}' AND '${end_date}'`;
      dateQuery = ``;
    } else {
      dateQuery = ` AND tor.updated_at < '${start_date}'`;
    }

    if (offset !== null && limit !== null) {
      limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
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
  ${limitStatment}`;

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getByInvestmentAmountQuery = (
  limit: number | null,
  offset: number | null,
  token_offering_id?: string,
  start_date?: string,
  end_date?: string | null
) => {
  try {
    /* Get Investor Distribution By investment amount Query */

    /* In Where Condition
                          
                         */

    let dateQuery = ``;
    let limitStatment = ``;
    if (
      start_date &&
      end_date &&
      start_date.length > 0 &&
      end_date.length > 0
    ) {
      dateQuery = ` AND tor.updated_at BETWEEN '${start_date}' AND '${end_date}'`;
      dateQuery = ``;
    } else {
      dateQuery = ` AND tor.updated_at < '${start_date}'`;
    }

    if (offset !== null && limit !== null) {
      limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
    }

    /* For Data */
    let baseQuery = `WITH
  vas_id_ia AS (
    SELECT
      COALESCE(SUM(
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
      ), 0) net_investment,
      COUNT (DISTINCT(tor.receiver_entity_id)) AS investor_count,
      mc.name AS country_name,
      tof.base_currency_code AS investment_currency,
      tof.base_currency AS investment_currency_code
    FROM
      token_orders AS tor
      INNER JOIN entities AS inv_en ON tor.receiver_entity_id = inv_en.id
      INNER JOIN master_countries AS mc ON inv_en.country_id = mc.id 
      LEFT JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
    WHERE
      tor.token_offering_id = '${token_offering_id}'
      AND tor.status_id IN (5, 11) 
      ${dateQuery}
    GROUP BY
      mc.name,
      tof.base_currency,
      tof.base_currency_code
  )
SELECT
  *
FROM
  vas_id_ia
ORDER BY
  net_investment DESC 
  ${limitStatment}`;
    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const getBeforeValuationPriceQuery = (
  token_offering_id?: string,
  date?: string,
  time?: string
) => {
  try {
    /* Get Today Token Valuation Price Query  */

    /* In Where Condition
              
               */

    /* For Data */
    let baseQuery = ``;

    if (date && time && date.length > 0 && time.length > 0) {
      baseQuery = `SELECT
  COALESCE(
    (
      SELECT
  tv.valuation_price
FROM
  token_valuations AS tv
WHERE
  tv.token_offering_id = '${token_offering_id}'
  AND (
    tv.start_date < '${date}'
    OR (
      tv.start_date = '${date}'
      AND start_time <= '${time}'
    )
  )
ORDER BY
  tv.start_date DESC,
  tv.start_time DESC
LIMIT
  1
    ),
    (
      SELECT
        tof.offering_price
      FROM
        token_offerings AS tof
      WHERE
        tof.id = '${token_offering_id}'
    )
  ) AS valuation_price`;
    } else {
      baseQuery = ` SELECT
    tof.offering_price AS valuation_price
  FROM
    token_offerings AS tof
  WHERE
    tof.id = '${token_offering_id}'`;
    }

    return baseQuery;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};
