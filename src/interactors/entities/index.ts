import { Logger } from "@helpers";
import { Asset, Entities } from "@services";
import { createEntity } from "@types";

// create and update business details
const createBussinessDetails = async (options: createEntity) => {
  try {

    const {entity_type_id,contact_profile_id,id,logo,logo_type} = options;

    const {count} = await Entities.findEntityExisit({entity_type_id,contact_profile_id});

    if(count !== 0 && !id){
        return{
            success:true,
            message:"You Already have a Bussiness Detail. if you want to Edit please provide user"
        }
    }

    let asset_id;

    if(logo){
      const asset = await Asset.upsert({
        type:logo_type,
        url:logo,
        is_active:true
      })
      asset_id=asset?.[0]?.dataValues?.id
    }


   const data = await Entities.upsert({
      ...options,
      logo_asset_id:asset_id,
      logo:undefined,
    });

    return{
        success:true,
        message:`Business Detail Successfully ${id? "Updated":"Created"}`,
        data:{
          entity_id:data?.[0]?.dataValues?.id
        }
    }

  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};


// find entitity
const findEntity = async (user_profile_id: string) => {
  try {

   
   const data = await Entities.findOne(user_profile_id);

    return{
        success:true,
        message:`Business Detail Successfully`,
        data
    }

  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
    createBussinessDetails,
    findEntity
};
