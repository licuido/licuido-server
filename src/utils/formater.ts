export const amountFormatter = (value: any) => {
  if (
    value !== null &&
    value !== "" &&
    value !== undefined &&
    !isNaN(Number(value))
  ) {
    return parseFloat(value.toString()).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return "";
};

export const tokenFormatter = (value: any) => {
  if (
    value !== null &&
    value !== "" &&
    value !== undefined &&
    !isNaN(Number(value))
  ) {
    return parseFloat(value.toString()).toLocaleString();
  }

  return "";
};
