import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { customer_wallet, customer_walletId } from './customer_wallet';
import type { token_offering, token_offeringId } from './token_offering';
import type { user_profile, user_profileId } from './user_profile';

export interface wallet_tokenAttributes {
  id: string;
  customer_wallet_id?: string;
  token_offering_id?: string;
  invested_amount?: number;
  value?: number;
  pledged?: number;
  pending_tokens?: number;
  available_tokens?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type wallet_tokenPk = "id";
export type wallet_tokenId = wallet_token[wallet_tokenPk];
export type wallet_tokenOptionalAttributes = "id" | "customer_wallet_id" | "token_offering_id" | "invested_amount" | "value" | "pledged" | "pending_tokens" | "available_tokens" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type wallet_tokenCreationAttributes = Optional<wallet_tokenAttributes, wallet_tokenOptionalAttributes>;

export class wallet_token extends Model<wallet_tokenAttributes, wallet_tokenCreationAttributes> implements wallet_tokenAttributes {
  id!: string;
  customer_wallet_id?: string;
  token_offering_id?: string;
  invested_amount?: number;
  value?: number;
  pledged?: number;
  pending_tokens?: number;
  available_tokens?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // wallet_token belongsTo customer_wallet via customer_wallet_id
  customer_wallet!: customer_wallet;
  getCustomer_wallet!: Sequelize.BelongsToGetAssociationMixin<customer_wallet>;
  setCustomer_wallet!: Sequelize.BelongsToSetAssociationMixin<customer_wallet, customer_walletId>;
  createCustomer_wallet!: Sequelize.BelongsToCreateAssociationMixin<customer_wallet>;
  // wallet_token belongsTo token_offering via token_offering_id
  token_offering!: token_offering;
  getToken_offering!: Sequelize.BelongsToGetAssociationMixin<token_offering>;
  setToken_offering!: Sequelize.BelongsToSetAssociationMixin<token_offering, token_offeringId>;
  createToken_offering!: Sequelize.BelongsToCreateAssociationMixin<token_offering>;
  // wallet_token belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // wallet_token belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof wallet_token {
    return wallet_token.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customer_wallet_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'customer_wallets',
        key: 'id'
      }
    },
    token_offering_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'token_offerings',
        key: 'id'
      }
    },
    invested_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pledged: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pending_tokens: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    available_tokens: {
      type: DataTypes.DECIMAL,
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
    tableName: 'wallet_tokens',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "wallet_tokens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
