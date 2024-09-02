export const getTotalInvestmentQuery = (user_entity_id?: string) => {
  /* Get Token Investment & Investment Variation Percentage */

  /* In Where Condition
           ---- issuer_entity_id = ""
           ---- AND tof.status_id = 1
           ---- AND tof.offer_status_id = 1
           */

  /* For Data */
  let baseQuery = `WITH
  vas_tot_investment AS(
    SELECT
      tof.issuer_entity_id AS issuer_entity_id,
      en.legal_name AS issuer_name,
      iss_ast.url AS issuer_logo_url,
      tof.id AS token_offering_id,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(tor.net_investment_value_in_euro, 0))
          FROM
            token_orders AS tor
          WHERE
            tor.token_offering_id = tof.id
            AND tor.type = 'subscription'
            AND tor.status_id = 5
        ),
        0
      ) AS overall_mint,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(tor.net_investment_value_in_euro, 0))
          FROM
            token_orders AS tor
          WHERE
            tor.token_offering_id = tof.id
            AND tor.type = 'redemption'
            AND tor.status_id = 11
        ),
        0
      ) AS overall_burn,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(tor.net_investment_value_in_euro, 0))
          FROM
            token_orders AS tor
          WHERE
            tor.token_offering_id = tof.id
            AND tor.type = 'subscription'
            AND tor.status_id = 5
            AND DATE(tor.created_at) <= CURRENT_DATE - INTERVAL '1 day'
        ),
        0
      ) AS overall_mint_till_yesterday,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(tor.net_investment_value_in_euro, 0))
          FROM
            token_orders AS tor
          WHERE
            tor.token_offering_id = tof.id
            AND tor.type = 'redemption'
            AND tor.status_id = 11
            AND DATE(tor.created_at) <= CURRENT_DATE - INTERVAL '1 day'
        ),
        0
      ) AS overall_burn_till_yesterday
    FROM
      token_offerings AS tof
      INNER JOIN entities AS en ON tof.issuer_entity_id = en.id
      LEFT JOIN assets AS iss_ast ON en.logo_asset_id = iss_ast.id
    WHERE
      tof.issuer_entity_id = '${user_entity_id}'
      AND tof.is_active = true
      AND tof.status_id = 1
      AND tof.offer_status_id = 1
    GROUP BY
      tof.issuer_entity_id,
      en.legal_name,
      iss_ast.url,
      tof.id
  )
SELECT
  issuer_entity_id,
  issuer_name,
  issuer_logo_url,
  (SUM(overall_mint) - SUM(overall_burn)) AS overall_investment,
  COALESCE(
    (
      (
        (SUM(overall_mint) - SUM(overall_burn)) - (
          SUM(overall_mint_till_yesterday) - SUM(overall_burn_till_yesterday)
        )
      ) / NULLIF(
        SUM(overall_mint_till_yesterday) - SUM(overall_burn_till_yesterday),
        0
      )
    ) * 100,
    0
  ) AS percentage_change_from_yesterday
FROM
  vas_tot_investment
GROUP BY
  issuer_entity_id,
  issuer_name,
  issuer_logo_url`;

  return baseQuery;
};

export const getCirculatingSupplyQuery = (user_entity_id?: string) => {
  /* Get Circulating Supply & Amount */

  /* In Where Condition
   */

  /* For Data */
  let baseQuery = `WITH
  vas_cs AS (
    SELECT
      tof.id,
      COALESCE(
        (
          SELECT
            tt.total_supply
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.issuer_entity_id = '${user_entity_id}'
            AND tor.token_offering_id = tof.id
            AND tt.status_id IN (1, 2)
          ORDER BY
            tt.updated_at DESC
          LIMIT
            1
        ), 0
      ) AS total_supply,
      COALESCE(
        (
          SELECT
            tv.valuation_price_in_euro
          FROM
            token_valuations AS tv
          WHERE
            tv.token_offering_id = tof.id
            AND (
              tv.start_date < CURRENT_DATE
              OR (
                tv.start_date = CURRENT_DATE
                AND tv.start_time <= CURRENT_TIME
              )
            )
          ORDER BY
            tv.start_date DESC,
            tv.start_time DESC
          LIMIT
            1
        ), tof.offering_price_in_euro
      ) AS valuation_price
    FROM
      token_offerings AS tof
    WHERE
      tof.issuer_entity_id = '${user_entity_id}'
      AND tof.is_active = true
      AND tof.status_id = 1
      AND tof.offer_status_id = 1
    GROUP BY
      tof.id
  )
SELECT
  COALESCE(SUM(total_supply), 0) AS circulating_supply,
  SUM(COALESCE(total_supply * valuation_price, 0)) AS circulating_supply_amount
FROM
  vas_cs`;

  return baseQuery;
};

export const getPendingRedemptionQuery = (user_entity_id?: string) => {
  /* Get Pending Redemption & Amount */

  /* In Where Condition
           ---- issuer_entity_id = ""
           ---- AND tof.status_id = 1 Active
           ---- AND tof.offer_status_id = 1 Active
           */

  /* For Data */
  let baseQuery = `WITH
  vas_pr AS (
    SELECT
      tof.id,
      COALESCE(
        (
          SELECT
            SUM(tt.block_token)
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.issuer_entity_id = '${user_entity_id}'
            AND tor.token_offering_id = tof.id
            AND tt.status_id IN (1, 2)
        ),
        0
      ) AS pending_token,
      COALESCE(
        (
          SELECT
            tv.valuation_price_in_euro
          FROM
            token_valuations AS tv
          WHERE
            tv.token_offering_id = tof.id
            AND (
              tv.start_date < CURRENT_DATE
              OR (
                tv.start_date = CURRENT_DATE
                AND tv.start_time <= CURRENT_TIME
              )
            )
          ORDER BY
            tv.start_date DESC,
            tv.start_time DESC
          LIMIT
            1
        ), tof.offering_price_in_euro
      ) AS valuation_price
    FROM
      token_offerings AS tof
    WHERE
      tof.issuer_entity_id = '${user_entity_id}'
      AND tof.is_active = true
      AND tof.status_id = 1
      AND tof.offer_status_id = 1
    GROUP BY
      tof.id
  )
SELECT
  COALESCE(SUM(pending_token), 0) AS pending_redemption,
  SUM(COALESCE(pending_token * valuation_price, 0)) AS pending_redemption_amount
FROM
  vas_pr`;

  return baseQuery;
};

export const getAllFundOfferingsForPortfolioQuery = (
  offset: number | null,
  limit: number | null,
  user_entity_id?: string,
  request?: any,
  statusId?: any,
  search?: string,
  symbol?: string,
  bankName?: string,
  bankAccountName?: string,
  blockchain_network?: number,
  tokenTypeId?: number
) => {
  /* Get All Fund Offerings For Portfolio */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }
  /* For Data */
  let baseQuery = `WITH
  vas_fo AS(
    SELECT
      tof.id AS token_offering_id,
      tof.name AS token_name,
      tof.base_currency_code,
      tof.symbol AS token_symbol,
      tof.isin_number AS isin_no,
      ast.url AS token_logo_url,
      tof.start_date AS star_date,
      tof.end_date AS end_date,
      tof.offer_status_id AS token_status_id,
      mtos.name AS token_status_name,
      tof.status_id AS status_id,
      mts.name AS status_name,
      tof.offering_price,
      COALESCE(
        (
          SELECT
            tt.total_supply
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.issuer_entity_id = '${user_entity_id}'
            AND tor.token_offering_id = tof.id
            AND tt.status_id = 2
          ORDER BY
            tt.updated_at DESC
          LIMIT
            1
        ), 0
      ) AS circulating_supply,
      COALESCE(
        (
          SELECT
            SUM(tt.block_token)
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.issuer_entity_id = '${user_entity_id}'
            AND tor.token_offering_id = tof.id
            AND tt.status_id IN (1, 2)
        ),
        0
      ) AS pending_token_redemption,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(tor.net_investment_value_by_token, 0))
          FROM
            token_orders AS tor
          WHERE
            tor.token_offering_id = tof.id
            AND tor.type = 'subscription'
            AND tor.status_id = 5
        ),
        0
      ) AS overall_mint,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(tor.net_investment_value_by_token, 0))
          FROM
            token_orders AS tor
          WHERE
            tor.token_offering_id = tof.id
            AND tor.type = 'redemption'
            AND tor.status_id = 11
        ),
        0
      ) AS overall_burn,
      COALESCE(
        (
          SELECT
            valuation_price
          FROM
            token_valuations AS tv
          WHERE
            tv.token_offering_id = tof.id
            AND (
              tv.start_date < CURRENT_DATE
              OR (
                tv.start_date = CURRENT_DATE
                AND tv.start_time <= CURRENT_TIME
              )
            )
          ORDER BY
            tv.start_date DESC,
            tv.start_time DESC
          LIMIT
            1
        ), tof.offering_price
      ) AS valuation_price,
      tof.created_at AS created_at
    FROM
      token_offerings AS tof
      INNER JOIN master_token_offering_status AS mtos ON tof.offer_status_id = mtos.id
      INNER JOIN master_token_status AS mts ON tof.status_id = mts.id
      LEFT JOIN assets AS ast ON tof.logo_asset_id = ast.id
    WHERE
      tof.issuer_entity_id = '${user_entity_id}'
      AND tof.is_active = true
  )
SELECT
  *,
  (circulating_supply - pending_token_redemption) AS available_token,
  (overall_mint - overall_burn) AS overall_investment,
  ROUND(
    ((valuation_price - offering_price) / offering_price * 100),
    1
  ) AS valuation_percentage
FROM
  vas_fo
ORDER BY
  created_at DESC  
  ${limitStatment}`;
  /* For Admin Data */

  let statusFilterCondition = "";
  if (statusId) {
    statusFilterCondition = `AND tof.status_id = ${statusId}`;
  }

  let symbolFilterCondition = "";
  if (symbol && symbol.length > 0) {
    symbolFilterCondition = ` AND tof.symbol ILIKE '%${symbol}%'`;
  }

  let bankNameFilterCondition = "";
  if (bankName && bankName.length > 0) {
    bankNameFilterCondition = ` AND bank_name ILIKE '%${bankName}%'`;
  }

  let bankAccountNameFilterCondition = "";
  if (bankAccountName && bankAccountName.length > 0) {
    bankAccountNameFilterCondition = ` AND bank_account_name ILIKE '%${bankAccountName}%'`;
  }

  let blockchainNetworkFilterCondition = "";
  if (blockchain_network) {
    blockchainNetworkFilterCondition = ` AND tof.blockchain_network = ${blockchain_network}`;
  }

  // let issuerEntityIdFilterCondition = '';
  // if (user_entity_id) {
  //   issuerEntityIdFilterCondition = ` AND tor.issuer_entity_id = ${user_entity_id}`;
  // }

  let tokenTypeIdFilterCondition = "";
  if (tokenTypeId) {
    tokenTypeIdFilterCondition = ` AND tof.token_type_id = ${tokenTypeId}`;
  }

  let searchFilterCondition = "";
  if (search && search.length > 0) {
    searchFilterCondition = ` AND (
      tof.name ILIKE '%${search}%'
      OR bank_name ILIKE '%${search}%'
      OR bank_account_name ILIKE '%${search}%'
    )`;
  }

  let baseQueryForAdminUser = `WITH
  vas_fo AS(
    SELECT
      tof.id AS token_offering_id,
      tof.name AS token_name,
      tof.symbol AS token_symbol,
      tof.isin_number AS isin_no,
      ast.url AS token_logo_url,
      tof.start_date AS star_date,
      tof.end_date AS end_date,
      tof.offer_status_id AS token_status_id,
      mtos.name AS token_status_name,
      tof.status_id AS status_id,
      mts.name AS status_name,
      tof.offering_price,
      tof.blockchain_network,
      tof.token_type_id,
      COALESCE(
        (
          SELECT
            tt.total_supply
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.token_offering_id = tof.id
            AND tt.status_id = 2
          ORDER BY
            tt.updated_at DESC
          LIMIT
            1
        ), 0
      ) AS circulating_supply,
      COALESCE(
        (
          SELECT
            SUM(tt.block_token)
          FROM
            token_transactions AS tt
            INNER JOIN token_orders AS tor ON tt.order_id = tor.id
          WHERE
            tor.token_offering_id = tof.id
            AND tt.status_id IN (1, 2)
        ),
        0
      ) AS pending_token_redemption,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(tor.net_investment_value_by_token, 0))
          FROM
            token_orders AS tor
          WHERE
            tor.token_offering_id = tof.id
            AND tor.type = 'subscription'
            AND tor.status_id = 5
        ),
        0
      ) AS overall_mint,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(tor.net_investment_value_by_token, 0))
          FROM
            token_orders AS tor
          WHERE
            tor.token_offering_id = tof.id
            AND tor.type = 'redemption'
            AND tor.status_id = 11
        ),
        0
      ) AS overall_burn,
      COALESCE(
        (
          SELECT
            valuation_price
          FROM
            token_valuations AS tv
          WHERE
            tv.token_offering_id = tof.id
            AND (
              tv.start_date < CURRENT_DATE
              OR (
                tv.start_date = CURRENT_DATE
                AND tv.start_time <= CURRENT_TIME
              )
            )
          ORDER BY
            tv.start_date DESC,
            tv.start_time DESC
          LIMIT
            1
        ), tof.offering_price
      ) AS valuation_price,
      tof.created_at AS created_at,
      (
        SELECT
          tor.issuer_entity_id
        FROM
          token_orders AS tor
        WHERE
          tor.token_offering_id = tof.id
        LIMIT 1
      ) AS issuer_entity_id,
            (
        SELECT
          tor.bank_account_name
        FROM
          token_orders AS tor
        WHERE
          tor.token_offering_id = tof.id
        LIMIT 1
      ) AS bank_account_name,
      (
        SELECT
          tor.bank_name
        FROM
          token_orders AS tor
        WHERE
          tor.token_offering_id = tof.id
        LIMIT 1
      ) AS bank_name
    FROM
      token_offerings AS tof
      INNER JOIN master_token_offering_status AS mtos ON tof.offer_status_id = mtos.id
      INNER JOIN master_token_status AS mts ON tof.status_id = mts.id
      LEFT JOIN assets AS ast ON tof.logo_asset_id = ast.id
    WHERE
      tof.is_active = true
      ${statusFilterCondition}
      ${searchFilterCondition}
      ${symbolFilterCondition}
      ${bankNameFilterCondition}
      ${bankAccountNameFilterCondition}
      ${blockchainNetworkFilterCondition}
      ${tokenTypeIdFilterCondition}
  )
SELECT
  *,
  (circulating_supply - pending_token_redemption) AS available_token,
  (overall_mint - overall_burn) AS overall_investment,
  SUM(overall_mint - overall_burn) OVER (PARTITION BY issuer_entity_id) AS total_overall_investment,
  ROUND(
    ((valuation_price - offering_price) / offering_price * 100),
    1
  ) AS valuation_percentage
FROM
  vas_fo
ORDER BY
  created_at DESC
  ${limitStatment}`;

  if (request?.headers?.build === "AD-1") {
    return baseQueryForAdminUser;
  } else {
    return baseQuery;
  }
};

export const getInvestorListQuery = (
  offset: number | null,
  limit: number | null,
  search?: string,
  status_filters?: number[] | [],
  investor_type_filters?: number[] | [],
  country_filters?: number[] | [],
  user_entity_id?: string,
  minimum_investment_value?: string,
  maximum_investment_value?: string,
  request?: any,
  top_five?: Boolean
) => {
  /* Get All Investors Query on Search , Limit & Offset */

  /* In Where Condition
  
   */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }

  // For Search By Investor Name & Wallet Id Filter
  let searchFilter = ``;
  if (search && search.length > 0) {
    searchFilter = ` AND (
      investor_name ILIKE '${search}%'
      OR wallet_address ILIKE '${search}%'
    )`;
  }

  // For Country Filter
  let countryFilter = ``;
  if (country_filters && country_filters?.length > 0) {
    countryFilter = ` AND country_id IN (${country_filters?.join(",")})`;
  }

  // For Investor Type Filter [Corporate | Individual]
  let investorTypeFilter = ``;
  if (investor_type_filters && investor_type_filters?.length > 0) {
    investorTypeFilter = ` AND investor_type_id IN (${investor_type_filters?.join(
      ","
    )})`;
  }

  // Entity Investor Status Filter [Qualify | Tokenholder]
  let statusFilter = ``;
  if (status_filters && status_filters?.length > 0) {
    statusFilter = `  AND status_id IN (${status_filters?.join(",")})
      `;
  }

  // Investment Value Filter
  let invetementValueFilter = ``;
  if (
    minimum_investment_value &&
    minimum_investment_value?.length > 0 &&
    maximum_investment_value &&
    maximum_investment_value?.length > 0
  ) {
    // invetementValueFilter = `  AND investment BETWEEN ${minimum_investment_value} AND ${maximum_investment_value}
    //   `;
    limitStatment = ``;
  }

  /* For Data */
  let baseQuery = `WITH
  last_transaction AS (
    SELECT
      tor.receiver_entity_id,
      tor.token_offering_id,
      tt.sender_balance,
      ROW_NUMBER() OVER (
        PARTITION BY tor.token_offering_id
        ORDER BY
          tt.updated_at DESC
      ) AS rn
    FROM
      token_transactions AS tt
      INNER JOIN token_orders AS tor ON tt.order_id = tor.id
    WHERE
      tor.issuer_entity_id = '${user_entity_id}'
      AND tt.status_id = 2
  ),
  summed_balances AS (
    SELECT
      receiver_entity_id,
      SUM(sender_balance) AS total_balance
    FROM
      last_transaction
    WHERE
      rn = 1
    GROUP BY
      receiver_entity_id
  ),
  vas_inv AS (
    SELECT
      ei.investor_entity_id AS investor_entity_id,
      ei.is_active AS is_active,
      ei.created_at AS created_at,
      en.legal_name AS investor_name,
      inv_ast.url AS investor_logo_url,
      cw.wallet_address AS wallet_address,
      mwt.name AS wallet_type_name,
      ei.investor_type_id AS investor_type_id,
      mit.name AS investor_type_name,
      en.country_id AS country_id,
      mco.name AS country_name,
      mco.emoji AS country_emoji,
      mco.emoji_unicode AS country_emoji_unicode,
      en.business_sector_id AS sector_id,
      mbs.name AS sector,
      COALESCE(token_status.total_balance, 0) AS tokens,
      CASE
        WHEN COALESCE(token_status.total_balance, 0) > 0 THEN 4
        ELSE ei.status_id
      END AS status_id,
      CASE
        WHEN COALESCE(token_status.total_balance, 0) > 0 THEN 'Tokenholder'
        ELSE meis.name
      END AS status_name,
      (
        COALESCE(
          (
            SELECT
              SUM(COALESCE(tor.net_investment_value_in_euro, 0))
            FROM
              token_orders AS tor
              LEFT JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
            WHERE
              tor.receiver_entity_id = ei.investor_entity_id
              AND tor.issuer_entity_id = '${user_entity_id}'
              AND tor.type = 'subscription'
              AND tor.status_id = 5
          ),
          0
        ) - COALESCE(
          (
            SELECT
              SUM(COALESCE(tor.net_investment_value_in_euro, 0))
            FROM
              token_orders AS tor
              LEFT JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
            WHERE
              tor.receiver_entity_id = ei.investor_entity_id
              AND tor.issuer_entity_id = '${user_entity_id}'
              AND tor.type = 'redemption'
              AND tor.status_id = 11
          ),
          0
        )
      ) AS investment
    FROM
      entity_investors AS ei
      INNER JOIN master_investor_types AS mit ON ei.investor_type_id = mit.id
      INNER JOIN entities AS en ON ei.investor_entity_id = en.id
      INNER JOIN master_entity_investor_status AS meis ON ei.status_id = meis.id
      LEFT JOIN assets AS inv_ast ON en.logo_asset_id = inv_ast.id
      LEFT JOIN master_countries AS mco ON en.country_id = mco.id
      LEFT JOIN master_business_sectors AS mbs ON en.business_sector_id = mbs.id
      LEFT JOIN customer_wallets AS cw ON en.id = cw.investor_entity_id
      LEFT JOIN master_wallet_types AS mwt ON cw.wallet_type_id = mwt.id
      LEFT JOIN summed_balances AS token_status ON ei.investor_entity_id = token_status.receiver_entity_id
    WHERE
      ei.issuer_entity_id = '${user_entity_id}'
      AND ei.status_id = 3
  )
SELECT
  *
FROM
  vas_inv
WHERE
  is_active = true 
  ${searchFilter} 
  ${statusFilter} 
  ${investorTypeFilter} 
  ${countryFilter} 
ORDER BY
  created_at ASC 
  ${limitStatment}`;

  let baseAdminQuery = `WITH
  last_transaction AS (
    SELECT
      tor.receiver_entity_id,
      tor.token_offering_id,
      tt.sender_balance,
      ROW_NUMBER() OVER (
        PARTITION BY tor.token_offering_id
        ORDER BY
          tt.updated_at DESC
      ) AS rn
    FROM
      token_transactions AS tt
      INNER JOIN token_orders AS tor ON tt.order_id = tor.id
    WHERE
      tt.status_id = 2
  ),
  summed_balances AS (
    SELECT
      receiver_entity_id,
      SUM(sender_balance) AS total_balance
    FROM
      last_transaction
    WHERE
      rn = 1
    GROUP BY
      receiver_entity_id
  ),
  vas_inv AS (
    SELECT
      ei.investor_entity_id AS investor_entity_id,
      ei.is_active AS is_active,
      ei.created_at AS created_at,
      en.legal_name AS investor_name,
      inv_ast.url AS investor_logo_url,
      cw.wallet_address AS wallet_address,
      mwt.name AS wallet_type_name,
      ei.investor_type_id AS investor_type_id,
      mit.name AS investor_type_name,
      en.country_id AS country_id,
      mco.name AS country_name,
      mco.emoji AS country_emoji,
      mco.emoji_unicode AS country_emoji_unicode,
      en.business_sector_id AS sector_id,
      mbs.name AS sector,
      COALESCE(token_status.total_balance, 0) AS tokens,
      CASE
        WHEN COALESCE(token_status.total_balance, 0) > 0 THEN 4
        ELSE ei.status_id
      END AS status_id,
      CASE
        WHEN COALESCE(token_status.total_balance, 0) > 0 THEN 'Tokenholder'
        ELSE meis.name
      END AS status_name,
      (
        COALESCE(
          (
            SELECT
              SUM(COALESCE(tor.net_investment_value_in_euro, 0))
            FROM
              token_orders AS tor
            WHERE
              tor.receiver_entity_id = ei.investor_entity_id
              AND tor.type = 'subscription'
              AND tor.status_id = 5
          ),
          0
        ) - COALESCE(
          (
            SELECT
              SUM(COALESCE(tor.net_investment_value_in_euro, 0))
            FROM
              token_orders AS tor
            WHERE
              tor.receiver_entity_id = ei.investor_entity_id
              AND tor.type = 'redemption'
              AND tor.status_id = 11
          ),
          0
        )
      ) AS investment
    FROM
      entity_investors AS ei
      INNER JOIN master_investor_types AS mit ON ei.investor_type_id = mit.id
      INNER JOIN entities AS en ON ei.investor_entity_id = en.id
      INNER JOIN master_entity_investor_status AS meis ON ei.status_id = meis.id
      LEFT JOIN assets AS inv_ast ON en.logo_asset_id = inv_ast.id
      LEFT JOIN master_countries AS mco ON en.country_id = mco.id
      LEFT JOIN master_business_sectors AS mbs ON en.business_sector_id = mbs.id
      LEFT JOIN customer_wallets AS cw ON en.id = cw.investor_entity_id
      LEFT JOIN master_wallet_types AS mwt ON cw.wallet_type_id = mwt.id
      LEFT JOIN summed_balances AS token_status ON ei.investor_entity_id = token_status.receiver_entity_id
    WHERE
      ei.status_id = 3
  )
SELECT
  *
FROM
  vas_inv
WHERE
  is_active = true 
  ${searchFilter} 
  ${statusFilter} 
  ${investorTypeFilter} 
  ${countryFilter} 
  ${invetementValueFilter} 
ORDER BY
  created_at ASC 
  ${limitStatment}`;
  // Top 5 investor based on investment value
  let TopFiveInvestor = `WITH
  last_transaction AS (
    SELECT
      tor.receiver_entity_id,
      tor.token_offering_id,
      tt.sender_balance,
      ROW_NUMBER() OVER (
        PARTITION BY tor.token_offering_id
        ORDER BY
          tt.updated_at DESC
      ) AS rn
    FROM
      token_transactions AS tt
      INNER JOIN token_orders AS tor ON tt.order_id = tor.id
    WHERE
      tt.status_id = 2
  ),
  summed_balances AS (
    SELECT
      receiver_entity_id,
      SUM(sender_balance) AS total_balance
    FROM
      last_transaction
    WHERE
      rn = 1
    GROUP BY
      receiver_entity_id
  ),
  vas_inv AS (
    SELECT
      ei.investor_entity_id AS investor_entity_id,
      ei.is_active AS is_active,
      ei.created_at AS created_at,
      en.legal_name AS investor_name,
      inv_ast.url AS investor_logo_url,
      cw.wallet_address AS wallet_address,
      mwt.name AS wallet_type_name,
      ei.investor_type_id AS investor_type_id,
      mit.name AS investor_type_name,
      en.country_id AS country_id,
      mco.name AS country_name,
      mco.emoji AS country_emoji,
      mco.emoji_unicode AS country_emoji_unicode,
      en.business_sector_id AS sector_id,
      mbs.name AS sector,
      COALESCE(token_status.total_balance, 0) AS tokens,
      CASE
        WHEN COALESCE(token_status.total_balance, 0) > 0 THEN 4
        ELSE ei.status_id
      END AS status_id,
      CASE
        WHEN COALESCE(token_status.total_balance, 0) > 0 THEN 'Tokenholder'
        ELSE meis.name
      END AS status_name,
      (
        COALESCE(
          (
            SELECT
              SUM(COALESCE(tor.net_investment_value_in_euro, 0))
            FROM
              token_orders AS tor
            WHERE
              tor.receiver_entity_id = ei.investor_entity_id
              AND tor.type = 'subscription'
              AND tor.status_id = 5
          ),
          0
        ) - COALESCE(
          (
            SELECT
              SUM(COALESCE(tor.net_investment_value_in_euro, 0))
            FROM
              token_orders AS tor
            WHERE
              tor.receiver_entity_id = ei.investor_entity_id
              AND tor.type = 'redemption'
              AND tor.status_id = 11
          ),
          0
        )
      ) AS investment
    FROM
      entity_investors AS ei
      INNER JOIN master_investor_types AS mit ON ei.investor_type_id = mit.id
      INNER JOIN entities AS en ON ei.investor_entity_id = en.id
      INNER JOIN master_entity_investor_status AS meis ON ei.status_id = meis.id
      LEFT JOIN assets AS inv_ast ON en.logo_asset_id = inv_ast.id
      LEFT JOIN master_countries AS mco ON en.country_id = mco.id
      LEFT JOIN master_business_sectors AS mbs ON en.business_sector_id = mbs.id
      LEFT JOIN customer_wallets AS cw ON en.id = cw.investor_entity_id
      LEFT JOIN master_wallet_types AS mwt ON cw.wallet_type_id = mwt.id
      LEFT JOIN summed_balances AS token_status ON ei.investor_entity_id = token_status.receiver_entity_id
    WHERE
      ei.status_id = 3
  )
SELECT
  *
FROM
  vas_inv
WHERE
  is_active = true 
  ${searchFilter} 
  ${statusFilter} 
  ${investorTypeFilter} 
  ${countryFilter} 
  ${invetementValueFilter} 
ORDER BY
  investment DESC,
  created_at ASC
LIMIT 5;`;

  if (top_five) {
    return TopFiveInvestor;
  }
  if (request?.headers?.build === "AD-1") {
    return baseAdminQuery;
  } else {
    return baseQuery;
  }
};
