import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { master_transaction_status, master_transaction_statusId } from './master_transaction_status';
import type { token_order, token_orderId } from './token_order';
import type { user_profile, user_profileId } from './user_profile';

export interface token_transactionAttributes {
  id: string;
  type?: "mint" | "burn";
  order_id?: string;
  amount?: number;
  sender_balance?: number;
  receiver_balance?: number;
  total_supply?: number;
  transaction_hash?: string;
  status_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type token_transactionPk = "id";
export type token_transactionId = token_transaction[token_transactionPk];
export type token_transactionOptionalAttributes = "id" | "type" | "order_id" | "amount" | "sender_balance" | "receiver_balance" | "total_supply" | "transaction_hash" | "status_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type token_transactionCreationAttributes = Optional<token_transactionAttributes, token_transactionOptionalAttributes>;

export class token_transaction extends Model<token_transactionAttributes, token_transactionCreationAttributes> implements token_transactionAttributes {
  id!: string;
  type?: "mint" | "burn";
  order_id?: string;
  amount?: number;
  sender_balance?: number;
  receiver_balance?: number;
  total_supply?: number;
  transaction_hash?: string;
  status_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // token_transaction belongsTo master_transaction_status via status_id
  status!: master_transaction_status;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<master_transaction_status>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<master_transaction_status, master_transaction_statusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<master_transaction_status>;
  // token_transaction belongsTo token_order via order_id
  order!: token_order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<token_order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<token_order, token_orderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<token_order>;
  // token_transaction belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // token_transaction belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof token_transaction {
    return token_transaction.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM("mint","burn"),
      allowNull: true
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'token_orders',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sender_balance: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    receiver_balance: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total_supply: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    transaction_hash: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_transaction_status',
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
    tableName: 'token_transactions',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "token_transactions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
