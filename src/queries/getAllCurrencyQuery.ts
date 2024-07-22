export const getAllCurrenciesQuery = (
  offset: number | null,
  limit: number | null,
  search?: string
) => {
  // For Limit & Offset
  let limitStatement = ``;
  if (offset !== null && limit !== null) {
    limitStatement = ` LIMIT ${limit} OFFSET ${offset}`;
  }

  // For Search Filter
  let searchFilter = ``;
  if (search) {
    searchFilter = ` AND (
        currency_code ILIKE '${search}%'
        OR currency_symbol ILIKE '${search}%'
      )`;
  }

  /* For Data */
  let baseQuery = `
  SELECT 
    currency_code,
    currency_symbol
  FROM (
    SELECT DISTINCT
      currency_code,
      currency_symbol,
      CASE
        WHEN currency_code IN ('GBP', 'EUR', 'USD') THEN 0
        ELSE 1
      END AS priority
    FROM
      master_countries
    WHERE
      is_active = true
      ${searchFilter}
  ) AS subquery
  ORDER BY 
    priority,
    currency_code,
    currency_symbol
  ${limitStatement};
  `;

  return baseQuery;
};
