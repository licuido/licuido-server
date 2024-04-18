import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { token_order, token_orderId } from './token_order';

export interface master_order_statusAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_order_statusPk = "id";
export type master_order_statusId = master_order_status[master_order_statusPk];
export type master_order_statusOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_order_statusCreationAttributes = Optional<master_order_statusAttributes, master_order_statusOptionalAttributes>;

export class master_order_status extends Model<master_order_statusAttributes, master_order_statusCreationAttributes> implements master_order_statusAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_order_status hasMany token_order via status_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof master_order_status {
    return master_order_status.init({
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
    tableName: 'master_order_status',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_order_status_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
