
export const timeAgo = (timestamp) => {
  if (!timestamp || isNaN(timestamp)) return "No data available";

  const past = new Date(Number(timestamp)); 
  if (isNaN(past.getTime())) return "Invalid date";

  const now = new Date();
  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return "Less than a minute ago";
  if (seconds < 120) return "A minute ago";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 7200) return "An hour ago";
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 172800) return "Yesterday";
  return `${Math.floor(seconds / 86400)} days ago`;
};
