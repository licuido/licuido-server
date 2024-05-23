export const getAllTokensQuery = (
  offset: number | null,
  limit: number | null,
  search?: string,
  status_filters?: number[] | [],
  currency_filter?: string[] | [],
  token_type_filters?: number[] | [],
  block_chain_filters?: number[] | [],
  created_by_filters?: number[] | [],
  issuer_filters?: string[] | []
) => {
  /* Get All Token Query on Search , Limit & Offset */

  /* In Where Condition
     ---- entity_id = 1 | 2 | 3 [ Admin | Investor | Issuer ] Here Now Using Only Investor(2)
     ---- status  1 | 2 | 3  | 4 | 5   [Yet to deployed  | Active | paused  | Rejected | Deployed ]
     ---- Other Filter Queries
             ---- For Limit & Offset
             ---- For Search By issuer, token Name, token symbol Filter
             ---- For Token Type Filter 
             ---- For Base Currency Filter
             ---- For Block Chain Network
             ---- For Issuer Based
     */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }

  // For Search By Token name, Issuer name , symbol Filter
  let searchFilter = ``;
  if (search) {
    searchFilter = `AND ent.legal_name ILIKE '${search}%' OR t.name ILIKE '${search}%' OR t.symbol ILIKE '${search}%'`;
  }

  // For currenc Filter
  let currencyFilter = ``;
  if (currency_filter && currency_filter?.length > 0) {
    let convertedString = currency_filter.join("','");
    let finalString = "'" + convertedString + "'";
    currencyFilter = ` AND t.base_currency IN (${finalString})`;
  }

  // For Token Type Filter
  let tokenTypeFilter = ``;
  if (token_type_filters && token_type_filters?.length > 0) {
    tokenTypeFilter = ` AND t.token_type_id IN (${token_type_filters?.join(
      ","
    )})`;
  }

  // For Block chain network Filter
  let blockChainFilter = ``;
  if (block_chain_filters && block_chain_filters?.length > 0) {
    blockChainFilter = `AND t.token_type_id IN (${block_chain_filters?.join(
      ","
    )})`;
  }

  // status filter
  let statusFilter = ``;
  if (status_filters && status_filters?.length > 0) {
    statusFilter = `AND t.offer_status_id IN (${status_filters?.join(",")})`;
  }

  // created by filter
  let createdByFilter = ``;
  if (created_by_filters && created_by_filters?.length > 0) {
    createdByFilter = `AND ue.entity_id IN (${created_by_filters?.join(",")})`;
  }

  //issuer filter
  let issuerFilter = ``;
  if (issuer_filters && issuer_filters?.length > 0) {
    let convertedString = issuer_filters.join("','");
    let finalString = "'" + convertedString + "'";
    issuerFilter = `AND t.issuer_entity_id IN (${finalString})`;
  }

  /* For Data */
  let baseQuery = `WITH
    cte AS (
        select
        t.id,
        t.name,
        mtos.name as status,
        mtt.name as token_type,
        ent.legal_name as issuer_name,
        ent.legal_name as issuer_name,
        la.url as logo,
        t.created_at,
        t.base_currency,
        t.base_currency_code,
        mbn.name as block_chain_network,
        met.name as created_by
      from
        token_offerings as t
        INNER JOIN master_token_offering_status AS mtos ON mtos.id = t.offer_status_id
        INNER JOIN master_token_type AS mtt ON mtt.id = t.token_type_id
        INNER JOIN entities AS ent ON ent.id = t.issuer_entity_id
        INNER JOIN assets AS la ON la.id = t.logo_asset_id
        INNER JOIN master_blockchain_networks AS mbn ON mbn.id = t.blockchain_network
        INNER JOIN user_entities AS ue ON ue.user_profile_id = t.created_by
        INNER JOIN master_entity_types AS met ON met.id = ue.entity_id
        WHERE status_id = 1
        ${searchFilter} 
        ${currencyFilter} 
        ${tokenTypeFilter} 
        ${blockChainFilter}
        ${statusFilter}
        ${createdByFilter}
        ${issuerFilter}
    )
  SELECT
    *
  FROM
    cte
  ORDER BY
    created_at DESC 
    ${limitStatment}`;

  return baseQuery;
};

export const getAllTokensCountQuery = (
  search?: string,
  status_filters?: number[] | [],
  currency_filter?: string[] | [],
  token_type_filters?: number[] | [],
  block_chain_filters?: number[] | [],
  created_by_filters?: number[] | [],
  issuer_filters?: string[] | []
) => {
  /* Get All Token Query on Search , Limit & Offset */

  /* In Where Condition
     ---- entity_id = 1 | 2 | 3 [ Admin | Investor | Issuer ] Here Now Using Only Investor(2)
     ---- status  1 | 2 | 3  | 4 | 5   [Yet to deployed  | Active | paused  | Rejected | Deployed ]
     ---- Other Filter Queries
             ---- For Limit & Offset
             ---- For Search By issuer, token Name, token symbol Filter
             ---- For Token Type Filter 
             ---- For Base Currency Filter
             ---- For Block Chain Network
             ---- For Issuer Based
     */

  // For Search By Token name, Issuer name , symbol Filter
  let searchFilter = ``;
  if (search) {
    searchFilter = `ent.legal_name ILIKE '${search}%' OR t.name ILIKE '${search}%' OR t.symbol ILIKE '${search}%'`;
  }

  // For currenc Filter
  let currencyFilter = ``;
  if (currency_filter && currency_filter?.length > 0) {
    let convertedString = currency_filter.join("','");
    let finalString = "'" + convertedString + "'";
    currencyFilter = ` AND t.base_currency IN (${finalString})`;
  }

  // For Token Type Filter
  let tokenTypeFilter = ``;
  if (token_type_filters && token_type_filters?.length > 0) {
    tokenTypeFilter = ` AND t.token_type_id IN (${token_type_filters?.join(
      ","
    )})`;
  }

  // For Block chain network Filter
  let blockChainFilter = ``;
  if (block_chain_filters && block_chain_filters?.length > 0) {
    blockChainFilter = `AND t.token_type_id IN (${block_chain_filters?.join(
      ","
    )})`;
  }

  // status filter
  let statusFilter = ``;
  if (status_filters && status_filters?.length > 0) {
    statusFilter = `AND t.offer_status_id IN (${status_filters?.join(",")})`;
  }

  // created by filter
  let createdByFilter = ``;
  if (created_by_filters && created_by_filters?.length > 0) {
    createdByFilter = `AND ue.entity_id IN (${created_by_filters?.join(",")})`;
  }

  //issuer filter
  let issuerFilter = ``;
  if (issuer_filters && issuer_filters?.length > 0) {
    let convertedString = issuer_filters.join("','");
    let finalString = "'" + convertedString + "'";
    issuerFilter = `AND t.issuer_entity_id IN (${finalString})`;
  }

  /* For Count */
  let countQuery = `WITH
    cte AS (
        select
        t.id,
        t.name,
        mtos.name as status,
        mtt.name as token_type,
        ent.legal_name as issuer_name,
        ent.legal_name as issuer_name,
        la.url as logo,
        t.created_at,
        t.base_currency,
        t.base_currency_code,
        mbn.name as block_chain_network,
        met.name as created_by
      from
        token_offerings as t
        INNER JOIN master_token_offering_status AS mtos ON mtos.id = t.offer_status_id
        INNER JOIN master_token_type AS mtt ON mtt.id = t.token_type_id
        INNER JOIN entities AS ent ON ent.id = t.issuer_entity_id
        INNER JOIN assets AS la ON la.id = t.logo_asset_id
        INNER JOIN master_blockchain_networks AS mbn ON mbn.id = t.blockchain_network
        INNER JOIN user_entities AS ue ON ue.user_profile_id = t.created_by
        INNER JOIN master_entity_types AS met ON met.id = ue.entity_id
        WHERE t.status_id = 1
        ${searchFilter} 
        ${currencyFilter} 
        ${tokenTypeFilter} 
        ${blockChainFilter}
        ${statusFilter}
        ${createdByFilter}
        ${issuerFilter}
    )
  SELECT
    COUNT(*) AS count 
  FROM
    cte`;

  return countQuery;
};
