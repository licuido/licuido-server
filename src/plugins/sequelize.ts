import { FastifyPluginCallback } from "fastify";
import { Dialect, Sequelize } from "sequelize";
import fp from "fastify-plugin";
import { initModels } from "@models";
import { establishCustomRelations } from "../models/customRelations";

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT }: any =
  process.env;

export interface SequelizeOptions {
  database: string;
  username: string;
  password: string;
  host: string;
  dialect: Dialect;
  port: number;
  schema: string | "public";
}

declare module "fastify" {
  interface FastifyInstance {
    sequelize: Sequelize;
  }
}

const sequelizePlugin: FastifyPluginCallback<SequelizeOptions> = async (
  fastify: any,
  _
) => {
  let dbConfig: SequelizeOptions = {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    schema: "public",
  };

  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      logging: false,
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      port: dbConfig.port,
      timezone: "Asia/Kolkata",
      dialectOptions: {
        ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false, // This line will fix new error
        },
      },
    }
  );
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  initModels(sequelize);
  establishCustomRelations(sequelize);
  fastify.decorate("sequelize", sequelize);
};

export default fp(sequelizePlugin);
