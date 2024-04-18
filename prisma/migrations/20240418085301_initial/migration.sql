-- CreateEnum
CREATE TYPE "investment_types" AS ENUM ('by_token_volume', 'by_investment_value');

-- CreateEnum
CREATE TYPE "order_types" AS ENUM ('subscription', 'redemption');

-- CreateEnum
CREATE TYPE "transaction_types" AS ENUM ('mint', 'burn');

-- CreateTable
CREATE TABLE "assets" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "type" TEXT,
    "url" TEXT,
    "order" INTEGER,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_documents" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "business_id" UUID,
    "asset_id" UUID,
    "asset_type" TEXT,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_wallets" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "wallet_type_id" INTEGER,
    "wallet_address" TEXT,
    "investor_entity_id" UUID,
    "individual_investor_id" UUID,
    "is_authenticated" BOOLEAN,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ekyc" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "kyc_profile_id" UUID,
    "captured_asset_id" UUID,
    "is_processed" BOOLEAN,
    "is_verified" BOOLEAN,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ekyc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entities" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "entity_type_id" INTEGER,
    "legal_name" TEXT,
    "lei_number" TEXT,
    "legal_address" TEXT,
    "zipcode" TEXT,
    "country_id" INTEGER,
    "logo_asset_id" UUID,
    "business_sector_id" INTEGER,
    "contact_profile_id" UUID,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entity_investors" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "investor_type_id" INTEGER,
    "investor_entity_id" UUID,
    "individual_investor_id" UUID,
    "status_id" INTEGER,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entity_investors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "individual_investors" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "contact_profile_id" UUID,
    "investor_pic_id" UUID,
    "legal_address" TEXT,
    "zipcode" TEXT,
    "country_id" INTEGER,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "individual_investors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_blockchain_networks" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_blockchain_networks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_business_sectors" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_business_sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "iso3" TEXT,
    "phone_code" TEXT,
    "currency" TEXT,
    "currency_code" TEXT,
    "emoji" TEXT,
    "emoji_unicode" TEXT,
    "region_id" INTEGER,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_entity_investor_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_entity_investor_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_entity_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_entity_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_investor_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_investor_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_order_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_regions" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_token_offering_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_token_offering_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_token_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_token_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_token_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_token_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_transaction_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_transaction_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_wallet_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_wallet_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_offering_allowed_countries" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "token_offering_id" UUID,
    "allowed_country_id" INTEGER,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_offering_allowed_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_offering_allowed_currencies" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "token_offering_id" UUID,
    "currency" TEXT,
    "currency_code" TEXT,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_offering_allowed_currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_offering_documents" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "token_offering_id" UUID,
    "document_id" UUID,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_offering_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_offering_teams" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "token_offering_id" UUID,
    "member_name" TEXT,
    "member_title" TEXT,
    "member_picture_id" UUID,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_offering_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_offerings" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "issuer_entity_id" UUID,
    "name" TEXT,
    "description" TEXT,
    "isin_number" TEXT,
    "symbol" TEXT,
    "token_type_id" INTEGER,
    "base_currency" TEXT,
    "base_currency_code" TEXT,
    "blockchain_network" INTEGER,
    "logo_asset_id" UUID,
    "banner_asset_id" UUID,
    "offering_price" DECIMAL,
    "jurisdiction" INTEGER,
    "start_date" DATE,
    "end_date" DATE,
    "minimum_investment_limit" DECIMAL,
    "maximum_investment_limit" DECIMAL,
    "bank_name" TEXT,
    "bank_account_name" TEXT,
    "swift_bic_no" TEXT,
    "iban_no" TEXT,
    "is_fund_rating_enabled" BOOLEAN,
    "is_projected_rate_of_return_enabled" BOOLEAN,
    "is_expected_annual_perc_yield_enabled" BOOLEAN,
    "is_payback_period_enabled" BOOLEAN,
    "is_eligible_for_collateral_enabled" BOOLEAN,
    "offer_status_id" INTEGER,
    "status_id" INTEGER,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_offerings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_orders" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "type" "order_types",
    "investment_type" "investment_types",
    "issuer_entity_id" UUID,
    "receiver_entity_id" UUID,
    "individual_receiving_investor_id" UUID,
    "token_offering_id" UUID,
    "currency" TEXT,
    "currency_code" TEXT,
    "ordered_tokens" DECIMAL,
    "price_per_token" DECIMAL,
    "net_investment_value" DECIMAL,
    "fee" DECIMAL,
    "total_paid" DECIMAL,
    "payment_reference" TEXT,
    "status_id" INTEGER,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_transactions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "type" "transaction_types",
    "order_id" UUID,
    "amount" DECIMAL,
    "sender_balance" DECIMAL,
    "receiver_balance" DECIMAL,
    "total_supply" DECIMAL,
    "transaction_hash" TEXT,
    "status_id" INTEGER,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_identities" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "asset_id" UUID,
    "alias" TEXT,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_identities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "position" TEXT,
    "email_id" TEXT,
    "mobile_no_std_code" TEXT,
    "mobile_no" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_tokens" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "customer_wallet_id" UUID,
    "token_offering_id" UUID,
    "invested_amount" DECIMAL,
    "value" DECIMAL,
    "pledged" DECIMAL,
    "pending_tokens" DECIMAL,
    "available_tokens" DECIMAL,
    "is_active" BOOLEAN,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_documents" ADD CONSTRAINT "business_documents_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_documents" ADD CONSTRAINT "business_documents_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "entities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_documents" ADD CONSTRAINT "business_documents_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_documents" ADD CONSTRAINT "business_documents_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_wallets" ADD CONSTRAINT "customer_wallets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_wallets" ADD CONSTRAINT "customer_wallets_individual_investor_id_fkey" FOREIGN KEY ("individual_investor_id") REFERENCES "individual_investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_wallets" ADD CONSTRAINT "customer_wallets_investor_entity_id_fkey" FOREIGN KEY ("investor_entity_id") REFERENCES "entities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_wallets" ADD CONSTRAINT "customer_wallets_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_wallets" ADD CONSTRAINT "customer_wallets_wallet_type_id_fkey" FOREIGN KEY ("wallet_type_id") REFERENCES "master_wallet_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ekyc" ADD CONSTRAINT "ekyc_captured_asset_id_fkey" FOREIGN KEY ("captured_asset_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ekyc" ADD CONSTRAINT "ekyc_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ekyc" ADD CONSTRAINT "ekyc_kyc_profile_id_fkey" FOREIGN KEY ("kyc_profile_id") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ekyc" ADD CONSTRAINT "ekyc_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_business_sector_id_fkey" FOREIGN KEY ("business_sector_id") REFERENCES "master_business_sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_contact_profile_id_fkey" FOREIGN KEY ("contact_profile_id") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "master_countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_entity_type_id_fkey" FOREIGN KEY ("entity_type_id") REFERENCES "master_entity_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_logo_asset_id_fkey" FOREIGN KEY ("logo_asset_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entity_investors" ADD CONSTRAINT "entity_investors_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entity_investors" ADD CONSTRAINT "entity_investors_individual_investor_id_fkey" FOREIGN KEY ("individual_investor_id") REFERENCES "individual_investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entity_investors" ADD CONSTRAINT "entity_investors_investor_entity_id_fkey" FOREIGN KEY ("investor_entity_id") REFERENCES "entities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entity_investors" ADD CONSTRAINT "entity_investors_investor_type_id_fkey" FOREIGN KEY ("investor_type_id") REFERENCES "master_investor_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entity_investors" ADD CONSTRAINT "entity_investors_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "master_entity_investor_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entity_investors" ADD CONSTRAINT "entity_investors_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "individual_investors" ADD CONSTRAINT "individual_investors_contact_profile_id_fkey" FOREIGN KEY ("contact_profile_id") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "individual_investors" ADD CONSTRAINT "individual_investors_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "master_countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "individual_investors" ADD CONSTRAINT "individual_investors_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "individual_investors" ADD CONSTRAINT "individual_investors_investor_pic_id_fkey" FOREIGN KEY ("investor_pic_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "individual_investors" ADD CONSTRAINT "individual_investors_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "master_countries" ADD CONSTRAINT "master_countries_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "master_regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_allowed_countries" ADD CONSTRAINT "token_offering_allowed_countries_allowed_country_id_fkey" FOREIGN KEY ("allowed_country_id") REFERENCES "master_countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_allowed_countries" ADD CONSTRAINT "token_offering_allowed_countries_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_allowed_countries" ADD CONSTRAINT "token_offering_allowed_countries_token_offering_id_fkey" FOREIGN KEY ("token_offering_id") REFERENCES "token_offerings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_allowed_countries" ADD CONSTRAINT "token_offering_allowed_countries_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_allowed_currencies" ADD CONSTRAINT "token_offering_allowed_currencies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_allowed_currencies" ADD CONSTRAINT "token_offering_allowed_currencies_token_offering_id_fkey" FOREIGN KEY ("token_offering_id") REFERENCES "token_offerings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_allowed_currencies" ADD CONSTRAINT "token_offering_allowed_currencies_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_documents" ADD CONSTRAINT "token_offering_documents_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_documents" ADD CONSTRAINT "token_offering_documents_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_documents" ADD CONSTRAINT "token_offering_documents_token_offering_id_fkey" FOREIGN KEY ("token_offering_id") REFERENCES "token_offerings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_documents" ADD CONSTRAINT "token_offering_documents_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_teams" ADD CONSTRAINT "token_offering_teams_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_teams" ADD CONSTRAINT "token_offering_teams_member_picture_id_fkey" FOREIGN KEY ("member_picture_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_teams" ADD CONSTRAINT "token_offering_teams_token_offering_id_fkey" FOREIGN KEY ("token_offering_id") REFERENCES "token_offerings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offering_teams" ADD CONSTRAINT "token_offering_teams_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offerings" ADD CONSTRAINT "token_offerings_banner_asset_id_fkey" FOREIGN KEY ("banner_asset_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offerings" ADD CONSTRAINT "token_offerings_blockchain_network_fkey" FOREIGN KEY ("blockchain_network") REFERENCES "master_blockchain_networks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offerings" ADD CONSTRAINT "token_offerings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offerings" ADD CONSTRAINT "token_offerings_issuer_entity_id_fkey" FOREIGN KEY ("issuer_entity_id") REFERENCES "entities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offerings" ADD CONSTRAINT "token_offerings_jurisdiction_fkey" FOREIGN KEY ("jurisdiction") REFERENCES "master_countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offerings" ADD CONSTRAINT "token_offerings_logo_asset_id_fkey" FOREIGN KEY ("logo_asset_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offerings" ADD CONSTRAINT "token_offerings_offer_status_id_fkey" FOREIGN KEY ("offer_status_id") REFERENCES "master_token_offering_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offerings" ADD CONSTRAINT "token_offerings_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "master_token_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offerings" ADD CONSTRAINT "token_offerings_token_type_id_fkey" FOREIGN KEY ("token_type_id") REFERENCES "master_token_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_offerings" ADD CONSTRAINT "token_offerings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_orders" ADD CONSTRAINT "token_orders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_orders" ADD CONSTRAINT "token_orders_individual_receiving_investor_id_fkey" FOREIGN KEY ("individual_receiving_investor_id") REFERENCES "individual_investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_orders" ADD CONSTRAINT "token_orders_issuer_entity_id_fkey" FOREIGN KEY ("issuer_entity_id") REFERENCES "entities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_orders" ADD CONSTRAINT "token_orders_receiver_entity_id_fkey" FOREIGN KEY ("receiver_entity_id") REFERENCES "entities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_orders" ADD CONSTRAINT "token_orders_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "master_order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_orders" ADD CONSTRAINT "token_orders_token_offering_id_fkey" FOREIGN KEY ("token_offering_id") REFERENCES "token_offerings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_orders" ADD CONSTRAINT "token_orders_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_transactions" ADD CONSTRAINT "token_transactions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_transactions" ADD CONSTRAINT "token_transactions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "token_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_transactions" ADD CONSTRAINT "token_transactions_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "master_transaction_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token_transactions" ADD CONSTRAINT "token_transactions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_identities" ADD CONSTRAINT "user_identities_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_identities" ADD CONSTRAINT "user_identities_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_identities" ADD CONSTRAINT "user_identities_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wallet_tokens" ADD CONSTRAINT "wallet_tokens_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wallet_tokens" ADD CONSTRAINT "wallet_tokens_customer_wallet_id_fkey" FOREIGN KEY ("customer_wallet_id") REFERENCES "customer_wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wallet_tokens" ADD CONSTRAINT "wallet_tokens_token_offering_id_fkey" FOREIGN KEY ("token_offering_id") REFERENCES "token_offerings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wallet_tokens" ADD CONSTRAINT "wallet_tokens_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
