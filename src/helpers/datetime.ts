function now(type?: string) {
  return type !== "unix" ? new Date() : Date.now;
}

function getDaysBetweenDates(date1: Date, date2: Date): number {
  const oneDay: number = 1000 * 60 * 60 * 24; // Milliseconds in one day
  const timeDiff: number = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(timeDiff / oneDay);
}
function getTimeString(date: Date): string {
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds();
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
function getShortDateString(date: Date): string {
  return date.toDateString();
}
function getISODateString(date: Date): string {
  return date.toISOString();
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "pm" : "am";

  return `${day} ${month} ${year}, ${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
};

export default {
  now,
  getDaysBetweenDates,
  getTimeString,
  getShortDateString,
  getISODateString,
  formatDate,
};
