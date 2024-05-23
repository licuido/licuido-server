import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity, entityId } from './entity';
import type { position_report, position_reportId } from './position_report';

export interface position_report_investorAttributes {
  id: string;
  investor_id?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
  report_id?: string;
}

export type position_report_investorPk = "id";
export type position_report_investorId = position_report_investor[position_report_investorPk];
export type position_report_investorOptionalAttributes = "id" | "investor_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at" | "report_id";
export type position_report_investorCreationAttributes = Optional<position_report_investorAttributes, position_report_investorOptionalAttributes>;

export class position_report_investor extends Model<position_report_investorAttributes, position_report_investorCreationAttributes> implements position_report_investorAttributes {
  id!: string;
  investor_id?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
  report_id?: string;

  // position_report_investor belongsTo entity via investor_id
  investor!: entity;
  getInvestor!: Sequelize.BelongsToGetAssociationMixin<entity>;
  setInvestor!: Sequelize.BelongsToSetAssociationMixin<entity, entityId>;
  createInvestor!: Sequelize.BelongsToCreateAssociationMixin<entity>;
  // position_report_investor belongsTo position_report via report_id
  report!: position_report;
  getReport!: Sequelize.BelongsToGetAssociationMixin<position_report>;
  setReport!: Sequelize.BelongsToSetAssociationMixin<position_report, position_reportId>;
  createReport!: Sequelize.BelongsToCreateAssociationMixin<position_report>;

  static initModel(sequelize: Sequelize.Sequelize): typeof position_report_investor {
    return position_report_investor.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    investor_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true
    },
    report_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'position_reports',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'position_report_investors',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "position_report_investors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
