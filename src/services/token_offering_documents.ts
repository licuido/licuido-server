import { token_offering_document } from "@models";
import { createTokenOfferingDocuments } from "@types";

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
}

export { TokenOfferingsDocuments };
