import { token_transaction, token_order } from "@models";
import queries from "@queries";
import { createTransaction } from "@types";
import { sequelize } from "@utils";

class TokenTransactions {
  /**
   * this function used for create transaction for mint/burn
   *
   * @param {createTransaction} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async createTransactions(data: createTransaction): Promise<any> {
    try {
      const result = token_transaction.create(data, {
        raw: false,
        returning: true,
      });
      return JSON.parse(JSON.stringify(result));
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
        attributes: ["id", "created_at", "sender_balance"],
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

  /**
   * this function used for get token total supply
   *
   * @param {createTransaction} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async getTotalSupply(token_offering_id: string): Promise<any> {
    try {
      const last_transaction = await token_transaction.findAll({
        attributes: ["id", "created_at", "sender_balance", "total_supply"],
        include: [
          {
            model: token_order,
            as: "order",
            attributes: ["id"],
            required: true,
            where: {
              is_active: true,
              token_offering_id,
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

  /**
   * this function used for get All Transaction
   *
   * @param {createTransaction} options - The response object containing create data.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

  static async getAllTransaction(data: any): Promise<{
    rows: any[];
    count: number;
  }> {
    try {
      const {
        offset,
        limit,
        type = [],
        token_offering_id,
        issuer_id,
        investor_id,
        search,
        status_filters = [],
        start_date,
        end_date,
      } = data;

      // For Data
      const [result]: any[] = await sequelize.query(
        queries.getAllTransactionQuery(
          offset,
          limit,
          type,
          token_offering_id,
          issuer_id,
          investor_id,
          search,
          status_filters,
          start_date,
          end_date
        )
      );

      // For Count
      const [dataCount]: any[] = await sequelize.query(
        queries.getAllTransactionCountQuery(
          type,
          token_offering_id,
          issuer_id,
          investor_id,
          search,
          status_filters,
          start_date,
          end_date
        )
      );

      return {
        rows: result,
        count: dataCount?.[0]?.count ?? 0,
      };
    } catch (error) {
      throw error;
    }
  }
}

export { TokenTransactions };
