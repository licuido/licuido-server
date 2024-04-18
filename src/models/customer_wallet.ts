import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity, entityId } from './entity';
import type { individual_investor, individual_investorId } from './individual_investor';
import type { master_wallet_type, master_wallet_typeId } from './master_wallet_type';
import type { user_profile, user_profileId } from './user_profile';
import type { wallet_token, wallet_tokenId } from './wallet_token';

export interface customer_walletAttributes {
  id: string;
  wallet_type_id?: number;
  wallet_address?: string;
  investor_entity_id?: string;
  individual_investor_id?: string;
  is_authenticated?: boolean;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type customer_walletPk = "id";
export type customer_walletId = customer_wallet[customer_walletPk];
export type customer_walletOptionalAttributes = "id" | "wallet_type_id" | "wallet_address" | "investor_entity_id" | "individual_investor_id" | "is_authenticated" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type customer_walletCreationAttributes = Optional<customer_walletAttributes, customer_walletOptionalAttributes>;

export class customer_wallet extends Model<customer_walletAttributes, customer_walletCreationAttributes> implements customer_walletAttributes {
  id!: string;
  wallet_type_id?: number;
  wallet_address?: string;
  investor_entity_id?: string;
  individual_investor_id?: string;
  is_authenticated?: boolean;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // customer_wallet hasMany wallet_token via customer_wallet_id
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
  // customer_wallet belongsTo entity via investor_entity_id
  investor_entity!: entity;
  getInvestor_entity!: Sequelize.BelongsToGetAssociationMixin<entity>;
  setInvestor_entity!: Sequelize.BelongsToSetAssociationMixin<entity, entityId>;
  createInvestor_entity!: Sequelize.BelongsToCreateAssociationMixin<entity>;
  // customer_wallet belongsTo individual_investor via individual_investor_id
  individual_investor!: individual_investor;
  getIndividual_investor!: Sequelize.BelongsToGetAssociationMixin<individual_investor>;
  setIndividual_investor!: Sequelize.BelongsToSetAssociationMixin<individual_investor, individual_investorId>;
  createIndividual_investor!: Sequelize.BelongsToCreateAssociationMixin<individual_investor>;
  // customer_wallet belongsTo master_wallet_type via wallet_type_id
  wallet_type!: master_wallet_type;
  getWallet_type!: Sequelize.BelongsToGetAssociationMixin<master_wallet_type>;
  setWallet_type!: Sequelize.BelongsToSetAssociationMixin<master_wallet_type, master_wallet_typeId>;
  createWallet_type!: Sequelize.BelongsToCreateAssociationMixin<master_wallet_type>;
  // customer_wallet belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // customer_wallet belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof customer_wallet {
    return customer_wallet.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    wallet_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_wallet_types',
        key: 'id'
      }
    },
    wallet_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    investor_entity_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    individual_investor_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'individual_investors',
        key: 'id'
      }
    },
    is_authenticated: {
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
    tableName: 'customer_wallets',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "customer_wallets_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
