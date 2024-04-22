import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { master_entity_type, master_entity_typeId } from './master_entity_type';
import type { user_profile, user_profileId } from './user_profile';

export interface user_entityAttributes {
  id: string;
  entity_id?: number;
  user_profile_id?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type user_entityPk = "id";
export type user_entityId = user_entity[user_entityPk];
export type user_entityOptionalAttributes = "entity_id" | "user_profile_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type user_entityCreationAttributes = Optional<user_entityAttributes, user_entityOptionalAttributes>;

export class user_entity extends Model<user_entityAttributes, user_entityCreationAttributes> implements user_entityAttributes {
  id!: string;
  entity_id?: number;
  user_profile_id?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // user_entity belongsTo master_entity_type via entity_id
  entity!: master_entity_type;
  getEntity!: Sequelize.BelongsToGetAssociationMixin<master_entity_type>;
  setEntity!: Sequelize.BelongsToSetAssociationMixin<master_entity_type, master_entity_typeId>;
  createEntity!: Sequelize.BelongsToCreateAssociationMixin<master_entity_type>;
  // user_entity belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // user_entity belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // user_entity belongsTo user_profile via user_profile_id
  user_profile!: user_profile;
  getUser_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUser_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUser_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_entity {
    return user_entity.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_entity_types',
        key: 'id'
      }
    },
    user_profile_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user_profiles',
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
    tableName: 'user_entities',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "user_entities_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
