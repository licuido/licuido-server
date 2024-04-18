import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { asset, assetId } from './asset';
import type { entity, entityId } from './entity';
import type { user_profile, user_profileId } from './user_profile';

export interface business_documentAttributes {
  id: string;
  business_id?: string;
  asset_id?: string;
  asset_type?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type business_documentPk = "id";
export type business_documentId = business_document[business_documentPk];
export type business_documentOptionalAttributes = "id" | "business_id" | "asset_id" | "asset_type" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type business_documentCreationAttributes = Optional<business_documentAttributes, business_documentOptionalAttributes>;

export class business_document extends Model<business_documentAttributes, business_documentCreationAttributes> implements business_documentAttributes {
  id!: string;
  business_id?: string;
  asset_id?: string;
  asset_type?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // business_document belongsTo asset via asset_id
  asset!: asset;
  getAsset!: Sequelize.BelongsToGetAssociationMixin<asset>;
  setAsset!: Sequelize.BelongsToSetAssociationMixin<asset, assetId>;
  createAsset!: Sequelize.BelongsToCreateAssociationMixin<asset>;
  // business_document belongsTo entity via business_id
  business!: entity;
  getBusiness!: Sequelize.BelongsToGetAssociationMixin<entity>;
  setBusiness!: Sequelize.BelongsToSetAssociationMixin<entity, entityId>;
  createBusiness!: Sequelize.BelongsToCreateAssociationMixin<entity>;
  // business_document belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // business_document belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof business_document {
    return business_document.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    business_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    asset_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'assets',
        key: 'id'
      }
    },
    asset_type: {
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
    tableName: 'business_documents',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "business_documents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
