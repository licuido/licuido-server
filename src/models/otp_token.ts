import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';

export interface otp_tokenAttributes {
  id: number;
  user_id?: number;
  otp?: number;
  token?: string;
  valid_till?: Date;
  is_active?: boolean;
  is_deleted?: boolean;
  created_at: Date;
  updated_at: Date;
}

export type otp_tokenPk = "id";
export type otp_tokenId = otp_token[otp_tokenPk];
export type otp_tokenOptionalAttributes = "id" | "user_id" | "otp" | "token" | "valid_till" | "is_active" | "is_deleted" | "created_at" | "updated_at";
export type otp_tokenCreationAttributes = Optional<otp_tokenAttributes, otp_tokenOptionalAttributes>;

export class otp_token extends Model<otp_tokenAttributes, otp_tokenCreationAttributes> implements otp_tokenAttributes {
  id!: number;
  user_id?: number;
  otp?: number;
  token?: string;
  valid_till?: Date;
  is_active?: boolean;
  is_deleted?: boolean;
  created_at!: Date;
  updated_at!: Date;

  // otp_token belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof otp_token {
    return otp_token.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    valid_till: {
      type: DataTypes.DATE,
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
    tableName: 'otp_tokens',
    schema: 'auth',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "otp_tokens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
