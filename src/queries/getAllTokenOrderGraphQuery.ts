export const getAllTokenOrderGraphQuery = (
  offset: number | null,
  limit: number | null,
  user_entity_id?: string,
  from_date?: string,
  to_date?: string
) => {
  /* Get All Token Order Graph Query on Limit & Offset */

  /* In Where Condition
     ---- issuer_entity_id = ""
     ---- status_id IN (5, 6) [ Either Mint or Burn Status ]
     ---- created_at BETWEEN '' AND '' [ For Date Filters ]  
       ---- Other Filter Queries
             ---- For Limit & Offset
             ---- For Date Filters
     */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }
  // For Date Filters
  let dateFilter = ``;
  if (from_date && to_date) {
    dateFilter = ` AND tor.created_at BETWEEN '${from_date}' AND '${to_date}'`;
  }

  /* For Data */
  let baseQuery = `SELECT
  tor.token_offering_id,
  tof.name,
  COUNT(
    CASE
      WHEN tor.type = 'subscription' THEN 1
    END
  ) ::bigint AS subscription_count,
  COUNT(
    CASE
      WHEN tor.type = 'redemption' THEN 1
    END
  ) ::bigint AS redemption_count
FROM
  token_orders AS tor
  INNER JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
WHERE
  tor.issuer_entity_id = '${user_entity_id}'
  AND tor.status_id IN (5, 6) 
  ${dateFilter} 
GROUP BY
  tor.token_offering_id,
  tof.name 
  ORDER BY
  tof.name ASC 
${limitStatment}`;

  return baseQuery;
};
