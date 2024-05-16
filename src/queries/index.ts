import {
  getAllInvestorsQuery,
  getAllInvestorsCountQuery,
} from "./getInvestorsQuery";
import { getAllSubscriptionOrderQuery } from "./getAllSubscriptionOrderQuery";
import { getAllCurrenciesQuery } from "./getAllCurrencyQuery";

import { getAllTokensQuery, getAllTokensCountQuery } from "./tokensQuery";
import { getAllRedemptionOrderQuery } from "./getAllRedemptionOrderQuery";

const queries = {
  getAllInvestorsQuery,
  getAllInvestorsCountQuery,
  getAllSubscriptionOrderQuery,
  getAllCurrenciesQuery,
  getAllTokensQuery,
  getAllTokensCountQuery,
  getAllRedemptionOrderQuery,
};

export default queries;
