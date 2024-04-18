import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity_investor, entity_investorId } from './entity_investor';

export interface master_investor_typeAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_investor_typePk = "id";
export type master_investor_typeId = master_investor_type[master_investor_typePk];
export type master_investor_typeOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_investor_typeCreationAttributes = Optional<master_investor_typeAttributes, master_investor_typeOptionalAttributes>;

export class master_investor_type extends Model<master_investor_typeAttributes, master_investor_typeCreationAttributes> implements master_investor_typeAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_investor_type hasMany entity_investor via investor_type_id
  entity_investors!: entity_investor[];
  getEntity_investors!: Sequelize.HasManyGetAssociationsMixin<entity_investor>;
  setEntity_investors!: Sequelize.HasManySetAssociationsMixin<entity_investor, entity_investorId>;
  addEntity_investor!: Sequelize.HasManyAddAssociationMixin<entity_investor, entity_investorId>;
  addEntity_investors!: Sequelize.HasManyAddAssociationsMixin<entity_investor, entity_investorId>;
  createEntity_investor!: Sequelize.HasManyCreateAssociationMixin<entity_investor>;
  removeEntity_investor!: Sequelize.HasManyRemoveAssociationMixin<entity_investor, entity_investorId>;
  removeEntity_investors!: Sequelize.HasManyRemoveAssociationsMixin<entity_investor, entity_investorId>;
  hasEntity_investor!: Sequelize.HasManyHasAssociationMixin<entity_investor, entity_investorId>;
  hasEntity_investors!: Sequelize.HasManyHasAssociationsMixin<entity_investor, entity_investorId>;
  countEntity_investors!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof master_investor_type {
    return master_investor_type.init({
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
    tableName: 'master_investor_types',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_investor_types_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
