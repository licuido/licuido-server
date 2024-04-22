/**
 * Sign in to the application.
 *
 * @param {Payload} body - The payload containing the necessary information for signing in.
 * @return {any} The response data from the server.
 */

import { constants, makeNetworkRequest, Logger } from "@helpers";

const { auth } = constants;
interface signUpPayload {
  email_id: string;
  password: string;
  username?: string;
  mobile_no?: string;
}

interface signInPayload {
  email_id: string;
  password: string;
}

interface forgetPasswordInterface {
  email_id: string;
}

interface resetUserPasswordPayload {
  old_password: string;
  new_password: string;
}

interface resetPasswordInterface {
  new_password: string;
}

interface verifyOTPInterface {
  email_id: string;
  otp: string;
}

interface AxiosConfig {
  url: string;
  config: {
    method: string;
    headers?: {
      authorization?: string;
    };
  };
}

// interface logoutPayload {
//   deviceId: string;
//   timestamp: string;
//   userProfileId: string;
// }

const addAuthoriaztion = (token: string, apiConfig: AxiosConfig) => {
  const modifyApiConfig = {
    ...apiConfig,
  };
  modifyApiConfig.config.headers = {
    authorization: token,
  };
  return modifyApiConfig;
};

// Sign In Call
export const signIn = async (body: signInPayload) => {
  try {
    const payload: signInPayload = body;
    const response: any = await makeNetworkRequest<any, signInPayload>(
      auth.SIGN_IN_CALL,
      payload
    );
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// Prevalidation Call to check the existence of user
export const preValidateUser = async (body: signInPayload) => {
  try {
    const payload: signInPayload = body;
    const response: any = await makeNetworkRequest(
      auth.PRE_VALIDATE_SIGNIN_CALL,
      payload
    );
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// Forget Password Call
export const forgetPassword = async (body: forgetPasswordInterface) => {
  try {
    const payload: forgetPasswordInterface = body;
    const response: any = await makeNetworkRequest(
      auth.FORGET_PASSWORD_CALL,
      payload
    );
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// Validate Token for Password Reset
export const validateToken = async (token: string) => {
  try {
    const apiConfig = addAuthoriaztion(token, auth.VALIDATE_TOKEN_CALL);
    const response: any = await makeNetworkRequest(apiConfig);
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw new Error(error.message);
  }
};

// Reset Password Call
export const resetPassword = async (
  body: resetPasswordInterface,
  token: string,
  id: any
) => {
  try {
    const apiConfig = addAuthoriaztion(token, auth.RESET_PASSWORD_CALL);
    const payload: resetPasswordInterface = body;
    const response: any = await makeNetworkRequest(apiConfig, payload, id);
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// Set Password Call
export const setPassword = async (
  body: resetPasswordInterface,
  token: string
) => {
  try {
    const apiConfig = addAuthoriaztion(token, auth.SET_PASSWORD_CALL);
    const payload: resetPasswordInterface = body;
    const response: any = await makeNetworkRequest(apiConfig, {
      ...payload,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    Logger.error(error.message, error);
    throw error;
  }
};

// Reset Password by User Call
export const resetUserPassword = async (
  body: resetUserPasswordPayload,
  token: string
) => {
  try {
    const apiConfig = addAuthoriaztion(token, auth.RESET_USER_PASSWORD_CALL);
    const payload: resetUserPasswordPayload = body;
    const response: any = await makeNetworkRequest(apiConfig, payload);
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// Refresh Token
export const refreshToken = async (token: string) => {
  try {
    const apiConfig = addAuthoriaztion(token, auth.REFRESH_TOKEN_CALL);
    const response: any = await makeNetworkRequest(apiConfig);
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// Send Otp to Email Call
export const sendEmailOtp = async (body: forgetPasswordInterface) => {
  try {
    const payload: forgetPasswordInterface = body;
    const response: any = await makeNetworkRequest(
      auth.SEND_EMAIL_OTP_CALL,
      payload
    );
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// Verify the Otp send to Email Call
export const verfiyEmailOtp = async (body: verifyOTPInterface) => {
  try {
    const payload: verifyOTPInterface = body;
    const response: any = await makeNetworkRequest(
      auth.VERIFY_EMAIL_OTP_CALL,
      payload
    );
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// Resend Otp to Email Call
export const resendEmailOtp = async (body: forgetPasswordInterface) => {
  try {
    const payload: forgetPasswordInterface = body;
    const response: any = await makeNetworkRequest(
      auth.RESEND_EMAIL_OTP_CALL,
      payload
    );
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export const signUp = async (body: signUpPayload) => {
  try {
    const payload: signUpPayload = body;
    const response: any = await makeNetworkRequest<any, signUpPayload>(
      auth.SIGN_UP_CALL,
      payload
    );
    return response;
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

// export const logout = async (options: logoutPayload) => {
//   try {
//     const { deviceId, timestamp, userProfileId, Tenant } = options;
//     const response: any = await UserSessions.update(Tenant, {
//       userProfileId,
//       timestamp,
//       deviceId,
//     });
//     return response;
//   } catch (error: any) {
//     Logger.error(error.message, error);
//     throw error;
//   }
// };
