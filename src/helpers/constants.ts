import { env } from "@config";

const SIGN_IN_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/login",
  config: {
    method: "post",
  },
};

const PRE_VALIDATE_SIGNIN_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/prevalidate_user",
  config: {
    method: "post",
  },
};

const FORGET_PASSWORD_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/forgot_password",
  config: {
    method: "post",
  },
};

const RESET_PASSWORD_CALL = {
  url: env.AUTH_API_LOCAL + "/user/reset_password",
  config: {
    method: "patch",
  },
};

const SET_PASSWORD_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/reset_password",
  config: {
    method: "patch",
  },
};

const REFRESH_TOKEN_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/refresh",
  config: {
    method: "get",
  },
};

const VALIDATE_TOKEN_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/verify_token",
  config: {
    method: "get",
  },
};

const RESET_USER_PASSWORD_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/reset_password",
  config: {
    method: "patch",
  },
};

const SEND_EMAIL_OTP_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/send_otp/:email",
  config: {
    method: "post",
  },
};

const VERIFY_EMAIL_OTP_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/verify_otp/:email",
  config: {
    method: "post",
  },
};

const RESEND_EMAIL_OTP_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/resend_otp/:email",
  config: {
    method: "post",
  },
};

const SIGN_UP_CALL = {
  url: env.AUTH_API_LOCAL + "/auth/signup",
  config: {
    method: "post",
  },
};

const auth = {
  SIGN_IN_CALL,
  PRE_VALIDATE_SIGNIN_CALL,
  FORGET_PASSWORD_CALL,
  RESET_PASSWORD_CALL,
  SET_PASSWORD_CALL,
  REFRESH_TOKEN_CALL,
  VALIDATE_TOKEN_CALL,
  RESET_USER_PASSWORD_CALL,
  SEND_EMAIL_OTP_CALL,
  VERIFY_EMAIL_OTP_CALL,
  RESEND_EMAIL_OTP_CALL,
  SIGN_UP_CALL,
};

enum assetIdentificationType {
  chasisNumber = "Chasis Number",
  engineNumber = "Engine Number",
}

enum paymentType {
  fullPayment = "Full payment",
  installment = "Installment",
}
export default {
  auth,
  assetIdentificationType,
  paymentType,
};
