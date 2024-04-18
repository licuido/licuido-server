import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { token_offering, token_offeringId } from './token_offering';
import type { user_profile, user_profileId } from './user_profile';

export interface token_offering_allowed_currencyAttributes {
  id: string;
  token_offering_id?: string;
  currency?: string;
  currency_code?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type token_offering_allowed_currencyPk = "id";
export type token_offering_allowed_currencyId = token_offering_allowed_currency[token_offering_allowed_currencyPk];
export type token_offering_allowed_currencyOptionalAttributes = "id" | "token_offering_id" | "currency" | "currency_code" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type token_offering_allowed_currencyCreationAttributes = Optional<token_offering_allowed_currencyAttributes, token_offering_allowed_currencyOptionalAttributes>;

export class token_offering_allowed_currency extends Model<token_offering_allowed_currencyAttributes, token_offering_allowed_currencyCreationAttributes> implements token_offering_allowed_currencyAttributes {
  id!: string;
  token_offering_id?: string;
  currency?: string;
  currency_code?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // token_offering_allowed_currency belongsTo token_offering via token_offering_id
  token_offering!: token_offering;
  getToken_offering!: Sequelize.BelongsToGetAssociationMixin<token_offering>;
  setToken_offering!: Sequelize.BelongsToSetAssociationMixin<token_offering, token_offeringId>;
  createToken_offering!: Sequelize.BelongsToCreateAssociationMixin<token_offering>;
  // token_offering_allowed_currency belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // token_offering_allowed_currency belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof token_offering_allowed_currency {
    return token_offering_allowed_currency.init({
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
    currency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    currency_code: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'token_offering_allowed_currencies',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "token_offering_allowed_currencies_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
