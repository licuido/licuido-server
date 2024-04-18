import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { asset, assetId } from './asset';
import type { customer_wallet, customer_walletId } from './customer_wallet';
import type { entity_investor, entity_investorId } from './entity_investor';
import type { master_country, master_countryId } from './master_country';
import type { token_order, token_orderId } from './token_order';
import type { user_profile, user_profileId } from './user_profile';

export interface individual_investorAttributes {
  id: string;
  contact_profile_id?: string;
  investor_pic_id?: string;
  legal_address?: string;
  zipcode?: string;
  country_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type individual_investorPk = "id";
export type individual_investorId = individual_investor[individual_investorPk];
export type individual_investorOptionalAttributes = "id" | "contact_profile_id" | "investor_pic_id" | "legal_address" | "zipcode" | "country_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type individual_investorCreationAttributes = Optional<individual_investorAttributes, individual_investorOptionalAttributes>;

export class individual_investor extends Model<individual_investorAttributes, individual_investorCreationAttributes> implements individual_investorAttributes {
  id!: string;
  contact_profile_id?: string;
  investor_pic_id?: string;
  legal_address?: string;
  zipcode?: string;
  country_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // individual_investor belongsTo asset via investor_pic_id
  investor_pic!: asset;
  getInvestor_pic!: Sequelize.BelongsToGetAssociationMixin<asset>;
  setInvestor_pic!: Sequelize.BelongsToSetAssociationMixin<asset, assetId>;
  createInvestor_pic!: Sequelize.BelongsToCreateAssociationMixin<asset>;
  // individual_investor hasMany customer_wallet via individual_investor_id
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
  // individual_investor hasMany entity_investor via individual_investor_id
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
  // individual_investor hasMany token_order via individual_receiving_investor_id
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
  // individual_investor belongsTo master_country via country_id
  country!: master_country;
  getCountry!: Sequelize.BelongsToGetAssociationMixin<master_country>;
  setCountry!: Sequelize.BelongsToSetAssociationMixin<master_country, master_countryId>;
  createCountry!: Sequelize.BelongsToCreateAssociationMixin<master_country>;
  // individual_investor belongsTo user_profile via contact_profile_id
  contact_profile!: user_profile;
  getContact_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setContact_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createContact_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // individual_investor belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // individual_investor belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof individual_investor {
    return individual_investor.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    contact_profile_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user_profiles',
        key: 'id'
      }
    },
    investor_pic_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'assets',
        key: 'id'
      }
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
    tableName: 'individual_investors',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "individual_investors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
