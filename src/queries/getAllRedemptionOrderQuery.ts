import { Logger } from "@helpers";

export const getAllRedemptionOrderQuery = async (
  entity_type_id: number,
  order_type: string,
  offset: number | null,
  limit: number | null,
  user_entity_id?: string,
  search?: string,
  status_filters?: number[] | [],
  order_fulfillment_filters?: string[] | [],
  start_date?: string,
  end_date?: string,
  token_id?: string
) => {
  // Construct Base Query
  let baseQuery = await constructBaseQuery(
    entity_type_id,
    order_type,
    offset,
    limit,
    user_entity_id,
    search,
    status_filters,
    order_fulfillment_filters,
    start_date,
    end_date,
    token_id
  );

  return baseQuery;
};

const constructBaseQuery = async (
  entity_type_id: number,
  order_type: string,
  offset: number | null,
  limit: number | null,
  user_entity_id?: string,
  search?: string,
  status_filters?: number[] | [],
  order_fulfillment_filters?: string[] | [],
  start_date?: string,
  end_date?: string,
  token_id?: string
) => {
  try {
    let Query = ``;
    let searchFilter = ``;
    let tokeOrderStatusFilter = ``;
    let dateFilter = ``;
    let limitStatment = ``;
    let fulfilledByCheck = "";
    let orderFulfillmentFilter = ``;
    let tokenFilterForIssuer = ``;

    console.log(entity_type_id, "user_entity_id");

    /* ------------------  For Issuer  ------------------ */
    if (entity_type_id === 3) {
      fulfilledByCheck = "issuer";
      // For Search By [ Investor Name ] Filter
      if (search) {
        searchFilter = ` AND investor_name ILIKE '${search}%'`;
      }

      // For Token Order Status Filter
      if (status_filters && status_filters?.length > 0) {
        tokeOrderStatusFilter = ` AND status_id IN (${status_filters?.join(
          ","
        )})`;
      }

      // For Date Filter
      if (start_date && end_date) {
        dateFilter = ` AND creation_date BETWEEN '${start_date}' AND '${end_date}'`;
      }

      // For Limit & Offset
      if (offset !== null && limit !== null) {
        limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
      }

      // For Token Offering Filter
      if (token_id) {
        tokenFilterForIssuer = ` AND tor.token_offering_id = '${token_id}'`;
      }

      /* Construct Base Query */
      Query = `WITH
      vas AS (
        SELECT
        tor.id AS id,
        tor.type AS type,
        entrec.legal_name AS investor_name,
        inast.url AS investor_logo_url,
        tor.status_id AS status_id,
        mos.name AS status_name,
        tor.created_at AS creation_date,
        tor.ordered_tokens AS token_ordered,
        tof.symbol AS token_symbol,
        tor.price_per_token AS token_price,
        tor.created_at AS token_price_time,
        tor.net_investment_value_in_euro AS amount_to_pay,
        tor.is_active AS is_active,
        tor.token_offering_id AS token_offering_id,
        tast.url AS token_logo_url,
        CASE
          WHEN tor.fulfilled_by = '${fulfilledByCheck}' THEN true
          ELSE false
        END AS is_burn_enabled
        FROM
          token_orders AS tor
          LEFT JOIN entities AS entis ON tor.issuer_entity_id = entis.id
          LEFT JOIN entities AS entrec ON tor.receiver_entity_id = entrec.id
          LEFT JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
          LEFT JOIN assets AS tast ON tof.logo_asset_id = tast.id
          LEFT JOIN assets AS inast ON entrec.logo_asset_id = inast.id
          LEFT JOIN master_order_status AS mos ON tor.status_id = mos.id
          LEFT JOIN user_profiles AS up ON entrec.contact_profile_id = up.id
          LEFT JOIN token_transactions AS totr ON tor.id = totr.order_id
        WHERE
          tor.type = '${order_type}'
          AND tor.issuer_entity_id = '${user_entity_id}' 
          ${tokenFilterForIssuer}
      )
    SELECT
      *
    FROM
      vas
    WHERE
      is_active = true 
      ${searchFilter} 
      ${tokeOrderStatusFilter} 
      ${dateFilter} 
    ORDER BY
      creation_date DESC 
    ${limitStatment}`;
    }

    /* ------------------  For Investor  ------------------ */
    if (entity_type_id === 2) {
      // For Search By [ Token Name ] Filter
      if (search) {
        searchFilter = ` AND token_name ILIKE '${search}%'`;
      }

      // For Token Order Status Filter
      if (status_filters && status_filters?.length > 0) {
        tokeOrderStatusFilter = ` AND status_id IN (${status_filters?.join(
          ","
        )})`;
      }

      // For Date Filter
      if (start_date && end_date) {
        dateFilter = ` AND creation_date BETWEEN '${start_date}' AND '${end_date}'`;
      }

      // For Limit & Offset
      if (offset !== null && limit !== null) {
        limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
      }

      /* Construct Base Query */
      Query = `WITH
        vas AS (
          SELECT
          tor.id AS id,
          tor.type AS type,
          tof.name AS token_name,
          tof.symbol AS token_symbol,
          tof.isin_number AS token_isin,
          tor.status_id AS status_id,
          mos.name AS status_name,
          tor.created_at AS creation_date,
          tor.ordered_tokens AS token_ordered,
          tor.price_per_token AS token_price,
          tor.created_at AS token_price_time,
          tor.net_investment_value_in_euro AS amount_to_receive,
          tor.is_active AS is_active,
          tor.token_offering_id AS token_offering_id,
          ast.url AS token_logo_url,
          false AS is_burn_enabled
          FROM
            token_orders AS tor
            LEFT JOIN entities AS entis ON tor.issuer_entity_id = entis.id
            LEFT JOIN entities AS entrec ON tor.receiver_entity_id = entrec.id
            LEFT JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
            LEFT JOIN assets AS ast ON tof.logo_asset_id = ast.id
            LEFT JOIN master_order_status AS mos ON tor.status_id = mos.id
            LEFT JOIN user_profiles AS up ON entrec.contact_profile_id = up.id
            LEFT JOIN token_transactions AS totr ON tor.id = totr.order_id
          WHERE
            tor.type = '${order_type}'
            AND tor.receiver_entity_id = '${user_entity_id}'
        )
      SELECT
        *
      FROM
        vas
      WHERE
        is_active = true 
        ${searchFilter} 
        ${tokeOrderStatusFilter} 
        ${dateFilter} 
      ORDER BY
        creation_date DESC 
      ${limitStatment}`;
    }

    /* ------------------  For Admin  ------------------ */
    if (entity_type_id === 1) {
      fulfilledByCheck = "admin";
      // For Search By [ Issuer Name | Investor Name ] Filter
      if (search) {
        searchFilter = ` AND (
                investor_name ILIKE '${search}%' 
                OR issuer_name ILIKE '${search}%'
            )`;
      }

      // For Token Order Status Filter
      if (status_filters && status_filters?.length > 0) {
        tokeOrderStatusFilter = ` AND status_id IN (${status_filters?.join(
          ","
        )})`;
      }

      // For Order Fulfilled By Filter
      if (order_fulfillment_filters && order_fulfillment_filters?.length > 0) {
        orderFulfillmentFilter = ` AND fulfilled_by IN (${order_fulfillment_filters
          .map((order_fulfillment) => `'${order_fulfillment}'`)
          .join(", ")})`;
      }

      // For Date Filter
      if (start_date && end_date) {
        dateFilter = ` AND creation_date BETWEEN '${start_date}' AND '${end_date}'`;
      }

      // For Limit & Offset
      if (offset !== null && limit !== null) {
        limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
      }

      /* Construct Base Query */
      Query = `WITH
          vas AS (
            SELECT
            tor.id AS id,
            tor.type AS type,
            entrec.legal_name AS investor_name,
            invast.url AS investor_logo_url,
            entis.legal_name AS issuer_name,
            issast.url AS issuer_logo_url,
            tor.status_id AS status_id,
            mos.name AS status_name,
            tor.created_at AS creation_date,
            tor.ordered_tokens AS token_ordered,
            tof.symbol AS token_symbol,
            tor.price_per_token AS token_price,
            tor.created_at AS token_price_time,
            tor.net_investment_value_in_euro AS amount_to_pay,
            tor.is_active AS is_active,
            tor.token_offering_id AS token_offering_id,
            tast.url AS token_logo_url,
            tor.fulfilled_by AS fulfilled_by,
            CASE
              WHEN tor.fulfilled_by = '${fulfilledByCheck}' THEN true
              ELSE false
            END AS is_burn_enabled
            FROM
              token_orders AS tor
              INNER JOIN entities AS entis ON tor.issuer_entity_id = entis.id
              INNER JOIN entities AS entrec ON tor.receiver_entity_id = entrec.id
              INNER JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
              INNER JOIN assets AS tast ON tof.logo_asset_id = tast.id
              INNER JOIN assets AS invast ON entrec.logo_asset_id = invast.id
              INNER JOIN assets AS issast ON entis.logo_asset_id = issast.id
              INNER JOIN master_order_status AS mos ON tor.status_id = mos.id
              INNER JOIN user_profiles AS up ON entrec.contact_profile_id = up.id
              LEFT JOIN token_transactions AS totr ON tor.id = totr.order_id
            WHERE
              tor.type = '${order_type}'
          )
        SELECT
          *
        FROM
          vas
        WHERE
          is_active = true 
          ${searchFilter} 
          ${tokeOrderStatusFilter} 
          ${orderFulfillmentFilter}
          ${dateFilter} 
        ORDER BY
          creation_date DESC 
        ${limitStatment}`;
    }

    return Query;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};
