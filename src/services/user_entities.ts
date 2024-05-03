import { user_entity, user_profile } from "@models";

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
