import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity, entityId } from './entity';
import type { individual_investor, individual_investorId } from './individual_investor';
import type { master_order_status, master_order_statusId } from './master_order_status';
import type { token_offering, token_offeringId } from './token_offering';
import type { token_transaction, token_transactionId } from './token_transaction';
import type { track_token_order_action, track_token_order_actionId } from './track_token_order_action';
import type { user_profile, user_profileId } from './user_profile';

export interface token_orderAttributes {
  id: string;
  type?: "subscription" | "redemption";
  investment_type?: "by_token_volume" | "by_investment_value";
  issuer_entity_id?: string;
  receiver_entity_id?: string;
  individual_receiving_investor_id?: string;
  token_offering_id?: string;
  currency?: string;
  currency_code?: string;
  ordered_tokens?: number;
  price_per_token?: number;
  net_investment_value?: number;
  fee?: number;
  total_paid?: number;
  payment_reference?: string;
  status_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
  bank_name?: string;
  bank_account_name?: string;
  swift_bic_no?: string;
  iban_no?: string;
  default_currency?: string;
  default_currency_code?: string;
  net_investment_value_in_euro?: number;
  last_action_track_id?: string;
  recived_amount_in_euro?: number;
  fulfilled_by?: "admin" | "issuer";
  is_payment_confirmed?: boolean;
  reason_for_reject?: string;
  rejected_blockchain_reference_id?: string;
  remarks?: string;
  net_investment_value_by_token?: number;
  recived_amount_by_token?: number;
}

export type token_orderPk = "id";
export type token_orderId = token_order[token_orderPk];
export type token_orderOptionalAttributes = "id" | "type" | "investment_type" | "issuer_entity_id" | "receiver_entity_id" | "individual_receiving_investor_id" | "token_offering_id" | "currency" | "currency_code" | "ordered_tokens" | "price_per_token" | "net_investment_value" | "fee" | "total_paid" | "payment_reference" | "status_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at" | "bank_name" | "bank_account_name" | "swift_bic_no" | "iban_no" | "default_currency" | "default_currency_code" | "net_investment_value_in_euro" | "last_action_track_id" | "recived_amount_in_euro" | "fulfilled_by" | "is_payment_confirmed" | "reason_for_reject" | "rejected_blockchain_reference_id" | "remarks" | "net_investment_value_by_token" | "recived_amount_by_token";
export type token_orderCreationAttributes = Optional<token_orderAttributes, token_orderOptionalAttributes>;

export class token_order extends Model<token_orderAttributes, token_orderCreationAttributes> implements token_orderAttributes {
  id!: string;
  type?: "subscription" | "redemption";
  investment_type?: "by_token_volume" | "by_investment_value";
  issuer_entity_id?: string;
  receiver_entity_id?: string;
  individual_receiving_investor_id?: string;
  token_offering_id?: string;
  currency?: string;
  currency_code?: string;
  ordered_tokens?: number;
  price_per_token?: number;
  net_investment_value?: number;
  fee?: number;
  total_paid?: number;
  payment_reference?: string;
  status_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
  bank_name?: string;
  bank_account_name?: string;
  swift_bic_no?: string;
  iban_no?: string;
  default_currency?: string;
  default_currency_code?: string;
  net_investment_value_in_euro?: number;
  last_action_track_id?: string;
  recived_amount_in_euro?: number;
  fulfilled_by?: "admin" | "issuer";
  is_payment_confirmed?: boolean;
  reason_for_reject?: string;
  rejected_blockchain_reference_id?: string;
  remarks?: string;
  net_investment_value_by_token?: number;
  recived_amount_by_token?: number;

  // token_order belongsTo entity via issuer_entity_id
  issuer_entity!: entity;
  getIssuer_entity!: Sequelize.BelongsToGetAssociationMixin<entity>;
  setIssuer_entity!: Sequelize.BelongsToSetAssociationMixin<entity, entityId>;
  createIssuer_entity!: Sequelize.BelongsToCreateAssociationMixin<entity>;
  // token_order belongsTo entity via receiver_entity_id
  receiver_entity!: entity;
  getReceiver_entity!: Sequelize.BelongsToGetAssociationMixin<entity>;
  setReceiver_entity!: Sequelize.BelongsToSetAssociationMixin<entity, entityId>;
  createReceiver_entity!: Sequelize.BelongsToCreateAssociationMixin<entity>;
  // token_order belongsTo individual_investor via individual_receiving_investor_id
  individual_receiving_investor!: individual_investor;
  getIndividual_receiving_investor!: Sequelize.BelongsToGetAssociationMixin<individual_investor>;
  setIndividual_receiving_investor!: Sequelize.BelongsToSetAssociationMixin<individual_investor, individual_investorId>;
  createIndividual_receiving_investor!: Sequelize.BelongsToCreateAssociationMixin<individual_investor>;
  // token_order belongsTo master_order_status via status_id
  status!: master_order_status;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<master_order_status>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<master_order_status, master_order_statusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<master_order_status>;
  // token_order belongsTo token_offering via token_offering_id
  token_offering!: token_offering;
  getToken_offering!: Sequelize.BelongsToGetAssociationMixin<token_offering>;
  setToken_offering!: Sequelize.BelongsToSetAssociationMixin<token_offering, token_offeringId>;
  createToken_offering!: Sequelize.BelongsToCreateAssociationMixin<token_offering>;
  // token_order hasMany token_transaction via order_id
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
  // token_order belongsTo track_token_order_action via last_action_track_id
  last_action_track!: track_token_order_action;
  getLast_action_track!: Sequelize.BelongsToGetAssociationMixin<track_token_order_action>;
  setLast_action_track!: Sequelize.BelongsToSetAssociationMixin<track_token_order_action, track_token_order_actionId>;
  createLast_action_track!: Sequelize.BelongsToCreateAssociationMixin<track_token_order_action>;
  // token_order belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // token_order belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof token_order {
    return token_order.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM("subscription","redemption"),
      allowNull: true
    },
    investment_type: {
      type: DataTypes.ENUM("by_token_volume","by_investment_value"),
      allowNull: true
    },
    issuer_entity_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    receiver_entity_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    individual_receiving_investor_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'individual_investors',
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
    currency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    currency_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ordered_tokens: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    price_per_token: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    net_investment_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total_paid: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    payment_reference: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_order_status',
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
    default_currency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    default_currency_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    net_investment_value_in_euro: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    last_action_track_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'track_token_order_actions',
        key: 'id'
      }
    },
    recived_amount_in_euro: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    fulfilled_by: {
      type: DataTypes.ENUM("admin","issuer"),
      allowNull: true
    },
    is_payment_confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    reason_for_reject: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rejected_blockchain_reference_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    net_investment_value_by_token: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    recived_amount_by_token: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'token_orders',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "token_orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
