import type { Bug } from "./types";

export const formatLastUpdated = (timestamp: number | undefined) => {
  if (!timestamp) {
    return "No updates yet";
  }

  const updatedDate = new Date(timestamp);
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = updatedDate.toDateString() === today.toDateString();
  const isYesterday = updatedDate.toDateString() === yesterday.toDateString();

  const time = updatedDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return `Today, ${time}`;
  }

  if (isYesterday) {
    return `Yesterday, ${time}`;
  }

  const date = updatedDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${date}, ${time}`;
};

export const getBugTimestampLabel = (bug: Bug) => {
  if (bug.createdAt === bug.updatedAt) {
    return `Created ${formatLastUpdated(bug.createdAt)}`;
  }

  return `Updated ${formatLastUpdated(bug.updatedAt)}`;
};
