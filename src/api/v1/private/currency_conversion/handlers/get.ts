import { FastifyReply, FastifyRequest } from "fastify";
import {
  Logger,
  handleResponse,
  responseType,
  // currencyConvert,
  makeNetworkRequest,
  // currencyConvert,
} from "@helpers";
import { isOneHourCompleted, cache } from "@utils";
import { queryRequestInfo } from "@mappers";

// Get Investor Count for Qualification
export async function CURRENCY_CONVERSION_HANDLER(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */
    const { from, amount, to } = queryRequestInfo(request);
    console.log(from);
    console.log(to);

    // const cc = await currencyConvert({
    //   from_currency_code: from,
    //   to_currency_code: to,
    //   amount: 1,
    // });
    // const cc = await currencyConvert({ from_currency_code: from, to_currency_code: to, amount: Number(amount) ?? 0 })

    if (!amount) {
      return handleResponse(request, reply, responseType?.BAD_REQUEST, {
        error: {
          message: "Amount required",
        },
      });
    }

    // const conversionResponse = await currencyConvert({
    //   from_currency_code: from ?? "EUR",
    //   to_currency_code: to,
    //   amount: Number(amount),
    // });

    const cachedData = cache.get(from);
    let returnAmount = 0;
    if (cachedData) {
      console.log("cached");
      const isproceed: any = isOneHourCompleted(cachedData.timestamp);
      if (!isproceed) {
        console.log("procced");
        let toCurrency = cachedData.rates["" + to];
        returnAmount = toCurrency;
        // returnAmount = toCurrency * parseInt(amount);
      } else {
        console.log("noprocced");
        const conversionResponse: any = await makeNetworkRequest({
          //url: `https://api.exchangeratesapi.io/v1/latest?access_key=44ed019d4c73ecdc6117b5e9ef36c57c&symbols=EUR,GBP,USD,AAD,AED,AFN,ALL,AMD,ANG,AOA&base=${from}&format=1`,
          url: `https://api.exchangerate-api.com/v4/latest/${from}`,
          config: {
            method: "GET",
          },
        });
        let toCurrency = conversionResponse.rates["" + to];
        returnAmount = toCurrency;
        // returnAmount = toCurrency * parseInt(amount);
        cache.set(from, conversionResponse);
      }
    } else {
      // console.log("nocached");
      // const conversionResponse: any = {
      //   disclaimer:
      //     "Usage subject to terms: https://openexchangerates.org/terms",
      //   license: "https://openexchangerates.org/license",
      //   timestamp: 1723176001,
      //   base: "USD",
      //   rates: {
      //     AED: 3.673,
      //     AFN: 70.866359,
      //     ALL: 91.767072,
      //     AMD: 388.428642,
      //     ANG: 1.804187,
      //     AOA: 879.690333,
      //     EUR: 0.915485,
      //     GBP: 0.783789,
      //     USD: 1,
      //   },
      // };
      const conversionResponse: any = await makeNetworkRequest({
        //url: "https://api.exchangeratesapi.io/v1/latest?access_key=44ed019d4c73ecdc6117b5e9ef36c57c&symbols=EUR,GBP,USD,AAD,AED,AFN,ALL,AMD,ANG,AOA&format=1",
        url: `https://api.exchangerate-api.com/v4/latest/${from}`,
        config: {
          method: "GET",
        },
      });
      let toCurrency = conversionResponse.rates["" + to];
      returnAmount = toCurrency;
      // returnAmount = toCurrency * parseInt(amount);
      cache.set("USD", conversionResponse);
    }

    return handleResponse(request, reply, responseType?.OK, {
      data: { from, from_amount: amount, to, to_amount: returnAmount },
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}
