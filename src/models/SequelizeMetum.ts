import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface SequelizeMetumAttributes {
  name: string;
}

export type SequelizeMetumPk = "name";
export type SequelizeMetumId = SequelizeMetum[SequelizeMetumPk];
export type SequelizeMetumCreationAttributes = SequelizeMetumAttributes;

export class SequelizeMetum extends Model<SequelizeMetumAttributes, SequelizeMetumCreationAttributes> implements SequelizeMetumAttributes {
  name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof SequelizeMetum {
    return SequelizeMetum.init({
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'SequelizeMeta',
    schema: 'auth',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "SequelizeMeta_pkey",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
