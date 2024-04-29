import fp from "fastify-plugin";
import { FastifyPluginAsync, FastifyReply } from "fastify";
import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";

const authorizationMessages: any = {
  badRequestErrorMessage: `Format must be Authorization: Bearer <token>`,
  noAuthorizationInHeaderMessage: "Autorization header is missing!",
  authorizationTokenExpiredMessage: "token expired!",
  // for the below message you can pass a sync function that must return a string as shown or a string
  authorizationTokenInvalid: (err: any) => {
    return `Authorization token is invalid: ${err.message}`;
  },
};

export interface UserData {
  locationId?: string;
  userProfileId?: string;
  id?: number;
  userTypeName?: string;
  clientId?: string;
  organizationId?: string;
  userId?: number;
  iat?: number;
  exp?: number;
}

// Augment the FastifyInstance type
declare module "fastify" {
  interface FastifyInstance {
    authenticate: () => void;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserData;
  }
}

const jwtPlugin: FastifyPluginAsync<FastifyJWTOptions> = async (
  fastify: any
) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    messages: authorizationMessages,
    sign: {
      expiresIn: "30 day",
    },
  });
  fastify.decorate(
    "authenticate",
    async function (request: any, reply: FastifyReply) {
      try {
        if (!request?.entity_id) {
          reply.code(500).send({ error: "Please Provide Referrer" });
        }

        const data = await request.jwtVerify();
        request.user_profile_id = data?.user_profile;
        request.user_entity_id = data?.user_entity_id;
      } catch (err) {
        reply.code(500).send(err);
        console.log("error");
      }
    }
  );
};

export default fp(jwtPlugin);
