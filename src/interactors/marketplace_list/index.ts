import { Logger } from "@helpers";
import { TokenOfferings } from "@services";

// get all investor tyoe
const getAllMarketPlaceList = async (options: any) => {
  try {
    let {
      offset = 0,
      limit = 0,
      search = "",
      tokenTypeId,
      currencyCode,
      fundStatus,
      countryId,
    } = options;

    if (
      tokenTypeId !== undefined &&
      tokenTypeId !== "" &&
      tokenTypeId !== null &&
      tokenTypeId?.length > 0
    ) {
      tokenTypeId = tokenTypeId?.split(",");
    }
    console?.log(currencyCode, "currencyCodecurrencyCodecurrencyCode");
    if (
      currencyCode !== undefined &&
      currencyCode !== "" &&
      currencyCode !== null &&
      currencyCode?.length > 0
    ) {
      currencyCode = currencyCode?.split(",");
    }

    currencyCode =
      currencyCode && typeof currencyCode === "string"
        ? currencyCode === ""
          ? []
          : currencyCode.split(",")
        : Array.isArray(currencyCode)
        ? currencyCode
        : [];
    
    const { rows, count } = await TokenOfferings.getAllTokenOfferings({
      search,
      offset,
      limit,
      tokenTypeId,
      currencyCode,
      fundStatus,
      countryId,
    });

    return { page: rows, count: rows?.length, totalCount: count };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw error;
  }
};

export default {
  getAllMarketPlaceList,
};
