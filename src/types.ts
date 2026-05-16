export type Severity = "Highest" | "High" | "Medium" | "Low";

export type Priority = "P1" | "P2" | "P3" | "P4";

export type Status =
  | "New"
  | "Open"
  | "Assigned"
  | "Fixed"
  | "Verified"
  | "Closed"
  | "Reopened";

export type Estimate =
  | "0.25 hr"
  | "0.5 hr"
  | "1 hr"
  | "2 hrs"
  | "3 hrs"
  | "4 hrs"
  | "5 hrs";

export interface Bug {
  id: number;
  bugTitle: string;
  bugDescription: string;
  bugSeverity: Severity;
  bugPriority: Priority | "";
  bugStatus: Status;
  bugEstimate: Estimate | "";
  createdAt: number;
  updatedAt: number;
}
