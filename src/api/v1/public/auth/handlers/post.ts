/**
 * Signs in a user.
 *
 * @param {FastifyRequest} request - the request object
 * @param {FastifyReply} reply - the reply object
 * @return {Promise<void>} a promise that resolves when the sign in process is complete
 */

import { FastifyReply, FastifyRequest } from "fastify";

import { Logger, handleResponse, responseType } from "@helpers";
import {
  forgetPassword,
  preValidateUser,
  resendEmailOtp,
  resetPassword,
  setPassword,
  resetUserPassword,
  sendEmailOtp,
  signIn,
  verfiyEmailOtp,
  signUp,
} from "interactors/auth";
import { postRequestInfo } from "@mappers";
import {
  signInType,
  forgetPasswordInterface,
  verifyOTPInterface,
  resetPasswordInterface,
  resetUserPasswordPayload,
} from "@types";
import { findUserExisit } from "@services";
// import { entityUrl } from "helpers/constants";

// Sign In
export async function SIGN_IN(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email_id, password, entity_id } = postRequestInfo(request);
    const payload = {
      email_id,
      password,
      entity_id,
    };
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const result = await signIn(payload as signInType);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(
      request,
      reply,
      result?.success ? responseType?.OK : responseType.BAD_GATEWAY,
      {
        data: result?.success
          ? {
              token: await reply.jwtSign({
                ...result?.token_data,
              }),
            }
          : undefined,
        customMessage: result?.message,
        error: {
          message: result?.message,
        },
      }
    );
  } catch (error: any) {
    Logger.error(request, error.message, error);
    if (error?.response?.data?.statusCode === 403) {
      return handleResponse(request, reply, responseType?.UNAUTHORIZED, {
        error: {
          message: "invalid email or password",
        },
      });
    } else {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message: responseType?.INTERNAL_SERVER_ERROR,
          },
        }
      );
    }
  }
}

// Sign Up
export async function SIGN_UP(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email_id, password, is_agree_terms_condition, entity_id } =
      postRequestInfo(request);
    const payload = {
      email_id,
      password,
      is_agree_terms_condition,
      entity_id,
    };

    const isUserExisit: any = await findUserExisit({ entity_id, email_id });
    if (isUserExisit?.length !== 0) {
      return handleResponse(request, reply, responseType?.UNAUTHORIZED, {
        customMessage: "User Already Exisits",
        error: {
          email_id,
          user_profile: !isUserExisit?.[0]?.dataValues?.user_profile?.dataValues
            ?.is_setup_done
            ? isUserExisit?.[0]?.dataValues?.user_profile_id
            : undefined,
        },
      });
    }

    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const result = await signUp(payload as signInType);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.OK, {
      data: result,
      customMessage: "User Created Successfully",
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    if (error?.response?.data?.statusCode === 403) {
      return handleResponse(request, reply, responseType?.UNAUTHORIZED, {
        error: {
          message: "invalid email or password",
        },
      });
    } else {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message: responseType?.INTERNAL_SERVER_ERROR,
          },
        }
      );
    }
  }
}

// Pre Validate User
export async function PRE_VALIDATE_SIGNIN(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email_id, password } = request.body as {
      email_id: string;
      password: string;
    };
    const payload = {
      email_id,
      password,
    };
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const data = await preValidateUser(payload as signInType);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.OK, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

// Forget Password
export async function FORGET_PASSWORD(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email_id } = postRequestInfo(request);
  const payload = { email_id };

  try {
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const data = await forgetPassword(payload as forgetPasswordInterface);

    // if(data?.data?.token && entity_id){
    //   const user:any = await findUserExisit({ entity_id, email_id });
    //   await sendAlert({
    //     reference_id: "reset_password",
    //     email_subject: ["email_subject"],
    //     email_body: [
    //       `Hi ${user?.[0]?.dataValues?.user_profile?.name} proceed to login by the below link  ${entityUrl?.[1]??""}.`,
    //     ],
    //     to_emails: [email_id],
    //   }).then((res)=>{
    //     console.log(res,"user")
    //   })
    // }

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.OK, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    if (error?.response?.data?.statusCode === 403) {
      return handleResponse(request, reply, responseType?.UNAUTHORIZED, {
        error: {
          message: "No Such User Exists!",
        },
      });
    } else {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message: responseType?.INTERNAL_SERVER_ERROR,
          },
        }
      );
    }
  }
}

// RESET PASSWORD
export async function RESET_PASSWORD(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { new_password, id } = request.body as {
      new_password: string;
      id: number;
    };
    const payload = { new_password };
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const token = request.headers.authorization;
    const data = await resetPassword(
      payload as resetPasswordInterface,
      token as string,
      id as any
    );

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.OK, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    if (error?.response?.data?.statusCode === 403) {
      return handleResponse(request, reply, responseType?.UNAUTHORIZED, {
        error: {
          message: "Token is in Valid!",
        },
      });
    } else {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message: responseType?.INTERNAL_SERVER_ERROR,
          },
        }
      );
    }
  }
}

// SET PASSWORD
export async function SET_PASSWORD(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { new_password } = request.body as { new_password: string };
    const payload = { new_password };
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const token = request.headers.authorization;
    const data = await setPassword(
      payload as resetPasswordInterface,
      token as string
    );

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.OK, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    if (error?.response?.data?.statusCode === 403) {
      return handleResponse(request, reply, responseType?.UNAUTHORIZED, {
        error: {
          message: "Token is in Valid!",
        },
      });
    } else {
      return handleResponse(
        request,
        reply,
        responseType?.INTERNAL_SERVER_ERROR,
        {
          error: {
            message: responseType?.INTERNAL_SERVER_ERROR,
          },
        }
      );
    }
  }
}

// RESET PASSWORD By USER
export async function RESET_PASSWORD_BY_USER(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { old_password, new_password } = request.body as {
      old_password: string;
      new_password: string;
    };
    const payload = { old_password, new_password };
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const token = request.headers.authorization;
    const data = await resetUserPassword(
      payload as resetUserPasswordPayload,
      token as string
    );

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.OK, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

// SEND EMAIL OTP
export async function SEND_EMAIL_OTP(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email_id } = request.body as {
      email_id: string;
    };
    const payload = { email_id };
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const data = await sendEmailOtp(payload as forgetPasswordInterface);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.OK, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

// VERIFY EMAIL OTP
export async function VERIFY_EMAIL_OTP(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email_id, otp } = request.body as {
      email_id: string;
      otp: string;
    };
    const payload = { email_id, otp };
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const data = await verfiyEmailOtp(payload as verifyOTPInterface);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.OK, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

// RESEND EMAIL OTP
export async function RESEND_EMAIL_OTP(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email_id } = request.body as {
      email_id: string;
    };
    const payload = { email_id };
    // -----------------------------
    //  INTRACTOR
    // -----------------------------
    const data = await resendEmailOtp(payload as forgetPasswordInterface);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.OK, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
