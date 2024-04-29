import { customer_wallet } from "@models";
import { createCustomerWallet } from "@types";


class CustomerWallet {
/**
   * this function used for insert user entities.
   *
   * @param {createEntity} options - The response object containing paginated information.
   * @throws {Error} Throws an error if there's an issue extracting parameters from the response.
   */

static async create(options: createCustomerWallet): Promise<any> {
    try {
        const {profile_id,is_authenticated,investor_entity_id,wallet_address,wallet_type_id}=options;
        return await customer_wallet.create({
            is_authenticated,
            investor_entity_id,
            wallet_address,
            wallet_type_id,
            is_active:true,
            created_by:profile_id
        });
    } catch (error) {
      throw error;
    }
  }

}

export { CustomerWallet };
