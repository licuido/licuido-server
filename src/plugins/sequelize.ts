import { FastifyPluginCallback } from "fastify";
import { Sequelize } from "sequelize";
import fp from "fastify-plugin";
import { initModels } from "@models";
import { establishCustomRelations } from "../models/customRelations";
import { SequelizeOptions, sequelize } from "@utils";

declare module "fastify" {
  interface FastifyInstance {
    sequelize: Sequelize;
  }
}

const sequelizePlugin: FastifyPluginCallback<SequelizeOptions> = async (
  fastify: any,
  _
) => {
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
