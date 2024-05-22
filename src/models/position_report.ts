import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user_profile, user_profileId } from './user_profile';

export interface position_reportAttributes {
  id: string;
  title?: string;
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  is_all_investors?: boolean;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type position_reportPk = "id";
export type position_reportId = position_report[position_reportPk];
export type position_reportOptionalAttributes = "id" | "title" | "start_date" | "end_date" | "start_time" | "end_time" | "is_all_investors" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type position_reportCreationAttributes = Optional<position_reportAttributes, position_reportOptionalAttributes>;

export class position_report extends Model<position_reportAttributes, position_reportCreationAttributes> implements position_reportAttributes {
  id!: string;
  title?: string;
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  is_all_investors?: boolean;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // position_report belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // position_report belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof position_report {
    return position_report.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    is_all_investors: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
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
    tableName: 'position_reports',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "position_reports_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
