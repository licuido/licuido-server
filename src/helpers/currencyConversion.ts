const CC = require("currency-converter-lt");

/**
 * Converts the given amount of currency from one currency code to another.
 *
 * @param {Object} params - The parameters for the currency conversion.
 * @param {string} params.from_currency_code - The currency code to convert from.
 * @param {string} params.to_currency_code - The currency code to convert to.
 * @param {number} params.amount - The amount of currency to convert.
 * @return {Promise<any>} A promise that resolves to the converted currency amount.
 * @throws {Error} If there is an error during the currency conversion.
 */

async function currencyConvert({
  from_currency_code,
  to_currency_code,
  amount,
}: {
  from_currency_code: string;
  to_currency_code: string;
  amount: number;
}): Promise<any> {
  try {
    let currencyConverter = new CC({
      from: from_currency_code,
      to: to_currency_code,
      amount: amount,
      isDecimalComma: false,
    });

    const response = await currencyConverter.convert(amount);
    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export default currencyConvert;
