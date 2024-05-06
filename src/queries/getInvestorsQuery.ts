export const getAllInvestorsQuery = (
  offset: number | null,
  limit: number | null,
  entity_type_id: 1 | 2 | 3,
  user_profile_id?: string,
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
            WHEN eni.status_id IS NOT NULL AND eni.issuer_profile_id = '${user_profile_id}' THEN eni.status_id
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
          WHEN eni.status_id IS NOT NULL AND eni.issuer_profile_id = '${user_profile_id}' THEN eni.id
          ELSE null
        END  AS entity_investor_id,
      CAST(
        CASE
          WHEN eni.status_id IS NOT NULL AND eni.issuer_profile_id = '${user_profile_id}' THEN eni.status_id
          ELSE 1
        END AS INT
      ) AS investor_status_id,
      CAST(
        CASE
          WHEN eni.status_id IS NOT NULL AND eni.issuer_profile_id = '${user_profile_id}' THEN mes.name
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

  return baseQuery;
};

export const getAllInvestorsCountQuery = (
  entity_type_id: 1 | 2 | 3,
  user_profile_id?: string,
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
            WHEN eni.status_id IS NOT NULL AND eni.issuer_profile_id = '${user_profile_id}' THEN eni.status_id
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
          WHEN eni.status_id IS NOT NULL AND eni.issuer_profile_id = '${user_profile_id}' THEN eni.id
          ELSE null
        END  AS entity_investor_id,
      CAST(
        CASE
          WHEN eni.status_id IS NOT NULL AND eni.issuer_profile_id = '${user_profile_id}' THEN eni.status_id
          ELSE 1
        END AS INT
      ) AS investor_status_id,
      CAST(
        CASE
          WHEN eni.status_id IS NOT NULL AND eni.issuer_profile_id = '${user_profile_id}' THEN mes.name
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
