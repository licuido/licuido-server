import { asset } from "@models";
import { createAsset } from "@types";


class Asset {
  /**
   * this function used for insert user entities.
   *
   * @param {createEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async upsert(options: createAsset): Promise<any> {
    try {
        return await asset.upsert(options);
    } catch (error) {
      throw error;
    }
  }

}

export { Asset };
