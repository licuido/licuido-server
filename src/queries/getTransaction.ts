export const getAllTransactionQuery = (
  offset: number | null,
  limit: number | null,
  type: number[] | [],
  token_offering_id?: string,
  issuer_id?: string,
  investor_id?: string,
  search?: string,
  status_filters?: number[] | [],
  start_date?: string,
  end_date?: string
) => {
  /* Get All Transaction Query on Search , Limit & Offset */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }


  // For Search By Company Name Filter
  let searchFilter = ``;
  if (search) {
    searchFilter = `AND ens.legal_name ILIKE '${search}%' OR enr.legal_name ILIKE '${search}%'`;
  }

  // For Type Filter [Pending | Confirmed | Failed]
  let typeFilter = ``;
  if (type && type?.length > 0) {
    let convertedString = type.join("','");
    let finalString = "'" + convertedString + "'";
    typeFilter = ` AND tt.type IN (${finalString})`;
  }

  // For Status Filter [Pending | Confirmed | Failed]
  let statusFilter = ``;
  if (status_filters && status_filters?.length > 0) {
    statusFilter = ` AND tt.status_id IN (${status_filters?.join(",")})`;
  }

  //for investor filter
  let investorFilter = ``;
  if (investor_id) {
    investorFilter = ` AND too.receiver_entity_id = '${investor_id}'`;
  }

  //for issuer filter
  let issuerFilter = ``;
  if (issuer_id) {
    issuerFilter = ` AND too.issuer_entity_id = '${issuer_id}'`;
  }

  //date filter
  let dateFilter = ``;
  if (start_date && end_date) {
    dateFilter = `AND tt.created_at::date >= '${start_date}' AND tt.created_at::date <= '${end_date}'`;
  }

  //token filter
  let tokenFilter = ``;
  if (token_offering_id) {
    tokenFilter = `AND too.token_offering_id = '${token_offering_id}'`;
  }

  /* For Data */
  let baseQuery = `WITH
    cte AS (
        select
        tt.id,
        tt.type,
        tt.created_at as creation_date,
        too.investment_type,
        too.token_offering_id,
        ens.legal_name as issuer_name,
        enr.legal_name as receiver_name,
        tt.created_at  AS investor_date,
        tt.sender_balance,
        tt.amount,
        tt.total_supply,
        tt.transaction_hash,
        tt.block_token,
        tt.unblock_token,
        ia.url as issuer_logo,
        ra.url as investor_logo,
        tof.name as token_name,
        tla.url as token_logo,
        tt.transaction_hash
      from
        token_transactions as tt
        INNER JOIN token_orders AS too ON tt.order_id = too.id
        INNER JOIN entities AS ens ON too.issuer_entity_id = ens.id
        INNER JOIN entities AS enr ON too.receiver_entity_id = enr.id
        INNER JOIN assets AS ia ON ia.id = ens.logo_asset_id
        INNER JOIN assets AS ra ON ra.id = enr.logo_asset_id
        INNER JOIN token_offerings AS tof ON tof.id = too.token_offering_id
        INNER JOIN assets AS tla ON tla.id = tof.logo_asset_id
        WHERE tt.is_active = true
        ${searchFilter} 
        ${statusFilter} 
        ${typeFilter} 
        ${investorFilter}
        ${issuerFilter}
        ${dateFilter}
        ${tokenFilter}
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

export const getAllTransactionCountQuery = (
  type: number[] | [],
  token_offering_id?: string,
  issuer_id?: string,
  investor_id?: string,
  search?: string,
  status_filters?: number[] | [],
  start_date?: string,
  end_date?: string
) => {
  /* Get All Token Query on Search , Limit & Offset */

  // For Search By Company Name Filter
  let searchFilter = ``;
  if (search) {
    searchFilter = `AND ens.legal_name ILIKE '${search}%' OR enr.legal_name ILIKE '${search}%'`;
  }

  // For Type Filter [Pending | Confirmed | Failed]
  let typeFilter = ``;
  if (type && type?.length > 0) {
    let convertedString = type.join("','");
    let finalString = "'" + convertedString + "'";
    typeFilter = ` AND tt.type IN (${finalString})`;
  }

  // For Status Filter [Pending | Confirmed | Failed]
  let statusFilter = ``;
  if (status_filters && status_filters?.length > 0) {
    statusFilter = ` AND tt.status_id IN (${status_filters?.join(",")})`;
  }

  //for investor filter
  let investorFilter = ``;
  if (investor_id) {
    investorFilter = ` AND too.receiver_entity_id = '${investor_id}'`;
  }

  //for issuer filter
  let issuerFilter = ``;
  if (issuer_id) {
    issuerFilter = ` AND too.issuer_entity_id = '${issuer_id}'`;
  }

  
  //date filter
  let dateFilter = ``;
  if (start_date && end_date) {
    dateFilter = `AND tt.created_at::date >= '${start_date}' AND tt.created_at::date <= '${end_date}'`;
  }


  //token filter
  let tokenFilter = ``;
  if (token_offering_id) {
    tokenFilter = `AND too.token_offering_id = '${token_offering_id}'`;
  }

  
  /* For Count */
  let countQuery = `WITH
    cte AS (
        select
        tt.id,
        tt.type,
        too.investment_type,
        too.token_offering_id,
        ens.legal_name,
        enr.legal_name,
        tt.created_at,
        tt.sender_balance,
        tt.amount,
        tt.total_supply,
        tt.transaction_hash,
        tt.block_token,
        tt.unblock_token,
        ia.url as issuer_logo,
        ra.url as investor_logo
      from
        token_transactions as tt
        INNER JOIN token_orders AS too ON tt.order_id = too.id
        INNER JOIN entities AS ens ON too.issuer_entity_id = ens.id
        INNER JOIN entities AS enr ON too.receiver_entity_id = enr.id
        INNER JOIN assets AS ia ON ia.id = ens.logo_asset_id
        INNER JOIN assets AS ra ON ra.id = enr.logo_asset_id
        WHERE tt.is_active = true
        ${searchFilter} 
        ${statusFilter} 
        ${typeFilter} 
        ${investorFilter}
        ${issuerFilter}
        ${dateFilter}
        ${tokenFilter}
    )
  SELECT
    COUNT(*) AS count 
  FROM
    cte`;

  return countQuery;
};
