export const getTotalInvestmentQuery = (user_entity_id?: string) => {
  /* Get Token Investment & Investment Variation Percentage */

  /* In Where Condition
           ---- issuer_entity_id = ""
           ---- AND tof.status_id = 1
           ---- AND tof.offer_status_id = 1
           ---- AND tor.type = 'subscription' [Only Subscription Investment]
           ---- AND tor.status_id = 5 [Only Minted Status]
           */

  /* For Data */
  let baseQuery = `SELECT
    tof.issuer_entity_id AS issuer_entity_id,
    SUM(COALESCE(tor.net_investment_value_in_euro, 0)) AS overall_investment,
    COALESCE(
      ROUND(
        (
          (
            SUM(
              CASE
                WHEN DATE(tor.created_at) <= CURRENT_DATE THEN COALESCE(tor.net_investment_value_in_euro, 0)
                ELSE 0
              END
            ) - SUM(
              CASE
                WHEN DATE(tor.created_at) <= CURRENT_DATE - INTERVAL '1 day' THEN COALESCE(tor.net_investment_value_in_euro, 0)
                ELSE 0
              END
            )
          ) / SUM(
            CASE
              WHEN DATE(tor.created_at) <= CURRENT_DATE - INTERVAL '1 day' THEN COALESCE(tor.net_investment_value_in_euro, 0)
              ELSE 0
            END
          )
        ) * 100
      ),
      0
    ) AS percentage_change_till_today
  FROM
    token_offerings AS tof
    LEFT JOIN token_orders AS tor ON tof.id = tor.token_offering_id
  WHERE
    tof.issuer_entity_id = '${user_entity_id}'
    AND tof.is_active = true
    AND tof.status_id = 1
    AND tof.offer_status_id = 1
    AND tor.type = 'subscription'
    AND tor.status_id = 5
  GROUP BY
    tof.issuer_entity_id`;

  return baseQuery;
};

export const getCirculatingSupplyQuery = (user_entity_id?: string) => {
  /* Get Circulating Supply & Amount */

  /* In Where Condition
           ---- issuer_entity_id = ""
           ---- AND tof.status_id = 1 Active
           ---- AND tof.offer_status_id = 1 Active
           */

  /* For Data */
  let baseQuery = `SELECT
    tof.issuer_entity_id AS issuer_entity_id,
    SUM(COALESCE(tof.circulating_supply_count, 0)) AS circulating_supply,
    SUM(
      CASE
        WHEN tof.valuation_price IS NOT NULL
        AND tof.valuation_price != 0 THEN COALESCE(tof.circulating_supply_count, 0) * tof.valuation_price
        ELSE COALESCE(tof.circulating_supply_count, 0) * tof.offering_price
      END
    ) AS circulating_supply_amount
  FROM
    token_offerings AS tof
  WHERE
    tof.issuer_entity_id = '${user_entity_id}'
    AND tof.is_active = true
    AND tof.status_id = 1
    AND tof.offer_status_id = 1
  GROUP BY
    tof.issuer_entity_id`;

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
  let baseQuery = `SELECT
    tor.issuer_entity_id AS issuer_entity_id,
    SUM(COALESCE(tor.ordered_tokens, 0)) AS pending_redemption,
    SUM(
      CASE
        WHEN tof.valuation_price IS NOT NULL AND tof.valuation_price != 0
        THEN COALESCE(tor.ordered_tokens, 0) * tof.valuation_price
        ELSE COALESCE(tor.ordered_tokens, 0) * tof.offering_price
      END
    ) AS pending_redemption_amount
  FROM
    token_orders AS tor
    INNER JOIN token_offerings AS tof ON tor.token_offering_id = tof.id
  WHERE
    tor.issuer_entity_id = '${user_entity_id}'
    AND tor.type = 'redemption'
    AND tor.status_id NOT IN (6, 7, 8, 11)
  GROUP BY
    tor.issuer_entity_id`;

  return baseQuery;
};

export const getAllFundOfferingsForPortfolioQuery = (
  offset: number | null,
  limit: number | null,
  user_entity_id?: string
) => {
  /* Get All Fund Offerings For Portfolio */

  // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset * limit}'`;
  }

  /* For Data */
  let baseQuery = `WITH
  vas_fo AS (
    SELECT
      tof.id AS token_offering_id,
      tof.name AS token_name,
      tof.isin_number AS isin_no,
      tof.start_date AS star_date,
      tof.end_date AS end_date,
      tof.offer_status_id AS token_status_id,
      mtos.name AS token_status_name,
      tof.status_id AS status_id,
      mts.name AS mts_name,
      tof.offering_price AS offering_price,
      tof.created_at AS created_at,
      COALESCE(tof.circulating_supply_count, 0) AS circulating_supply,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(token_or.ordered_tokens, 0))
          FROM
            token_orders AS token_or
            INNER JOIN token_offerings AS token_of ON token_or.token_offering_id = token_of.id
          WHERE
            token_or.issuer_entity_id = '${user_entity_id}'
            AND token_or.type = 'redemption'
            AND token_or.status_id NOT IN (6, 7, 8, 11)
            AND token_or.token_offering_id = tof.id
        ),
        0
      ) AS pending_token_redemption,
      COALESCE(
        (
          SELECT
            SUM(COALESCE(tor.net_investment_value_in_euro, 0))
          FROM
            token_orders AS tor
          WHERE
            tor.token_offering_id = tof.id
        ),
        0
      ) AS overall_investment,
      COALESCE(tof.valuation_price, 0) AS valuation
    FROM
      token_offerings AS tof
      INNER JOIN master_token_offering_status AS mtos ON tof.offer_status_id = mtos.id
      INNER JOIN master_token_status AS mts ON tof.status_id = mts.id
    WHERE
      tof.issuer_entity_id = '${user_entity_id}'
  )
SELECT
  *,
  (circulating_supply - pending_token_redemption) AS available_token,
  ROUND(
    ((valuation - offering_price) / offering_price * 100),
    1
  ) AS valuation_percentage
FROM
  vas_fo 
  ORDER BY
  created_at ASC 
  ${limitStatment}`;

  return baseQuery;
};
