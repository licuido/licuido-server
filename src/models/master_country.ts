import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { entity, entityId } from './entity';
import type { individual_investor, individual_investorId } from './individual_investor';
import type { master_region, master_regionId } from './master_region';
import type { token_offering_allowed_country, token_offering_allowed_countryId } from './token_offering_allowed_country';
import type { token_offering, token_offeringId } from './token_offering';

export interface master_countryAttributes {
  id: number;
  name?: string;
  iso3?: string;
  phone_code?: string;
  currency?: string;
  currency_code?: string;
  emoji?: string;
  emoji_unicode?: string;
  region_id?: number;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  currency_symbol?: string;
}

export type master_countryPk = "id";
export type master_countryId = master_country[master_countryPk];
export type master_countryOptionalAttributes = "id" | "name" | "iso3" | "phone_code" | "currency" | "currency_code" | "emoji" | "emoji_unicode" | "region_id" | "is_active" | "created_at" | "updated_at" | "currency_symbol";
export type master_countryCreationAttributes = Optional<master_countryAttributes, master_countryOptionalAttributes>;

export class master_country extends Model<master_countryAttributes, master_countryCreationAttributes> implements master_countryAttributes {
  id!: number;
  name?: string;
  iso3?: string;
  phone_code?: string;
  currency?: string;
  currency_code?: string;
  emoji?: string;
  emoji_unicode?: string;
  region_id?: number;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  currency_symbol?: string;

  // master_country hasMany entity via country_id
  entities!: entity[];
  getEntities!: Sequelize.HasManyGetAssociationsMixin<entity>;
  setEntities!: Sequelize.HasManySetAssociationsMixin<entity, entityId>;
  addEntity!: Sequelize.HasManyAddAssociationMixin<entity, entityId>;
  addEntities!: Sequelize.HasManyAddAssociationsMixin<entity, entityId>;
  createEntity!: Sequelize.HasManyCreateAssociationMixin<entity>;
  removeEntity!: Sequelize.HasManyRemoveAssociationMixin<entity, entityId>;
  removeEntities!: Sequelize.HasManyRemoveAssociationsMixin<entity, entityId>;
  hasEntity!: Sequelize.HasManyHasAssociationMixin<entity, entityId>;
  hasEntities!: Sequelize.HasManyHasAssociationsMixin<entity, entityId>;
  countEntities!: Sequelize.HasManyCountAssociationsMixin;
  // master_country hasMany individual_investor via country_id
  individual_investors!: individual_investor[];
  getIndividual_investors!: Sequelize.HasManyGetAssociationsMixin<individual_investor>;
  setIndividual_investors!: Sequelize.HasManySetAssociationsMixin<individual_investor, individual_investorId>;
  addIndividual_investor!: Sequelize.HasManyAddAssociationMixin<individual_investor, individual_investorId>;
  addIndividual_investors!: Sequelize.HasManyAddAssociationsMixin<individual_investor, individual_investorId>;
  createIndividual_investor!: Sequelize.HasManyCreateAssociationMixin<individual_investor>;
  removeIndividual_investor!: Sequelize.HasManyRemoveAssociationMixin<individual_investor, individual_investorId>;
  removeIndividual_investors!: Sequelize.HasManyRemoveAssociationsMixin<individual_investor, individual_investorId>;
  hasIndividual_investor!: Sequelize.HasManyHasAssociationMixin<individual_investor, individual_investorId>;
  hasIndividual_investors!: Sequelize.HasManyHasAssociationsMixin<individual_investor, individual_investorId>;
  countIndividual_investors!: Sequelize.HasManyCountAssociationsMixin;
  // master_country hasMany token_offering_allowed_country via allowed_country_id
  token_offering_allowed_countries!: token_offering_allowed_country[];
  getToken_offering_allowed_countries!: Sequelize.HasManyGetAssociationsMixin<token_offering_allowed_country>;
  setToken_offering_allowed_countries!: Sequelize.HasManySetAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  addToken_offering_allowed_country!: Sequelize.HasManyAddAssociationMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  addToken_offering_allowed_countries!: Sequelize.HasManyAddAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  createToken_offering_allowed_country!: Sequelize.HasManyCreateAssociationMixin<token_offering_allowed_country>;
  removeToken_offering_allowed_country!: Sequelize.HasManyRemoveAssociationMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  removeToken_offering_allowed_countries!: Sequelize.HasManyRemoveAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  hasToken_offering_allowed_country!: Sequelize.HasManyHasAssociationMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  hasToken_offering_allowed_countries!: Sequelize.HasManyHasAssociationsMixin<token_offering_allowed_country, token_offering_allowed_countryId>;
  countToken_offering_allowed_countries!: Sequelize.HasManyCountAssociationsMixin;
  // master_country hasMany token_offering via jurisdiction
  token_offerings!: token_offering[];
  getToken_offerings!: Sequelize.HasManyGetAssociationsMixin<token_offering>;
  setToken_offerings!: Sequelize.HasManySetAssociationsMixin<token_offering, token_offeringId>;
  addToken_offering!: Sequelize.HasManyAddAssociationMixin<token_offering, token_offeringId>;
  addToken_offerings!: Sequelize.HasManyAddAssociationsMixin<token_offering, token_offeringId>;
  createToken_offering!: Sequelize.HasManyCreateAssociationMixin<token_offering>;
  removeToken_offering!: Sequelize.HasManyRemoveAssociationMixin<token_offering, token_offeringId>;
  removeToken_offerings!: Sequelize.HasManyRemoveAssociationsMixin<token_offering, token_offeringId>;
  hasToken_offering!: Sequelize.HasManyHasAssociationMixin<token_offering, token_offeringId>;
  hasToken_offerings!: Sequelize.HasManyHasAssociationsMixin<token_offering, token_offeringId>;
  countToken_offerings!: Sequelize.HasManyCountAssociationsMixin;
  // master_country belongsTo master_region via region_id
  region!: master_region;
  getRegion!: Sequelize.BelongsToGetAssociationMixin<master_region>;
  setRegion!: Sequelize.BelongsToSetAssociationMixin<master_region, master_regionId>;
  createRegion!: Sequelize.BelongsToCreateAssociationMixin<master_region>;

  static initModel(sequelize: Sequelize.Sequelize): typeof master_country {
    return master_country.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    iso3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    currency_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    emoji: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    emoji_unicode: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_regions',
        key: 'id'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    currency_symbol: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'master_countries',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_countries_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
