import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity, entityId } from './entity';

export interface master_business_sectorAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_business_sectorPk = "id";
export type master_business_sectorId = master_business_sector[master_business_sectorPk];
export type master_business_sectorOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_business_sectorCreationAttributes = Optional<master_business_sectorAttributes, master_business_sectorOptionalAttributes>;

export class master_business_sector extends Model<master_business_sectorAttributes, master_business_sectorCreationAttributes> implements master_business_sectorAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_business_sector hasMany entity via business_sector_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof master_business_sector {
    return master_business_sector.init({
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
    tableName: 'master_business_sectors',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_business_sectors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
