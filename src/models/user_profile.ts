import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { asset, assetId } from './asset';
import type { business_document, business_documentId } from './business_document';
import type { customer_wallet, customer_walletId } from './customer_wallet';
import type { ekyc, ekycId } from './ekyc';
import type { entity, entityId } from './entity';
import type { entity_investor, entity_investorId } from './entity_investor';
import type { individual_investor, individual_investorId } from './individual_investor';
import type { master_investor_type, master_investor_typeId } from './master_investor_type';
import type { master_position, master_positionId } from './master_position';
import type { token_offering_allowed_country, token_offering_allowed_countryId } from './token_offering_allowed_country';
import type { token_offering_allowed_currency, token_offering_allowed_currencyId } from './token_offering_allowed_currency';
import type { token_offering_document, token_offering_documentId } from './token_offering_document';
import type { token_offering_team, token_offering_teamId } from './token_offering_team';
import type { token_offering, token_offeringId } from './token_offering';
import type { token_order, token_orderId } from './token_order';
import type { token_transaction, token_transactionId } from './token_transaction';
import type { token_valuation, token_valuationId } from './token_valuation';
import type { track_token_order_action, track_token_order_actionId } from './track_token_order_action';
import type { user_device_token, user_device_tokenId } from './user_device_token';
import type { user_entity, user_entityId } from './user_entity';
import type { user_identity, user_identityId } from './user_identity';
import type { wallet_token, wallet_tokenId } from './wallet_token';

export interface user_profileAttributes {
  id: string;
  name?: string;
  user_id?: number;
  email_id?: string;
  mobile_no_std_code?: string;
  mobile_no?: string;
  is_active?: boolean;
  is_agree_terms_condition?: boolean;
  is_setup_done?: boolean;
  is_verified?: boolean;
  is_fund_offered_by_licuido?: boolean;
  created_at?: Date;
  updated_at?: Date;
  position_id?: number;
  contact_email?: string;
  investor_type_id?: number;
}

export type user_profilePk = "id";
export type user_profileId = user_profile[user_profilePk];
export type user_profileOptionalAttributes = "id" | "name" | "user_id" | "email_id" | "mobile_no_std_code" | "mobile_no" | "is_active" | "is_agree_terms_condition" | "is_setup_done" | "is_verified" | "is_fund_offered_by_licuido" | "created_at" | "updated_at" | "position_id" | "contact_email" | "investor_type_id";
export type user_profileCreationAttributes = Optional<user_profileAttributes, user_profileOptionalAttributes>;

export class user_profile extends Model<user_profileAttributes, user_profileCreationAttributes> implements user_profileAttributes {
  id!: string;
  name?: string;
  user_id?: number;
  email_id?: string;
  mobile_no_std_code?: string;
  mobile_no?: string;
  is_active?: boolean;
  is_agree_terms_condition?: boolean;
  is_setup_done?: boolean;
  is_verified?: boolean;
  is_fund_offered_by_licuido?: boolean;
  created_at?: Date;
  updated_at?: Date;
  position_id?: number;
  contact_email?: string;
  investor_type_id?: number;

  // user_profile belongsTo master_investor_type via investor_type_id
  investor_type!: master_investor_type;
  getInvestor_type!: Sequelize.BelongsToGetAssociationMixin<master_investor_type>;
  setInvestor_type!: Sequelize.BelongsToSetAssociationMixin<master_investor_type, master_investor_typeId>;
  createInvestor_type!: Sequelize.BelongsToCreateAssociationMixin<master_investor_type>;
  // user_profile belongsTo master_position via position_id
  position!: master_position;
  getPosition!: Sequelize.BelongsToGetAssociationMixin<master_position>;
  setPosition!: Sequelize.BelongsToSetAssociationMixin<master_position, master_positionId>;
  createPosition!: Sequelize.BelongsToCreateAssociationMixin<master_position>;
  // user_profile hasMany asset via created_by
  assets!: asset[];
  getAssets!: Sequelize.HasManyGetAssociationsMixin<asset>;
  setAssets!: Sequelize.HasManySetAssociationsMixin<asset, assetId>;
  addAsset!: Sequelize.HasManyAddAssociationMixin<asset, assetId>;
  addAssets!: Sequelize.HasManyAddAssociationsMixin<asset, assetId>;
  createAsset!: Sequelize.HasManyCreateAssociationMixin<asset>;
  removeAsset!: Sequelize.HasManyRemoveAssociationMixin<asset, assetId>;
  removeAssets!: Sequelize.HasManyRemoveAssociationsMixin<asset, assetId>;
  hasAsset!: Sequelize.HasManyHasAssociationMixin<asset, assetId>;
  hasAssets!: Sequelize.HasManyHasAssociationsMixin<asset, assetId>;
  countAssets!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany asset via updated_by
  updated_by_assets!: asset[];
  getUpdated_by_assets!: Sequelize.HasManyGetAssociationsMixin<asset>;
  setUpdated_by_assets!: Sequelize.HasManySetAssociationsMixin<asset, assetId>;
  addUpdated_by_asset!: Sequelize.HasManyAddAssociationMixin<asset, assetId>;
  addUpdated_by_assets!: Sequelize.HasManyAddAssociationsMixin<asset, assetId>;
  createUpdated_by_asset!: Sequelize.HasManyCreateAssociationMixin<asset>;
  removeUpdated_by_asset!: Sequelize.HasManyRemoveAssociationMixin<asset, assetId>;
  removeUpdated_by_assets!: Sequelize.HasManyRemoveAssociationsMixin<asset, assetId>;
  hasUpdated_by_asset!: Sequelize.HasManyHasAssociationMixin<asset, assetId>;
  hasUpdated_by_assets!: Sequelize.HasManyHasAssociationsMixin<asset, assetId>;
  countUpdated_by_assets!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany business_document via created_by
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
  // user_profile hasMany business_document via updated_by
  updated_by_business_documents!: business_document[];
  getUpdated_by_business_documents!: Sequelize.HasManyGetAssociationsMixin<business_document>;
  setUpdated_by_business_documents!: Sequelize.HasManySetAssociationsMixin<business_document, business_documentId>;
  addUpdated_by_business_document!: Sequelize.HasManyAddAssociationMixin<business_document, business_documentId>;
  addUpdated_by_business_documents!: Sequelize.HasManyAddAssociationsMixin<business_document, business_documentId>;
  createUpdated_by_business_document!: Sequelize.HasManyCreateAssociationMixin<business_document>;
  removeUpdated_by_business_document!: Sequelize.HasManyRemoveAssociationMixin<business_document, business_documentId>;
  removeUpdated_by_business_documents!: Sequelize.HasManyRemoveAssociationsMixin<business_document, business_documentId>;
  hasUpdated_by_business_document!: Sequelize.HasManyHasAssociationMixin<business_document, business_documentId>;
  hasUpdated_by_business_documents!: Sequelize.HasManyHasAssociationsMixin<business_document, business_documentId>;
  countUpdated_by_business_documents!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany customer_wallet via created_by
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
  // user_profile hasMany customer_wallet via updated_by
  updated_by_customer_wallets!: customer_wallet[];
  getUpdated_by_customer_wallets!: Sequelize.HasManyGetAssociationsMixin<customer_wallet>;
  setUpdated_by_customer_wallets!: Sequelize.HasManySetAssociationsMixin<customer_wallet, customer_walletId>;
  addUpdated_by_customer_wallet!: Sequelize.HasManyAddAssociationMixin<customer_wallet, customer_walletId>;
  addUpdated_by_customer_wallets!: Sequelize.HasManyAddAssociationsMixin<customer_wallet, customer_walletId>;
  createUpdated_by_customer_wallet!: Sequelize.HasManyCreateAssociationMixin<customer_wallet>;
  removeUpdated_by_customer_wallet!: Sequelize.HasManyRemoveAssociationMixin<customer_wallet, customer_walletId>;
  removeUpdated_by_customer_wallets!: Sequelize.HasManyRemoveAssociationsMixin<customer_wallet, customer_walletId>;
  hasUpdated_by_customer_wallet!: Sequelize.HasManyHasAssociationMixin<customer_wallet, customer_walletId>;
  hasUpdated_by_customer_wallets!: Sequelize.HasManyHasAssociationsMixin<customer_wallet, customer_walletId>;
  countUpdated_by_customer_wallets!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany ekyc via created_by
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
  // user_profile hasMany ekyc via kyc_profile_id
  kyc_profile_ekycs!: ekyc[];
  getKyc_profile_ekycs!: Sequelize.HasManyGetAssociationsMixin<ekyc>;
  setKyc_profile_ekycs!: Sequelize.HasManySetAssociationsMixin<ekyc, ekycId>;
  addKyc_profile_ekyc!: Sequelize.HasManyAddAssociationMixin<ekyc, ekycId>;
  addKyc_profile_ekycs!: Sequelize.HasManyAddAssociationsMixin<ekyc, ekycId>;
  createKyc_profile_ekyc!: Sequelize.HasManyCreateAssociationMixin<ekyc>;
  removeKyc_profile_ekyc!: Sequelize.HasManyRemoveAssociationMixin<ekyc, ekycId>;
  removeKyc_profile_ekycs!: Sequelize.HasManyRemoveAssociationsMixin<ekyc, ekycId>;
  hasKyc_profile_ekyc!: Sequelize.HasManyHasAssociationMixin<ekyc, ekycId>;
  hasKyc_profile_ekycs!: Sequelize.HasManyHasAssociationsMixin<ekyc, ekycId>;
  countKyc_profile_ekycs!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany ekyc via updated_by
  updated_by_ekycs!: ekyc[];
  getUpdated_by_ekycs!: Sequelize.HasManyGetAssociationsMixin<ekyc>;
  setUpdated_by_ekycs!: Sequelize.HasManySetAssociationsMixin<ekyc, ekycId>;
  addUpdated_by_ekyc!: Sequelize.HasManyAddAssociationMixin<ekyc, ekycId>;
  addUpdated_by_ekycs!: Sequelize.HasManyAddAssociationsMixin<ekyc, ekycId>;
  createUpdated_by_ekyc!: Sequelize.HasManyCreateAssociationMixin<ekyc>;
  removeUpdated_by_ekyc!: Sequelize.HasManyRemoveAssociationMixin<ekyc, ekycId>;
  removeUpdated_by_ekycs!: Sequelize.HasManyRemoveAssociationsMixin<ekyc, ekycId>;
  hasUpdated_by_ekyc!: Sequelize.HasManyHasAssociationMixin<ekyc, ekycId>;
  hasUpdated_by_ekycs!: Sequelize.HasManyHasAssociationsMixin<ekyc, ekycId>;
  countUpdated_by_ekycs!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany entity via contact_profile_id
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
  // user_profile hasMany entity via created_by
  created_by_entities!: entity[];
  getCreated_by_entities!: Sequelize.HasManyGetAssociationsMixin<entity>;
  setCreated_by_entities!: Sequelize.HasManySetAssociationsMixin<entity, entityId>;
  addCreated_by_entity!: Sequelize.HasManyAddAssociationMixin<entity, entityId>;
  addCreated_by_entities!: Sequelize.HasManyAddAssociationsMixin<entity, entityId>;
  createCreated_by_entity!: Sequelize.HasManyCreateAssociationMixin<entity>;
  removeCreated_by_entity!: Sequelize.HasManyRemoveAssociationMixin<entity, entityId>;
  removeCreated_by_entities!: Sequelize.HasManyRemoveAssociationsMixin<entity, entityId>;
  hasCreated_by_entity!: Sequelize.HasManyHasAssociationMixin<entity, entityId>;
  hasCreated_by_entities!: Sequelize.HasManyHasAssociationsMixin<entity, entityId>;
  countCreated_by_entities!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany entity via updated_by
  updated_by_entities!: entity[];
  getUpdated_by_entities!: Sequelize.HasManyGetAssociationsMixin<entity>;
  setUpdated_by_entities!: Sequelize.HasManySetAssociationsMixin<entity, entityId>;
  addUpdated_by_entity!: Sequelize.HasManyAddAssociationMixin<entity, entityId>;
  addUpdated_by_entities!: Sequelize.HasManyAddAssociationsMixin<entity, entityId>;
  createUpdated_by_entity!: Sequelize.HasManyCreateAssociationMixin<entity>;
  removeUpdated_by_entity!: Sequelize.HasManyRemoveAssociationMixin<entity, entityId>;
  removeUpdated_by_entities!: Sequelize.HasManyRemoveAssociationsMixin<entity, entityId>;
  hasUpdated_by_entity!: Sequelize.HasManyHasAssociationMixin<entity, entityId>;
  hasUpdated_by_entities!: Sequelize.HasManyHasAssociationsMixin<entity, entityId>;
  countUpdated_by_entities!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany entity_investor via created_by
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
  // user_profile hasMany entity_investor via updated_by
  updated_by_entity_investors!: entity_investor[];
  getUpdated_by_entity_investors!: Sequelize.HasManyGetAssociationsMixin<entity_investor>;
  setUpdated_by_entity_investors!: Sequelize.HasManySetAssociationsMixin<entity_investor, entity_investorId>;
  addUpdated_by_entity_investor!: Sequelize.HasManyAddAssociationMixin<entity_investor, entity_investorId>;
  addUpdated_by_entity_investors!: Sequelize.HasManyAddAssociationsMixin<entity_investor, entity_investorId>;
  createUpdated_by_entity_investor!: Sequelize.HasManyCreateAssociationMixin<entity_investor>;
  removeUpdated_by_entity_investor!: Sequelize.HasManyRemoveAssociationMixin<entity_investor, entity_investorId>;
  removeUpdated_by_entity_investors!: Sequelize.HasManyRemoveAssociationsMixin<entity_investor, entity_investorId>;
  hasUpdated_by_entity_investor!: Sequelize.HasManyHasAssociationMixin<entity_investor, entity_investorId>;
  hasUpdated_by_entity_investors!: Sequelize.HasManyHasAssociationsMixin<entity_investor, entity_investorId>;
  countUpdated_by_entity_investors!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany individual_investor via contact_profile_id
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
  // user_profile hasMany individual_investor via created_by
  created_by_individual_investors!: individual_investor[];
  getCreated_by_individual_investors!: Sequelize.HasManyGetAssociationsMixin<individual_investor>;
  setCreated_by_individual_investors!: Sequelize.HasManySetAssociationsMixin<individual_investor, individual_investorId>;
  addCreated_by_individual_investor!: Sequelize.HasManyAddAssociationMixin<individual_investor, individual_investorId>;
  addCreated_by_individual_investors!: Sequelize.HasManyAddAssociationsMixin<individual_investor, individual_investorId>;
  createCreated_by_individual_investor!: Sequelize.HasManyCreateAssociationMixin<individual_investor>;
  removeCreated_by_individual_investor!: Sequelize.HasManyRemoveAssociationMixin<individual_investor, individual_investorId>;
  removeCreated_by_individual_investors!: Sequelize.HasManyRemoveAssociationsMixin<individual_investor, individual_investorId>;
  hasCreated_by_individual_investor!: Sequelize.HasManyHasAssociationMixin<individual_investor, individual_investorId>;
  hasCreated_by_individual_investors!: Sequelize.HasManyHasAssociationsMixin<individual_investor, individual_investorId>;
  countCreated_by_individual_investors!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany individual_investor via updated_by
  updated_by_individual_investors!: individual_investor[];
  getUpdated_by_individual_investors!: Sequelize.HasManyGetAssociationsMixin<individual_investor>;
  setUpdated_by_individual_investors!: Sequelize.HasManySetAssociationsMixin<individual_investor, individual_investorId>;
  addUpdated_by_individual_investor!: Sequelize.HasManyAddAssociationMixin<individual_investor, individual_investorId>;
  addUpdated_by_individual_investors!: Sequelize.HasManyAddAssociationsMixin<individual_investor, individual_investorId>;
  createUpdated_by_individual_investor!: Sequelize.HasManyCreateAssociationMixin<individual_investor>;
  removeUpdated_by_individual_investor!: Sequelize.HasManyRemoveAssociationMixin<individual_investor, individual_investorId>;
  removeUpdated_by_individual_investors!: Sequelize.HasManyRemoveAssociationsMixin<individual_investor, individual_investorId>;
  hasUpdated_by_individual_investor!: Sequelize.HasManyHasAssociationMixin<individual_investor, individual_investorId>;
  hasUpdated_by_individual_investors!: Sequelize.HasManyHasAssociationsMixin<individual_investor, individual_investorId>;
  countUpdated_by_individual_investors!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany token_offering_allowed_country via created_by
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
  // user_profile hasMany token_offering_allowed_country via updated_by
  updated_by_token_offering_allowed_countries!: token_offering_allowed_country[];
  getUpdated_by_token_offering_allowed_countries!: Sequelize.HasManyGetAssociationsMixin<token_offering_allowed_country>;
  setUpdated_by_token_offering_allowed_countries!: Sequelize.HasManySetAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  addUpdated_by_token_offering_allowed_country!: Sequelize.HasManyAddAssociationMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  addUpdated_by_token_offering_allowed_countries!: Sequelize.HasManyAddAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  createUpdated_by_token_offering_allowed_country!: Sequelize.HasManyCreateAssociationMixin<token_offering_allowed_country>;
  removeUpdated_by_token_offering_allowed_country!: Sequelize.HasManyRemoveAssociationMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  removeUpdated_by_token_offering_allowed_countries!: Sequelize.HasManyRemoveAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  hasUpdated_by_token_offering_allowed_country!: Sequelize.HasManyHasAssociationMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  hasUpdated_by_token_offering_allowed_countries!: Sequelize.HasManyHasAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  countUpdated_by_token_offering_allowed_countries!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany token_offering_allowed_currency via created_by
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
  // user_profile hasMany token_offering_allowed_currency via updated_by
  updated_by_token_offering_allowed_currencies!: token_offering_allowed_currency[];
  getUpdated_by_token_offering_allowed_currencies!: Sequelize.HasManyGetAssociationsMixin<token_offering_allowed_currency>;
  setUpdated_by_token_offering_allowed_currencies!: Sequelize.HasManySetAssociationsMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  addUpdated_by_token_offering_allowed_currency!: Sequelize.HasManyAddAssociationMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  addUpdated_by_token_offering_allowed_currencies!: Sequelize.HasManyAddAssociationsMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  createUpdated_by_token_offering_allowed_currency!: Sequelize.HasManyCreateAssociationMixin<token_offering_allowed_currency>;
  removeUpdated_by_token_offering_allowed_currency!: Sequelize.HasManyRemoveAssociationMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  removeUpdated_by_token_offering_allowed_currencies!: Sequelize.HasManyRemoveAssociationsMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  hasUpdated_by_token_offering_allowed_currency!: Sequelize.HasManyHasAssociationMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  hasUpdated_by_token_offering_allowed_currencies!: Sequelize.HasManyHasAssociationsMixin<token_offering_allowed_currency, token_offering_allowed_currencyId>;
  countUpdated_by_token_offering_allowed_currencies!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany token_offering_document via created_by
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
  // user_profile hasMany token_offering_document via updated_by
  updated_by_token_offering_documents!: token_offering_document[];
  getUpdated_by_token_offering_documents!: Sequelize.HasManyGetAssociationsMixin<token_offering_document>;
  setUpdated_by_token_offering_documents!: Sequelize.HasManySetAssociationsMixin<token_offering_document, token_offering_documentId>;
  addUpdated_by_token_offering_document!: Sequelize.HasManyAddAssociationMixin<token_offering_document, token_offering_documentId>;
  addUpdated_by_token_offering_documents!: Sequelize.HasManyAddAssociationsMixin<token_offering_document, token_offering_documentId>;
  createUpdated_by_token_offering_document!: Sequelize.HasManyCreateAssociationMixin<token_offering_document>;
  removeUpdated_by_token_offering_document!: Sequelize.HasManyRemoveAssociationMixin<token_offering_document, token_offering_documentId>;
  removeUpdated_by_token_offering_documents!: Sequelize.HasManyRemoveAssociationsMixin<token_offering_document, token_offering_documentId>;
  hasUpdated_by_token_offering_document!: Sequelize.HasManyHasAssociationMixin<token_offering_document, token_offering_documentId>;
  hasUpdated_by_token_offering_documents!: Sequelize.HasManyHasAssociationsMixin<token_offering_document, token_offering_documentId>;
  countUpdated_by_token_offering_documents!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany token_offering_team via created_by
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
  // user_profile hasMany token_offering_team via updated_by
  updated_by_token_offering_teams!: token_offering_team[];
  getUpdated_by_token_offering_teams!: Sequelize.HasManyGetAssociationsMixin<token_offering_team>;
  setUpdated_by_token_offering_teams!: Sequelize.HasManySetAssociationsMixin<token_offering_team, token_offering_teamId>;
  addUpdated_by_token_offering_team!: Sequelize.HasManyAddAssociationMixin<token_offering_team, token_offering_teamId>;
  addUpdated_by_token_offering_teams!: Sequelize.HasManyAddAssociationsMixin<token_offering_team, token_offering_teamId>;
  createUpdated_by_token_offering_team!: Sequelize.HasManyCreateAssociationMixin<token_offering_team>;
  removeUpdated_by_token_offering_team!: Sequelize.HasManyRemoveAssociationMixin<token_offering_team, token_offering_teamId>;
  removeUpdated_by_token_offering_teams!: Sequelize.HasManyRemoveAssociationsMixin<token_offering_team, token_offering_teamId>;
  hasUpdated_by_token_offering_team!: Sequelize.HasManyHasAssociationMixin<token_offering_team, token_offering_teamId>;
  hasUpdated_by_token_offering_teams!: Sequelize.HasManyHasAssociationsMixin<token_offering_team, token_offering_teamId>;
  countUpdated_by_token_offering_teams!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany token_offering via created_by
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
  // user_profile hasMany token_offering via updated_by
  updated_by_token_offerings!: token_offering[];
  getUpdated_by_token_offerings!: Sequelize.HasManyGetAssociationsMixin<token_offering>;
  setUpdated_by_token_offerings!: Sequelize.HasManySetAssociationsMixin<token_offering, token_offeringId>;
  addUpdated_by_token_offering!: Sequelize.HasManyAddAssociationMixin<token_offering, token_offeringId>;
  addUpdated_by_token_offerings!: Sequelize.HasManyAddAssociationsMixin<token_offering, token_offeringId>;
  createUpdated_by_token_offering!: Sequelize.HasManyCreateAssociationMixin<token_offering>;
  removeUpdated_by_token_offering!: Sequelize.HasManyRemoveAssociationMixin<token_offering, token_offeringId>;
  removeUpdated_by_token_offerings!: Sequelize.HasManyRemoveAssociationsMixin<token_offering, token_offeringId>;
  hasUpdated_by_token_offering!: Sequelize.HasManyHasAssociationMixin<token_offering, token_offeringId>;
  hasUpdated_by_token_offerings!: Sequelize.HasManyHasAssociationsMixin<token_offering, token_offeringId>;
  countUpdated_by_token_offerings!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany token_order via created_by
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
  // user_profile hasMany token_order via updated_by
  updated_by_token_orders!: token_order[];
  getUpdated_by_token_orders!: Sequelize.HasManyGetAssociationsMixin<token_order>;
  setUpdated_by_token_orders!: Sequelize.HasManySetAssociationsMixin<token_order, token_orderId>;
  addUpdated_by_token_order!: Sequelize.HasManyAddAssociationMixin<token_order, token_orderId>;
  addUpdated_by_token_orders!: Sequelize.HasManyAddAssociationsMixin<token_order, token_orderId>;
  createUpdated_by_token_order!: Sequelize.HasManyCreateAssociationMixin<token_order>;
  removeUpdated_by_token_order!: Sequelize.HasManyRemoveAssociationMixin<token_order, token_orderId>;
  removeUpdated_by_token_orders!: Sequelize.HasManyRemoveAssociationsMixin<token_order, token_orderId>;
  hasUpdated_by_token_order!: Sequelize.HasManyHasAssociationMixin<token_order, token_orderId>;
  hasUpdated_by_token_orders!: Sequelize.HasManyHasAssociationsMixin<token_order, token_orderId>;
  countUpdated_by_token_orders!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany token_transaction via created_by
  token_transactions!: token_transaction[];
  getToken_transactions!: Sequelize.HasManyGetAssociationsMixin<token_transaction>;
  setToken_transactions!: Sequelize.HasManySetAssociationsMixin<token_transaction, token_transactionId>;
  addToken_transaction!: Sequelize.HasManyAddAssociationMixin<token_transaction, token_transactionId>;
  addToken_transactions!: Sequelize.HasManyAddAssociationsMixin<token_transaction, token_transactionId>;
  createToken_transaction!: Sequelize.HasManyCreateAssociationMixin<token_transaction>;
  removeToken_transaction!: Sequelize.HasManyRemoveAssociationMixin<token_transaction, token_transactionId>;
  removeToken_transactions!: Sequelize.HasManyRemoveAssociationsMixin<token_transaction, token_transactionId>;
  hasToken_transaction!: Sequelize.HasManyHasAssociationMixin<token_transaction, token_transactionId>;
  hasToken_transactions!: Sequelize.HasManyHasAssociationsMixin<token_transaction, token_transactionId>;
  countToken_transactions!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany token_transaction via updated_by
  updated_by_token_transactions!: token_transaction[];
  getUpdated_by_token_transactions!: Sequelize.HasManyGetAssociationsMixin<token_transaction>;
  setUpdated_by_token_transactions!: Sequelize.HasManySetAssociationsMixin<token_transaction, token_transactionId>;
  addUpdated_by_token_transaction!: Sequelize.HasManyAddAssociationMixin<token_transaction, token_transactionId>;
  addUpdated_by_token_transactions!: Sequelize.HasManyAddAssociationsMixin<token_transaction, token_transactionId>;
  createUpdated_by_token_transaction!: Sequelize.HasManyCreateAssociationMixin<token_transaction>;
  removeUpdated_by_token_transaction!: Sequelize.HasManyRemoveAssociationMixin<token_transaction, token_transactionId>;
  removeUpdated_by_token_transactions!: Sequelize.HasManyRemoveAssociationsMixin<token_transaction, token_transactionId>;
  hasUpdated_by_token_transaction!: Sequelize.HasManyHasAssociationMixin<token_transaction, token_transactionId>;
  hasUpdated_by_token_transactions!: Sequelize.HasManyHasAssociationsMixin<token_transaction, token_transactionId>;
  countUpdated_by_token_transactions!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany token_valuation via created_by
  token_valuations!: token_valuation[];
  getToken_valuations!: Sequelize.HasManyGetAssociationsMixin<token_valuation>;
  setToken_valuations!: Sequelize.HasManySetAssociationsMixin<token_valuation, token_valuationId>;
  addToken_valuation!: Sequelize.HasManyAddAssociationMixin<token_valuation, token_valuationId>;
  addToken_valuations!: Sequelize.HasManyAddAssociationsMixin<token_valuation, token_valuationId>;
  createToken_valuation!: Sequelize.HasManyCreateAssociationMixin<token_valuation>;
  removeToken_valuation!: Sequelize.HasManyRemoveAssociationMixin<token_valuation, token_valuationId>;
  removeToken_valuations!: Sequelize.HasManyRemoveAssociationsMixin<token_valuation, token_valuationId>;
  hasToken_valuation!: Sequelize.HasManyHasAssociationMixin<token_valuation, token_valuationId>;
  hasToken_valuations!: Sequelize.HasManyHasAssociationsMixin<token_valuation, token_valuationId>;
  countToken_valuations!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany token_valuation via updated_by
  updated_by_token_valuations!: token_valuation[];
  getUpdated_by_token_valuations!: Sequelize.HasManyGetAssociationsMixin<token_valuation>;
  setUpdated_by_token_valuations!: Sequelize.HasManySetAssociationsMixin<token_valuation, token_valuationId>;
  addUpdated_by_token_valuation!: Sequelize.HasManyAddAssociationMixin<token_valuation, token_valuationId>;
  addUpdated_by_token_valuations!: Sequelize.HasManyAddAssociationsMixin<token_valuation, token_valuationId>;
  createUpdated_by_token_valuation!: Sequelize.HasManyCreateAssociationMixin<token_valuation>;
  removeUpdated_by_token_valuation!: Sequelize.HasManyRemoveAssociationMixin<token_valuation, token_valuationId>;
  removeUpdated_by_token_valuations!: Sequelize.HasManyRemoveAssociationsMixin<token_valuation, token_valuationId>;
  hasUpdated_by_token_valuation!: Sequelize.HasManyHasAssociationMixin<token_valuation, token_valuationId>;
  hasUpdated_by_token_valuations!: Sequelize.HasManyHasAssociationsMixin<token_valuation, token_valuationId>;
  countUpdated_by_token_valuations!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany track_token_order_action via created_by
  track_token_order_actions!: track_token_order_action[];
  getTrack_token_order_actions!: Sequelize.HasManyGetAssociationsMixin<track_token_order_action>;
  setTrack_token_order_actions!: Sequelize.HasManySetAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  addTrack_token_order_action!: Sequelize.HasManyAddAssociationMixin<track_token_order_action, track_token_order_actionId>;
  addTrack_token_order_actions!: Sequelize.HasManyAddAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  createTrack_token_order_action!: Sequelize.HasManyCreateAssociationMixin<track_token_order_action>;
  removeTrack_token_order_action!: Sequelize.HasManyRemoveAssociationMixin<track_token_order_action, track_token_order_actionId>;
  removeTrack_token_order_actions!: Sequelize.HasManyRemoveAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  hasTrack_token_order_action!: Sequelize.HasManyHasAssociationMixin<track_token_order_action, track_token_order_actionId>;
  hasTrack_token_order_actions!: Sequelize.HasManyHasAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  countTrack_token_order_actions!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany track_token_order_action via updated_by
  updated_by_track_token_order_actions!: track_token_order_action[];
  getUpdated_by_track_token_order_actions!: Sequelize.HasManyGetAssociationsMixin<track_token_order_action>;
  setUpdated_by_track_token_order_actions!: Sequelize.HasManySetAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  addUpdated_by_track_token_order_action!: Sequelize.HasManyAddAssociationMixin<track_token_order_action, track_token_order_actionId>;
  addUpdated_by_track_token_order_actions!: Sequelize.HasManyAddAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  createUpdated_by_track_token_order_action!: Sequelize.HasManyCreateAssociationMixin<track_token_order_action>;
  removeUpdated_by_track_token_order_action!: Sequelize.HasManyRemoveAssociationMixin<track_token_order_action, track_token_order_actionId>;
  removeUpdated_by_track_token_order_actions!: Sequelize.HasManyRemoveAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  hasUpdated_by_track_token_order_action!: Sequelize.HasManyHasAssociationMixin<track_token_order_action, track_token_order_actionId>;
  hasUpdated_by_track_token_order_actions!: Sequelize.HasManyHasAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  countUpdated_by_track_token_order_actions!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany track_token_order_action via user_profile_id
  user_profile_track_token_order_actions!: track_token_order_action[];
  getUser_profile_track_token_order_actions!: Sequelize.HasManyGetAssociationsMixin<track_token_order_action>;
  setUser_profile_track_token_order_actions!: Sequelize.HasManySetAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  addUser_profile_track_token_order_action!: Sequelize.HasManyAddAssociationMixin<track_token_order_action, track_token_order_actionId>;
  addUser_profile_track_token_order_actions!: Sequelize.HasManyAddAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  createUser_profile_track_token_order_action!: Sequelize.HasManyCreateAssociationMixin<track_token_order_action>;
  removeUser_profile_track_token_order_action!: Sequelize.HasManyRemoveAssociationMixin<track_token_order_action, track_token_order_actionId>;
  removeUser_profile_track_token_order_actions!: Sequelize.HasManyRemoveAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  hasUser_profile_track_token_order_action!: Sequelize.HasManyHasAssociationMixin<track_token_order_action, track_token_order_actionId>;
  hasUser_profile_track_token_order_actions!: Sequelize.HasManyHasAssociationsMixin<track_token_order_action, track_token_order_actionId>;
  countUser_profile_track_token_order_actions!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany user_device_token via created_by
  user_device_tokens!: user_device_token[];
  getUser_device_tokens!: Sequelize.HasManyGetAssociationsMixin<user_device_token>;
  setUser_device_tokens!: Sequelize.HasManySetAssociationsMixin<user_device_token, user_device_tokenId>;
  addUser_device_token!: Sequelize.HasManyAddAssociationMixin<user_device_token, user_device_tokenId>;
  addUser_device_tokens!: Sequelize.HasManyAddAssociationsMixin<user_device_token, user_device_tokenId>;
  createUser_device_token!: Sequelize.HasManyCreateAssociationMixin<user_device_token>;
  removeUser_device_token!: Sequelize.HasManyRemoveAssociationMixin<user_device_token, user_device_tokenId>;
  removeUser_device_tokens!: Sequelize.HasManyRemoveAssociationsMixin<user_device_token, user_device_tokenId>;
  hasUser_device_token!: Sequelize.HasManyHasAssociationMixin<user_device_token, user_device_tokenId>;
  hasUser_device_tokens!: Sequelize.HasManyHasAssociationsMixin<user_device_token, user_device_tokenId>;
  countUser_device_tokens!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany user_device_token via updated_by
  updated_by_user_device_tokens!: user_device_token[];
  getUpdated_by_user_device_tokens!: Sequelize.HasManyGetAssociationsMixin<user_device_token>;
  setUpdated_by_user_device_tokens!: Sequelize.HasManySetAssociationsMixin<user_device_token, user_device_tokenId>;
  addUpdated_by_user_device_token!: Sequelize.HasManyAddAssociationMixin<user_device_token, user_device_tokenId>;
  addUpdated_by_user_device_tokens!: Sequelize.HasManyAddAssociationsMixin<user_device_token, user_device_tokenId>;
  createUpdated_by_user_device_token!: Sequelize.HasManyCreateAssociationMixin<user_device_token>;
  removeUpdated_by_user_device_token!: Sequelize.HasManyRemoveAssociationMixin<user_device_token, user_device_tokenId>;
  removeUpdated_by_user_device_tokens!: Sequelize.HasManyRemoveAssociationsMixin<user_device_token, user_device_tokenId>;
  hasUpdated_by_user_device_token!: Sequelize.HasManyHasAssociationMixin<user_device_token, user_device_tokenId>;
  hasUpdated_by_user_device_tokens!: Sequelize.HasManyHasAssociationsMixin<user_device_token, user_device_tokenId>;
  countUpdated_by_user_device_tokens!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany user_device_token via user_profile_id
  user_profile_user_device_tokens!: user_device_token[];
  getUser_profile_user_device_tokens!: Sequelize.HasManyGetAssociationsMixin<user_device_token>;
  setUser_profile_user_device_tokens!: Sequelize.HasManySetAssociationsMixin<user_device_token, user_device_tokenId>;
  addUser_profile_user_device_token!: Sequelize.HasManyAddAssociationMixin<user_device_token, user_device_tokenId>;
  addUser_profile_user_device_tokens!: Sequelize.HasManyAddAssociationsMixin<user_device_token, user_device_tokenId>;
  createUser_profile_user_device_token!: Sequelize.HasManyCreateAssociationMixin<user_device_token>;
  removeUser_profile_user_device_token!: Sequelize.HasManyRemoveAssociationMixin<user_device_token, user_device_tokenId>;
  removeUser_profile_user_device_tokens!: Sequelize.HasManyRemoveAssociationsMixin<user_device_token, user_device_tokenId>;
  hasUser_profile_user_device_token!: Sequelize.HasManyHasAssociationMixin<user_device_token, user_device_tokenId>;
  hasUser_profile_user_device_tokens!: Sequelize.HasManyHasAssociationsMixin<user_device_token, user_device_tokenId>;
  countUser_profile_user_device_tokens!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany user_entity via created_by
  user_entities!: user_entity[];
  getUser_entities!: Sequelize.HasManyGetAssociationsMixin<user_entity>;
  setUser_entities!: Sequelize.HasManySetAssociationsMixin<user_entity, user_entityId>;
  addUser_entity!: Sequelize.HasManyAddAssociationMixin<user_entity, user_entityId>;
  addUser_entities!: Sequelize.HasManyAddAssociationsMixin<user_entity, user_entityId>;
  createUser_entity!: Sequelize.HasManyCreateAssociationMixin<user_entity>;
  removeUser_entity!: Sequelize.HasManyRemoveAssociationMixin<user_entity, user_entityId>;
  removeUser_entities!: Sequelize.HasManyRemoveAssociationsMixin<user_entity, user_entityId>;
  hasUser_entity!: Sequelize.HasManyHasAssociationMixin<user_entity, user_entityId>;
  hasUser_entities!: Sequelize.HasManyHasAssociationsMixin<user_entity, user_entityId>;
  countUser_entities!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany user_entity via updated_by
  updated_by_user_entities!: user_entity[];
  getUpdated_by_user_entities!: Sequelize.HasManyGetAssociationsMixin<user_entity>;
  setUpdated_by_user_entities!: Sequelize.HasManySetAssociationsMixin<user_entity, user_entityId>;
  addUpdated_by_user_entity!: Sequelize.HasManyAddAssociationMixin<user_entity, user_entityId>;
  addUpdated_by_user_entities!: Sequelize.HasManyAddAssociationsMixin<user_entity, user_entityId>;
  createUpdated_by_user_entity!: Sequelize.HasManyCreateAssociationMixin<user_entity>;
  removeUpdated_by_user_entity!: Sequelize.HasManyRemoveAssociationMixin<user_entity, user_entityId>;
  removeUpdated_by_user_entities!: Sequelize.HasManyRemoveAssociationsMixin<user_entity, user_entityId>;
  hasUpdated_by_user_entity!: Sequelize.HasManyHasAssociationMixin<user_entity, user_entityId>;
  hasUpdated_by_user_entities!: Sequelize.HasManyHasAssociationsMixin<user_entity, user_entityId>;
  countUpdated_by_user_entities!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany user_entity via user_profile_id
  user_profile_user_entities!: user_entity[];
  getUser_profile_user_entities!: Sequelize.HasManyGetAssociationsMixin<user_entity>;
  setUser_profile_user_entities!: Sequelize.HasManySetAssociationsMixin<user_entity, user_entityId>;
  addUser_profile_user_entity!: Sequelize.HasManyAddAssociationMixin<user_entity, user_entityId>;
  addUser_profile_user_entities!: Sequelize.HasManyAddAssociationsMixin<user_entity, user_entityId>;
  createUser_profile_user_entity!: Sequelize.HasManyCreateAssociationMixin<user_entity>;
  removeUser_profile_user_entity!: Sequelize.HasManyRemoveAssociationMixin<user_entity, user_entityId>;
  removeUser_profile_user_entities!: Sequelize.HasManyRemoveAssociationsMixin<user_entity, user_entityId>;
  hasUser_profile_user_entity!: Sequelize.HasManyHasAssociationMixin<user_entity, user_entityId>;
  hasUser_profile_user_entities!: Sequelize.HasManyHasAssociationsMixin<user_entity, user_entityId>;
  countUser_profile_user_entities!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany user_identity via created_by
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
  // user_profile hasMany user_identity via updated_by
  updated_by_user_identities!: user_identity[];
  getUpdated_by_user_identities!: Sequelize.HasManyGetAssociationsMixin<user_identity>;
  setUpdated_by_user_identities!: Sequelize.HasManySetAssociationsMixin<user_identity, user_identityId>;
  addUpdated_by_user_identity!: Sequelize.HasManyAddAssociationMixin<user_identity, user_identityId>;
  addUpdated_by_user_identities!: Sequelize.HasManyAddAssociationsMixin<user_identity, user_identityId>;
  createUpdated_by_user_identity!: Sequelize.HasManyCreateAssociationMixin<user_identity>;
  removeUpdated_by_user_identity!: Sequelize.HasManyRemoveAssociationMixin<user_identity, user_identityId>;
  removeUpdated_by_user_identities!: Sequelize.HasManyRemoveAssociationsMixin<user_identity, user_identityId>;
  hasUpdated_by_user_identity!: Sequelize.HasManyHasAssociationMixin<user_identity, user_identityId>;
  hasUpdated_by_user_identities!: Sequelize.HasManyHasAssociationsMixin<user_identity, user_identityId>;
  countUpdated_by_user_identities!: Sequelize.HasManyCountAssociationsMixin;
  // user_profile hasMany wallet_token via created_by
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
  // user_profile hasMany wallet_token via updated_by
  updated_by_wallet_tokens!: wallet_token[];
  getUpdated_by_wallet_tokens!: Sequelize.HasManyGetAssociationsMixin<wallet_token>;
  setUpdated_by_wallet_tokens!: Sequelize.HasManySetAssociationsMixin<wallet_token, wallet_tokenId>;
  addUpdated_by_wallet_token!: Sequelize.HasManyAddAssociationMixin<wallet_token, wallet_tokenId>;
  addUpdated_by_wallet_tokens!: Sequelize.HasManyAddAssociationsMixin<wallet_token, wallet_tokenId>;
  createUpdated_by_wallet_token!: Sequelize.HasManyCreateAssociationMixin<wallet_token>;
  removeUpdated_by_wallet_token!: Sequelize.HasManyRemoveAssociationMixin<wallet_token, wallet_tokenId>;
  removeUpdated_by_wallet_tokens!: Sequelize.HasManyRemoveAssociationsMixin<wallet_token, wallet_tokenId>;
  hasUpdated_by_wallet_token!: Sequelize.HasManyHasAssociationMixin<wallet_token, wallet_tokenId>;
  hasUpdated_by_wallet_tokens!: Sequelize.HasManyHasAssociationsMixin<wallet_token, wallet_tokenId>;
  countUpdated_by_wallet_tokens!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_profile {
    return user_profile.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mobile_no_std_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mobile_no: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_agree_terms_condition: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_setup_done: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_fund_offered_by_licuido: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_position',
        key: 'id'
      }
    },
    contact_email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    investor_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_investor_types',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_profiles',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "user_profiles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
