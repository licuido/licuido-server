import { token_transaction, token_order } from "@models";
import { createTransaction } from "@types";

class TokenTransactions {
  /**
   * this function used for create transaction for mint/burn
   *
   * @param {createTransaction} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async createTransactions(data: createTransaction): Promise<any> {
    try {
      token_transaction.create(data);
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * this function used for get latest transaction for the token against investor
   *
   * @param {createTransaction} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async getLatestTransactionAgainstInvestor(
    token_offering_id: string,
    receiver_entity_id: string
  ): Promise<any> {
    try {
      const last_transaction = await token_transaction.findAll({
        attributes: ["id", "created_at"],
        include: [
          {
            model: token_order,
            as: "order",
            attributes: ["id", "total_paid", "ordered_tokens"],
            required: true,
            where: {
              is_active: true,
              token_offering_id,
              receiver_entity_id,
            },
          },
        ],
        order: [
          ["created_at", "DESC"], // Order by start_date in descending order
        ],
        limit: 1,
      });
      return JSON.parse(JSON.stringify(last_transaction));
    } catch (error) {
      throw error;
    }
  }
}

export { TokenTransactions };
