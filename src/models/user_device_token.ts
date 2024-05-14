import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user_profile, user_profileId } from './user_profile';

export interface user_device_tokenAttributes {
  id: string;
  user_profile_id?: string;
  token?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type user_device_tokenPk = "id";
export type user_device_tokenId = user_device_token[user_device_tokenPk];
export type user_device_tokenOptionalAttributes = "id" | "user_profile_id" | "token" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type user_device_tokenCreationAttributes = Optional<user_device_tokenAttributes, user_device_tokenOptionalAttributes>;

export class user_device_token extends Model<user_device_tokenAttributes, user_device_tokenCreationAttributes> implements user_device_tokenAttributes {
  id!: string;
  user_profile_id?: string;
  token?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // user_device_token belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // user_device_token belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // user_device_token belongsTo user_profile via user_profile_id
  user_profile!: user_profile;
  getUser_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUser_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUser_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_device_token {
    return user_device_token.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user_profiles',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user_profiles',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user_profiles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_device_tokens',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "user_device_tokens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
