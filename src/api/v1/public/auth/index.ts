import { FastifyPluginAsync } from "fastify";
import schema from "./schema";
import handlers from "./handlers";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify
    .post("/login", { schema: schema.SIGN_IN }, handlers.SIGN_IN)
    .post("/register", { schema: schema.SIGN_IN }, handlers.SIGN_UP)
    .post(
      "/pre_validate",
      { schema: schema.PRE_VALIDATE_SIGNIN },
      handlers.PRE_VALIDATE_SIGNIN
    )
    .post(
      "/forget_password",
      { schema: schema.FORGET_PASSWORD },
      handlers.FORGET_PASSWORD
    )
    .post(
      "/reset_password",
      { schema: schema.RESET_PASSWORD },
      handlers.RESET_PASSWORD
    )
    .post(
      "/set_password",
      { schema: schema.RESET_PASSWORD },
      handlers.SET_PASSWORD
    )
    .post(
      "/send_otp",
      { schema: schema.SEND_EMAIL_OTP },
      handlers.SEND_EMAIL_OTP
    )
    .post(
      "/verify_otp",
      { schema: schema.VERIFY_EMAIL_OTP },
      handlers.VERIFY_EMAIL_OTP
    )
    .post(
      "/resend_otp",
      { schema: schema.RESEND_EMAIL_OTP },
      handlers.RESEND_EMAIL_OTP
    );

  fastify.patch(
    "/reset_password_user",
    { schema: schema.RESET_PASSWORD_BY_USER },
    handlers.RESET_PASSWORD_BY_USER
  );

  fastify
    .get(
      "/validate_token",
      { schema: schema.VALIDATE_TOKEN },
      handlers.VALIDATE_TOKEN
    )
    .get(
      "/refresh_token",
      { schema: schema.REFRESH_TOKEN },
      handlers.REFRESH_TOKEN
    );
};

export default example;
