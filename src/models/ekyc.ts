import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { asset, assetId } from './asset';
import type { user_profile, user_profileId } from './user_profile';

export interface ekycAttributes {
  id: string;
  kyc_profile_id?: string;
  captured_asset_id?: string;
  is_processed?: boolean;
  is_verified?: boolean;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type ekycPk = "id";
export type ekycId = ekyc[ekycPk];
export type ekycOptionalAttributes = "id" | "kyc_profile_id" | "captured_asset_id" | "is_processed" | "is_verified" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type ekycCreationAttributes = Optional<ekycAttributes, ekycOptionalAttributes>;

export class ekyc extends Model<ekycAttributes, ekycCreationAttributes> implements ekycAttributes {
  id!: string;
  kyc_profile_id?: string;
  captured_asset_id?: string;
  is_processed?: boolean;
  is_verified?: boolean;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // ekyc belongsTo asset via captured_asset_id
  captured_asset!: asset;
  getCaptured_asset!: Sequelize.BelongsToGetAssociationMixin<asset>;
  setCaptured_asset!: Sequelize.BelongsToSetAssociationMixin<asset, assetId>;
  createCaptured_asset!: Sequelize.BelongsToCreateAssociationMixin<asset>;
  // ekyc belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // ekyc belongsTo user_profile via kyc_profile_id
  kyc_profile!: user_profile;
  getKyc_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setKyc_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createKyc_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // ekyc belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ekyc {
    return ekyc.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    kyc_profile_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user_profiles',
        key: 'id'
      }
    },
    captured_asset_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'assets',
        key: 'id'
      }
    },
    is_processed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user_profiles',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user_profiles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ekyc',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "ekyc_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
