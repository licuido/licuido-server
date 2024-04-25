import { FastifyReply, FastifyRequest } from "fastify";

import {
  Logger,
  createMultipartUpload,
  handleResponse,
  responseType,
  createPresignedUrl,
  completeMultipartUpload,
  abortMultipartUpload,
  generatePresignedUrl,
  deleteS3Object,
} from "@helpers";

/**
 * Generates a pre-signed URL for the given request and reply objects.
 *
 * @param {FastifyRequest} request - The request object.
 * @param {FastifyReply} reply - The reply object.
 * @return {Promise<void>} - A promise that resolves when the pre-signed URL is generated.
 */
async function GET_PRE_SIGNED_URL(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  HELPER
    // -----------------------------

    const data = await generatePresignedUrl(request.body);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.ACCEPTED, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error?.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

/**
 * Creates a multi-part upload.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @return {Promise<void>} - Returns a promise that resolves to void.
 */
async function CREATE_MULTI_PART_UPLOAD(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  HELPER
    // -----------------------------

    const data = await createMultipartUpload(request.body);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.ACCEPTED, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error?.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

/**
 * Generates a pre-signed URL for the given request and reply.
 *
 * @param {FastifyRequest} request - The request object.
 * @param {FastifyReply} reply - The reply object.
 * @return {Promise<any>} A promise that resolves to the pre-signed URL.
 */
async function GET_MULTIPART_PRE_SIGNED_URL(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  HELPER
    // -----------------------------

    const data = await createPresignedUrl(request.body);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.ACCEPTED, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error?.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

/**
 * Completes a multipart upload.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */
async function COMPLETE_MULTIPART_UPLOAD(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  HELPER
    // -----------------------------

    const data = await completeMultipartUpload(request.body);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.ACCEPTED, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error?.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

/**
 * Cancels a multipart upload.
 *
 * @param {FastifyRequest} request - the Fastify request object
 * @param {FastifyReply} reply - the Fastify reply object
 * @return {Promise<void>} - a promise that resolves to void
 */
async function CANCEL_MULTIPART_UPLOAD(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // -----------------------------
    //  HELPER
    // -----------------------------

    const data = await abortMultipartUpload(request.body);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.ACCEPTED, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error?.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

async function DELETE_S3_OBJECT(request: FastifyRequest, reply: FastifyReply) {
  try {
    // -----------------------------
    //  HELPER
    // -----------------------------

    const data = await deleteS3Object(request.body);

    // -----------------------------
    //  RESPONSE
    // -----------------------------
    return handleResponse(request, reply, responseType?.NO_CONTENT, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error?.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

export default {
  CREATE_MULTI_PART_UPLOAD,
  GET_MULTIPART_PRE_SIGNED_URL,
  COMPLETE_MULTIPART_UPLOAD,
  CANCEL_MULTIPART_UPLOAD,
  GET_PRE_SIGNED_URL,
  DELETE_S3_OBJECT,
};
