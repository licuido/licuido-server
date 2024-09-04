import { Logger } from "@helpers";

export const getAllInvestorsListQuery = async (
  entity_type_id: number,
  offset: number | null,
  limit: number | null,
  user_entity_id?: string,
  search?: string,
  status_filters?: number[] | [],
  country_filters?: number[] | [],
  investor_type_filters?: number[] | [],
  minimum_balance?: string,
  maximum_balance?: string,
  token_id?: string
) => {
  // Construct Base Query
  let baseQuery = await constructBaseQuery(
    entity_type_id,
    offset,
    limit,
    user_entity_id,
    search,
    status_filters,
    country_filters,
    investor_type_filters,
    minimum_balance,
    maximum_balance,
    token_id
  );

  return baseQuery;
};

const constructBaseQuery = async (
  entity_type_id: number,
  offset: number | null,
  limit: number | null,
  user_entity_id?: string,
  search?: string,
  status_filters?: number[] | [],
  country_filters?: number[] | [],
  investor_type_filters?: number[] | [],
  minimum_balance?: string,
  maximum_balance?: string,
  token_id?: string
) => {
  try {
    let Query = ``;
    let searchFilter = ``;
    let statusFilter = ``;
    let countryFilter = ``;
    let balanceFilter = ``;
    let limitStatment = ``;
    let tokenFilterForIssuer = ``;
    let investorTypeFilter = ``;
    let mainQueryFilter = ``;

    /* ------------------  For Issuer  ------------------ */
    if (entity_type_id === 3) {
      // For Search By [ Investor Name | Wallet ] Filter
      if (search) {
        searchFilter = ` AND (
            investor_name ILIKE '${search}%'
            OR wallet ILIKE '${search}%'
          )`;
      }

      // For Status Filter
      if (status_filters && status_filters?.length > 0) {
        statusFilter = ` AND status_id IN (${status_filters?.join(",")})`;
      }

      // For Country Filter
      if (country_filters && country_filters?.length > 0) {
        countryFilter = ` AND country_id IN (${country_filters?.join(",")})`;
      }

      if (
        minimum_balance &&
        minimum_balance?.length > 0 &&
        maximum_balance &&
        maximum_balance?.length > 0
      ) {
        balanceFilter = `  AND balance BETWEEN ${minimum_balance} AND ${maximum_balance}
      `;
      }

      // For Limit & Offset
      if (offset !== null && limit !== null) {
        limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
      }

      // For Token Offering Filter
      if (token_id) {
        tokenFilterForIssuer = ` AND tor.token_offering_id = '${token_id}'`;
        // mainQueryFilter = ` AND status_id IN (4)`;
      }

      // For Investor Type Filter
      if (investor_type_filters && investor_type_filters?.length > 0) {
        investorTypeFilter = ` AND investor_type_id IN (${investor_type_filters?.join(
          ","
        )})`;
      }

      /* Construct Base Query */
      Query = `WITH
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
      ${tokenFilterForIssuer}
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
      inv_ast.url AS investor_logo_url,
      up.email_id AS email,
      eni.investor_type_id AS investor_type_id,
      mit.name AS investor_type_name,
      en.country_id AS country_id,
      mc.name AS country_name,
      mc.emoji AS country_emoji,
      mc.emoji_unicode AS country_emoji_unicode,
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
      LEFT JOIN user_profiles AS up ON ue.user_profile_id = up.id
      LEFT JOIN entities AS en ON up.id = en.contact_profile_id
      LEFT JOIN entity_investors AS eni ON en.id = eni.investor_entity_id
      LEFT JOIN master_investor_types AS mit ON eni.investor_type_id = mit.id
      LEFT JOIN master_entity_investor_status AS meis ON eni.status_id = meis.id
      LEFT JOIN master_countries AS mc ON en.country_id = mc.id
      LEFT JOIN assets AS inv_ast ON en.logo_asset_id = inv_ast.id
      LEFT JOIN customer_wallets AS cw ON en.id = cw.investor_entity_id
      LEFT JOIN master_wallet_types AS mwt ON cw.wallet_type_id = mwt.id
      LEFT JOIN td_query ON td_query.receiver_entity_id = en.id
    WHERE
      ue.entity_id = 2
      AND up.is_setup_done = true
      AND en.entity_type_id = 2
      AND eni.status_id != 2
      AND eni.issuer_entity_id = '${user_entity_id}'
  )
SELECT
  *
FROM
  vas_inv_list
WHERE
  is_active = true 
  ${mainQueryFilter}
  ${searchFilter} 
  ${statusFilter} 
  ${investorTypeFilter} 
  ${balanceFilter} 
  ${countryFilter}
ORDER BY
  balance DESC 
${limitStatment};`;
    }

    /* ------------------  For Admin  ------------------ */
    if (entity_type_id === 1) {
      // For Search By [ Investor Name | Wallet ] Filter
      if (search) {
        searchFilter = ` AND (
            investor_name ILIKE '${search}%'
            OR wallet ILIKE '${search}%'
          )`;
      }

      // For Status Filter
      if (status_filters && status_filters?.length > 0) {
        statusFilter = ` AND status_id IN (${status_filters?.join(",")})`;
      }

      // For Country Filter
      if (country_filters && country_filters?.length > 0) {
        countryFilter = ` AND country_id IN (${country_filters?.join(",")})`;
      }

      if (
        minimum_balance &&
        minimum_balance?.length > 0 &&
        maximum_balance &&
        maximum_balance?.length > 0
      ) {
        balanceFilter = `  AND balance BETWEEN ${minimum_balance} AND ${maximum_balance}
      `;
      }

      // For Limit & Offset
      if (offset !== null && limit !== null) {
        limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
      }

      // For Investor Type Filter
      if (investor_type_filters && investor_type_filters?.length > 0) {
        investorTypeFilter = ` AND investor_type_id IN (${investor_type_filters?.join(
          ","
        )})`;
      }

      /* Construct Base Query */
      Query = `WITH
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
      inv_ast.url AS investor_logo_url,
      up.email_id AS email,
      eni.investor_type_id AS investor_type_id,
      mit.name AS investor_type_name,
      en.country_id AS country_id,
      mc.name AS country_name,
      mc.emoji AS country_emoji,
      mc.emoji_unicode AS country_emoji_unicode,
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
      LEFT JOIN user_profiles AS up ON ue.user_profile_id = up.id
      LEFT JOIN entities AS en ON up.id = en.contact_profile_id
      LEFT JOIN entity_investors AS eni ON en.id = eni.investor_entity_id
      LEFT JOIN master_investor_types AS mit ON eni.investor_type_id = mit.id
      LEFT JOIN master_entity_investor_status AS meis ON eni.status_id = meis.id
      LEFT JOIN master_countries AS mc ON en.country_id = mc.id
      LEFT JOIN assets AS inv_ast ON en.logo_asset_id = inv_ast.id
      LEFT JOIN customer_wallets AS cw ON en.id = cw.investor_entity_id
      LEFT JOIN master_wallet_types AS mwt ON cw.wallet_type_id = mwt.id
      LEFT JOIN td_query ON td_query.receiver_entity_id = en.id
    WHERE
      ue.entity_id = 2
      AND up.is_setup_done = true
      AND en.entity_type_id = 2
      AND eni.status_id != 2
  )
SELECT
  *
FROM
  vas_inv_list
WHERE
  is_active = true 
  ${searchFilter} 
  ${statusFilter} 
  ${investorTypeFilter} 
  ${balanceFilter} 
  ${countryFilter}
ORDER BY
  balance DESC 
${limitStatment};`;
    }

    return Query;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};
