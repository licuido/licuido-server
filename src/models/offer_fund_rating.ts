import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { master_fund_agency, master_fund_agencyId } from './master_fund_agency';
import type { master_fund_agency_rating, master_fund_agency_ratingId } from './master_fund_agency_rating';
import type { token_offering, token_offeringId } from './token_offering';

export interface offer_fund_ratingAttributes {
  id: string;
  offer_token_id?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
  agency_id?: number;
  rating_id?: number;
}

export type offer_fund_ratingPk = "id";
export type offer_fund_ratingId = offer_fund_rating[offer_fund_ratingPk];
export type offer_fund_ratingOptionalAttributes = "id" | "offer_token_id" | "is_active" | "created_by" | "updated_by" | "created_at" | "updated_at" | "agency_id" | "rating_id";
export type offer_fund_ratingCreationAttributes = Optional<offer_fund_ratingAttributes, offer_fund_ratingOptionalAttributes>;

export class offer_fund_rating extends Model<offer_fund_ratingAttributes, offer_fund_ratingCreationAttributes> implements offer_fund_ratingAttributes {
  id!: string;
  offer_token_id?: string;
  is_active?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
  agency_id?: number;
  rating_id?: number;

  // offer_fund_rating belongsTo master_fund_agency via agency_id
  agency!: master_fund_agency;
  getAgency!: Sequelize.BelongsToGetAssociationMixin<master_fund_agency>;
  setAgency!: Sequelize.BelongsToSetAssociationMixin<master_fund_agency, master_fund_agencyId>;
  createAgency!: Sequelize.BelongsToCreateAssociationMixin<master_fund_agency>;
  // offer_fund_rating belongsTo master_fund_agency_rating via rating_id
  rating!: master_fund_agency_rating;
  getRating!: Sequelize.BelongsToGetAssociationMixin<master_fund_agency_rating>;
  setRating!: Sequelize.BelongsToSetAssociationMixin<master_fund_agency_rating, master_fund_agency_ratingId>;
  createRating!: Sequelize.BelongsToCreateAssociationMixin<master_fund_agency_rating>;
  // offer_fund_rating belongsTo token_offering via offer_token_id
  offer_token!: token_offering;
  getOffer_token!: Sequelize.BelongsToGetAssociationMixin<token_offering>;
  setOffer_token!: Sequelize.BelongsToSetAssociationMixin<token_offering, token_offeringId>;
  createOffer_token!: Sequelize.BelongsToCreateAssociationMixin<token_offering>;

  static initModel(sequelize: Sequelize.Sequelize): typeof offer_fund_rating {
    return offer_fund_rating.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    offer_token_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'token_offerings',
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
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_fund_agencies',
        key: 'id'
      }
    },
    rating_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'master_fund_agency_ratings',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'offer_fund_ratings',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "offer_fund_ratings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
