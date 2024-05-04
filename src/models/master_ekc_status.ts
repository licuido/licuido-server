import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ekyc, ekycId } from './ekyc';

export interface master_ekc_statusAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_ekc_statusPk = "id";
export type master_ekc_statusId = master_ekc_status[master_ekc_statusPk];
export type master_ekc_statusOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_ekc_statusCreationAttributes = Optional<master_ekc_statusAttributes, master_ekc_statusOptionalAttributes>;

export class master_ekc_status extends Model<master_ekc_statusAttributes, master_ekc_statusCreationAttributes> implements master_ekc_statusAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_ekc_status hasMany ekyc via status_id
  ekycs!: ekyc[];
  getEkycs!: Sequelize.HasManyGetAssociationsMixin<ekyc>;
  setEkycs!: Sequelize.HasManySetAssociationsMixin<ekyc, ekycId>;
  addEkyc!: Sequelize.HasManyAddAssociationMixin<ekyc, ekycId>;
  addEkycs!: Sequelize.HasManyAddAssociationsMixin<ekyc, ekycId>;
  createEkyc!: Sequelize.HasManyCreateAssociationMixin<ekyc>;
  removeEkyc!: Sequelize.HasManyRemoveAssociationMixin<ekyc, ekycId>;
  removeEkycs!: Sequelize.HasManyRemoveAssociationsMixin<ekyc, ekycId>;
  hasEkyc!: Sequelize.HasManyHasAssociationMixin<ekyc, ekycId>;
  hasEkycs!: Sequelize.HasManyHasAssociationsMixin<ekyc, ekycId>;
  countEkycs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof master_ekc_status {
    return master_ekc_status.init({
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
    tableName: 'master_ekc_status',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "ekc_status_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
