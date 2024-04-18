import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { token_offering, token_offeringId } from './token_offering';

export interface master_blockchain_networkAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_blockchain_networkPk = "id";
export type master_blockchain_networkId = master_blockchain_network[master_blockchain_networkPk];
export type master_blockchain_networkOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_blockchain_networkCreationAttributes = Optional<master_blockchain_networkAttributes, master_blockchain_networkOptionalAttributes>;

export class master_blockchain_network extends Model<master_blockchain_networkAttributes, master_blockchain_networkCreationAttributes> implements master_blockchain_networkAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_blockchain_network hasMany token_offering via blockchain_network
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

  static initModel(sequelize: Sequelize.Sequelize): typeof master_blockchain_network {
    return master_blockchain_network.init({
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
    tableName: 'master_blockchain_networks',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_blockchain_networks_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
