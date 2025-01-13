import moment from "moment";

export const getTimeMs = (timestamp: Date | null | undefined): string => {
  if (!timestamp) return "N/A";

  const now = moment();
  const givenTime = moment(timestamp);
  const diffInSeconds = now.diff(givenTime, "s");
  const diffInMinutes = now.diff(givenTime, "m");
  const diffInHours = now.diff(givenTime, "h");
  const diffInDays = now.diff(givenTime, "d");
  const diffInWeeks = now.diff(givenTime, "w");

  if (diffInSeconds < 60) {
    return `${diffInSeconds} s${diffInSeconds === 1 ? "" : ""} `;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} m${diffInMinutes === 1 ? "" : ""} `;
  } else if (diffInHours < 24) {
    return `${diffInHours} h${diffInHours === 1 ? "" : ""} `;
  } else if (diffInDays < 7) {
    return `${diffInDays} d${diffInDays === 1 ? "" : ""} `;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} w${diffInWeeks === 1 ? "" : ""} `;
  } else {
    return "N/A";
  }
};
