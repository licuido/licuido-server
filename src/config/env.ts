import { config } from "dotenv";
config({ path: ".env" });

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  NODE_ENV,
  AUTH_API_LOCAL,
  INVESTOR_URL,
  ADMIN_URL,
  ISSUER_URL,
}: any = process.env;

export default {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  NODE_ENV,
  AUTH_API_LOCAL,
  INVESTOR_URL,
  ADMIN_URL,
  ISSUER_URL,
};
