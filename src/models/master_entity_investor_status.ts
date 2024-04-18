import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity_investor, entity_investorId } from './entity_investor';

export interface master_entity_investor_statusAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_entity_investor_statusPk = "id";
export type master_entity_investor_statusId = master_entity_investor_status[master_entity_investor_statusPk];
export type master_entity_investor_statusOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_entity_investor_statusCreationAttributes = Optional<master_entity_investor_statusAttributes, master_entity_investor_statusOptionalAttributes>;

export class master_entity_investor_status extends Model<master_entity_investor_statusAttributes, master_entity_investor_statusCreationAttributes> implements master_entity_investor_statusAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_entity_investor_status hasMany entity_investor via status_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof master_entity_investor_status {
    return master_entity_investor_status.init({
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
    tableName: 'master_entity_investor_status',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_entity_investor_status_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
