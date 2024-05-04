import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { asset, assetId } from './asset';
import type { entity, entityId } from './entity';
import type { master_blockchain_network, master_blockchain_networkId } from './master_blockchain_network';
import type { master_country, master_countryId } from './master_country';
import type { master_token_offering_status, master_token_offering_statusId } from './master_token_offering_status';
import type { master_token_status, master_token_statusId } from './master_token_status';
import type { master_token_type, master_token_typeId } from './master_token_type';
import type { token_offering_allowed_country, token_offering_allowed_countryId } from './token_offering_allowed_country';
import type { token_offering_allowed_currency, token_offering_allowed_currencyId } from './token_offering_allowed_currency';
import type { token_offering_document, token_offering_documentId } from './token_offering_document';
import type { token_offering_team, token_offering_teamId } from './token_offering_team';
import type { token_order, token_orderId } from './token_order';
import type { user_profile, user_profileId } from './user_profile';
import type { wallet_token, wallet_tokenId } from './wallet_token';

export interface token_offeringAttributes {
  id: string;
  issuer_entity_id?: string;
  name?: string;
  description?: string;
  isin_number?: string;
  symbol?: string;
  token_type_id?: number;
  base_currency?: string;
  base_currency_code?: string;
  blockchain_network?: number;
  logo_asset_id?: string;
  banner_asset_id?: string;
  offering_price?: number;
  jurisdiction?: number;
  start_date?: string;
  end_date?: string;
  minimum_investment_limit?: number;
  maximum_investment_limit?: number;
  bank_name?: string;
  bank_account_name?: string;
  swift_bic_no?: string;
  iban_no?: string;
  is_fund_rating_enabled?: boolean;
  is_projected_rate_of_return_enabled?: boolean;
  is_expected_annual_perc_yield_enabled?: boolean;
  is_all_countries_allowed?: boolean;
  is_payback_period_enabled?: boolean;
  is_eligible_for_collateral_enabled?: boolean;
  offer_status_id?: number;
  status_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type token_offeringPk = "id";
export type token_offeringId = token_offering[token_offeringPk];
export type token_offeringOptionalAttributes = "id" | "issuer_entity_id" | "name" | "description" | "isin_number" | "symbol" | "token_type_id" | "base_currency" | "base_currency_code" | "blockchain_network" | "logo_asset_id" | "banner_asset_id" | "offering_price" | "jurisdiction" | "start_date" | "end_date" | "minimum_investment_limit" | "maximum_investment_limit" | "bank_name" | "bank_account_name" | "swift_bic_no" | "iban_no" | "is_fund_rating_enabled" | "is_projected_rate_of_return_enabled" | "is_expected_annual_perc_yield_enabled" | "is_all_countries_allowed" | "is_payback_period_enabled" | "is_eligible_for_collateral_enabled" | "offer_status_id" | "status_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type token_offeringCreationAttributes = Optional<token_offeringAttributes, token_offeringOptionalAttributes>;

export class token_offering extends Model<token_offeringAttributes, token_offeringCreationAttributes> implements token_offeringAttributes {
  id!: string;
  issuer_entity_id?: string;
  name?: string;
  description?: string;
  isin_number?: string;
  symbol?: string;
  token_type_id?: number;
  base_currency?: string;
  base_currency_code?: string;
  blockchain_network?: number;
  logo_asset_id?: string;
  banner_asset_id?: string;
  offering_price?: number;
  jurisdiction?: number;
  start_date?: string;
  end_date?: string;
  minimum_investment_limit?: number;
  maximum_investment_limit?: number;
  bank_name?: string;
  bank_account_name?: string;
  swift_bic_no?: string;
  iban_no?: string;
  is_fund_rating_enabled?: boolean;
  is_projected_rate_of_return_enabled?: boolean;
  is_expected_annual_perc_yield_enabled?: boolean;
  is_all_countries_allowed?: boolean;
  is_payback_period_enabled?: boolean;
  is_eligible_for_collateral_enabled?: boolean;
  offer_status_id?: number;
  status_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // token_offering belongsTo asset via banner_asset_id
  banner_asset!: asset;
  getBanner_asset!: Sequelize.BelongsToGetAssociationMixin<asset>;
  setBanner_asset!: Sequelize.BelongsToSetAssociationMixin<asset, assetId>;
  createBanner_asset!: Sequelize.BelongsToCreateAssociationMixin<asset>;
  // token_offering belongsTo asset via logo_asset_id
  logo_asset!: asset;
  getLogo_asset!: Sequelize.BelongsToGetAssociationMixin<asset>;
  setLogo_asset!: Sequelize.BelongsToSetAssociationMixin<asset, assetId>;
  createLogo_asset!: Sequelize.BelongsToCreateAssociationMixin<asset>;
  // token_offering belongsTo entity via issuer_entity_id
  issuer_entity!: entity;
  getIssuer_entity!: Sequelize.BelongsToGetAssociationMixin<entity>;
  setIssuer_entity!: Sequelize.BelongsToSetAssociationMixin<entity, entityId>;
  createIssuer_entity!: Sequelize.BelongsToCreateAssociationMixin<entity>;
  // token_offering belongsTo master_blockchain_network via blockchain_network
  blockchain_network_master_blockchain_network!: master_blockchain_network;
  getBlockchain_network_master_blockchain_network!: Sequelize.BelongsToGetAssociationMixin<master_blockchain_network>;
  setBlockchain_network_master_blockchain_network!: Sequelize.BelongsToSetAssociationMixin<master_blockchain_network, master_blockchain_networkId>;
  createBlockchain_network_master_blockchain_network!: Sequelize.BelongsToCreateAssociationMixin<master_blockchain_network>;
  // token_offering belongsTo master_country via jurisdiction
  jurisdiction_master_country!: master_country;
  getJurisdiction_master_country!: Sequelize.BelongsToGetAssociationMixin<master_country>;
  setJurisdiction_master_country!: Sequelize.BelongsToSetAssociationMixin<master_country, master_countryId>;
  createJurisdiction_master_country!: Sequelize.BelongsToCreateAssociationMixin<master_country>;
  // token_offering belongsTo master_token_offering_status via offer_status_id
  offer_status!: master_token_offering_status;
  getOffer_status!: Sequelize.BelongsToGetAssociationMixin<master_token_offering_status>;
  setOffer_status!: Sequelize.BelongsToSetAssociationMixin<master_token_offering_status, master_token_offering_statusId>;
  createOffer_status!: Sequelize.BelongsToCreateAssociationMixin<master_token_offering_status>;
  // token_offering belongsTo master_token_status via status_id
  status!: master_token_status;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<master_token_status>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<master_token_status, master_token_statusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<master_token_status>;
  // token_offering belongsTo master_token_type via token_type_id
  token_type!: master_token_type;
  getToken_type!: Sequelize.BelongsToGetAssociationMixin<master_token_type>;
  setToken_type!: Sequelize.BelongsToSetAssociationMixin<master_token_type, master_token_typeId>;
  createToken_type!: Sequelize.BelongsToCreateAssociationMixin<master_token_type>;
  // token_offering hasMany token_offering_allowed_country via token_offering_id
  token_offering_allowed_countries!: token_offering_allowed_country[];
  getToken_offering_allowed_countries!: Sequelize.HasManyGetAssociationsMixin<token_offering_allowed_country>;
  setToken_offering_allowed_countries!: Sequelize.HasManySetAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  addToken_offering_allowed_country!: Sequelize.HasManyAddAssociationMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  addToken_offering_allowed_countries!: Sequelize.HasManyAddAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  createToken_offering_allowed_country!: Sequelize.HasManyCreateAssociationMixin<token_offering_allowed_country>;
  removeToken_offering_allowed_country!: Sequelize.HasManyRemoveAssociationMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  removeToken_offering_allowed_countries!: Sequelize.HasManyRemoveAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  hasToken_offering_allowed_country!: Sequelize.HasManyHasAssociationMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  hasToken_offering_allowed_countries!: Sequelize.HasManyHasAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  countToken_offering_allowed_countries!: Sequelize.HasManyCountAssociationsMixin;
  // token_offering hasMany token_offering_allowed_currency via token_offering_id
  token_offering_allowed_currencies!: token_offering_allowed_currency[];
  getToken_offering_allowed_currencies!: Sequelize.HasManyGetAssociationsMixin<token_offering_allowed_currency>;
  setToken_offering_allowed_currencies!: Sequelize.HasManySetAssociationsMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  addToken_offering_allowed_currency!: Sequelize.HasManyAddAssociationMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  addToken_offering_allowed_currencies!: Sequelize.HasManyAddAssociationsMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  createToken_offering_allowed_currency!: Sequelize.HasManyCreateAssociationMixin<token_offering_allowed_currency>;
  removeToken_offering_allowed_currency!: Sequelize.HasManyRemoveAssociationMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  removeToken_offering_allowed_currencies!: Sequelize.HasManyRemoveAssociationsMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  hasToken_offering_allowed_currency!: Sequelize.HasManyHasAssociationMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  hasToken_offering_allowed_currencies!: Sequelize.HasManyHasAssociationsMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  countToken_offering_allowed_currencies!: Sequelize.HasManyCountAssociationsMixin;
  // token_offering hasMany token_offering_document via token_offering_id
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
  // token_offering hasMany token_offering_team via token_offering_id
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
  // token_offering hasMany token_order via token_offering_id
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
  // token_offering hasMany wallet_token via token_offering_id
  wallet_tokens!: wallet_token[];
  getWallet_tokens!: Sequelize.HasManyGetAssociationsMixin<wallet_token>;
  setWallet_tokens!: Sequelize.HasManySetAssociationsMixin<wallet_token, wallet_tokenId>;
  addWallet_token!: Sequelize.HasManyAddAssociationMixin<wallet_token, wallet_tokenId>;
  addWallet_tokens!: Sequelize.HasManyAddAssociationsMixin<wallet_token, wallet_tokenId>;
  createWallet_token!: Sequelize.HasManyCreateAssociationMixin<wallet_token>;
  removeWallet_token!: Sequelize.HasManyRemoveAssociationMixin<wallet_token, wallet_tokenId>;
  removeWallet_tokens!: Sequelize.HasManyRemoveAssociationsMixin<wallet_token, wallet_tokenId>;
  hasWallet_token!: Sequelize.HasManyHasAssociationMixin<wallet_token, wallet_tokenId>;
  hasWallet_tokens!: Sequelize.HasManyHasAssociationsMixin<wallet_token, wallet_tokenId>;
  countWallet_tokens!: Sequelize.HasManyCountAssociationsMixin;
  // token_offering belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // token_offering belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof token_offering {
    return token_offering.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    issuer_entity_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isin_number: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    symbol: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    token_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_token_type',
        key: 'id'
      }
    },
    base_currency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    base_currency_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    blockchain_network: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_blockchain_networks',
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
    banner_asset_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'assets',
        key: 'id'
      }
    },
    offering_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    jurisdiction: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_countries',
        key: 'id'
      }
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    minimum_investment_limit: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    maximum_investment_limit: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    bank_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bank_account_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    swift_bic_no: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    iban_no: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_fund_rating_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_projected_rate_of_return_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_expected_annual_perc_yield_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_all_countries_allowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_payback_period_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_eligible_for_collateral_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    offer_status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_token_offering_status',
        key: 'id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_token_status',
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
    tableName: 'token_offerings',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "token_offerings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
