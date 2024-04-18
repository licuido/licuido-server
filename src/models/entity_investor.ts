import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity, entityId } from './entity';
import type { individual_investor, individual_investorId } from './individual_investor';
import type { master_entity_investor_status, master_entity_investor_statusId } from './master_entity_investor_status';
import type { master_investor_type, master_investor_typeId } from './master_investor_type';
import type { user_profile, user_profileId } from './user_profile';

export interface entity_investorAttributes {
  id: string;
  investor_type_id?: number;
  investor_entity_id?: string;
  individual_investor_id?: string;
  status_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type entity_investorPk = "id";
export type entity_investorId = entity_investor[entity_investorPk];
export type entity_investorOptionalAttributes = "id" | "investor_type_id" | "investor_entity_id" | "individual_investor_id" | "status_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type entity_investorCreationAttributes = Optional<entity_investorAttributes, entity_investorOptionalAttributes>;

export class entity_investor extends Model<entity_investorAttributes, entity_investorCreationAttributes> implements entity_investorAttributes {
  id!: string;
  investor_type_id?: number;
  investor_entity_id?: string;
  individual_investor_id?: string;
  status_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // entity_investor belongsTo entity via investor_entity_id
  investor_entity!: entity;
  getInvestor_entity!: Sequelize.BelongsToGetAssociationMixin<entity>;
  setInvestor_entity!: Sequelize.BelongsToSetAssociationMixin<entity, entityId>;
  createInvestor_entity!: Sequelize.BelongsToCreateAssociationMixin<entity>;
  // entity_investor belongsTo individual_investor via individual_investor_id
  individual_investor!: individual_investor;
  getIndividual_investor!: Sequelize.BelongsToGetAssociationMixin<individual_investor>;
  setIndividual_investor!: Sequelize.BelongsToSetAssociationMixin<individual_investor, individual_investorId>;
  createIndividual_investor!: Sequelize.BelongsToCreateAssociationMixin<individual_investor>;
  // entity_investor belongsTo master_entity_investor_status via status_id
  status!: master_entity_investor_status;
  getStatus!: Sequelize.BelongsToGetAssociationMixin<master_entity_investor_status>;
  setStatus!: Sequelize.BelongsToSetAssociationMixin<master_entity_investor_status, master_entity_investor_statusId>;
  createStatus!: Sequelize.BelongsToCreateAssociationMixin<master_entity_investor_status>;
  // entity_investor belongsTo master_investor_type via investor_type_id
  investor_type!: master_investor_type;
  getInvestor_type!: Sequelize.BelongsToGetAssociationMixin<master_investor_type>;
  setInvestor_type!: Sequelize.BelongsToSetAssociationMixin<master_investor_type, master_investor_typeId>;
  createInvestor_type!: Sequelize.BelongsToCreateAssociationMixin<master_investor_type>;
  // entity_investor belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // entity_investor belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof entity_investor {
    return entity_investor.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    investor_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_investor_types',
        key: 'id'
      }
    },
    investor_entity_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    individual_investor_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'individual_investors',
        key: 'id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_entity_investor_status',
        key: 'id'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
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
    tableName: 'entity_investors',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "entity_investors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
