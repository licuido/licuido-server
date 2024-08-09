import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity, entityId } from './entity';
import type { token_offering, token_offeringId } from './token_offering';
import type { user_profile, user_profileId } from './user_profile';

export interface token_pledgeAttributes {
  id: string;
  token_offering_id?: string;
  invester_id?: string;
  issuer_id?: string;
  pledge_token?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type token_pledgePk = "id";
export type token_pledgeId = token_pledge[token_pledgePk];
export type token_pledgeOptionalAttributes = "id" | "token_offering_id" | "invester_id" | "issuer_id" | "pledge_token" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type token_pledgeCreationAttributes = Optional<token_pledgeAttributes, token_pledgeOptionalAttributes>;

export class token_pledge extends Model<token_pledgeAttributes, token_pledgeCreationAttributes> implements token_pledgeAttributes {
  id!: string;
  token_offering_id?: string;
  invester_id?: string;
  issuer_id?: string;
  pledge_token?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // token_pledge belongsTo entity via invester_id
  invester!: entity;
  getInvester!: Sequelize.BelongsToGetAssociationMixin<entity>;
  setInvester!: Sequelize.BelongsToSetAssociationMixin<entity, entityId>;
  createInvester!: Sequelize.BelongsToCreateAssociationMixin<entity>;
  // token_pledge belongsTo entity via issuer_id
  issuer!: entity;
  getIssuer!: Sequelize.BelongsToGetAssociationMixin<entity>;
  setIssuer!: Sequelize.BelongsToSetAssociationMixin<entity, entityId>;
  createIssuer!: Sequelize.BelongsToCreateAssociationMixin<entity>;
  // token_pledge belongsTo token_offering via token_offering_id
  token_offering!: token_offering;
  getToken_offering!: Sequelize.BelongsToGetAssociationMixin<token_offering>;
  setToken_offering!: Sequelize.BelongsToSetAssociationMixin<token_offering, token_offeringId>;
  createToken_offering!: Sequelize.BelongsToCreateAssociationMixin<token_offering>;
  // token_pledge belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // token_pledge belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof token_pledge {
    return token_pledge.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    token_offering_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'token_offerings',
        key: 'id'
      }
    },
    invester_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    issuer_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'entities',
        key: 'id'
      }
    },
    pledge_token: {
      type: DataTypes.INTEGER,
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
    tableName: 'token_pledges',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "token_pledges_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
