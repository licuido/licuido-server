import { token_offering, user_entity, user_profile } from "@models";
import queries from "@queries";
import { sequelize } from "@utils";

export async function createUserEntities({
  user_profile_id,
  entity_id,
}: {
  user_profile_id: string;
  entity_id: number;
}) {
  try {
    // Creating User Profile
    return await user_entity.create({
      user_profile_id,
      entity_id,
      is_active: true,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function findUserExisit({
  entity_id,
  email_id,
}: {
  entity_id: number;
  email_id: string;
}) {
  try {
    // Creating User Profile
    return await user_entity.findAll({
      where: {
        entity_id,
      },
      include: [
        {
          model: user_profile,
          as: "user_profile",
          where: { email_id },
          attributes: ["is_setup_done", "name"],
          required: true,
        }, // Include the related user_profile record for user_profile_id
      ],
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getInvestorCount({
  entity_type_id,
  user_entity_id,
}: {
  entity_type_id: 1 | 2 | 3;
  user_entity_id: string;
}) {
  try {
    // Get Count of Investor for Qualification

    // return await user_entity.count({
    //   where: {
    //     entity_id: entity_type_id,
    //     is_active: true,
    //   },
    //   include: [
    //     {
    //       model: user_profile,
    //       as: "user_profile",
    //       where: {
    //         is_active: true,
    //         is_setup_done: true, // Complete Onboarding
    //       },
    //       required: true,
    //     }
    //   ],
    // });
    //     const [dataCount]: any[] = await sequelize.query(
    //       ` SELECT
    //   COUNT(*) AS count
    // FROM
    //    user_entities as ue
    //       INNER JOIN user_profiles AS up ON ue.user_profile_id = up.id
    //       INNER JOIN master_investor_types AS mit ON up.investor_type_id = mit.id
    //       LEFT JOIN entity_investors AS ei ON ei.issuer_entity_id = ue.id
    //       where
    //       ei.id IS NULL AND
    //       ue.is_active= true AND
    //       ue.entity_id = ${entity_type_id}
    //       AND up.is_setup_done = true`
    //     );

    const [dataCount]: any[] = await sequelize.query(
      `SELECT
  count(ue.id)
FROM
  user_entities AS ue
  INNER JOIN user_profiles AS up ON ue.user_profile_id = up.id
  INNER JOIN entities AS e ON e.contact_profile_id = up.id
  INNER JOIN master_investor_types AS mit ON up.investor_type_id = mit.id
WHERE  
  ue.is_active = true
  AND ue.entity_id = ${entity_type_id}
  AND up.is_setup_done = true
  AND (SELECT COUNT(ei.id) 
       FROM entity_investors AS ei 
       WHERE ei.investor_entity_id = e.id 
       AND ei.issuer_entity_id = '${user_entity_id}') = 0;
`
    );

    return dataCount?.[0]?.count ?? 0;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getInvestorData(options: {
  offset: number;
  limit: number;
  search?: string;
  status_filters?: number[] | [];
  kyc_status_filters?: number[] | [];
  investor_type_filters?: number[] | [];
  entity_type_id: 1 | 2 | 3;
  user_entity_id?: string;
}): Promise<{
  rows: any[];
  count: number;
}> {
  try {
    const {
      offset,
      limit,
      entity_type_id,
      user_entity_id,
      search,
      status_filters,
      kyc_status_filters,
      investor_type_filters,
    } = options;

    // For Data
    const [result]: any[] = await sequelize.query(
      queries.getAllInvestorsQuery(
        offset,
        limit,
        entity_type_id,
        user_entity_id,
        search,
        status_filters,
        kyc_status_filters,
        investor_type_filters
      )
    );

    // For Count
    const [dataCount]: any[] = await sequelize.query(
      queries.getAllInvestorsCountQuery(
        entity_type_id,
        user_entity_id,
        search,
        status_filters,
        kyc_status_filters,
        investor_type_filters
      )
    );

    return {
      rows: result,
      count: dataCount?.[0]?.count ?? 0,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getAllInvestorData(options: {
  search?: string;
  status_filters?: number[] | [];
  kyc_status_filters?: number[] | [];
  investor_type_filters?: number[] | [];
  entity_type_id: 1 | 2 | 3;
  user_entity_id?: string;
}): Promise<{
  rows: any[];
}> {
  try {
    const {
      entity_type_id,
      user_entity_id,
      search,
      status_filters,
      kyc_status_filters,
      investor_type_filters,
    } = options;

    // For All Data
    const [result]: any[] = await sequelize.query(
      queries.getAllInvestorsQuery(
        null,
        null,
        entity_type_id,
        user_entity_id,
        search,
        status_filters,
        kyc_status_filters,
        investor_type_filters
      )
    );

    return {
      rows: result,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getInvestorList(options: {
  offset: number;
  limit: number;
  search?: string;
  status_filters?: number[] | [];
  country_filters?: number[] | [];
  investor_type_filters?: number[] | [];
  entity_type_id: number;
  user_entity_id?: string;
  minimum_balance?: string;
  maximum_balance?: string;
  token_id?: string;
}): Promise<{
  rows: any[];
  count: number;
}> {
  try {
    const {
      offset,
      limit,
      entity_type_id,
      user_entity_id,
      search,
      status_filters,
      country_filters,
      investor_type_filters,
      minimum_balance,
      maximum_balance,
      token_id,
    } = options;

    // For Data

    const [result]: any[] = await sequelize.query(
      await queries.getAllInvestorsListQuery(
        entity_type_id,
        offset,
        limit,
        user_entity_id,
        search,
        status_filters,
        country_filters,
        investor_type_filters,
        minimum_balance,
        maximum_balance,
        token_id
      )
    );

    // For Count
    const [dataWithoutOffsetLimit]: any[] = await sequelize.query(
      await queries.getAllInvestorsListQuery(
        entity_type_id,
        null,
        null,
        user_entity_id,
        search,
        status_filters,
        country_filters,
        investor_type_filters,
        minimum_balance,
        maximum_balance,
        token_id
      )
    );
    let token_details: any = {};
    let finalResult: any = result ?? [];

    if (token_id && token_id !== "" && result.length > 0) {
      token_details = await token_offering.findOne({
        attributes: ["symbol"],
        where: {
          id: token_id,
        },
      });

      token_details = JSON.parse(JSON.stringify(token_details));

      finalResult = await result?.map((item: any) => ({
        ...item,
        token_symbol: token_details?.symbol || null,
      }));
    }

    return {
      rows: finalResult,
      count: dataWithoutOffsetLimit?.length ?? 0,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getInvestorListAsCSV(options: {
  search?: string;
  status_filters?: number[] | [];
  country_filters?: number[] | [];
  investor_type_filters?: number[] | [];
  entity_type_id: number;
  user_entity_id?: string;
  minimum_balance?: string;
  maximum_balance?: string;
  token_id?: string;
}): Promise<{
  rows: any[];
}> {
  try {
    const {
      entity_type_id,
      user_entity_id,
      search,
      status_filters,
      country_filters,
      investor_type_filters,
      minimum_balance,
      maximum_balance,
      token_id,
    } = options;

    // For Data
    const [result]: any[] = await sequelize.query(
      await queries.getAllInvestorsListQuery(
        entity_type_id,
        null,
        null,
        user_entity_id,
        search,
        status_filters,
        country_filters,
        investor_type_filters,
        minimum_balance,
        maximum_balance,
        token_id
      )
    );
    let token_details: any = {};
    let finalResult: any = result ?? [];

    if (token_id && token_id !== "" && result.length > 0) {
      token_details = await token_offering.findOne({
        attributes: ["symbol"],
        where: {
          id: token_id,
        },
      });
      token_details = JSON.parse(JSON.stringify(token_details));

      finalResult = await result?.map((item: any) => ({
        ...item,
        token_symbol: token_details?.symbol || null,
      }));
    }

    return {
      rows: finalResult,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getInvestorDetail(id?: string): Promise<{
  result: any;
}> {
  try {
    // For Data
    const [result]: any[] = await sequelize.query(
      queries.getInvestorDetailsQuery(id)
    );

    return result && result?.length > 0 ? result?.[0] : {};
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
