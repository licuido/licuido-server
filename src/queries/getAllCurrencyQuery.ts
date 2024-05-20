export const getAllCurrenciesQuery = (
    offset: number | null,
    limit: number | null,
    search?: string,
  ) => {

     // For Limit & Offset
  let limitStatment = ``;
  if (offset !== null && limit !== null) {
    limitStatment = ` LIMIT '${limit}' OFFSET '${offset}'`;
  }

  let searchFilter = ``;
  if (search) {
    searchFilter = ` AND (
        currency ILIKE '${search}%'
        OR currency_code ILIKE '${search}%'
      )`;
  }

    /* For Data */
    let baseQuery = `SELECT DISTINCT
    currency_code,
    currency_symbol
  FROM
    master_countries
  WHERE
    is_active = true 
    ${searchFilter}
    ${limitStatment}
    `;
  
    return baseQuery;
  };