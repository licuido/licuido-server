import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { asset, assetId } from './asset';
import type { user_profile, user_profileId } from './user_profile';

export interface user_identityAttributes {
  id: string;
  asset_id?: string;
  alias?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type user_identityPk = "id";
export type user_identityId = user_identity[user_identityPk];
export type user_identityOptionalAttributes = "id" | "asset_id" | "alias" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type user_identityCreationAttributes = Optional<user_identityAttributes, user_identityOptionalAttributes>;

export class user_identity extends Model<user_identityAttributes, user_identityCreationAttributes> implements user_identityAttributes {
  id!: string;
  asset_id?: string;
  alias?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // user_identity belongsTo asset via asset_id
  asset!: asset;
  getAsset!: Sequelize.BelongsToGetAssociationMixin<asset>;
  setAsset!: Sequelize.BelongsToSetAssociationMixin<asset, assetId>;
  createAsset!: Sequelize.BelongsToCreateAssociationMixin<asset>;
  // user_identity belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // user_identity belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_identity {
    return user_identity.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    asset_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'assets',
        key: 'id'
      }
    },
    alias: {
      type: DataTypes.TEXT,
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
    tableName: 'user_identities',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "user_identities_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
