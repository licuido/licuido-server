import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity, entityId } from './entity';

export interface master_entity_typeAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_entity_typePk = "id";
export type master_entity_typeId = master_entity_type[master_entity_typePk];
export type master_entity_typeOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_entity_typeCreationAttributes = Optional<master_entity_typeAttributes, master_entity_typeOptionalAttributes>;

export class master_entity_type extends Model<master_entity_typeAttributes, master_entity_typeCreationAttributes> implements master_entity_typeAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_entity_type hasMany entity via entity_type_id
  entities!: entity[];
  getEntities!: Sequelize.HasManyGetAssociationsMixin<entity>;
  setEntities!: Sequelize.HasManySetAssociationsMixin<entity, entityId>;
  addEntity!: Sequelize.HasManyAddAssociationMixin<entity, entityId>;
  addEntities!: Sequelize.HasManyAddAssociationsMixin<entity, entityId>;
  createEntity!: Sequelize.HasManyCreateAssociationMixin<entity>;
  removeEntity!: Sequelize.HasManyRemoveAssociationMixin<entity, entityId>;
  removeEntities!: Sequelize.HasManyRemoveAssociationsMixin<entity, entityId>;
  hasEntity!: Sequelize.HasManyHasAssociationMixin<entity, entityId>;
  hasEntities!: Sequelize.HasManyHasAssociationsMixin<entity, entityId>;
  countEntities!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof master_entity_type {
    return master_entity_type.init({
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
    tableName: 'master_entity_types',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_entity_types_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
