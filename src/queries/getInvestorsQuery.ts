export const getAllInvestorsQuery = (
  offset: number | null,
  limit: number | null,
  entity_type_id: 1 | 2 | 3,
  user_entity_id?: string,
  search?: string,
  status_filters?: number[] | [],
  kyc_status_filters?: number[] | [],
  investor_type_filters?: number[] | []
) => {
  /* Get All Investors Query on Search , Limit & Offset */

  /* In Where Condition
   ---- entity_id = 1 | 2 | 3 [ Admin | Investor | Issuer ] Here Now Using Only Investor(2)
   ---- is_setup_done = true [ Is Investor Completing Onboarding ]
   ---- entity_type_id = 1 | 2 | 3 [ Same as Entity Id & For Other Table Filter ] 
   ---- Other Filter Queries
           ---- For Limit & Offset
           ---- For Search By Business Name Filter
           ---- For KYC Status Filter [Pending | Approved]
           ---- For Investor Type Filter [Corporate | Individual]
           ---- For Investor Status Filter [Pending | Considered | Qualify]
   */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }

  // For Search By Company Name Filter
  let searchFilter = ``;
  if (search) {
    searchFilter = ` AND en.legal_name ILIKE '${search}%'`;
  }

  // For KYC Status Filter [Pending | Approved]
  let kycStatusFilter = ``;
  if (kyc_status_filters && kyc_status_filters?.length > 0) {
    kycStatusFilter = ` AND ek.status_id IN (${kyc_status_filters?.join(",")})`;
  }

  // For Investor Type Filter [Corporate | Individual]
  let investorTypeFilter = ``;
  if (investor_type_filters && investor_type_filters?.length > 0) {
    investorTypeFilter = ` AND up.investor_type_id IN (${investor_type_filters?.join(
      ","
    )})`;
  }

  // Entity Investor Status Filter [Pending | Considered | Qualify]
  let statusFilter = ``;
  if (status_filters && status_filters?.length > 0) {
    statusFilter = `  AND (
        CAST(
          CASE
            WHEN eni.status_id IS NOT NULL AND (
            eni.issuer_entity_id = '${user_entity_id}'
            OR eni.status_id IS NULL
          ) THEN eni.status_id
            ELSE 1
          END AS INT
        ) IN (${status_filters?.join(",")})
      )`;
  }

  /* For Data */
  let baseQuery = `WITH
  cte AS (
    SELECT
      ue.user_profile_id AS profile_id,
      up.name AS name,
      up.email_id AS email_id,
      up.investor_type_id AS investor_type_id,
      mit.name AS investor_type_name,
      en.id AS investor_entity_id,
      en.legal_name AS company_name,
      en.lei_number AS lei_number,
      ek.status_id AS ek_status_id,
      mes.name AS ekyc_status_name,
      mc.name AS country_name,
      mc.emoji AS emoji,
      mc.emoji_unicode AS emoji_unicode,
      ast.type AS logo_type,
      ast.url AS logo_url,
      cw.wallet_address AS wallet_address,
      mwt.name AS wallet_type_name,
      ue.created_at AS creation_date,
      CASE
          WHEN eni.status_id IS NOT NULL AND (
            eni.issuer_entity_id = '${user_entity_id}'
            OR eni.status_id IS NULL
          ) THEN eni.id
          ELSE null
        END  AS entity_investor_id,
      CAST(
        CASE
          WHEN eni.status_id IS NOT NULL AND (
            eni.issuer_entity_id = '${user_entity_id}'
            OR eni.status_id IS NULL
          ) THEN eni.status_id
          ELSE 1
        END AS INT
      ) AS investor_status_id,
      CAST(
        CASE
          WHEN eni.status_id IS NOT NULL AND (
            eni.issuer_entity_id = '${user_entity_id}'
            OR eni.status_id IS NULL
          ) THEN meis.name
          ELSE 'Pending'
        END AS VARCHAR
      ) AS investor_status_name
    from
      user_entities as ue
      INNER JOIN user_profiles AS up ON ue.user_profile_id = up.id
      INNER JOIN master_investor_types AS mit ON up.investor_type_id = mit.id
      LEFT JOIN entities AS en ON up.id = en.contact_profile_id
      LEFT JOIN ekyc AS ek ON up.id = ek.kyc_profile_id
      LEFT JOIN master_ekc_status AS mes ON ek.status_id = mes.id
      LEFT JOIN master_countries AS mc ON en.country_id = mc.id
      LEFT JOIN assets AS ast ON en.logo_asset_id = ast.id
      LEFT JOIN customer_wallets AS cw ON en.id = cw.investor_entity_id
      LEFT JOIN master_wallet_types AS mwt ON cw.wallet_type_id = mwt.id
      LEFT JOIN entity_investors AS eni ON en.id = eni.investor_entity_id
      AND (
        eni.issuer_entity_id = '${user_entity_id}'
        OR eni.issuer_entity_id IS NULL
      )
      LEFT JOIN master_entity_investor_status AS meis ON eni.status_id = meis.id
    WHERE
      ue.entity_id = ${entity_type_id}
      AND up.is_setup_done = true
      AND en.entity_type_id = ${entity_type_id} 
      ${searchFilter} 
      ${kycStatusFilter} 
      ${investorTypeFilter} 
      ${statusFilter}
  )
SELECT
  *
FROM
  cte
ORDER BY
  creation_date DESC 
  ${limitStatment}`;
  console.log("baseQuery", baseQuery);
  return baseQuery;
};

export const getAllInvestorsCountQuery = (
  entity_type_id: 1 | 2 | 3,
  user_entity_id?: string,
  search?: string,
  status_filters?: number[] | [],
  kyc_status_filters?: number[] | [],
  investor_type_filters?: number[] | []
) => {
  /* Get All Investors Query on Search , Limit & Offset */

  /* In Where Condition
   ---- entity_id = 1 | 2 | 3 [ Admin | Investor | Issuer ] Here Now Using Only Investor(2)
   ---- is_setup_done = true [ Is Investor Completing Onboarding ]
   ---- entity_type_id = 1 | 2 | 3 [ Same as Entity Id & For Other Table Filter ] 
   ---- Other Filter Queries
           ---- For Search By Business Name Filter
           ---- For KYC Status Filter [Pending | Approved]
           ---- For Investor Type Filter [Corporate | Individual]
           ---- For Investor Status Filter [Pending | Considered | Qualify]
   */

  // For Search By Company Name Filter
  let searchFilter = ``;
  if (search) {
    searchFilter = ` AND en.legal_name ILIKE '${search}%'`;
  }

  // For KYC Status Filter [Pending | Approved]
  let kycStatusFilter = ``;
  if (kyc_status_filters && kyc_status_filters?.length > 0) {
    kycStatusFilter = ` AND ek.status_id IN (${kyc_status_filters?.join(",")})`;
  }

  // For Investor Type Filter [Corporate | Individual]
  let investorTypeFilter = ``;
  if (investor_type_filters && investor_type_filters?.length > 0) {
    investorTypeFilter = ` AND up.investor_type_id IN (${investor_type_filters?.join(
      ","
    )})`;
  }

  // Entity Investor Status Filter [Pending | Considered | Qualify]
  let statusFilter = ``;
  if (status_filters && status_filters?.length > 0) {
    statusFilter = `  AND (
        CAST(
          CASE
            WHEN eni.status_id IS NOT NULL AND (
            eni.issuer_entity_id = '${user_entity_id}'
            OR eni.status_id IS NULL
          ) THEN eni.status_id
            ELSE 1
          END AS INT
        ) IN (${status_filters?.join(",")})
      )`;
  }

  /* For Count */
  let countQuery = `WITH
  cte AS (
    SELECT
      ue.user_profile_id AS profile_id,
      up.name AS name,
      up.email_id AS email_id,
      up.investor_type_id AS investor_type_id,
      mit.name AS investor_type_name,
      en.id AS investor_entity_id,
      en.legal_name AS company_name,
      en.lei_number AS lei_number,
      ek.status_id AS ek_status_id,
      mes.name AS ekyc_status_name,
      mc.name AS country_name,
      mc.emoji AS emoji,
      mc.emoji_unicode AS emoji_unicode,
      ast.type AS logo_type,
      ast.url AS logo_url,
      cw.wallet_address AS wallet_address,
      mwt.name AS wallet_type_name,
      ue.created_at AS creation_date,
      CASE
          WHEN eni.status_id IS NOT NULL AND (
            eni.issuer_entity_id = '${user_entity_id}'
            OR eni.status_id IS NULL
          ) THEN eni.id
          ELSE null
        END  AS entity_investor_id,
      CAST(
        CASE
          WHEN eni.status_id IS NOT NULL AND (
            eni.issuer_entity_id = '${user_entity_id}'
            OR eni.status_id IS NULL
          ) THEN eni.status_id
          ELSE 1
        END AS INT
      ) AS investor_status_id,
      CAST(
        CASE
          WHEN eni.status_id IS NOT NULL AND (
            eni.issuer_entity_id = '${user_entity_id}'
            OR eni.status_id IS NULL
          ) THEN meis.name
          ELSE 'Pending'
        END AS VARCHAR
      ) AS investor_status_name
    from
      user_entities as ue
      INNER JOIN user_profiles AS up ON ue.user_profile_id = up.id
      INNER JOIN master_investor_types AS mit ON up.investor_type_id = mit.id
      LEFT JOIN entities AS en ON up.id = en.contact_profile_id
      LEFT JOIN ekyc AS ek ON up.id = ek.kyc_profile_id
      LEFT JOIN master_ekc_status AS mes ON ek.status_id = mes.id
      LEFT JOIN master_countries AS mc ON en.country_id = mc.id
      LEFT JOIN assets AS ast ON en.logo_asset_id = ast.id
      LEFT JOIN customer_wallets AS cw ON en.id = cw.investor_entity_id
      LEFT JOIN master_wallet_types AS mwt ON cw.wallet_type_id = mwt.id
      LEFT JOIN entity_investors AS eni ON en.id = eni.investor_entity_id 
      AND (
        eni.issuer_entity_id = '${user_entity_id}'
        OR eni.issuer_entity_id IS NULL
      )
      LEFT JOIN master_entity_investor_status AS meis ON eni.status_id = meis.id
    WHERE
      ue.entity_id = ${entity_type_id}
      AND up.is_setup_done = true
      AND en.entity_type_id = ${entity_type_id} 
      ${searchFilter} 
      ${kycStatusFilter} 
      ${investorTypeFilter} 
      ${statusFilter}
  )
SELECT
  COUNT(*) AS count 
FROM
  cte`;

  return countQuery;
};

export const getInvestorDetailsQuery = (id?: string) => {
  /* Get Investor Details  */

  /* In Where Condition
          
           */

  /* For Data */
  let baseQuery = `WITH
  lastTransact AS (
    SELECT
      tor.receiver_entity_id,
      tt.sender_balance,
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
      tor.receiver_entity_id = '${id}'
      AND tt.status_id IN (1, 2)
  ),
  td_query AS (
    SELECT
      receiver_entity_id,
      SUM(sender_balance) AS balance
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
      en.lei_number AS lei_number,
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
      eni.is_active AS is_active,
      (
        SELECT
          lir.logged_at
        FROM
          auth.logged_in_records AS lir
          LEFT JOIN public.user_profiles AS up ON up.user_id = lir.user_id
        ORDER BY
          lir.updated_at DESC
        LIMIT
          1
      ) AS last_login,
      mbs.id AS business_sector_id,
      mbs.name AS business_sector_name,
      en.legal_address AS legal_address,
      en.zipcode AS zipcode,
      up.name AS contact_person_name,
      up.mobile_no_std_code AS mobile_no_std_code,
      up.mobile_no AS mobile_no,
      up.is_politically_exposed AS is_politically_exposed,
      up.is_legally_confirmed AS is_legally_confirmed,
      mp.id AS position_id,
      mp.name AS position_name,
      CAST(
        CASE
          WHEN COALESCE(td_query.balance, 0) > 0 THEN 4
          WHEN eni.status_id IS NOT NULL THEN eni.status_id
          ELSE 1
        END AS INT
      ) AS status_id,
      CASE
        WHEN COALESCE(td_query.balance, 0) > 0 THEN 'Tokenholder'
        WHEN eni.status_id IS NOT NULL THEN meis.name
        ELSE 'Pending'
      END AS status_name
    FROM
      user_entities AS ue
      INNER JOIN user_profiles AS up ON ue.user_profile_id = up.id
      INNER JOIN entities AS en ON up.id = en.contact_profile_id
      LEFT JOIN entity_investors AS eni ON en.id = eni.investor_entity_id
      INNER JOIN master_investor_types AS mit ON eni.investor_type_id = mit.id
      INNER JOIN master_entity_investor_status AS meis ON eni.status_id = meis.id
      LEFT JOIN master_countries AS mc ON en.country_id = mc.id
      LEFT JOIN assets AS inv_ast ON en.logo_asset_id = inv_ast.id
      LEFT JOIN customer_wallets AS cw ON en.id = cw.investor_entity_id
      LEFT JOIN master_wallet_types AS mwt ON cw.wallet_type_id = mwt.id
      LEFT JOIN master_business_sectors AS mbs ON en.business_sector_id = mbs.id
      LEFT JOIN master_position AS mp ON up.position_id = mp.id
      LEFT JOIN td_query ON td_query.receiver_entity_id = en.id
    WHERE
      en.id = '${id}'
  )
SELECT
  *
FROM
  vas_inv_list;`;

  return baseQuery;
};
