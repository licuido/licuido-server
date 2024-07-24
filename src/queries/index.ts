import {
  getAllInvestorsQuery,
  getAllInvestorsCountQuery,
  getInvestorDetailsQuery,
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
  getAllFundOfferingsForPortfolioQuery,
  getInvestorListQuery,
} from "./portfolioIssuerQuery";

import {
  getTokensHoldingsGraphQuery,
  getCurrentTokenInvestmentQuery,
  getInvestorDashboardQuery,
  getAllTokensDeploymentCountQuery,
  getIssuerApprovalCountQuery,
} from "./portfolioInvestorQuery";

import {
  getTokenValuationGraphQuery,
  getTodayTokenValuationPriceQuery,
  getTokenOrdersGraphQuery,
  getTokenStatusQuery,
  getTokenCirculatingSupplyQuery,
  getTokenCirculatingSupplyBefore1dayQuery,
  getTokenRecentActivitiesQuery,
  getByNoOfInvestorsQuery,
  getByInvestmentAmountQuery,
} from "./tokenDashboardQuery";

import { getAllInvestorsListQuery } from "./investorsListQuery";
import {
  getAllPositionReportsQuery,
  getAllPosReportInvestorsQuery,
} from "./positionReportsQuery";

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
  getAllFundOfferingsForPortfolioQuery,
  getInvestorListQuery,
  getTokensHoldingsGraphQuery,
  getCurrentTokenInvestmentQuery,
  getInvestorDashboardQuery,
  getTokenValuationGraphQuery,
  getTodayTokenValuationPriceQuery,
  getTokenOrdersGraphQuery,
  getTokenStatusQuery,
  getTokenCirculatingSupplyQuery,
  getTokenCirculatingSupplyBefore1dayQuery,
  getTokenRecentActivitiesQuery,
  getByNoOfInvestorsQuery,
  getByInvestmentAmountQuery,
  getAllInvestorsListQuery,
  getInvestorDetailsQuery,
  getAllPositionReportsQuery,
  getAllPosReportInvestorsQuery,
  getAllTokensDeploymentCountQuery,
  getIssuerApprovalCountQuery,
};

export default queries;
