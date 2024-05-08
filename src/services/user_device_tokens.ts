import { user_device_token } from "@models";
import { createUserDeviceToken } from "@types";

class UserDeviceToken {
  /**
   * A description of the entire function.
   *
   * @param {createUserDeviceToken} options - description of options parameter
   * @return {Promise<any>} description of the return value
   */
  static async create(options: createUserDeviceToken): Promise<any> {
    try {
      const deviceToken = await user_device_token.create(options, {
        raw: false,
        returning: true,
      });

      let deviceTokenData: any = deviceToken
        ? JSON.parse(JSON.stringify(deviceToken))
        : null;

      return deviceTokenData?.id;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the device token details based on the provided device token ID.
   *
   * @param {Object} options - The options object.
   * @param {string} options.device_token_id - The ID of the device token.
   * @return {Promise<any>} The device token details.
   */

  static async get({
    device_token_id,
  }: {
    device_token_id: string;
  }): Promise<any> {
    try {
      // Get Device Token Details
      const deviceToken = await user_device_token.findOne({
        where: {
          id: device_token_id,
          is_active: true,
        },
        attributes: [["id", "device_token_id"], "user_profile_id", "token"],
      });

      let deviceTokenData: any = deviceToken
        ? JSON.parse(JSON.stringify(deviceToken))
        : null;

      return deviceTokenData;
    } catch (error) {
      throw error;
    }
  }

  static async update({
    device_token_id,
    user_profile_id,
  }: {
    device_token_id: string;
    user_profile_id?: string;
  }): Promise<any> {
    try {
      // Update Device Token As Inactive
      await user_device_token.update(
        { is_active: false, updated_by: user_profile_id },
        {
          where: {
            id: device_token_id,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

export { UserDeviceToken };
