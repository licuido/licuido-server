import fp from "fastify-plugin";
import swagger, { SwaggerOptions } from "@fastify/swagger";
import { FastifyPluginCallback } from "fastify";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

const swaggerPlugin: FastifyPluginCallback<SwaggerOptions> = async (
  fastify: any,
  options
) => {
  fastify.register(swagger, {
    swagger: {
      info: {
        title: "Licuido API Service",
        description: "Licuido API Swagger Collection",
        version: "0.0.1",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
    },
    exposeRoute: true,
  });
  fastify.register(fastifySwaggerUi, {
    routePrefix: "/swagger-docs",
    uiConfig: {
      // docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request: any, reply: any, next: any) {
        next();
      },
      preHandler: function (request: any, reply: any, next: () => void) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    transformSpecification: (swaggerObject: any, request: any, reply: any) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
};

export default fp(swaggerPlugin);
