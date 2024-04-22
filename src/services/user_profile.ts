import { user_profile } from "@models";

export async function createUserProfile({
  email_id,
  user_id,
  is_agree_terms_condition,
}: {
  email_id: string;
  user_id: number;
  is_agree_terms_condition: boolean;
}) {
  try {
    // Creating User Profile
    return await user_profile.create({
      email_id,
      user_id,
      is_active: true,
      is_agree_terms_condition,
      is_verified: false,
      is_setup_done: false,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
