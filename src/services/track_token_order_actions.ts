import { track_token_order_action } from "@models";
import { createTrackTokenOrderActions } from "@types";
import { Transaction } from "sequelize";

class TrackTokenOrderActions {
  /**
   * A description of the entire function.
   *
   * @param {createTokenOrders} options - description of options parameter
   * @param {Transaction} transaction - description of transaction parameter
   * @return {Promise<any>} description of the return value
   */

  static async create(
    options: createTrackTokenOrderActions,
    transaction: Transaction
  ): Promise<any> {
    try {
      const trackTokenOrderActions = await track_token_order_action.create(
        options,
        {
          raw: false,
          returning: true,
          transaction,
        }
      );

      let trackTokenOrderActionsData: any = trackTokenOrderActions
        ? JSON.parse(JSON.stringify(trackTokenOrderActions))
        : null;

      return trackTokenOrderActionsData?.id;
    } catch (error) {
      throw error;
    }
  }
}

export { TrackTokenOrderActions };
