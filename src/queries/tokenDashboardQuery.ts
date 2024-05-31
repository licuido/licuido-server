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
