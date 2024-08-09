export const isOneHourCompleted = (unixTimestamp: number) => {
  const oneHour = 60 * 60 * 1000; // One hour in milliseconds
  const currentTime = new Date().getTime(); // Current time in milliseconds
  const timestampInMilliseconds = unixTimestamp * 1000; // Convert to milliseconds

  const timeDifference = currentTime - timestampInMilliseconds;

  return timeDifference >= oneHour;
};
