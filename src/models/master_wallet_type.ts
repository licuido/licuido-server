import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { customer_wallet, customer_walletId } from './customer_wallet';

export interface master_wallet_typeAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_wallet_typePk = "id";
export type master_wallet_typeId = master_wallet_type[master_wallet_typePk];
export type master_wallet_typeOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_wallet_typeCreationAttributes = Optional<master_wallet_typeAttributes, master_wallet_typeOptionalAttributes>;

export class master_wallet_type extends Model<master_wallet_typeAttributes, master_wallet_typeCreationAttributes> implements master_wallet_typeAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_wallet_type hasMany customer_wallet via wallet_type_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof master_wallet_type {
    return master_wallet_type.init({
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
    tableName: 'master_wallet_types',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_wallet_types_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
