import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { business_document, business_documentId } from './business_document';
import type { ekyc, ekycId } from './ekyc';
import type { entity, entityId } from './entity';
import type { individual_investor, individual_investorId } from './individual_investor';
import type { token_offering_document, token_offering_documentId } from './token_offering_document';
import type { token_offering_team, token_offering_teamId } from './token_offering_team';
import type { token_offering, token_offeringId } from './token_offering';
import type { user_identity, user_identityId } from './user_identity';
import type { user_profile, user_profileId } from './user_profile';

export interface assetAttributes {
  id: string;
  type?: string;
  url?: string;
  order?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type assetPk = "id";
export type assetId = asset[assetPk];
export type assetOptionalAttributes = "id" | "type" | "url" | "order" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type assetCreationAttributes = Optional<assetAttributes, assetOptionalAttributes>;

export class asset extends Model<assetAttributes, assetCreationAttributes> implements assetAttributes {
  id!: string;
  type?: string;
  url?: string;
  order?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // asset hasMany business_document via asset_id
  business_documents!: business_document[];
  getBusiness_documents!: Sequelize.HasManyGetAssociationsMixin<business_document>;
  setBusiness_documents!: Sequelize.HasManySetAssociationsMixin<business_document, business_documentId>;
  addBusiness_document!: Sequelize.HasManyAddAssociationMixin<business_document, business_documentId>;
  addBusiness_documents!: Sequelize.HasManyAddAssociationsMixin<business_document, business_documentId>;
  createBusiness_document!: Sequelize.HasManyCreateAssociationMixin<business_document>;
  removeBusiness_document!: Sequelize.HasManyRemoveAssociationMixin<business_document, business_documentId>;
  removeBusiness_documents!: Sequelize.HasManyRemoveAssociationsMixin<business_document, business_documentId>;
  hasBusiness_document!: Sequelize.HasManyHasAssociationMixin<business_document, business_documentId>;
  hasBusiness_documents!: Sequelize.HasManyHasAssociationsMixin<business_document, business_documentId>;
  countBusiness_documents!: Sequelize.HasManyCountAssociationsMixin;
  // asset hasMany ekyc via captured_asset_id
  ekycs!: ekyc[];
  getEkycs!: Sequelize.HasManyGetAssociationsMixin<ekyc>;
  setEkycs!: Sequelize.HasManySetAssociationsMixin<ekyc, ekycId>;
  addEkyc!: Sequelize.HasManyAddAssociationMixin<ekyc, ekycId>;
  addEkycs!: Sequelize.HasManyAddAssociationsMixin<ekyc, ekycId>;
  createEkyc!: Sequelize.HasManyCreateAssociationMixin<ekyc>;
  removeEkyc!: Sequelize.HasManyRemoveAssociationMixin<ekyc, ekycId>;
  removeEkycs!: Sequelize.HasManyRemoveAssociationsMixin<ekyc, ekycId>;
  hasEkyc!: Sequelize.HasManyHasAssociationMixin<ekyc, ekycId>;
  hasEkycs!: Sequelize.HasManyHasAssociationsMixin<ekyc, ekycId>;
  countEkycs!: Sequelize.HasManyCountAssociationsMixin;
  // asset hasMany entity via logo_asset_id
  entities!: entity[];
  getEntities!: Sequelize.HasManyGetAssociationsMixin<entity>;
  setEntities!: Sequelize.HasManySetAssociationsMixin<entity, entityId>;
  addEntity!: Sequelize.HasManyAddAssociationMixin<entity, entityId>;
  addEntities!: Sequelize.HasManyAddAssociationsMixin<entity, entityId>;
  createEntity!: Sequelize.HasManyCreateAssociationMixin<entity>;
  removeEntity!: Sequelize.HasManyRemoveAssociationMixin<entity, entityId>;
  removeEntities!: Sequelize.HasManyRemoveAssociationsMixin<entity, entityId>;
  hasEntity!: Sequelize.HasManyHasAssociationMixin<entity, entityId>;
  hasEntities!: Sequelize.HasManyHasAssociationsMixin<entity, entityId>;
  countEntities!: Sequelize.HasManyCountAssociationsMixin;
  // asset hasMany individual_investor via investor_pic_id
  individual_investors!: individual_investor[];
  getIndividual_investors!: Sequelize.HasManyGetAssociationsMixin<individual_investor>;
  setIndividual_investors!: Sequelize.HasManySetAssociationsMixin<individual_investor, individual_investorId>;
  addIndividual_investor!: Sequelize.HasManyAddAssociationMixin<individual_investor, individual_investorId>;
  addIndividual_investors!: Sequelize.HasManyAddAssociationsMixin<individual_investor, individual_investorId>;
  createIndividual_investor!: Sequelize.HasManyCreateAssociationMixin<individual_investor>;
  removeIndividual_investor!: Sequelize.HasManyRemoveAssociationMixin<individual_investor, individual_investorId>;
  removeIndividual_investors!: Sequelize.HasManyRemoveAssociationsMixin<individual_investor, individual_investorId>;
  hasIndividual_investor!: Sequelize.HasManyHasAssociationMixin<individual_investor, individual_investorId>;
  hasIndividual_investors!: Sequelize.HasManyHasAssociationsMixin<individual_investor, individual_investorId>;
  countIndividual_investors!: Sequelize.HasManyCountAssociationsMixin;
  // asset hasMany token_offering_document via document_id
  token_offering_documents!: token_offering_document[];
  getToken_offering_documents!: Sequelize.HasManyGetAssociationsMixin<token_offering_document>;
  setToken_offering_documents!: Sequelize.HasManySetAssociationsMixin<token_offering_document, token_offering_documentId>;
  addToken_offering_document!: Sequelize.HasManyAddAssociationMixin<token_offering_document, token_offering_documentId>;
  addToken_offering_documents!: Sequelize.HasManyAddAssociationsMixin<token_offering_document, token_offering_documentId>;
  createToken_offering_document!: Sequelize.HasManyCreateAssociationMixin<token_offering_document>;
  removeToken_offering_document!: Sequelize.HasManyRemoveAssociationMixin<token_offering_document, token_offering_documentId>;
  removeToken_offering_documents!: Sequelize.HasManyRemoveAssociationsMixin<token_offering_document, token_offering_documentId>;
  hasToken_offering_document!: Sequelize.HasManyHasAssociationMixin<token_offering_document, token_offering_documentId>;
  hasToken_offering_documents!: Sequelize.HasManyHasAssociationsMixin<token_offering_document, token_offering_documentId>;
  countToken_offering_documents!: Sequelize.HasManyCountAssociationsMixin;
  // asset hasMany token_offering_team via member_picture_id
  token_offering_teams!: token_offering_team[];
  getToken_offering_teams!: Sequelize.HasManyGetAssociationsMixin<token_offering_team>;
  setToken_offering_teams!: Sequelize.HasManySetAssociationsMixin<token_offering_team, token_offering_teamId>;
  addToken_offering_team!: Sequelize.HasManyAddAssociationMixin<token_offering_team, token_offering_teamId>;
  addToken_offering_teams!: Sequelize.HasManyAddAssociationsMixin<token_offering_team, token_offering_teamId>;
  createToken_offering_team!: Sequelize.HasManyCreateAssociationMixin<token_offering_team>;
  removeToken_offering_team!: Sequelize.HasManyRemoveAssociationMixin<token_offering_team, token_offering_teamId>;
  removeToken_offering_teams!: Sequelize.HasManyRemoveAssociationsMixin<token_offering_team, token_offering_teamId>;
  hasToken_offering_team!: Sequelize.HasManyHasAssociationMixin<token_offering_team, token_offering_teamId>;
  hasToken_offering_teams!: Sequelize.HasManyHasAssociationsMixin<token_offering_team, token_offering_teamId>;
  countToken_offering_teams!: Sequelize.HasManyCountAssociationsMixin;
  // asset hasMany token_offering via banner_asset_id
  token_offerings!: token_offering[];
  getToken_offerings!: Sequelize.HasManyGetAssociationsMixin<token_offering>;
  setToken_offerings!: Sequelize.HasManySetAssociationsMixin<token_offering, token_offeringId>;
  addToken_offering!: Sequelize.HasManyAddAssociationMixin<token_offering, token_offeringId>;
  addToken_offerings!: Sequelize.HasManyAddAssociationsMixin<token_offering, token_offeringId>;
  createToken_offering!: Sequelize.HasManyCreateAssociationMixin<token_offering>;
  removeToken_offering!: Sequelize.HasManyRemoveAssociationMixin<token_offering, token_offeringId>;
  removeToken_offerings!: Sequelize.HasManyRemoveAssociationsMixin<token_offering, token_offeringId>;
  hasToken_offering!: Sequelize.HasManyHasAssociationMixin<token_offering, token_offeringId>;
  hasToken_offerings!: Sequelize.HasManyHasAssociationsMixin<token_offering, token_offeringId>;
  countToken_offerings!: Sequelize.HasManyCountAssociationsMixin;
  // asset hasMany token_offering via logo_asset_id
  logo_asset_token_offerings!: token_offering[];
  getLogo_asset_token_offerings!: Sequelize.HasManyGetAssociationsMixin<token_offering>;
  setLogo_asset_token_offerings!: Sequelize.HasManySetAssociationsMixin<token_offering, token_offeringId>;
  addLogo_asset_token_offering!: Sequelize.HasManyAddAssociationMixin<token_offering, token_offeringId>;
  addLogo_asset_token_offerings!: Sequelize.HasManyAddAssociationsMixin<token_offering, token_offeringId>;
  createLogo_asset_token_offering!: Sequelize.HasManyCreateAssociationMixin<token_offering>;
  removeLogo_asset_token_offering!: Sequelize.HasManyRemoveAssociationMixin<token_offering, token_offeringId>;
  removeLogo_asset_token_offerings!: Sequelize.HasManyRemoveAssociationsMixin<token_offering, token_offeringId>;
  hasLogo_asset_token_offering!: Sequelize.HasManyHasAssociationMixin<token_offering, token_offeringId>;
  hasLogo_asset_token_offerings!: Sequelize.HasManyHasAssociationsMixin<token_offering, token_offeringId>;
  countLogo_asset_token_offerings!: Sequelize.HasManyCountAssociationsMixin;
  // asset hasMany user_identity via asset_id
  user_identities!: user_identity[];
  getUser_identities!: Sequelize.HasManyGetAssociationsMixin<user_identity>;
  setUser_identities!: Sequelize.HasManySetAssociationsMixin<user_identity, user_identityId>;
  addUser_identity!: Sequelize.HasManyAddAssociationMixin<user_identity, user_identityId>;
  addUser_identities!: Sequelize.HasManyAddAssociationsMixin<user_identity, user_identityId>;
  createUser_identity!: Sequelize.HasManyCreateAssociationMixin<user_identity>;
  removeUser_identity!: Sequelize.HasManyRemoveAssociationMixin<user_identity, user_identityId>;
  removeUser_identities!: Sequelize.HasManyRemoveAssociationsMixin<user_identity, user_identityId>;
  hasUser_identity!: Sequelize.HasManyHasAssociationMixin<user_identity, user_identityId>;
  hasUser_identities!: Sequelize.HasManyHasAssociationsMixin<user_identity, user_identityId>;
  countUser_identities!: Sequelize.HasManyCountAssociationsMixin;
  // asset belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // asset belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof asset {
    return asset.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
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
    tableName: 'assets',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "assets_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
