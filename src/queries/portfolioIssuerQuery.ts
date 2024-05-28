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
