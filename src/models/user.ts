import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { logged_in_record, logged_in_recordId } from './logged_in_record';
import type { otp_token, otp_tokenId } from './otp_token';

export interface userAttributes {
  id: number;
  username?: string;
  email_id?: string;
  mobile_no_std_code?: number;
  mobile_no?: number;
  password?: string;
  is_active?: boolean;
  is_deleted?: boolean;
  created_at: Date;
  updated_at: Date;
  is_locked?: boolean;
  login_attempts?: number;
  is_2fa?: boolean;
  secret_key_2fa?: string;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "username" | "email_id" | "mobile_no_std_code" | "mobile_no" | "password" | "is_active" | "is_deleted" | "created_at" | "updated_at" | "is_locked" | "login_attempts" | "is_2fa" | "secret_key_2fa";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  username?: string;
  email_id?: string;
  mobile_no_std_code?: number;
  mobile_no?: number;
  password?: string;
  is_active?: boolean;
  is_deleted?: boolean;
  created_at!: Date;
  updated_at!: Date;
  is_locked?: boolean;
  login_attempts?: number;
  is_2fa?: boolean;
  secret_key_2fa?: string;

  // user hasMany logged_in_record via user_id
  logged_in_records!: logged_in_record[];
  getLogged_in_records!: Sequelize.HasManyGetAssociationsMixin<logged_in_record>;
  setLogged_in_records!: Sequelize.HasManySetAssociationsMixin<logged_in_record, logged_in_recordId>;
  addLogged_in_record!: Sequelize.HasManyAddAssociationMixin<logged_in_record, logged_in_recordId>;
  addLogged_in_records!: Sequelize.HasManyAddAssociationsMixin<logged_in_record, logged_in_recordId>;
  createLogged_in_record!: Sequelize.HasManyCreateAssociationMixin<logged_in_record>;
  removeLogged_in_record!: Sequelize.HasManyRemoveAssociationMixin<logged_in_record, logged_in_recordId>;
  removeLogged_in_records!: Sequelize.HasManyRemoveAssociationsMixin<logged_in_record, logged_in_recordId>;
  hasLogged_in_record!: Sequelize.HasManyHasAssociationMixin<logged_in_record, logged_in_recordId>;
  hasLogged_in_records!: Sequelize.HasManyHasAssociationsMixin<logged_in_record, logged_in_recordId>;
  countLogged_in_records!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany otp_token via user_id
  otp_tokens!: otp_token[];
  getOtp_tokens!: Sequelize.HasManyGetAssociationsMixin<otp_token>;
  setOtp_tokens!: Sequelize.HasManySetAssociationsMixin<otp_token, otp_tokenId>;
  addOtp_token!: Sequelize.HasManyAddAssociationMixin<otp_token, otp_tokenId>;
  addOtp_tokens!: Sequelize.HasManyAddAssociationsMixin<otp_token, otp_tokenId>;
  createOtp_token!: Sequelize.HasManyCreateAssociationMixin<otp_token>;
  removeOtp_token!: Sequelize.HasManyRemoveAssociationMixin<otp_token, otp_tokenId>;
  removeOtp_tokens!: Sequelize.HasManyRemoveAssociationsMixin<otp_token, otp_tokenId>;
  hasOtp_token!: Sequelize.HasManyHasAssociationMixin<otp_token, otp_tokenId>;
  hasOtp_tokens!: Sequelize.HasManyHasAssociationsMixin<otp_token, otp_tokenId>;
  countOtp_tokens!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "custom_unique_users"
    },
    email_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "custom_unique_users"
    },
    mobile_no_std_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_no: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: "custom_unique_users"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    is_locked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    login_attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    is_2fa: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    secret_key_2fa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue:new Date()
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue:new Date()
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'auth',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "custom_unique_users",
        unique: true,
        fields: [
          { name: "username" },
          { name: "email_id" },
          { name: "mobile_no" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
