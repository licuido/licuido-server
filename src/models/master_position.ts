import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user_profile, user_profileId } from './user_profile';

export interface master_positionAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type master_positionPk = "id";
export type master_positionId = master_position[master_positionPk];
export type master_positionOptionalAttributes = "id" | "name" | "is_active" | "created_at" | "updated_at";
export type master_positionCreationAttributes = Optional<master_positionAttributes, master_positionOptionalAttributes>;

export class master_position extends Model<master_positionAttributes, master_positionCreationAttributes> implements master_positionAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // master_position hasMany user_profile via position_id
  user_profiles!: user_profile[];
  getUser_profiles!: Sequelize.HasManyGetAssociationsMixin<user_profile>;
  setUser_profiles!: Sequelize.HasManySetAssociationsMixin<user_profile, user_profileId>;
  addUser_profile!: Sequelize.HasManyAddAssociationMixin<user_profile, user_profileId>;
  addUser_profiles!: Sequelize.HasManyAddAssociationsMixin<user_profile, user_profileId>;
  createUser_profile!: Sequelize.HasManyCreateAssociationMixin<user_profile>;
  removeUser_profile!: Sequelize.HasManyRemoveAssociationMixin<user_profile, user_profileId>;
  removeUser_profiles!: Sequelize.HasManyRemoveAssociationsMixin<user_profile, user_profileId>;
  hasUser_profile!: Sequelize.HasManyHasAssociationMixin<user_profile, user_profileId>;
  hasUser_profiles!: Sequelize.HasManyHasAssociationsMixin<user_profile, user_profileId>;
  countUser_profiles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof master_position {
    return master_position.init({
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
    tableName: 'master_position',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_position_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
