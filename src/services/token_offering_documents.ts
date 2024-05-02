import { token_offering_document } from "@models";
import { createTokenOfferingDocuments } from "@types";
import { Op } from "sequelize";

class TokenOfferingsDocuments {
  /**
   * this function used for create token offering documents
   *
   * @param {createTokenOfferingDocuments} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async create(options: createTokenOfferingDocuments[]): Promise<any> {
    try {
      return await token_offering_document.bulkCreate(options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update token offering  offering documents
   *
   * @param {createTokenOfferingDocuments} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async update({
    options,
    id,
  }: {
    options: createTokenOfferingDocuments;
    id: string;
  }): Promise<any> {
    try {
      return await token_offering_document.update(
        {
          ...options,
        },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for update Deleted Status Of Existing Token Offering Documents
   *
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */
  static async updateDeletedStatus({
    removed_documents,
    updated_by,
  }: {
    removed_documents: string[];
    updated_by: string;
  }): Promise<any> {
    try {
      // Update The Status As Deleted [Soft Delete - is_active: false]
      return await token_offering_document.update(
        {
          is_active: false,
          updated_by: updated_by,
        },
        {
          where: {
            id: {
              [Op.in]: removed_documents,
            },
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

export { TokenOfferingsDocuments };
