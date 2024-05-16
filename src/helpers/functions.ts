interface ValuationResult {
  percentage: number;
  type: "Increased" | "Equal" | "Decreased";
}

const returnValuationPrice = (
  offer_price: number,
  valuation_price: number
): ValuationResult => {
  if (!valuation_price) {
    return {
      percentage: 0,
      type: "Equal",
    };
  }

  const percentage = ((valuation_price - offer_price) / offer_price) * 100;

  return {
    percentage,
    type:
      valuation_price > offer_price
        ? "Increased"
        : valuation_price < offer_price
        ? "Decreased"
        : "Equal",
  };
};

const checkCurrenctData = (date: string) => {
  // Convert the given date string to a Date object
  const givenDate = new Date(date);

  // Get the current date
  const currentDate = new Date();

  // Compare the year, month, and day components of the given date and current date
  const isSameDate =
    givenDate.getFullYear() === currentDate.getFullYear() &&
    givenDate.getMonth() === currentDate.getMonth() &&
    givenDate.getDate() === currentDate.getDate();

  return isSameDate;
};

export default {
  returnValuationPrice,
  checkCurrenctData
};
