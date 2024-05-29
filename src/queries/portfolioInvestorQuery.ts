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
    dateFilter = ` AND tor.updated_at BETWEEN '${from_date}' AND '{to_date}'`;
  }

  /* For Data */
  let baseQuery = `SELECT
  tor.token_offering_id AS token_offering_id,
  tof.name AS token_name,
  SUM(COALESCE(tor.net_investment_value_in_euro, 0)) AS investment
FROM
  token_orders AS tor
  INNER JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
WHERE
  tor.receiver_entity_id = '${user_entity_id}'
  AND tor.status_id = 5 
  ${dateFilter}
GROUP BY
  tor.token_offering_id,
  tof.name
ORDER BY
  investment ASC`;

  return baseQuery;
};
