import * as fs from "fs";
import streamToBuffer from "stream-to-buffer";
/**
 * Converts a readable stream to a buffer asynchronously.
 *
 * @param {fs.ReadStream} stream - The readable stream to convert.
 * @return {Promise<Buffer>} A promise that resolves to the converted buffer.
 */
async function streamToBufferAsync(stream: fs.ReadStream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    streamToBuffer(stream, (error: any, buffer: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(buffer);
      }
    });
  });
}
export default { streamToBufferAsync };
