import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const countries: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // fastify.addHook("preHandler", fastify.authenticate);
  fastify.get(
    "/",
    { schema: schema.GET_ALL_COUNTRIES },
    handlers.GET_ALL_COUNTRIES
  ).get(
    "/region_country",
    {  schema:schema.GET_ALL_COUNTRY_WITH_REGIONS},
    handlers.GET_ALL_COUNTRIES_GROUP_BY_REGIONS
  )
  .get(
    "/currencies",
    {  schema:schema.GET_ALL_CURRENCIES},
    handlers.GET_ALL_CURRENCIES
  );
};

export default countries;
