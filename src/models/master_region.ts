import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { master_country, master_countryId } from './master_country';

export interface master_regionAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_regionPk = "id";
export type master_regionId = master_region[master_regionPk];
export type master_regionOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_regionCreationAttributes = Optional<master_regionAttributes, master_regionOptionalAttributes>;

export class master_region extends Model<master_regionAttributes, master_regionCreationAttributes> implements master_regionAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_region hasMany master_country via region_id
  master_countries!: master_country[];
  getMaster_countries!: Sequelize.HasManyGetAssociationsMixin<master_country>;
  setMaster_countries!: Sequelize.HasManySetAssociationsMixin<master_country, master_countryId>;
  addMaster_country!: Sequelize.HasManyAddAssociationMixin<master_country, master_countryId>;
  addMaster_countries!: Sequelize.HasManyAddAssociationsMixin<master_country, master_countryId>;
  createMaster_country!: Sequelize.HasManyCreateAssociationMixin<master_country>;
  removeMaster_country!: Sequelize.HasManyRemoveAssociationMixin<master_country, master_countryId>;
  removeMaster_countries!: Sequelize.HasManyRemoveAssociationsMixin<master_country, master_countryId>;
  hasMaster_country!: Sequelize.HasManyHasAssociationMixin<master_country, master_countryId>;
  hasMaster_countries!: Sequelize.HasManyHasAssociationsMixin<master_country, master_countryId>;
  countMaster_countries!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof master_region {
    return master_region.init({
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
    tableName: 'master_regions',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_regions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
