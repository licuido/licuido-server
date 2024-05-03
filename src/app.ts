import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import v1 from "./api/v1";
import { cpus } from "os";
import { buildCodes } from "helpers/constants";

process.env.UV_THREADPOOL_SIZE = String(cpus().length);

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
    request.entity_id = buildCodes[request?.headers?.build ?? "AD-1"];
    return next();
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(v1);
};

export default app;
export { app, options };
