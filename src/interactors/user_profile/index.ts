import { Logger } from "@helpers";
import { UserProfile, Asset, UserIdentities } from "@services";
import { createAsset, createPersonInfo } from "@types";

// create and update person info details
const createPersonInfoDetails = async (options: createPersonInfo) => {
  try {
    const { identity, deletedIdentity,id } = options;
    await UserProfile.upsertPersonInfo({
      ...options,
      email_id: undefined,
    });

    if (identity && identity?.length > 0) {
      const insertData: any = identity?.map((val: createAsset) => {
        return {
          ...val,
          is_active: true,
          created_by:id,
        };
      });

      const assetData = await Asset.bulkInsert(insertData);

       let userIdentities=assetData?.map((val:any)=>{
         return{
            asset_id:val?.dataValues?.id,
            created_by:id,
            is_active:true
         }
       })

      await UserIdentities.createBulkIdentity(userIdentities);
       
      
    }

    if (deletedIdentity && deletedIdentity?.length > 0) {
      await UserIdentities.deleteIdentity(deletedIdentity);
    }

    return {
      success: true,
      message: `Person Info Updated`,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};


// after set up last step 
const setupUserAccount = async (id:string) => {
  try {
    
    await UserProfile.upsertPersonInfo({
      id,
      is_agree_terms_condition:true,
      is_setup_done:true
    });

 
   return {
      success: true,
      message: `Your Account Updated`,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};
export default {
  createPersonInfoDetails,
  setupUserAccount
};
