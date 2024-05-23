import {
  getAllInvestorsQuery,
  getAllInvestorsCountQuery,
} from "./getInvestorsQuery";
import { getAllSubscriptionOrderQuery } from "./getAllSubscriptionOrderQuery";
import { getAllCurrenciesQuery } from "./getAllCurrencyQuery";

import { getAllTokensQuery, getAllTokensCountQuery } from "./tokensQuery";
import { getAllRedemptionOrderQuery } from "./getAllRedemptionOrderQuery";
import { getAllTransactionQuery, getAllTransactionCountQuery } from "./getTransaction";


const queries = {
  getAllInvestorsQuery,
  getAllInvestorsCountQuery,
  getAllSubscriptionOrderQuery,
  getAllCurrenciesQuery,
  getAllTokensQuery,
  getAllTokensCountQuery,
  getAllRedemptionOrderQuery,
  getAllTransactionQuery, 
  getAllTransactionCountQuery
};

export default queries;
