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
    method: "post",
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

export const entityUrl: any = {
  1: process.env.ADMIN_URL ?? "",
  2: process.env.INVESTOR_URL ?? "",
  3: process.env.ISSUER_URL ?? "",
};

export const authorizationMessages: any = {
  badRequestErrorMessage: `Format must be Authorization: Bearer <token>`,
  noAuthorizationInHeaderMessage: "Autorization header is missing!",
  authorizationTokenExpiredMessage: "token expired!",
  // for the below message you can pass a sync function that must return a string as shown or a string
  authorizationTokenInvalid: (err: any) => {
    return `Authorization token is invalid: ${err.message}`;
  },
};

enum paymentType {
  fullPayment = "Full payment",
  installment = "Installment",
}
export default {
  auth,
  assetIdentificationType,
  paymentType,
};

export const entityTypeMaster = {
  admin: 1,
  investor: 2,
  issuer: 3,
};

export const buildCodes: { [key: string]: number } = {
  "AD-1": 1,
  "IN-2": 2,
  "ISS-3": 3,
};

export const FUND_STATUS_FILTER = {
  OPEN: 1,
  CLOSE:2,
  UPCOMING:3,
  INVESTED:4
}

export const ENTITY_INVESTOR_STATUS = {
  NOT_APPROVED:0,
  PENDING:1,
  CONSIDERED:2,
  APPROVED:3
}