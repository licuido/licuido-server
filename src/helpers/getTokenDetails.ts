import { token_offering } from "@models";

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

export default { getTokenCurrencyDetails };
