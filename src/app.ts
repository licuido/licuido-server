import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import v1 from "./api/v1";
import { cpus } from "os";
import { entityTypeMaster } from "helpers/constants";
// import { Logger, handleResponse, responseType } from "@helpers";

process.env.UV_THREADPOOL_SIZE = String(cpus().length);

const entity_types = {
  [String(process.env.ADMIN_URL)]: 1,
  [String(process.env.INVESTOR_URL)]: 2,
  [String(process.env.ISSUER_URL)]: 3,
};

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  fastify.addHook("onRequest", (request: any, response, next) => {
    // if (!request?.headers?.referer) {
    //   Logger.error(request, "Please Provide Referrer", false, "APP");
    //   return handleResponse(request, response, responseType.FORBIDDEN, {
    //     customMessage: "Please Provide Referrer",
    //   });
    // }
    request.entity_id =
      entity_types[request?.headers?.referer] ?? entityTypeMaster?.admin;
    return next();
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(v1);
};

export default app;
export { app, options };
