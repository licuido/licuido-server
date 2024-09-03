import { token_offering, token_order } from "@models";
import { Op } from "sequelize";

async function getTokenCurrencyDetails(options: any): Promise<any> {
  try {
    let issuerToken = await token_offering.findAll({
      attributes: ["id", "base_currency"],
      where: options,
    });

    issuerToken = JSON.parse(JSON.stringify(issuerToken));
    const currencyCodesSet = new Set();
    const currency_codes: string[] = [];

    if (issuerToken?.length > 0) {
      for (const item of issuerToken) {
        if (!currencyCodesSet.has(item.base_currency) && item.base_currency) {
          currencyCodesSet.add(item.base_currency);
          currency_codes.push(item.base_currency);
        }
      }
    }

    return currency_codes ?? [];
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

async function getInvestorTokenCurrencyDetails(options: any): Promise<any> {
  try {
    let investorInvestedTokens = await token_order.findAll({
      attributes: ["token_offering_id"],
      where: options,
    });

    investorInvestedTokens = JSON.parse(JSON.stringify(investorInvestedTokens));

    if (investorInvestedTokens?.length <= 0) {
      return [];
    }

    const uniqueTokenOfferingIds: any = Array.from(
      new Set(investorInvestedTokens.map((item) => item.token_offering_id))
    );

    let issuerToken = await token_offering.findAll({
      attributes: ["id", "base_currency"],
      where: {
        id: { [Op.in]: uniqueTokenOfferingIds },
      },
    });

    issuerToken = JSON.parse(JSON.stringify(issuerToken));

    const currencyCodesSet = new Set();
    const currency_codes: string[] = [];

    if (issuerToken?.length > 0) {
      for (const item of issuerToken) {
        if (!currencyCodesSet.has(item.base_currency) && item.base_currency) {
          currencyCodesSet.add(item.base_currency);
          currency_codes.push(item.base_currency);
        }
      }
    }

    return currency_codes ?? [];
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export default { getTokenCurrencyDetails, getInvestorTokenCurrencyDetails };
