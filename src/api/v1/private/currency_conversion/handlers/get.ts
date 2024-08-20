import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
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
    if (!amount) {
      return handleResponse(request, reply, responseType?.BAD_REQUEST, {
        error: {
          message: "Amount required",
        },
      });
    }
    const cachedData = cache.get("USD");
    let returnAmount = 0;
    if (cachedData) {
      console.log("cached");
      const isproceed: any = isOneHourCompleted(cachedData.timestamp);
      if (!isproceed) {
        console.log("procced");
        let toCurrency = cachedData.rates["" + to];
        returnAmount = toCurrency * parseInt(amount);
      } else {
        console.log("noprocced");
        const conversionResponse: any = {
          disclaimer:
            "Usage subject to terms: https://openexchangerates.org/terms",
          license: "https://openexchangerates.org/license",
          timestamp: 1723176001,
          base: "USD",
          rates: {
            AED: 3.673,
            AFN: 70.866359,
            ALL: 91.767072,
            AMD: 388.428642,
            ANG: 1.804187,
            AOA: 879.690333,
            EUR: 1,
            GBP: 0.783789,
            USD: 1,
          },
        };
        let toCurrency = conversionResponse.rates["" + to];
        returnAmount = toCurrency * parseInt(amount);
        cache.set("USD", conversionResponse);
      }
    } else {
      console.log("nocached");
      const conversionResponse: any = {
        disclaimer:
          "Usage subject to terms: https://openexchangerates.org/terms",
        license: "https://openexchangerates.org/license",
        timestamp: 1723176001,
        base: "USD",
        rates: {
          AED: 3.673,
          AFN: 70.866359,
          ALL: 91.767072,
          AMD: 388.428642,
          ANG: 1.804187,
          AOA: 879.690333,
          EUR: 1,
          GBP: 0.783789,
          USD: 1,
        },
      };
      let toCurrency = conversionResponse.rates["" + to];
      returnAmount = toCurrency * parseInt(amount);
      cache.set("USD", conversionResponse);
    }

    // const conversionResponse = await makeNetworkRequest(
    //     {
    //         url: "https://openexchangerates.org/api/latest.json?app_id=84afe04c2c534b13ba74cefc2c88db40&symbols=EUR,GBP,USD,AAD,AED,AFN,ALL,AMD,ANG,AOA",
    //         config: {
    //             method: "GET",
    //         },
    //     }
    // );

    // /* -----------  INTERACTOR ----------- */
    // const result = await UserEntities.getInvestorCountForQualification({
    //     entity_type_id: 2, // Investor
    // });

    /* -----------  RESPONSE ----------- */

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
