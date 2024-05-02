import {
  entity,
  user_profile,
  master_country,
  asset,
  master_position,
  master_region,
  user_identity,
  business_document,
  customer_wallet,
  master_wallet_type,
  ekyc,
  master_ekc_status,
} from "@models";
import { createEntity, findEntity } from "@types";

class Entities {
  /**
   * this function used for insert user entities.
   *
   * @param {createEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async upsert(options: createEntity): Promise<any> {
    try {
      return await entity.upsert(options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for entity already exisit or not for that user with that role
   *
   * @param {findEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async findEntityExisit(options: findEntity): Promise<{
    count: number;
  }> {
    try {
      const { entity_type_id, contact_profile_id } = options;

      const count = await entity.count({
        where: {
          entity_type_id,
          contact_profile_id,
        },
      });

      return { count };
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for find user entity
   *
   * @param {user_profile_id:string} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async findOne(user_profile_id: string): Promise<any> {
    try {
      const data = await entity.findOne({
        where: {
          contact_profile_id: user_profile_id,
        },

        attributes: [
          "id",
          "legal_name",
          "lei_number",
          "legal_address",
          "zipcode",
        ],
        include: [
          {
            model: user_profile,
            as: "contact_profile",
            attributes: [
              "is_setup_done",
              "name",
              "mobile_no_std_code",
              "mobile_no",
              "contact_email",
            ],
            include: [
              {
                model: master_position,
                as: "position",
                attributes: ["id", "name"],
                required: false,
              },
              {
                model: user_identity,
                as: "user_identities",
                attributes: ["id"],
                required: false,
                where: {
                  is_active: true,
                },
                include: [
                  {
                    model: asset,
                    as: "asset",
                    attributes: ["id", "url"],
                    required: false,
                  },
                ],
              },
              {
                model: ekyc,
                as: "kyc_profile_ekycs",
                attributes: ["id", "status_id"],
                required: false,
                where: {
                  is_active: true,
                },
                include: [
                  {
                    model: asset,
                    as: "captured_asset",
                    attributes: ["id", "url"],
                    required: false,
                  },
                  {
                    model: master_ekc_status,
                    as: "status",
                    attributes: ["id", "name"],
                    required: false,
                  },
                ],
              },
            ],
          },
          {
            model: master_country,
            as: "country",
            attributes: ["id", "name"],
            required: false,
          },
          {
            model: asset,
            as: "logo_asset",
            attributes: ["id", "url"],
            required: false,
          },
          {
            model: master_region,
            as: "region",
            attributes: ["id", "name"],
            required: false,
          },
          {
            model: business_document,
            as: "business_documents",
            attributes: ["id", "asset_type"],
            required: false,
            where: {
              is_active: true,
            },
            include: [
              {
                model: asset,
                as: "asset",
                attributes: ["id", "url"],
                required: false,
              },
            ],
          },
          {
            model: customer_wallet,
            as: "customer_wallets",
            attributes: ["id", "wallet_address", "is_authenticated"],
            required: false,
            include: [
              {
                model: master_wallet_type,
                as: "wallet_type",
                attributes: ["id", "name"],
                required: false,
              },
            ],
          },
        ],
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async findEntity(options: findEntity): Promise<any> {
    try {
      const { entity_type_id, contact_profile_id } = options;

      return await entity.findOne({
        where: {
          entity_type_id,
          contact_profile_id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export { Entities };
