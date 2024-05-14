import { Logger } from "@helpers";
import { UserDeviceToken } from "@services";

const create = async ({
  user_profile_id,
  user_device_token,
}: {
  user_profile_id?: string;
  user_device_token?: string;
}): Promise<object> => {
  try {
    // For Creating User Device Token
    const createData = await UserDeviceToken.create({
      user_profile_id,
      token: user_device_token,
      created_by: user_profile_id,
    });

    return {
      device_token_id: createData,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const get = async ({ device_token_id }: { device_token_id: string }) => {
  try {
    // For Getting User Device Token
    const data = await UserDeviceToken.get({
      device_token_id,
    });

    return {
      resData: data,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

const update = async ({
  device_token_id,
  user_profile_id,
}: {
  device_token_id: string;
  user_profile_id?: string;
}): Promise<boolean> => {
  try {
    // For Updating User Device Token As Inactive [For Logout user]
    await UserDeviceToken.update({
      device_token_id,
      user_profile_id,
    });

    return true;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  create,
  get,
  update,
};
