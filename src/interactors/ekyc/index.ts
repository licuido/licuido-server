import { Logger } from "@helpers";
import { Asset, Ekyc } from "@services";
import { createEkyc } from "@types";

// create and update business details
const createKyc = async (options: createEkyc) => {
  try {
    const { profile_id, captured_url, is_verified } = options;

    const count = await Ekyc.findAlreadyKycProcees(profile_id);
    if (count !== 0) {
      return {
        success: false,
        message: "You Already Have a Ekyc",
      };
    }

    if (!captured_url) {
      return {
        success: true,
        message: "Please Provide Captured Url",
      };
    }

    let asset_id;

    if (captured_url) {
      const asset = await Asset.upsert({
        type: "jpeg",
        url: captured_url,
        is_active: true,
      });
      asset_id = asset?.[0]?.dataValues?.id;

      await Ekyc.create({
        profile_id,
        captured_url,
        is_verified,
        captured_asset_id: asset_id,
      });
    }

    return {
      success: true,
      message: `Ekyc Details were updated`,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  createKyc,
};
