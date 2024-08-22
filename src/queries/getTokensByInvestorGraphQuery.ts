export const getTokensByInvestorGraphQuery = (
  from_date?: string,
  to_date?: string,
  user_entity_id?: string,
  request?: any
) => {
  /* Get All Token By Investor Graph Query on Limit & Offset */

  /* In Where Condition
         ---- issuer_entity_id = ""
         ---- status_id 1 [ Active ]
         ---- offer_status_id 1 [ Active ]
         ---- updated_at BETWEEN '' AND '' [ For Date Filters ]  
         */

  // For Date Filters
  let dateFilter = ``;
  if (from_date && to_date) {
    dateFilter = ` AND tt.updated_at BETWEEN '${from_date}' AND '${to_date}'`;
  }
  /* For Data */
  let baseQuery = `WITH
  vas_tbi AS(
    SELECT
      tof.id,
      tof.name,
      tof.symbol AS token_symbol,
      COALESCE(
        (
          SELECT
            tt.total_supply
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.issuer_entity_id = '${user_entity_id}'
            AND tor.token_offering_id = tof.id
            AND tt.status_id = 2 
            ${dateFilter} 
          ORDER BY
            tt.updated_at DESC
          LIMIT
            1
        ), 0
      ) AS total_supply,
      COALESCE(
        (
          SELECT
            tv.valuation_price_in_euro
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
        ), tof.offering_price_in_euro
      ) AS valuation_price
    FROM
      token_offerings AS tof
    WHERE
      tof.issuer_entity_id = '${user_entity_id}'
      AND tof.is_active = true
      AND tof.status_id = 1
      AND tof.offer_status_id = 1
    GROUP BY
      tof.id,
      tof.name
  )
SELECT
  *,
  COALESCE(total_supply * valuation_price, 0) AS token_holdings_in_euro
FROM
  vas_tbi
ORDER BY
   name ASC`;
  /* For Data */
  let baseAdminQuery = `WITH
  vas_tbi AS(
    SELECT
      tof.id,
      tof.name,
      tof.symbol AS token_symbol,
      COALESCE(
        (
          SELECT
            tt.total_supply
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.token_offering_id = tof.id
            AND tt.status_id = 2 
            ${dateFilter} 
          ORDER BY
            tt.updated_at DESC
          LIMIT
            1
        ), 0
      ) AS total_supply,
      COALESCE(
        (
          SELECT
            tv.valuation_price_in_euro
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
        ), tof.offering_price_in_euro
      ) AS valuation_price
    FROM
      token_offerings AS tof
    WHERE
      tof.is_active = true
      AND tof.status_id = 1
      AND tof.offer_status_id = 1
    GROUP BY
      tof.id,
      tof.name
  )
SELECT
  *,
  COALESCE(total_supply * valuation_price, 0) AS token_holdings_in_euro
FROM
  vas_tbi
ORDER BY
   name ASC`;

  if (request?.headers?.build === "AD-1") {
    return baseAdminQuery;
  } else {
    return baseQuery;
  }
};
