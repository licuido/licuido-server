import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity, entityId } from './entity';
import type { master_order_status, master_order_statusId } from './master_order_status';
import type { token_order, token_orderId } from './token_order';
import type { user_profile, user_profileId } from './user_profile';

export interface track_token_order_actionAttributes {
  id: string;
  user_profile_id?: string;
  user_entity_id?: string;
  action_status_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type track_token_order_actionPk = "id";
export type track_token_order_actionId = track_token_order_action[track_token_order_actionPk];
export type track_token_order_actionOptionalAttributes = "id" | "user_profile_id" | "user_entity_id" | "action_status_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type track_token_order_actionCreationAttributes = Optional<track_token_order_actionAttributes, track_token_order_actionOptionalAttributes>;

export class track_token_order_action extends Model<track_token_order_actionAttributes, track_token_order_actionCreationAttributes> implements track_token_order_actionAttributes {
  id!: string;
  user_profile_id?: string;
  user_entity_id?: string;
  action_status_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // track_token_order_action belongsTo entity via user_entity_id
  user_entity!: entity;
  getUser_entity!: Sequelize.BelongsToGetAssociationMixin<entity>;
  setUser_entity!: Sequelize.BelongsToSetAssociationMixin<entity, entityId>;
  createUser_entity!: Sequelize.BelongsToCreateAssociationMixin<entity>;
  // track_token_order_action belongsTo master_order_status via action_status_id
  action_status!: master_order_status;
  getAction_status!: Sequelize.BelongsToGetAssociationMixin<master_order_status>;
  setAction_status!: Sequelize.BelongsToSetAssociationMixin<master_order_status, master_order_statusId>;
  createAction_status!: Sequelize.BelongsToCreateAssociationMixin<master_order_status>;
  // track_token_order_action hasMany token_order via last_action_track_id
  token_orders!: token_order[];
  getToken_orders!: Sequelize.HasManyGetAssociationsMixin<token_order>;
  setToken_orders!: Sequelize.HasManySetAssociationsMixin<token_order, token_orderId>;
  addToken_order!: Sequelize.HasManyAddAssociationMixin<token_order, token_orderId>;
  addToken_orders!: Sequelize.HasManyAddAssociationsMixin<token_order, token_orderId>;
  createToken_order!: Sequelize.HasManyCreateAssociationMixin<token_order>;
  removeToken_order!: Sequelize.HasManyRemoveAssociationMixin<token_order, token_orderId>;
  removeToken_orders!: Sequelize.HasManyRemoveAssociationsMixin<token_order, token_orderId>;
  hasToken_order!: Sequelize.HasManyHasAssociationMixin<token_order, token_orderId>;
  hasToken_orders!: Sequelize.HasManyHasAssociationsMixin<token_order, token_orderId>;
  countToken_orders!: Sequelize.HasManyCountAssociationsMixin;
  // track_token_order_action belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // track_token_order_action belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // track_token_order_action belongsTo user_profile via user_profile_id
  user_profile!: user_profile;
  getUser_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUser_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUser_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof track_token_order_action {
    return track_token_order_action.init({
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
    user_entity_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    action_status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_order_status',
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
    tableName: 'track_token_order_actions',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "track_token_order_actions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
