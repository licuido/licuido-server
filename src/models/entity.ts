import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { asset, assetId } from './asset';
import type { business_document, business_documentId } from './business_document';
import type { customer_wallet, customer_walletId } from './customer_wallet';
import type { entity_investor, entity_investorId } from './entity_investor';
import type { master_business_sector, master_business_sectorId } from './master_business_sector';
import type { master_country, master_countryId } from './master_country';
import type { master_entity_type, master_entity_typeId } from './master_entity_type';
import type { master_region, master_regionId } from './master_region';
import type { token_offering, token_offeringId } from './token_offering';
import type { token_order, token_orderId } from './token_order';
import type { user_profile, user_profileId } from './user_profile';

export interface entityAttributes {
  id: string;
  entity_type_id?: number;
  legal_name?: string;
  lei_number?: string;
  legal_address?: string;
  zipcode?: string;
  country_id?: number;
  logo_asset_id?: string;
  business_sector_id?: number;
  contact_profile_id?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
  region_id?: number;
  is_fund_offered_by_licuido?: boolean;
}

export type entityPk = "id";
export type entityId = entity[entityPk];
export type entityOptionalAttributes = "id" | "entity_type_id" | "legal_name" | "lei_number" | "legal_address" | "zipcode" | "country_id" | "logo_asset_id" | "business_sector_id" | "contact_profile_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at" | "region_id" | "is_fund_offered_by_licuido";
export type entityCreationAttributes = Optional<entityAttributes, entityOptionalAttributes>;

export class entity extends Model<entityAttributes, entityCreationAttributes> implements entityAttributes {
  id!: string;
  entity_type_id?: number;
  legal_name?: string;
  lei_number?: string;
  legal_address?: string;
  zipcode?: string;
  country_id?: number;
  logo_asset_id?: string;
  business_sector_id?: number;
  contact_profile_id?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
  region_id?: number;
  is_fund_offered_by_licuido?: boolean;

  // entity belongsTo asset via logo_asset_id
  logo_asset!: asset;
  getLogo_asset!: Sequelize.BelongsToGetAssociationMixin<asset>;
  setLogo_asset!: Sequelize.BelongsToSetAssociationMixin<asset, assetId>;
  createLogo_asset!: Sequelize.BelongsToCreateAssociationMixin<asset>;
  // entity hasMany business_document via business_id
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
  // entity hasMany customer_wallet via investor_entity_id
  customer_wallets!: customer_wallet[];
  getCustomer_wallets!: Sequelize.HasManyGetAssociationsMixin<customer_wallet>;
  setCustomer_wallets!: Sequelize.HasManySetAssociationsMixin<customer_wallet, customer_walletId>;
  addCustomer_wallet!: Sequelize.HasManyAddAssociationMixin<customer_wallet, customer_walletId>;
  addCustomer_wallets!: Sequelize.HasManyAddAssociationsMixin<customer_wallet, customer_walletId>;
  createCustomer_wallet!: Sequelize.HasManyCreateAssociationMixin<customer_wallet>;
  removeCustomer_wallet!: Sequelize.HasManyRemoveAssociationMixin<customer_wallet, customer_walletId>;
  removeCustomer_wallets!: Sequelize.HasManyRemoveAssociationsMixin<customer_wallet, customer_walletId>;
  hasCustomer_wallet!: Sequelize.HasManyHasAssociationMixin<customer_wallet, customer_walletId>;
  hasCustomer_wallets!: Sequelize.HasManyHasAssociationsMixin<customer_wallet, customer_walletId>;
  countCustomer_wallets!: Sequelize.HasManyCountAssociationsMixin;
  // entity hasMany entity_investor via investor_entity_id
  entity_investors!: entity_investor[];
  getEntity_investors!: Sequelize.HasManyGetAssociationsMixin<entity_investor>;
  setEntity_investors!: Sequelize.HasManySetAssociationsMixin<entity_investor, entity_investorId>;
  addEntity_investor!: Sequelize.HasManyAddAssociationMixin<entity_investor, entity_investorId>;
  addEntity_investors!: Sequelize.HasManyAddAssociationsMixin<entity_investor, entity_investorId>;
  createEntity_investor!: Sequelize.HasManyCreateAssociationMixin<entity_investor>;
  removeEntity_investor!: Sequelize.HasManyRemoveAssociationMixin<entity_investor, entity_investorId>;
  removeEntity_investors!: Sequelize.HasManyRemoveAssociationsMixin<entity_investor, entity_investorId>;
  hasEntity_investor!: Sequelize.HasManyHasAssociationMixin<entity_investor, entity_investorId>;
  hasEntity_investors!: Sequelize.HasManyHasAssociationsMixin<entity_investor, entity_investorId>;
  countEntity_investors!: Sequelize.HasManyCountAssociationsMixin;
  // entity hasMany token_offering via issuer_entity_id
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
  // entity hasMany token_order via issuer_entity_id
  token_orders!: token_order[];
  getToken_orders!: Sequelize.HasManyGetAssociationsMixin<token_order>;
  setToken_orders!: Sequelize.HasManySetAssociationsMixin<token_order, token_orderId>;
  addToken_order!: Sequelize.HasManyAddAssociationMixin<token_order, token_orderId>;
  addToken_orders!: Sequelize.HasManyAddAssociationsMixin<token_order, token_orderId>;
  createToken_order!: Sequelize.HasManyCreateAssociationMixin<token_order>;
  removeToken_order!: Sequelize.HasManyRemoveAssociationMixin<token_order, token_orderId>;
  removeToken_orders!: Sequelize.HasManyRemoveAssociationsMixin<token_order, token_orderId>;
  hasToken_order!: Sequelize.HasManyHasAssociationMixin<token_order, token_orderId>;
  hasToken_orders!: Sequelize.HasManyHasAssociationsMixin<token_order, token_orderId>;
  countToken_orders!: Sequelize.HasManyCountAssociationsMixin;
  // entity hasMany token_order via receiver_entity_id
  receiver_entity_token_orders!: token_order[];
  getReceiver_entity_token_orders!: Sequelize.HasManyGetAssociationsMixin<token_order>;
  setReceiver_entity_token_orders!: Sequelize.HasManySetAssociationsMixin<token_order, token_orderId>;
  addReceiver_entity_token_order!: Sequelize.HasManyAddAssociationMixin<token_order, token_orderId>;
  addReceiver_entity_token_orders!: Sequelize.HasManyAddAssociationsMixin<token_order, token_orderId>;
  createReceiver_entity_token_order!: Sequelize.HasManyCreateAssociationMixin<token_order>;
  removeReceiver_entity_token_order!: Sequelize.HasManyRemoveAssociationMixin<token_order, token_orderId>;
  removeReceiver_entity_token_orders!: Sequelize.HasManyRemoveAssociationsMixin<token_order, token_orderId>;
  hasReceiver_entity_token_order!: Sequelize.HasManyHasAssociationMixin<token_order, token_orderId>;
  hasReceiver_entity_token_orders!: Sequelize.HasManyHasAssociationsMixin<token_order, token_orderId>;
  countReceiver_entity_token_orders!: Sequelize.HasManyCountAssociationsMixin;
  // entity belongsTo master_business_sector via business_sector_id
  business_sector!: master_business_sector;
  getBusiness_sector!: Sequelize.BelongsToGetAssociationMixin<master_business_sector>;
  setBusiness_sector!: Sequelize.BelongsToSetAssociationMixin<master_business_sector, master_business_sectorId>;
  createBusiness_sector!: Sequelize.BelongsToCreateAssociationMixin<master_business_sector>;
  // entity belongsTo master_country via country_id
  country!: master_country;
  getCountry!: Sequelize.BelongsToGetAssociationMixin<master_country>;
  setCountry!: Sequelize.BelongsToSetAssociationMixin<master_country, master_countryId>;
  createCountry!: Sequelize.BelongsToCreateAssociationMixin<master_country>;
  // entity belongsTo master_entity_type via entity_type_id
  entity_type!: master_entity_type;
  getEntity_type!: Sequelize.BelongsToGetAssociationMixin<master_entity_type>;
  setEntity_type!: Sequelize.BelongsToSetAssociationMixin<master_entity_type, master_entity_typeId>;
  createEntity_type!: Sequelize.BelongsToCreateAssociationMixin<master_entity_type>;
  // entity belongsTo master_region via region_id
  region!: master_region;
  getRegion!: Sequelize.BelongsToGetAssociationMixin<master_region>;
  setRegion!: Sequelize.BelongsToSetAssociationMixin<master_region, master_regionId>;
  createRegion!: Sequelize.BelongsToCreateAssociationMixin<master_region>;
  // entity belongsTo user_profile via contact_profile_id
  contact_profile!: user_profile;
  getContact_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setContact_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createContact_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // entity belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // entity belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof entity {
    return entity.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    entity_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_entity_types',
        key: 'id'
      }
    },
    legal_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lei_number: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    legal_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    zipcode: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_countries',
        key: 'id'
      }
    },
    logo_asset_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'assets',
        key: 'id'
      }
    },
    business_sector_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_business_sectors',
        key: 'id'
      }
    },
    contact_profile_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user_profiles',
        key: 'id'
      }
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
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_regions',
        key: 'id'
      }
    },
    is_fund_offered_by_licuido: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'entities',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "entities_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
