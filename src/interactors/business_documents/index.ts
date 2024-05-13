import { Logger } from "@helpers";
import { Asset, BusinessDocument } from "@services";
import { createBusinessDocumentPayload } from "@types";

// create and update business details
const createBussinessDocuments = async (
  options: createBusinessDocumentPayload
) => {
  try {
    const {
      entity_id,
      business_registeration_url,
      auth_url,
      deleted_asset,
      user_profile,
      registeration_file_meta,
      authorization_file_meta,
    } = options;

    let documentPayload = [];

    if (business_registeration_url) {
      documentPayload.push({
        url: business_registeration_url,
        type: "pdf",
        asset_type: "Business registeration",
        is_active: true,
        file_meta: registeration_file_meta,
      });
    }
    if (auth_url) {
      documentPayload.push({
        url: auth_url,
        type: "pdf",
        asset_type: "Letter of authorization",
        is_active: true,
        file_meta: authorization_file_meta,
      });
    }

    if (documentPayload?.length > 0) {
      for (const document of documentPayload) {
        const assetData = await Asset.bulkInsert([
          {
            is_active: true,
            url: document?.url,
            type: document?.type,
            file_meta: document?.file_meta,
            created_by: user_profile,
          },
        ]);

        await BusinessDocument.create({
          is_active: true,
          business_id: entity_id,
          asset_type: document?.asset_type,
          created_by: user_profile,
          asset_id: assetData?.[0]?.dataValues?.id,
        });
      }
    }

    if (deleted_asset && deleted_asset?.length > 0) {
      await BusinessDocument.delete(deleted_asset);
    }

    return {
      success: true,
      message: `Business Document Uploaded Successfully`,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  createBussinessDocuments,
};
