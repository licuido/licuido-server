import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { master_country, master_countryId } from './master_country';
import type { token_offering, token_offeringId } from './token_offering';
import type { user_profile, user_profileId } from './user_profile';

export interface token_offering_allowed_countryAttributes {
  id: string;
  token_offering_id?: string;
  allowed_country_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type token_offering_allowed_countryPk = "id";
export type token_offering_allowed_countryId = token_offering_allowed_country[token_offering_allowed_countryPk];
export type token_offering_allowed_countryOptionalAttributes = "id" | "token_offering_id" | "allowed_country_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at";
export type token_offering_allowed_countryCreationAttributes = Optional<token_offering_allowed_countryAttributes, token_offering_allowed_countryOptionalAttributes>;

export class token_offering_allowed_country extends Model<token_offering_allowed_countryAttributes, token_offering_allowed_countryCreationAttributes> implements token_offering_allowed_countryAttributes {
  id!: string;
  token_offering_id?: string;
  allowed_country_id?: number;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  // token_offering_allowed_country belongsTo master_country via allowed_country_id
  allowed_country!: master_country;
  getAllowed_country!: Sequelize.BelongsToGetAssociationMixin<master_country>;
  setAllowed_country!: Sequelize.BelongsToSetAssociationMixin<master_country, master_countryId>;
  createAllowed_country!: Sequelize.BelongsToCreateAssociationMixin<master_country>;
  // token_offering_allowed_country belongsTo token_offering via token_offering_id
  token_offering!: token_offering;
  getToken_offering!: Sequelize.BelongsToGetAssociationMixin<token_offering>;
  setToken_offering!: Sequelize.BelongsToSetAssociationMixin<token_offering, token_offeringId>;
  createToken_offering!: Sequelize.BelongsToCreateAssociationMixin<token_offering>;
  // token_offering_allowed_country belongsTo user_profile via created_by
  created_by_user_profile!: user_profile;
  getCreated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setCreated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createCreated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;
  // token_offering_allowed_country belongsTo user_profile via updated_by
  updated_by_user_profile!: user_profile;
  getUpdated_by_user_profile!: Sequelize.BelongsToGetAssociationMixin<user_profile>;
  setUpdated_by_user_profile!: Sequelize.BelongsToSetAssociationMixin<user_profile, user_profileId>;
  createUpdated_by_user_profile!: Sequelize.BelongsToCreateAssociationMixin<user_profile>;

  static initModel(sequelize: Sequelize.Sequelize): typeof token_offering_allowed_country {
    return token_offering_allowed_country.init({
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
    allowed_country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_countries',
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
    tableName: 'token_offering_allowed_countries',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "token_offering_allowed_countries_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
