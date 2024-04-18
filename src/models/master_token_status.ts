import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { token_offering, token_offeringId } from './token_offering';

export interface master_token_statusAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_token_statusPk = "id";
export type master_token_statusId = master_token_status[master_token_statusPk];
export type master_token_statusOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_token_statusCreationAttributes = Optional<master_token_statusAttributes, master_token_statusOptionalAttributes>;

export class master_token_status extends Model<master_token_statusAttributes, master_token_statusCreationAttributes> implements master_token_statusAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_token_status hasMany token_offering via status_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof master_token_status {
    return master_token_status.init({
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
    tableName: 'master_token_status',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_token_status_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
