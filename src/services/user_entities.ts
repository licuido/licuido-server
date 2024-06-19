import { user_entity, user_profile } from "@models";
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
}: {
  entity_type_id: 1 | 2 | 3;
}) {
  try {
    // Get Count of Investor for Qualification

    return await user_entity.count({
      where: {
        entity_id: entity_type_id,
        is_active: true,
      },
      include: [
        {
          model: user_profile,
          as: "user_profile",
          where: {
            is_active: true,
            is_setup_done: true, // Complete Onboarding
          },
          required: true,
        },
      ],
    });
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

    return {
      rows: result,
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

    return {
      rows: result,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
