import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { token_transaction, token_transactionId } from './token_transaction';

export interface master_transaction_statusAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_transaction_statusPk = "id";
export type master_transaction_statusId = master_transaction_status[master_transaction_statusPk];
export type master_transaction_statusOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_transaction_statusCreationAttributes = Optional<master_transaction_statusAttributes, master_transaction_statusOptionalAttributes>;

export class master_transaction_status extends Model<master_transaction_statusAttributes, master_transaction_statusCreationAttributes> implements master_transaction_statusAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_transaction_status hasMany token_transaction via status_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof master_transaction_status {
    return master_transaction_status.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'master_transaction_status',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_transaction_status_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
