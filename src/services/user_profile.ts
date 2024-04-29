import { user_profile } from "@models";
import { createPersonInfo } from "@types";




class UserProfile {
  /**
   * this function used for insert user entities.
   *
   * @param {createEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async upsertPersonInfo(options: createPersonInfo): Promise<any> {
    try {
        return await user_profile.upsert(options);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async createUserProfile({
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

}

export { UserProfile };
