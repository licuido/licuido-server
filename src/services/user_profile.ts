import { asset, entity, master_country, user_profile } from "@models";
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

  static async getPersonInfo(id: string): Promise<any> {
    try {
      const result = await user_profile.findOne({
        where: {
          id,
        },
        attributes: ["id", "email_id", "name"],
        include: [
          {
            model: entity,
            as: "entities",
            attributes: ["id", "legal_name"],
            include: [
              {
                model: asset,
                as: "logo_asset",
                attributes: ["id", "url"],
              },
              {
                model: master_country,
                as: "country",
                attributes: ["name", "currency_code", "currency_symbol"],
              },
            ],
          },
        ],
      });
      return JSON.parse(JSON.stringify(result));
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

  static async findUser(id: string): Promise<any> {
    try {
      const result = await user_profile.findOne({
        where: {
          id,
        },
        attributes: ["id"],
      });
      return JSON.parse(JSON.stringify(result));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { UserProfile };
