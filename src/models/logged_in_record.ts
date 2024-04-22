import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';

export interface logged_in_recordAttributes {
  id: number;
  user_id?: number;
  logger_details?: object;
  logged_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export type logged_in_recordPk = "id";
export type logged_in_recordId = logged_in_record[logged_in_recordPk];
export type logged_in_recordOptionalAttributes = "id" | "user_id" | "logger_details" | "logged_at" | "created_at" | "updated_at";
export type logged_in_recordCreationAttributes = Optional<logged_in_recordAttributes, logged_in_recordOptionalAttributes>;

export class logged_in_record extends Model<logged_in_recordAttributes, logged_in_recordCreationAttributes> implements logged_in_recordAttributes {
  id!: number;
  user_id?: number;
  logger_details?: object;
  logged_at?: Date;
  created_at!: Date;
  updated_at!: Date;

  // logged_in_record belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof logged_in_record {
    return logged_in_record.init({
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
      logger_details: {
        type: DataTypes.JSON,
        allowNull: true
      },
      logged_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
    }, {
      sequelize,
      tableName: 'logged_in_records',
      schema: 'auth',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      indexes: [
        {
          name: 'logged_in_records_pkey',
          unique: true,
          fields: ['id'] // Corrected syntax for defining index fields
        }
      ]
    });
    
  }
}
