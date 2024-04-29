import { ekyc } from "@models";

import { createEkyc } from "@types";

class Ekyc {
  /**
   * this function used for insert user entities.
   *
   * @param {createEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: createEkyc): Promise<any> {
    try {
      const { profile_id, captured_asset_id, is_verified } = options;
      return await ekyc.create({
        updated_by: profile_id,
        kyc_profile_id: profile_id,
        captured_asset_id,
        is_verified,
        is_active: true,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findAlreadyKycProcees(id: string): Promise<any> {
    try {
      return await ekyc.count({
        where: {
          kyc_profile_id: id,
          is_active: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export { Ekyc };
