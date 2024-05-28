import {
  getAllInvestorsQuery,
  getAllInvestorsCountQuery,
} from "./getInvestorsQuery";
import {
  getMarketPlaceListingQuery,
  getMarketPlaceListingQueryCount,
} from "./getMarketPlaceQuery";
import { getAllSubscriptionOrderQuery } from "./getAllSubscriptionOrderQuery";
import { getAllCurrenciesQuery } from "./getAllCurrencyQuery";

import { getAllTokensQuery, getAllTokensCountQuery } from "./tokensQuery";
import { getAllRedemptionOrderQuery } from "./getAllRedemptionOrderQuery";
import {
  getAllTransactionQuery,
  getAllTransactionCountQuery,
} from "./getTransaction";
import { getAllTokenOrderGraphQuery } from "./getAllTokenOrderGraphQuery";
import { getTokensByInvestorGraphQuery } from "./getTokensByInvestorGraphQuery";
import {
  getTotalInvestmentQuery,
  getCirculatingSupplyQuery,
  getPendingRedemptionQuery,
} from "./portfolioIssuerQuery";

const queries = {
  getAllInvestorsQuery,
  getAllInvestorsCountQuery,
  getMarketPlaceListingQuery,
  getMarketPlaceListingQueryCount,
  getAllSubscriptionOrderQuery,
  getAllCurrenciesQuery,
  getAllTokensQuery,
  getAllTokensCountQuery,
  getAllRedemptionOrderQuery,
  getAllTransactionQuery,
  getAllTransactionCountQuery,
  getAllTokenOrderGraphQuery,
  getTokensByInvestorGraphQuery,
  getTotalInvestmentQuery,
  getCirculatingSupplyQuery,
  getPendingRedemptionQuery,
};

export default queries;
