import moment from "moment";

export const getTimeMs = (timestamp: Date | null | undefined): string => {
  if (!timestamp) return "N/A";

  const now = moment();
  const givenTime = moment(timestamp);
  const diffInSeconds = now.diff(givenTime, "seconds");
  const diffInMinutes = now.diff(givenTime, "minutes");
  const diffInHours = now.diff(givenTime, "hours");

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }
};
