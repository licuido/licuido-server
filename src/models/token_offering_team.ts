import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { asset, assetId } from './asset';
import type { token_offering, token_offeringId } from './token_offering';
import type { user_profile, user_profileId } from './user_profile';

export interface token_offering_teamAttributes {
  id: string;
  token_offering_id?: string;
  member_name?: string;
  member_title?: string;
  member_picture_id?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type token_offering_teamPk = "id";
export type token_offering_teamId = token_offering_team[token_offering_teamPk];
export type token_offering_teamOptionalAttributes = "id" | "token_offering_id" | "member_name" | "member_title" | "member_picture_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type token_offering_teamCreationAttributes = Optional<token_offering_teamAttributes, token_offering_teamOptionalAttributes>;

export class token_offering_team extends Model<token_offering_teamAttributes, token_offering_teamCreationAttributes> implements token_offering_teamAttributes {
  id!: string;
  token_offering_id?: string;
  member_name?: string;
  member_title?: string;
  member_picture_id?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // token_offering_team belongsTo asset via member_picture_id
  member_picture!: asset;
  getMember_picture!: Sequelize.BelongsToGetAssociationMixin<asset>;
  setMember_picture!: Sequelize.BelongsToSetAssociationMixin<asset, assetId>;
  createMember_picture!: Sequelize.BelongsToCreateAssociationMixin<asset>;
  // token_offering_team belongsTo token_offering via token_offering_id
  token_offering!: token_offering;
  getToken_offering!: Sequelize.BelongsToGetAssociationMixin<token_offering>;
  setToken_offering!: Sequelize.BelongsToSetAssociationMixin<token_offering, token_offeringId>;
  createToken_offering!: Sequelize.BelongsToCreateAssociationMixin<token_offering>;
  // token_offering_team belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // token_offering_team belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof token_offering_team {
    return token_offering_team.init({
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
    member_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    member_title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    member_picture_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'assets',
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
    tableName: 'token_offering_teams',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "token_offering_teams_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
