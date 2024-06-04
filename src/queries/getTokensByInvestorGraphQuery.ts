export const getTokensByInvestorGraphQuery = (
  from_date?: string,
  to_date?: string,
  user_entity_id?: string
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
    dateFilter = ` AND tor.updated_at BETWEEN '${from_date}' AND '${to_date}'`;
  }

  /* For Data */
  let baseQuery = `SELECT
    tof.id,
    tof.name,
    tof.symbol AS token_symbol,
    SUM (
      CASE
        WHEN tor.type = 'subscription'
        AND tor.status_id = 5 THEN tor.net_investment_value_in_euro
        ELSE 0.00
      END
    ) AS net_investment_value_in_euro,
    SUM (
        CASE
          WHEN tor.type = 'subscription'
          AND tor.status_id = 5 THEN tor.ordered_tokens
          ELSE 0
        END
      ) AS ordered_token
  FROM
    token_offerings AS tof
    LEFT JOIN token_orders AS tor ON tof.id = tor.token_offering_id
  WHERE
    tof.issuer_entity_id = '${user_entity_id}'
    AND tof.is_active = true
    AND tof.status_id = 1
    AND tof.offer_status_id = 1 
    ${dateFilter}
  GROUP BY
    tof.id,
    tof.name
    ORDER BY
  net_investment_value_in_euro DESC`;

  return baseQuery;
};
