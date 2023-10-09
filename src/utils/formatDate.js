import moment from "moment";

export default function formatDate(date) {
  const now = moment();
  const diff = now.diff(date);

  if (diff < 1000) {
    return "just now";
  } else if (diff < 60000) {
    return `${Math.floor(diff / 1000)} seconds ago`;
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)} minutes ago`;
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)} hours ago`;
  } else if (diff < 2628000000) {
    // less than one month
    return `${Math.floor(diff / 86400000)} days ago`;
  } else {
    return "over a month ago";
  }
}
