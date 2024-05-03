import {
    S3Client,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
    AbortMultipartUploadCommand,
    PutObjectCommand,
    DeleteObjectCommand,
  } from "@aws-sdk/client-s3";
  
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
  
  import { env } from "@config";
  
  const {
    AWS_BUCKET_NAME = "",
    REGION = "eu-west-1",
    S3_END_PONIT,
    S3_ACCESS_KEY,
    S3_SECRET_KEY,
  }: any = env;
  
  const s3 = new S3Client({
    region: REGION,
    endpoint: S3_END_PONIT,
    credentials: {
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_KEY,
    },
  });
  
  export async function deleteS3Object({ fileKey }: any) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: fileKey,
      });
      await s3.send(command);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  /**
   * Generates a presigned URL for the given file key.
   *
   * @param {string} fileKey - The key of the file.
   * @return {Promise<any>} The generated presigned URL.
   */
  export async function generatePresignedUrl({ fileKey }: any): Promise<any> {
    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: fileKey,
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 2 }); // expiresIn is in 2 mins
    return { signedUrl, fileKey };
  }
  
  /**
   * Creates a multipart upload for a given file key.
   *
   * @param {any} fileKey - The key of the file to upload.
   * @return {Promise<any>} - A Promise that resolves to an object containing the fileId and fileKey.
   */
  export async function createMultipartUpload({ fileKey }: any) {
    try {
      const multiPartParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileKey,
      };
  
      const command = new CreateMultipartUploadCommand(multiPartParams);
  
      const response = await s3.send(command);
  
      return {
        fileId: response.UploadId,
        fileKey: response.Key ? response?.Key?.replace(`${AWS_BUCKET_NAME}/`, ""):""
      };
    } catch (e) {
      console.log(e);
  
      throw e;
    }
  }
  
  /**
   * Creates a presigned URL for uploading a file part.
   *
   * @param {any} fileKey - The key of the file in the bucket.
   * @param {any} fileId - The ID of the file to upload.
   * @param {any} partNumber - The part number of the file.
   * @return {Promise<{ signedUrl: string, partNumber: any }>} - The signed URL and part number.
   */
  export async function createPresignedUrl({ fileKey, fileId, partNumber }: any) {
    try {
      const signedUrlParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileKey,
        UploadId: fileId,
        PartNumber: partNumber,
      };
  
      const command = new UploadPartCommand(signedUrlParams);
  
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 2 });
  
      return {
        signedUrl,
        partNumber,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  /**
   * Completes a multipart upload.
   *
   * @param {Array} parts - An array containing the parts of the file to be uploaded.
   * @param {string} fileKey - The key of the file to be uploaded.
   * @param {string} fileId - The ID of the file upload.
   * @return {Object} An object containing the message, fileId, fileKey, and Location of the uploaded file.
   */
  export async function completeMultipartUpload({ parts, fileKey, fileId }: any) {
    try {
      const sortedParts = parts.sort(
        (a: any, b: any) => a.PartNumber - b.PartNumber
      );
  
      const completeMultipartUploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileKey,
        UploadId: fileId,
        MultipartUpload: {
          Parts: sortedParts,
        },
      };
  
      const command = new CompleteMultipartUploadCommand(
        completeMultipartUploadParams
      );
  
      const response = await s3.send(command);
  
      return {
        message: "File uploaded successfully",
        fileId: response.ETag,
        fileKey: response.Key,
        Location: response.Location,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export async function abortMultipartUpload({ fileKey, fileId }: any) {
    try {
      const abortMultipartUploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileKey,
        UploadId: fileId,
      };
  
      const command = new AbortMultipartUploadCommand(abortMultipartUploadParams);
  
      const response = await s3.send(command);
  
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export const uploadToS3 = async (fileBufferData: any, fileKey: any) => {
    try {
      // Create a command to upload the file to S3
      const command = new PutObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: fileKey,
        Body: fileBufferData,
      });
  
      // Upload the file to S3
      const response = await s3.send(command);
      return response;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  