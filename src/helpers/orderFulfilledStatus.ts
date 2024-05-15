import { entity, user_profile } from "@models";

async function getOrderFulfilledStatus({
  issuer_entity_id,
}: {
  issuer_entity_id: string;
}): Promise<any> {
  try {
    // To Get the data forto check order fulfilled status
    const data: any = await entity.findOne({
      attributes: ["id"],
      where: {
        id: issuer_entity_id,
        is_active: true,
      },
      include: [
        {
          model: user_profile,
          as: "contact_profile",
          attributes: ["id", "is_fund_offered_by_licuido"],
          required: false,
        },
      ],
    });

    let entityData: any = data ? JSON.parse(JSON.stringify(data)) : null;

    return entityData?.contact_profile?.is_fund_offered_by_licuido ?? false;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export default { getOrderFulfilledStatus };
