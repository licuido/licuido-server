import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { offer_fund_rating, offer_fund_ratingId } from './offer_fund_rating';

export interface master_fund_agency_ratingAttributes {
  id: number;
  name?: string;
  is_active?: boolean;
  agency_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type master_fund_agency_ratingPk = "id";
export type master_fund_agency_ratingId = master_fund_agency_rating[master_fund_agency_ratingPk];
export type master_fund_agency_ratingOptionalAttributes = "id" | "name" | "is_active" | "agency_id" | "created_at" | "updated_at";
export type master_fund_agency_ratingCreationAttributes = Optional<master_fund_agency_ratingAttributes, master_fund_agency_ratingOptionalAttributes>;

export class master_fund_agency_rating extends Model<master_fund_agency_ratingAttributes, master_fund_agency_ratingCreationAttributes> implements master_fund_agency_ratingAttributes {
  id!: number;
  name?: string;
  is_active?: boolean;
  agency_id?: number;
  created_at?: Date;
  updated_at?: Date;

  // master_fund_agency_rating hasMany offer_fund_rating via rating_id
  offer_fund_ratings!: offer_fund_rating[];
  getOffer_fund_ratings!: Sequelize.HasManyGetAssociationsMixin<offer_fund_rating>;
  setOffer_fund_ratings!: Sequelize.HasManySetAssociationsMixin<offer_fund_rating, offer_fund_ratingId>;
  addOffer_fund_rating!: Sequelize.HasManyAddAssociationMixin<offer_fund_rating, offer_fund_ratingId>;
  addOffer_fund_ratings!: Sequelize.HasManyAddAssociationsMixin<offer_fund_rating, offer_fund_ratingId>;
  createOffer_fund_rating!: Sequelize.HasManyCreateAssociationMixin<offer_fund_rating>;
  removeOffer_fund_rating!: Sequelize.HasManyRemoveAssociationMixin<offer_fund_rating, offer_fund_ratingId>;
  removeOffer_fund_ratings!: Sequelize.HasManyRemoveAssociationsMixin<offer_fund_rating, offer_fund_ratingId>;
  hasOffer_fund_rating!: Sequelize.HasManyHasAssociationMixin<offer_fund_rating, offer_fund_ratingId>;
  hasOffer_fund_ratings!: Sequelize.HasManyHasAssociationsMixin<offer_fund_rating, offer_fund_ratingId>;
  countOffer_fund_ratings!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof master_fund_agency_rating {
    return master_fund_agency_rating.init({
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
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'master_fund_agency_ratings',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "master_fund_agency_ratings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
