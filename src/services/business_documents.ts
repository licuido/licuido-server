

import { business_document } from "@models";
import { createBusinessDocument } from "@types";
import { Op } from "sequelize";


class BusinessDocument {
  /**
   * this function used for create business document
   *
   * @param {createBusinessDocument} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: createBusinessDocument): Promise<any> {
    try {
        return await business_document.create(options);
    } catch (error) {
      throw error;
    }
  }

   /**
   * this function used for delete business document
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

   static async delete(ids: string[]): Promise<any> {
    try {
        return await business_document.update(
            {
              is_active: false,
            },
            {
              where: {
                id: {
                  [Op.in]: ids,
                },
              },
            }
          );
    } catch (error) {
      throw error;
    }
  }


}

export { BusinessDocument };
