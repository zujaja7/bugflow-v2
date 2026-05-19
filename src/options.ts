import type { Estimate, Priority, Severity, Status } from "./types";

export const severityOptions: Severity[] = ["Highest", "High", "Medium", "Low"];

export const priorityOptions: Priority[] = ["P1", "P2", "P3", "P4"];

export const statusOptions: Status[] = [
  "New",
  "Open",
  "Assigned",
  "Fixed",
  "Verified",
  "Closed",
  "Reopened",
];

export const estimateOptions: Estimate[] = [
  "0.25 hr",
  "0.5 hr",
  "1 hr",
  "2 hrs",
  "3 hrs",
  "4 hrs",
  "5 hrs",
];
