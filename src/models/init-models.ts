import type { Sequelize } from "sequelize";
import { asset as _asset } from "./asset";
import type { assetAttributes, assetCreationAttributes } from "./asset";
import { business_document as _business_document } from "./business_document";
import type { business_documentAttributes, business_documentCreationAttributes } from "./business_document";
import { customer_wallet as _customer_wallet } from "./customer_wallet";
import type { customer_walletAttributes, customer_walletCreationAttributes } from "./customer_wallet";
import { ekyc as _ekyc } from "./ekyc";
import type { ekycAttributes, ekycCreationAttributes } from "./ekyc";
import { entity as _entity } from "./entity";
import type { entityAttributes, entityCreationAttributes } from "./entity";
import { entity_investor as _entity_investor } from "./entity_investor";
import type { entity_investorAttributes, entity_investorCreationAttributes } from "./entity_investor";
import { individual_investor as _individual_investor } from "./individual_investor";
import type { individual_investorAttributes, individual_investorCreationAttributes } from "./individual_investor";
import { master_blockchain_network as _master_blockchain_network } from "./master_blockchain_network";
import type { master_blockchain_networkAttributes, master_blockchain_networkCreationAttributes } from "./master_blockchain_network";
import { master_business_sector as _master_business_sector } from "./master_business_sector";
import type { master_business_sectorAttributes, master_business_sectorCreationAttributes } from "./master_business_sector";
import { master_country as _master_country } from "./master_country";
import type { master_countryAttributes, master_countryCreationAttributes } from "./master_country";
import { master_ekc_status as _master_ekc_status } from "./master_ekc_status";
import type { master_ekc_statusAttributes, master_ekc_statusCreationAttributes } from "./master_ekc_status";
import { master_entity_investor_status as _master_entity_investor_status } from "./master_entity_investor_status";
import type { master_entity_investor_statusAttributes, master_entity_investor_statusCreationAttributes } from "./master_entity_investor_status";
import { master_entity_type as _master_entity_type } from "./master_entity_type";
import type { master_entity_typeAttributes, master_entity_typeCreationAttributes } from "./master_entity_type";
import { master_fund_agency as _master_fund_agency } from "./master_fund_agency";
import type { master_fund_agencyAttributes, master_fund_agencyCreationAttributes } from "./master_fund_agency";
import { master_fund_agency_rating as _master_fund_agency_rating } from "./master_fund_agency_rating";
import type { master_fund_agency_ratingAttributes, master_fund_agency_ratingCreationAttributes } from "./master_fund_agency_rating";
import { master_investor_type as _master_investor_type } from "./master_investor_type";
import type { master_investor_typeAttributes, master_investor_typeCreationAttributes } from "./master_investor_type";
import { master_order_status as _master_order_status } from "./master_order_status";
import type { master_order_statusAttributes, master_order_statusCreationAttributes } from "./master_order_status";
import { master_position as _master_position } from "./master_position";
import type { master_positionAttributes, master_positionCreationAttributes } from "./master_position";
import { master_region as _master_region } from "./master_region";
import type { master_regionAttributes, master_regionCreationAttributes } from "./master_region";
import { master_token_offering_status as _master_token_offering_status } from "./master_token_offering_status";
import type { master_token_offering_statusAttributes, master_token_offering_statusCreationAttributes } from "./master_token_offering_status";
import { master_token_status as _master_token_status } from "./master_token_status";
import type { master_token_statusAttributes, master_token_statusCreationAttributes } from "./master_token_status";
import { master_token_type as _master_token_type } from "./master_token_type";
import type { master_token_typeAttributes, master_token_typeCreationAttributes } from "./master_token_type";
import { master_transaction_status as _master_transaction_status } from "./master_transaction_status";
import type { master_transaction_statusAttributes, master_transaction_statusCreationAttributes } from "./master_transaction_status";
import { master_wallet_type as _master_wallet_type } from "./master_wallet_type";
import type { master_wallet_typeAttributes, master_wallet_typeCreationAttributes } from "./master_wallet_type";
import { offer_fund_rating as _offer_fund_rating } from "./offer_fund_rating";
import type { offer_fund_ratingAttributes, offer_fund_ratingCreationAttributes } from "./offer_fund_rating";
import { token_offering_allowed_country as _token_offering_allowed_country } from "./token_offering_allowed_country";
import type { token_offering_allowed_countryAttributes, token_offering_allowed_countryCreationAttributes } from "./token_offering_allowed_country";
import { token_offering_allowed_currency as _token_offering_allowed_currency } from "./token_offering_allowed_currency";
import type { token_offering_allowed_currencyAttributes, token_offering_allowed_currencyCreationAttributes } from "./token_offering_allowed_currency";
import { token_offering_document as _token_offering_document } from "./token_offering_document";
import type { token_offering_documentAttributes, token_offering_documentCreationAttributes } from "./token_offering_document";
import { token_offering_team as _token_offering_team } from "./token_offering_team";
import type { token_offering_teamAttributes, token_offering_teamCreationAttributes } from "./token_offering_team";
import { token_offering as _token_offering } from "./token_offering";
import type { token_offeringAttributes, token_offeringCreationAttributes } from "./token_offering";
import { token_order as _token_order } from "./token_order";
import type { token_orderAttributes, token_orderCreationAttributes } from "./token_order";
import { token_transaction as _token_transaction } from "./token_transaction";
import type { token_transactionAttributes, token_transactionCreationAttributes } from "./token_transaction";
import { token_valuation as _token_valuation } from "./token_valuation";
import type { token_valuationAttributes, token_valuationCreationAttributes } from "./token_valuation";
import { track_token_order_action as _track_token_order_action } from "./track_token_order_action";
import type { track_token_order_actionAttributes, track_token_order_actionCreationAttributes } from "./track_token_order_action";
import { user_device_token as _user_device_token } from "./user_device_token";
import type { user_device_tokenAttributes, user_device_tokenCreationAttributes } from "./user_device_token";
import { user_entity as _user_entity } from "./user_entity";
import type { user_entityAttributes, user_entityCreationAttributes } from "./user_entity";
import { user_identity as _user_identity } from "./user_identity";
import type { user_identityAttributes, user_identityCreationAttributes } from "./user_identity";
import { user_profile as _user_profile } from "./user_profile";
import type { user_profileAttributes, user_profileCreationAttributes } from "./user_profile";
import { wallet_token as _wallet_token } from "./wallet_token";
import type { wallet_tokenAttributes, wallet_tokenCreationAttributes } from "./wallet_token";

export {
  _asset as asset,
  _business_document as business_document,
  _customer_wallet as customer_wallet,
  _ekyc as ekyc,
  _entity as entity,
  _entity_investor as entity_investor,
  _individual_investor as individual_investor,
  _master_blockchain_network as master_blockchain_network,
  _master_business_sector as master_business_sector,
  _master_country as master_country,
  _master_ekc_status as master_ekc_status,
  _master_entity_investor_status as master_entity_investor_status,
  _master_entity_type as master_entity_type,
  _master_fund_agency as master_fund_agency,
  _master_fund_agency_rating as master_fund_agency_rating,
  _master_investor_type as master_investor_type,
  _master_order_status as master_order_status,
  _master_position as master_position,
  _master_region as master_region,
  _master_token_offering_status as master_token_offering_status,
  _master_token_status as master_token_status,
  _master_token_type as master_token_type,
  _master_transaction_status as master_transaction_status,
  _master_wallet_type as master_wallet_type,
  _offer_fund_rating as offer_fund_rating,
  _token_offering_allowed_country as token_offering_allowed_country,
  _token_offering_allowed_currency as token_offering_allowed_currency,
  _token_offering_document as token_offering_document,
  _token_offering_team as token_offering_team,
  _token_offering as token_offering,
  _token_order as token_order,
  _token_transaction as token_transaction,
  _token_valuation as token_valuation,
  _track_token_order_action as track_token_order_action,
  _user_device_token as user_device_token,
  _user_entity as user_entity,
  _user_identity as user_identity,
  _user_profile as user_profile,
  _wallet_token as wallet_token,
};

export type {
  assetAttributes,
  assetCreationAttributes,
  business_documentAttributes,
  business_documentCreationAttributes,
  customer_walletAttributes,
  customer_walletCreationAttributes,
  ekycAttributes,
  ekycCreationAttributes,
  entityAttributes,
  entityCreationAttributes,
  entity_investorAttributes,
  entity_investorCreationAttributes,
  individual_investorAttributes,
  individual_investorCreationAttributes,
  master_blockchain_networkAttributes,
  master_blockchain_networkCreationAttributes,
  master_business_sectorAttributes,
  master_business_sectorCreationAttributes,
  master_countryAttributes,
  master_countryCreationAttributes,
  master_ekc_statusAttributes,
  master_ekc_statusCreationAttributes,
  master_entity_investor_statusAttributes,
  master_entity_investor_statusCreationAttributes,
  master_entity_typeAttributes,
  master_entity_typeCreationAttributes,
  master_fund_agencyAttributes,
  master_fund_agencyCreationAttributes,
  master_fund_agency_ratingAttributes,
  master_fund_agency_ratingCreationAttributes,
  master_investor_typeAttributes,
  master_investor_typeCreationAttributes,
  master_order_statusAttributes,
  master_order_statusCreationAttributes,
  master_positionAttributes,
  master_positionCreationAttributes,
  master_regionAttributes,
  master_regionCreationAttributes,
  master_token_offering_statusAttributes,
  master_token_offering_statusCreationAttributes,
  master_token_statusAttributes,
  master_token_statusCreationAttributes,
  master_token_typeAttributes,
  master_token_typeCreationAttributes,
  master_transaction_statusAttributes,
  master_transaction_statusCreationAttributes,
  master_wallet_typeAttributes,
  master_wallet_typeCreationAttributes,
  offer_fund_ratingAttributes,
  offer_fund_ratingCreationAttributes,
  token_offering_allowed_countryAttributes,
  token_offering_allowed_countryCreationAttributes,
  token_offering_allowed_currencyAttributes,
  token_offering_allowed_currencyCreationAttributes,
  token_offering_documentAttributes,
  token_offering_documentCreationAttributes,
  token_offering_teamAttributes,
  token_offering_teamCreationAttributes,
  token_offeringAttributes,
  token_offeringCreationAttributes,
  token_orderAttributes,
  token_orderCreationAttributes,
  token_transactionAttributes,
  token_transactionCreationAttributes,
  token_valuationAttributes,
  token_valuationCreationAttributes,
  track_token_order_actionAttributes,
  track_token_order_actionCreationAttributes,
  user_device_tokenAttributes,
  user_device_tokenCreationAttributes,
  user_entityAttributes,
  user_entityCreationAttributes,
  user_identityAttributes,
  user_identityCreationAttributes,
  user_profileAttributes,
  user_profileCreationAttributes,
  wallet_tokenAttributes,
  wallet_tokenCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const asset = _asset.initModel(sequelize);
  const business_document = _business_document.initModel(sequelize);
  const customer_wallet = _customer_wallet.initModel(sequelize);
  const ekyc = _ekyc.initModel(sequelize);
  const entity = _entity.initModel(sequelize);
  const entity_investor = _entity_investor.initModel(sequelize);
  const individual_investor = _individual_investor.initModel(sequelize);
  const master_blockchain_network = _master_blockchain_network.initModel(sequelize);
  const master_business_sector = _master_business_sector.initModel(sequelize);
  const master_country = _master_country.initModel(sequelize);
  const master_ekc_status = _master_ekc_status.initModel(sequelize);
  const master_entity_investor_status = _master_entity_investor_status.initModel(sequelize);
  const master_entity_type = _master_entity_type.initModel(sequelize);
  const master_fund_agency = _master_fund_agency.initModel(sequelize);
  const master_fund_agency_rating = _master_fund_agency_rating.initModel(sequelize);
  const master_investor_type = _master_investor_type.initModel(sequelize);
  const master_order_status = _master_order_status.initModel(sequelize);
  const master_position = _master_position.initModel(sequelize);
  const master_region = _master_region.initModel(sequelize);
  const master_token_offering_status = _master_token_offering_status.initModel(sequelize);
  const master_token_status = _master_token_status.initModel(sequelize);
  const master_token_type = _master_token_type.initModel(sequelize);
  const master_transaction_status = _master_transaction_status.initModel(sequelize);
  const master_wallet_type = _master_wallet_type.initModel(sequelize);
  const offer_fund_rating = _offer_fund_rating.initModel(sequelize);
  const token_offering_allowed_country = _token_offering_allowed_country.initModel(sequelize);
  const token_offering_allowed_currency = _token_offering_allowed_currency.initModel(sequelize);
  const token_offering_document = _token_offering_document.initModel(sequelize);
  const token_offering_team = _token_offering_team.initModel(sequelize);
  const token_offering = _token_offering.initModel(sequelize);
  const token_order = _token_order.initModel(sequelize);
  const token_transaction = _token_transaction.initModel(sequelize);
  const token_valuation = _token_valuation.initModel(sequelize);
  const track_token_order_action = _track_token_order_action.initModel(sequelize);
  const user_device_token = _user_device_token.initModel(sequelize);
  const user_entity = _user_entity.initModel(sequelize);
  const user_identity = _user_identity.initModel(sequelize);
  const user_profile = _user_profile.initModel(sequelize);
  const wallet_token = _wallet_token.initModel(sequelize);

  business_document.belongsTo(asset, { as: "asset", foreignKey: "asset_id"});
  asset.hasMany(business_document, { as: "business_documents", foreignKey: "asset_id"});
  ekyc.belongsTo(asset, { as: "captured_asset", foreignKey: "captured_asset_id"});
  asset.hasMany(ekyc, { as: "ekycs", foreignKey: "captured_asset_id"});
  entity.belongsTo(asset, { as: "logo_asset", foreignKey: "logo_asset_id"});
  asset.hasMany(entity, { as: "entities", foreignKey: "logo_asset_id"});
  individual_investor.belongsTo(asset, { as: "investor_pic", foreignKey: "investor_pic_id"});
  asset.hasMany(individual_investor, { as: "individual_investors", foreignKey: "investor_pic_id"});
  token_offering_document.belongsTo(asset, { as: "document", foreignKey: "document_id"});
  asset.hasMany(token_offering_document, { as: "token_offering_documents", foreignKey: "document_id"});
  token_offering_team.belongsTo(asset, { as: "member_picture", foreignKey: "member_picture_id"});
  asset.hasMany(token_offering_team, { as: "token_offering_teams", foreignKey: "member_picture_id"});
  token_offering.belongsTo(asset, { as: "banner_asset", foreignKey: "banner_asset_id"});
  asset.hasMany(token_offering, { as: "token_offerings", foreignKey: "banner_asset_id"});
  token_offering.belongsTo(asset, { as: "logo_asset", foreignKey: "logo_asset_id"});
  asset.hasMany(token_offering, { as: "logo_asset_token_offerings", foreignKey: "logo_asset_id"});
  user_identity.belongsTo(asset, { as: "asset", foreignKey: "asset_id"});
  asset.hasMany(user_identity, { as: "user_identities", foreignKey: "asset_id"});
  wallet_token.belongsTo(customer_wallet, { as: "customer_wallet", foreignKey: "customer_wallet_id"});
  customer_wallet.hasMany(wallet_token, { as: "wallet_tokens", foreignKey: "customer_wallet_id"});
  business_document.belongsTo(entity, { as: "business", foreignKey: "business_id"});
  entity.hasMany(business_document, { as: "business_documents", foreignKey: "business_id"});
  customer_wallet.belongsTo(entity, { as: "investor_entity", foreignKey: "investor_entity_id"});
  entity.hasMany(customer_wallet, { as: "customer_wallets", foreignKey: "investor_entity_id"});
  entity_investor.belongsTo(entity, { as: "investor_entity", foreignKey: "investor_entity_id"});
  entity.hasMany(entity_investor, { as: "entity_investors", foreignKey: "investor_entity_id"});
  entity_investor.belongsTo(entity, { as: "issuer_entity", foreignKey: "issuer_entity_id"});
  entity.hasMany(entity_investor, { as: "issuer_entity_entity_investors", foreignKey: "issuer_entity_id"});
  token_offering.belongsTo(entity, { as: "issuer_entity", foreignKey: "issuer_entity_id"});
  entity.hasMany(token_offering, { as: "token_offerings", foreignKey: "issuer_entity_id"});
  token_order.belongsTo(entity, { as: "issuer_entity", foreignKey: "issuer_entity_id"});
  entity.hasMany(token_order, { as: "token_orders", foreignKey: "issuer_entity_id"});
  token_order.belongsTo(entity, { as: "receiver_entity", foreignKey: "receiver_entity_id"});
  entity.hasMany(token_order, { as: "receiver_entity_token_orders", foreignKey: "receiver_entity_id"});
  track_token_order_action.belongsTo(entity, { as: "user_entity", foreignKey: "user_entity_id"});
  entity.hasMany(track_token_order_action, { as: "track_token_order_actions", foreignKey: "user_entity_id"});
  customer_wallet.belongsTo(individual_investor, { as: "individual_investor", foreignKey: "individual_investor_id"});
  individual_investor.hasMany(customer_wallet, { as: "customer_wallets", foreignKey: "individual_investor_id"});
  entity_investor.belongsTo(individual_investor, { as: "individual_investor", foreignKey: "individual_investor_id"});
  individual_investor.hasMany(entity_investor, { as: "entity_investors", foreignKey: "individual_investor_id"});
  token_order.belongsTo(individual_investor, { as: "individual_receiving_investor", foreignKey: "individual_receiving_investor_id"});
  individual_investor.hasMany(token_order, { as: "token_orders", foreignKey: "individual_receiving_investor_id"});
  token_offering.belongsTo(master_blockchain_network, { as: "blockchain_network_master_blockchain_network", foreignKey: "blockchain_network"});
  master_blockchain_network.hasMany(token_offering, { as: "token_offerings", foreignKey: "blockchain_network"});
  entity.belongsTo(master_business_sector, { as: "business_sector", foreignKey: "business_sector_id"});
  master_business_sector.hasMany(entity, { as: "entities", foreignKey: "business_sector_id"});
  entity.belongsTo(master_country, { as: "country", foreignKey: "country_id"});
  master_country.hasMany(entity, { as: "entities", foreignKey: "country_id"});
  individual_investor.belongsTo(master_country, { as: "country", foreignKey: "country_id"});
  master_country.hasMany(individual_investor, { as: "individual_investors", foreignKey: "country_id"});
  token_offering_allowed_country.belongsTo(master_country, { as: "allowed_country", foreignKey: "allowed_country_id"});
  master_country.hasMany(token_offering_allowed_country, { as: "token_offering_allowed_countries", foreignKey: "allowed_country_id"});
  token_offering.belongsTo(master_country, { as: "jurisdiction_master_country", foreignKey: "jurisdiction"});
  master_country.hasMany(token_offering, { as: "token_offerings", foreignKey: "jurisdiction"});
  ekyc.belongsTo(master_ekc_status, { as: "status", foreignKey: "status_id"});
  master_ekc_status.hasMany(ekyc, { as: "ekycs", foreignKey: "status_id"});
  entity_investor.belongsTo(master_entity_investor_status, { as: "status", foreignKey: "status_id"});
  master_entity_investor_status.hasMany(entity_investor, { as: "entity_investors", foreignKey: "status_id"});
  entity.belongsTo(master_entity_type, { as: "entity_type", foreignKey: "entity_type_id"});
  master_entity_type.hasMany(entity, { as: "entities", foreignKey: "entity_type_id"});
  user_entity.belongsTo(master_entity_type, { as: "entity", foreignKey: "entity_id"});
  master_entity_type.hasMany(user_entity, { as: "user_entities", foreignKey: "entity_id"});
  offer_fund_rating.belongsTo(master_fund_agency, { as: "agency", foreignKey: "agency_id"});
  master_fund_agency.hasMany(offer_fund_rating, { as: "offer_fund_ratings", foreignKey: "agency_id"});
  offer_fund_rating.belongsTo(master_fund_agency_rating, { as: "rating", foreignKey: "rating_id"});
  master_fund_agency_rating.hasMany(offer_fund_rating, { as: "offer_fund_ratings", foreignKey: "rating_id"});
  entity_investor.belongsTo(master_investor_type, { as: "investor_type", foreignKey: "investor_type_id"});
  master_investor_type.hasMany(entity_investor, { as: "entity_investors", foreignKey: "investor_type_id"});
  user_profile.belongsTo(master_investor_type, { as: "investor_type", foreignKey: "investor_type_id"});
  master_investor_type.hasMany(user_profile, { as: "user_profiles", foreignKey: "investor_type_id"});
  token_order.belongsTo(master_order_status, { as: "status", foreignKey: "status_id"});
  master_order_status.hasMany(token_order, { as: "token_orders", foreignKey: "status_id"});
  track_token_order_action.belongsTo(master_order_status, { as: "action_status", foreignKey: "action_status_id"});
  master_order_status.hasMany(track_token_order_action, { as: "track_token_order_actions", foreignKey: "action_status_id"});
  user_profile.belongsTo(master_position, { as: "position", foreignKey: "position_id"});
  master_position.hasMany(user_profile, { as: "user_profiles", foreignKey: "position_id"});
  entity.belongsTo(master_region, { as: "region", foreignKey: "region_id"});
  master_region.hasMany(entity, { as: "entities", foreignKey: "region_id"});
  master_country.belongsTo(master_region, { as: "region", foreignKey: "region_id"});
  master_region.hasMany(master_country, { as: "master_countries", foreignKey: "region_id"});
  token_offering.belongsTo(master_token_offering_status, { as: "offer_status", foreignKey: "offer_status_id"});
  master_token_offering_status.hasMany(token_offering, { as: "token_offerings", foreignKey: "offer_status_id"});
  token_offering.belongsTo(master_token_status, { as: "status", foreignKey: "status_id"});
  master_token_status.hasMany(token_offering, { as: "token_offerings", foreignKey: "status_id"});
  token_offering.belongsTo(master_token_type, { as: "token_type", foreignKey: "token_type_id"});
  master_token_type.hasMany(token_offering, { as: "token_offerings", foreignKey: "token_type_id"});
  token_transaction.belongsTo(master_transaction_status, { as: "status", foreignKey: "status_id"});
  master_transaction_status.hasMany(token_transaction, { as: "token_transactions", foreignKey: "status_id"});
  customer_wallet.belongsTo(master_wallet_type, { as: "wallet_type", foreignKey: "wallet_type_id"});
  master_wallet_type.hasMany(customer_wallet, { as: "customer_wallets", foreignKey: "wallet_type_id"});
  offer_fund_rating.belongsTo(token_offering, { as: "offer_token", foreignKey: "offer_token_id"});
  token_offering.hasMany(offer_fund_rating, { as: "offer_fund_ratings", foreignKey: "offer_token_id"});
  token_offering_allowed_country.belongsTo(token_offering, { as: "token_offering", foreignKey: "token_offering_id"});
  token_offering.hasMany(token_offering_allowed_country, { as: "token_offering_allowed_countries", foreignKey: "token_offering_id"});
  token_offering_allowed_currency.belongsTo(token_offering, { as: "token_offering", foreignKey: "token_offering_id"});
  token_offering.hasMany(token_offering_allowed_currency, { as: "token_offering_allowed_currencies", foreignKey: "token_offering_id"});
  token_offering_document.belongsTo(token_offering, { as: "token_offering", foreignKey: "token_offering_id"});
  token_offering.hasMany(token_offering_document, { as: "token_offering_documents", foreignKey: "token_offering_id"});
  token_offering_team.belongsTo(token_offering, { as: "token_offering", foreignKey: "token_offering_id"});
  token_offering.hasMany(token_offering_team, { as: "token_offering_teams", foreignKey: "token_offering_id"});
  token_order.belongsTo(token_offering, { as: "token_offering", foreignKey: "token_offering_id"});
  token_offering.hasMany(token_order, { as: "token_orders", foreignKey: "token_offering_id"});
  token_valuation.belongsTo(token_offering, { as: "token_offering", foreignKey: "token_offering_id"});
  token_offering.hasMany(token_valuation, { as: "token_valuations", foreignKey: "token_offering_id"});
  wallet_token.belongsTo(token_offering, { as: "token_offering", foreignKey: "token_offering_id"});
  token_offering.hasMany(wallet_token, { as: "wallet_tokens", foreignKey: "token_offering_id"});
  token_transaction.belongsTo(token_order, { as: "order", foreignKey: "order_id"});
  token_order.hasMany(token_transaction, { as: "token_transactions", foreignKey: "order_id"});
  token_order.belongsTo(track_token_order_action, { as: "last_action_track", foreignKey: "last_action_track_id"});
  track_token_order_action.hasMany(token_order, { as: "token_orders", foreignKey: "last_action_track_id"});
  asset.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(asset, { as: "assets", foreignKey: "created_by"});
  asset.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(asset, { as: "updated_by_assets", foreignKey: "updated_by"});
  business_document.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(business_document, { as: "business_documents", foreignKey: "created_by"});
  business_document.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(business_document, { as: "updated_by_business_documents", foreignKey: "updated_by"});
  customer_wallet.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(customer_wallet, { as: "customer_wallets", foreignKey: "created_by"});
  customer_wallet.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(customer_wallet, { as: "updated_by_customer_wallets", foreignKey: "updated_by"});
  ekyc.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(ekyc, { as: "ekycs", foreignKey: "created_by"});
  ekyc.belongsTo(user_profile, { as: "kyc_profile", foreignKey: "kyc_profile_id"});
  user_profile.hasMany(ekyc, { as: "kyc_profile_ekycs", foreignKey: "kyc_profile_id"});
  ekyc.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(ekyc, { as: "updated_by_ekycs", foreignKey: "updated_by"});
  entity.belongsTo(user_profile, { as: "contact_profile", foreignKey: "contact_profile_id"});
  user_profile.hasMany(entity, { as: "entities", foreignKey: "contact_profile_id"});
  entity.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(entity, { as: "created_by_entities", foreignKey: "created_by"});
  entity.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(entity, { as: "updated_by_entities", foreignKey: "updated_by"});
  entity_investor.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(entity_investor, { as: "entity_investors", foreignKey: "created_by"});
  entity_investor.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(entity_investor, { as: "updated_by_entity_investors", foreignKey: "updated_by"});
  individual_investor.belongsTo(user_profile, { as: "contact_profile", foreignKey: "contact_profile_id"});
  user_profile.hasMany(individual_investor, { as: "individual_investors", foreignKey: "contact_profile_id"});
  individual_investor.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(individual_investor, { as: "created_by_individual_investors", foreignKey: "created_by"});
  individual_investor.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(individual_investor, { as: "updated_by_individual_investors", foreignKey: "updated_by"});
  token_offering_allowed_country.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(token_offering_allowed_country, { as: "token_offering_allowed_countries", foreignKey: "created_by"});
  token_offering_allowed_country.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(token_offering_allowed_country, { as: "updated_by_token_offering_allowed_countries", foreignKey: "updated_by"});
  token_offering_allowed_currency.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(token_offering_allowed_currency, { as: "token_offering_allowed_currencies", foreignKey: "created_by"});
  token_offering_allowed_currency.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(token_offering_allowed_currency, { as: "updated_by_token_offering_allowed_currencies", foreignKey: "updated_by"});
  token_offering_document.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(token_offering_document, { as: "token_offering_documents", foreignKey: "created_by"});
  token_offering_document.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(token_offering_document, { as: "updated_by_token_offering_documents", foreignKey: "updated_by"});
  token_offering_team.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(token_offering_team, { as: "token_offering_teams", foreignKey: "created_by"});
  token_offering_team.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(token_offering_team, { as: "updated_by_token_offering_teams", foreignKey: "updated_by"});
  token_offering.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(token_offering, { as: "token_offerings", foreignKey: "created_by"});
  token_offering.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(token_offering, { as: "updated_by_token_offerings", foreignKey: "updated_by"});
  token_order.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(token_order, { as: "token_orders", foreignKey: "created_by"});
  token_order.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(token_order, { as: "updated_by_token_orders", foreignKey: "updated_by"});
  token_transaction.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(token_transaction, { as: "token_transactions", foreignKey: "created_by"});
  token_transaction.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(token_transaction, { as: "updated_by_token_transactions", foreignKey: "updated_by"});
  token_valuation.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(token_valuation, { as: "token_valuations", foreignKey: "created_by"});
  token_valuation.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(token_valuation, { as: "updated_by_token_valuations", foreignKey: "updated_by"});
  track_token_order_action.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(track_token_order_action, { as: "track_token_order_actions", foreignKey: "created_by"});
  track_token_order_action.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(track_token_order_action, { as: "updated_by_track_token_order_actions", foreignKey: "updated_by"});
  track_token_order_action.belongsTo(user_profile, { as: "user_profile", foreignKey: "user_profile_id"});
  user_profile.hasMany(track_token_order_action, { as: "user_profile_track_token_order_actions", foreignKey: "user_profile_id"});
  user_device_token.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(user_device_token, { as: "user_device_tokens", foreignKey: "created_by"});
  user_device_token.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(user_device_token, { as: "updated_by_user_device_tokens", foreignKey: "updated_by"});
  user_device_token.belongsTo(user_profile, { as: "user_profile", foreignKey: "user_profile_id"});
  user_profile.hasMany(user_device_token, { as: "user_profile_user_device_tokens", foreignKey: "user_profile_id"});
  user_entity.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(user_entity, { as: "user_entities", foreignKey: "created_by"});
  user_entity.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(user_entity, { as: "updated_by_user_entities", foreignKey: "updated_by"});
  user_entity.belongsTo(user_profile, { as: "user_profile", foreignKey: "user_profile_id"});
  user_profile.hasMany(user_entity, { as: "user_profile_user_entities", foreignKey: "user_profile_id"});
  user_identity.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(user_identity, { as: "user_identities", foreignKey: "created_by"});
  user_identity.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(user_identity, { as: "updated_by_user_identities", foreignKey: "updated_by"});
  wallet_token.belongsTo(user_profile, { as: "created_by_user_profile", foreignKey: "created_by"});
  user_profile.hasMany(wallet_token, { as: "wallet_tokens", foreignKey: "created_by"});
  wallet_token.belongsTo(user_profile, { as: "updated_by_user_profile", foreignKey: "updated_by"});
  user_profile.hasMany(wallet_token, { as: "updated_by_wallet_tokens", foreignKey: "updated_by"});

  return {
    asset: asset,
    business_document: business_document,
    customer_wallet: customer_wallet,
    ekyc: ekyc,
    entity: entity,
    entity_investor: entity_investor,
    individual_investor: individual_investor,
    master_blockchain_network: master_blockchain_network,
    master_business_sector: master_business_sector,
    master_country: master_country,
    master_ekc_status: master_ekc_status,
    master_entity_investor_status: master_entity_investor_status,
    master_entity_type: master_entity_type,
    master_fund_agency: master_fund_agency,
    master_fund_agency_rating: master_fund_agency_rating,
    master_investor_type: master_investor_type,
    master_order_status: master_order_status,
    master_position: master_position,
    master_region: master_region,
    master_token_offering_status: master_token_offering_status,
    master_token_status: master_token_status,
    master_token_type: master_token_type,
    master_transaction_status: master_transaction_status,
    master_wallet_type: master_wallet_type,
    offer_fund_rating: offer_fund_rating,
    token_offering_allowed_country: token_offering_allowed_country,
    token_offering_allowed_currency: token_offering_allowed_currency,
    token_offering_document: token_offering_document,
    token_offering_team: token_offering_team,
    token_offering: token_offering,
    token_order: token_order,
    token_transaction: token_transaction,
    token_valuation: token_valuation,
    track_token_order_action: track_token_order_action,
    user_device_token: user_device_token,
    user_entity: user_entity,
    user_identity: user_identity,
    user_profile: user_profile,
    wallet_token: wallet_token,
  };
}
