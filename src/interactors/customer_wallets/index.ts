import { Logger } from "@helpers";
import { CustomerWallet } from "@services";
import { createCustomerWallet } from "@types";

// create customer wallet
const createCustomersWallet = async (options: createCustomerWallet) => {
  try {

    const {is_authenticated}=options;

    if(!is_authenticated){
      return {
        success: false,
        message: `Your Wallet Address is not Valid`,
      };
    }

     await CustomerWallet.create({...options})
    return {
      success: true,
      message: `Customer Wallet Updated`,
    };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
    createCustomersWallet,
};
