export const getAllPositionReportsQuery = (
  id: string,
  offset: number | null,
  limit: number | null,
  search?: string,
  reporting_start_date?: string,
  reporting_end_date?: string,
  creation_start_date?: string,
  creation_end_date?: string
) => {
  /* Get All Position Reports Query Based on Limit & Offset */

  /* In Where Condition
         
         */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }
  // For Creation Date Filters
  let dateFilter = ``;
  if (creation_start_date && creation_end_date) {
    dateFilter = ` AND pr.created_at BETWEEN '${creation_start_date}' AND '${creation_end_date}'`;
  }

  // For Search
  let searchFilter = ``;
  if (search) {
    searchFilter = ` AND pr.title ILIKE '${search}%'`;
  }

  let reportDateFilter = ``;
  if (reporting_start_date && reporting_end_date) {
    reportDateFilter = ` AND pr.start_date BETWEEN '${reporting_start_date}' AND '${reporting_end_date}'
  AND pr.end_date BETWEEN '${reporting_start_date}' AND '${reporting_end_date}'`;
  }

  /* For Data */
  let baseQuery = `SELECT
  pr.id,
  pr.title AS reporting_title,
  pr.start_date AS reporting_start_date,
  pr.start_time AS reporting_start_time,
  pr.end_date AS reporting_end_date,
  pr.end_time AS reporting_end_time,
  pr.created_at AS creation_date,
  up.email_id AS generated_by,
  pr.is_all_investors AS is_all_investors,
  CASE
    WHEN pr.is_all_investors = true THEN 'All'
    ELSE (
      SELECT
        COUNT(*)
      FROM
        position_report_investors AS pri
      WHERE
        pri.report_id = pr.id
    ):: VARCHAR
  END AS investors
FROM
  position_reports AS pr
  LEFT JOIN entities AS en ON pr.issuer_entity_id = en.id
  LEFT JOIN user_profiles AS up ON en.contact_profile_id = up.id
WHERE
  pr.issuer_entity_id = '${id}' 
  ${searchFilter} 
  ${dateFilter} 
  ${reportDateFilter} 
  ORDER BY
  pr.created_at DESC 
  ${limitStatment}`;

  return baseQuery;
};

export const getAllPosReportInvestorsQuery = (
  id: string,
  offset: number | null,
  limit: number | null,
  reporting_start?: string,
  reporting_end?: string,
  is_all_investors?: boolean,
  user_entity_id?: string
) => {
  /* Get All Position Report Investor Query Based on Limit & Offset */

  /* In Where Condition
         
         */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }
  // For Creation Date Filters
  let dateFilter = ``;
  if (reporting_start && reporting_end) {
    dateFilter = ` AND tt.updated_at BETWEEN '${reporting_start}' AND '${reporting_end}'`;
  }

  let allInvestorsFilter = ``;
  if (is_all_investors !== true) {
    allInvestorsFilter = ` AND eni.investor_entity_id IN (
        SELECT
          investor_id
        FROM
          position_report_investors
        WHERE
          report_id = '${id}'
      )`;
  }

  /* For Data */
  let baseQuery = `WITH
  lastTransact AS (
    SELECT
      tor.receiver_entity_id,
      tt.sender_balance,
      tt.block_token,
      tt.unblock_token,
      tt.updated_at,
      ROW_NUMBER() OVER (
        PARTITION BY tor.receiver_entity_id,
        tor.token_offering_id
        ORDER BY
          tt.updated_at DESC
      ) AS rank_no
    FROM
      token_orders AS tor
      LEFT JOIN token_transactions AS tt ON tor.id = tt.order_id
    WHERE
      tt.status_id IN (1, 2)
      AND tor.issuer_entity_id = '${user_entity_id}' 
      ${dateFilter}
  ),
  td_query AS (
    SELECT
      receiver_entity_id,
      SUM(sender_balance) AS balance,
      SUM(block_token) AS pending,
      SUM(unblock_token) AS available,
      MAX(updated_at) AS last_transaction
    FROM
      lastTransact
    WHERE
      rank_no = 1
    GROUP BY
      receiver_entity_id
  ),
  vas_inv_list AS (
    SELECT
      en.id AS investor_entity_id,
      en.legal_name AS investor_name,
      mc.name AS country_name,
      inv_ast.url AS investor_logo_url,
      up.email_id AS email,
      cw.wallet_address AS wallet,
      mwt.name AS wallet_type,
      CAST(
        CASE
          WHEN COALESCE(td_query.balance, 0) > 0 THEN 4
          WHEN eni.status_id IS NOT NULL THEN eni.status_id
          ELSE 1
        END AS INT
      ) AS status_id,
      CAST(
        CASE
          WHEN COALESCE(td_query.balance, 0) > 0 THEN 'Tokenholder'
          WHEN eni.status_id IS NOT NULL THEN meis.name
          ELSE 'Pending'
        END AS VARCHAR
      ) AS status_name,
      COALESCE(td_query.balance, 0) AS balance,
      COALESCE(td_query.pending, 0) AS pending,
      COALESCE(td_query.available, 0) AS available,
      COALESCE(td_query.last_transaction, null) AS last_transaction,
      eni.is_active AS is_active
    FROM
      user_entities as ue
      INNER JOIN user_profiles AS up ON ue.user_profile_id = up.id
      INNER JOIN entities AS en ON up.id = en.contact_profile_id
      LEFT JOIN entity_investors AS eni ON en.id = eni.investor_entity_id
      INNER JOIN master_entity_investor_status AS meis ON eni.status_id = meis.id
      LEFT JOIN assets AS inv_ast ON en.logo_asset_id = inv_ast.id
      LEFT JOIN customer_wallets AS cw ON en.id = cw.investor_entity_id
      LEFT JOIN master_countries AS mc ON en.country_id = mc.id
      LEFT JOIN master_wallet_types AS mwt ON cw.wallet_type_id = mwt.id 
      LEFT JOIN position_reports AS pr ON eni.issuer_entity_id = pr.issuer_entity_id
      LEFT JOIN td_query ON td_query.receiver_entity_id = en.id
    WHERE
      ue.entity_id = 2
      AND up.is_setup_done = true
      AND en.entity_type_id = 2
      AND eni.status_id != 2
      AND eni.issuer_entity_id = '${user_entity_id}' 
      AND pr.id = '${id}' 
      ${allInvestorsFilter}
  )
SELECT
  *
FROM
  vas_inv_list
ORDER BY
  balance DESC  
  ${limitStatment}`;

  return baseQuery;
};
